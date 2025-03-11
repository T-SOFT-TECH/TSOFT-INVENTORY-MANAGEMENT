// category-list.component.ts
import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTableModule} from '@angular/material/table';
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CategoryService} from '../../../../core/services/category.service';
import {HotToastService} from '@ngxpert/hot-toast';
import {Category} from '../../../../core/interfaces/category/category.interfaces';
import {AutoAnimationDirective} from '../../../../core/Directives/auto-Animate.directive';

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: string;
  parentId?: string;
  order: number;
}

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTreeModule,
    MatTableModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AutoAnimationDirective
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'

})
export class CategoryListComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private toast = inject(HotToastService);

  isLoading = signal(false);

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  private transformer = (node: Category, level: number): FlatNode => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: node.level || level, // Use the category's own level if available
      id: node.$id,
      parentId: node.parentId,
      order: node.order || 0
    };
  };

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit() {
    this.loadCategories();
  }

  async loadCategories() {
    try {
      this.isLoading.set(true);
      const categories = await this.categoryService.getCategories();


  this.dataSource.data = this.buildTree(categories);
    } catch (error) {
      console.error('Error loading categories:', error);
      this.toast.error('Failed to load categories');
    } finally {
      this.isLoading.set(false);
    }
  }

  private buildTree(categories: Category[]): Category[] {
    // Sort categories by level first to ensure parents are processed before children
    const sortedCategories = [...categories].sort((a, b) => a.level - b.level);

    const categoryMap = new Map<string, Category>();
    const rootCategories: Category[] = [];

    // First pass: Create map of categories with empty children arrays
    sortedCategories.forEach(category => {
      categoryMap.set(category.$id, {
        ...category,
        children: []
      });
    });

    // Second pass: Build tree structure
    sortedCategories.forEach(category => {
      const currentCategory = categoryMap.get(category.$id)!;

      if (category.parentId && categoryMap.has(category.parentId)) {
        // If category has a parent and parent exists in map
        const parent = categoryMap.get(category.parentId)!;
        parent.children = parent.children || [];
        parent.children.push(currentCategory);

        // Sort children by order if available
        parent.children.sort((a, b) => (a.order || 0) - (b.order || 0));
      } else if (!category.parentId) {
        // If it's a root category
        rootCategories.push(currentCategory);
      }
    });

    // Sort root categories by order
    rootCategories.sort((a, b) => (a.order || 0) - (b.order || 0));

    return rootCategories;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  getParentCategoriesCount(): number {
    return this.treeControl.dataNodes?.filter(node => !node.parentId).length || 0;
  }

  getSubCategoriesCount(): number {
    return this.treeControl.dataNodes?.filter(node => node.parentId).length || 0;
  }

  getChildCount(node: FlatNode): number {
    return this.treeControl.getDescendants(node).length;
  }

  getCategoryProductCount(categoryId: string): number {
    // Implement this method to return the number of products in a category
    // You'll need to fetch this data from your ProductService
    return 0;
  }

  async deleteCategory(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      await this.categoryService.deleteCategory(id);
      await this.loadCategories(); // Reload after deletion
      this.toast.success('Category deleted successfully');
    } catch (error) {
      this.toast.error('Failed to delete category');
    }
  }

  async onDrop(event: CdkDragDrop<FlatNode[]>) {
    // Don't do anything if dropping on the same item
    if (event.previousIndex === event.currentIndex) return;

    const node = event.item.data as FlatNode;
    const siblings = this.getSiblings(node);

    // Calculate new order based on surrounding siblings
    const newOrder = this.calculateNewOrder(siblings, event.currentIndex);

    // Get new parent based on drop level
    const newParentId = this.getNewParentId(event);

    try {
      await this.categoryService.updateCategory(node.id, {
        parentId: newParentId,
        order: newOrder
      });

      // Refresh the tree
      await this.loadCategories();
      this.toast.success('Category position updated');
    } catch (error) {
      this.toast.error('Failed to update category position');
    }
  }

  private getSiblings(node: FlatNode): FlatNode[] {
    if (!node.parentId) {
      // Get root level nodes
      return this.treeControl.dataNodes.filter(n => !n.parentId);
    }
    // Get siblings with same parent
    return this.treeControl.dataNodes.filter(n => n.parentId === node.parentId);
  }

  private getNewParentId(event: CdkDragDrop<FlatNode[]>): string | undefined {
    const targetNode = event.container.data[event.currentIndex];
    if (!targetNode) return undefined;

    // If dropping at same level, use same parent
    if (event.item.data.level === targetNode.level) {
      return targetNode.parentId;
    }

    // If dropping as child, use target as parent
    if (event.item.data.level < targetNode.level) {
      return targetNode.id;
    }

    // If dropping at higher level, find appropriate parent
    return this.getParentNode(targetNode)?.id;
  }

  private calculateNewOrder(siblings: FlatNode[], newIndex: number): number {
    if (siblings.length === 0) return 1000;

    if (newIndex === 0) {
      // If first item
      return siblings[0] ? siblings[0].order / 2 : 1000;
    }

    if (newIndex >= siblings.length) {
      // If last item
      return siblings[siblings.length - 1].order + 1000;
    }

    // Calculate middle point between surrounding items
    const prevOrder = siblings[newIndex - 1].order;
    const nextOrder = siblings[newIndex].order;
    return (prevOrder + nextOrder) / 2;
  }

  private getParentNode(node: FlatNode): FlatNode | null {
    const currentLevel = node.level;

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }


}
