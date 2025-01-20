// login.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import {AuthService} from '../../../core/services/auth.service';

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
  private toast = inject(HotToastService);

  isLoading = signal(false);
  showPassword = signal(false);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.toast.error('Please check your input and try again');
      return;
    }

    try {
      this.isLoading.set(true);
      const { email, password } = this.loginForm.getRawValue();

      await this.authService.login(email, password);

      this.toast.success('Welcome back!', {
        position: 'top-right',
        duration: 3000,
        style: {
          border: '1px solid #22c55e',
          padding: '16px',
          color: '#166534',
        },
      });

      this.router.navigate(['/dashboard']);
    } catch (err) {
      this.toast.error('Invalid email or password', {
        position: 'top-right',
        duration: 3000,
        style: {
          border: '1px solid #ef4444',
          padding: '16px',
          color: '#b91c1c',
        },
      });
    } finally {
      this.isLoading.set(false);
    }
  }

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }
}
