// src/app/features/admin/products/product-form/product-form.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { BaseProduct, Category, Product } from '../../../../core/models/interfaces';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoading = signal(false);
  error = signal<string | null>(null);
  isEditMode = signal(false);
  imagePreview = signal<string | null>(null);
  
  categories = toSignal(this.categoryService.getCategories(), {
    initialValue: [] as unknown as Category[]
  });

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stockQuantity: [0, [Validators.required, Validators.min(0)]],
    categoryId: ['', Validators.required],
    sku: ['', Validators.required],
    brand: ['', Validators.required],
    imageUrl: ['']
  });

  constructor() {
    const productId = this.route.snapshot.params['id'];
    if (productId) {
      this.isEditMode.set(true);
      this.loadProduct(productId);
    }
  }

  private async loadProduct(id: string) {
    try {
      this.isLoading.set(true);
      await this.productService.refreshProducts();
      const product = this.productService.products()
        .find((p: BaseProduct) => p.id === id);
      
      if (product) {
        this.productForm.patchValue(product);
      }
    } catch (err) {
      this.error.set('Failed to load product');
    } finally {
      this.isLoading.set(false);
    }
  }

  async onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    try {
      this.isLoading.set(true);
      const fileId = await this.productService.uploadImage(file);
      this.productForm.patchValue({ imageUrl: fileId });
      
      // Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      this.error.set('Failed to upload image');
    } finally {
      this.isLoading.set(false);
    }
  }

  generateSKU() {
    const name = this.productForm.get('name')?.value || '';
    const brand = this.productForm.get('brand')?.value || '';
    const categoryId = this.productForm.get('categoryId')?.value;
    const category = this.categories()?.find((c: Category) => c.id === categoryId);

    const sku = `${brand.substring(0, 3)}-${category?.name.substring(0, 3) || ''}-${name.substring(0, 3)}-${
      Math.random().toString(36).substring(2, 7)
    }`.toUpperCase();

    this.productForm.patchValue({ sku });
  }

  async onSubmit() {
    if (this.productForm.invalid) return;

    try {
      this.isLoading.set(true);
      this.error.set(null);

      if (this.isEditMode()) {
        await this.productService.updateProduct(
          this.route.snapshot.params['id'],
          this.productForm.value as Partial<Product>
        );
      } else {
        await this.productService.createProduct(
          this.productForm.value as Omit<Product, 'id'>
        );
      }

      this.router.navigate(['/admin/products']);
    } catch (err) {
      this.error.set('Failed to save product');
    } finally {
      this.isLoading.set(false);
    }
  }
}