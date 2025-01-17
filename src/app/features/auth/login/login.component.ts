import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  error = signal<string | null>(null);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  showError(field: string): boolean {
    const control = this.loginForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    try {
      this.isLoading.set(true);
      this.error.set(null);

      const { email, password } = this.loginForm.getRawValue();
      await this.authService.login(email, password);
      
      // Navigate to dashboard on successful login
      this.router.navigate(['/dashboard']);
    } catch (err) {
      this.error.set('Invalid email or password');
    } finally {
      this.isLoading.set(false);
    }
  }
} 