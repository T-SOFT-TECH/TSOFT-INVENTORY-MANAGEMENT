
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../../core/services/brand.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Brand, BrandInput } from '../../../../core/models/interfaces';

type BrandFormControls = {
  name: FormControl<string>;
  slug: FormControl<string>;
  description: FormControl<string>;
  logoUrl: FormControl<string>;
  websiteUrl: FormControl<string>;
  status: FormControl<'active' | 'inactive'>;
};

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './brand-form.component.html'
})
export class BrandFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private brandService = inject(BrandService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toast = inject(HotToastService);

  isLoading = signal(false);
  isEditMode = signal(false);
  imagePreview = signal<string | null>(null);

  brandForm = this.fb.group<BrandFormControls>({
    name: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true
    }),
    slug: this.fb.control('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    description: this.fb.control('', { nonNullable: true }),
    logoUrl: this.fb.control('', { nonNullable: true }),
    websiteUrl: this.fb.control('', { nonNullable: true }),
    status: this.fb.control('active' as const, { nonNullable: true })
  });

  ngOnInit() {
    const brandId = this.route.snapshot.params['id'];
    if (brandId) {
      this.isEditMode.set(true);
      this.loadBrand(brandId);
    }
  }

  private async loadBrand(id: string) {
    try {
      this.isLoading.set(true);
      const brand = await this.brandService.getBrand(id);
      if (brand) {
        this.brandForm.patchValue({
          name: brand.name,
          slug: brand.slug,
          description: brand.description || '',
          logoUrl: brand.logoUrl || '',
          websiteUrl: brand.websiteUrl || '',
          status: brand.status
        });

        if (brand.logoUrl) {
          this.imagePreview.set(this.brandService.getLogoUrl(brand.logoUrl));
        }
      }
    } catch (error) {
      this.toast.error('Failed to load brand');
    } finally {
      this.isLoading.set(false);
    }
  }

  async onSubmit() {
    if (this.brandForm.invalid) {
      this.toast.error('Please check the form for errors');
      return;
    }

    try {
      this.isLoading.set(true);
      const formValues = this.brandForm.getRawValue();

      const brandData: BrandInput = {
        name: formValues.name,
        slug: formValues.slug,
        description: formValues.description || undefined,
        logoUrl: formValues.logoUrl || undefined,
        websiteUrl: formValues.websiteUrl || undefined,
        status: formValues.status
      };

      if (this.isEditMode()) {
        await this.brandService.updateBrand(
          this.route.snapshot.params['id'],
          brandData
        );
        this.toast.success('Brand updated successfully');
      } else {
        await this.brandService.createBrand(brandData);
        this.toast.success('Brand created successfully');
      }

      this.router.navigate(['/admin/brands']);
    } catch (error) {
      this.toast.error(this.isEditMode() ? 'Failed to update brand' : 'Failed to create brand');
    } finally {
      this.isLoading.set(false);
    }
  }

  generateSlug() {
    const name = this.brandForm.get('name')?.value;
    if (name) {
      const slug = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      this.brandForm.patchValue({ slug });
    }
  }

  async onLogoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    try {
      this.isLoading.set(true);
      const fileId = await this.brandService.uploadLogo(file);
      this.brandForm.patchValue({ logoUrl: fileId });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      this.toast.error('Failed to upload logo');
    } finally {
      this.isLoading.set(false);
    }
  }

  isFieldInvalid(fieldName: keyof BrandFormControls): boolean {
    const control = this.brandForm.get(fieldName);
    return !!control && control.invalid && control.touched;
  }

  getErrorMessage(fieldName: keyof BrandFormControls): string {
    const control = this.brandForm.get(fieldName);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'This field is required';
    }
    if (control.hasError('minlength')) {
      return 'Must be at least 2 characters';
    }
    return '';
  }
}
