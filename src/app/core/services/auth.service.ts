import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppwriteService } from './appwrite.service';
import { Account, ID } from 'appwrite';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  labels: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appwrite = inject(AppwriteService);
  private router = inject(Router);
  private account: Account;

  isAuthenticated = signal(false);
  currentUser = signal<User | null>(null);

  constructor() {
    this.account = new Account(this.appwrite.client);
    this.checkAuth();
  }

  private async checkAuth() {
    try {
      const session = await this.account.getSession('current');
      if (session) {
        const user = await this.account.get();
        this.setUserSession(user);
      }
    } catch (error) {
      this.clearSession();
    }
  }

  private setUserSession(userData: any) {
    const user: User = {
      id: userData.$id,
      email: userData.email,
      name: userData.name,
      role: userData.role || 'user',
      labels: userData.labels || []
    };

    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  private clearSession() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.account.createEmailPasswordSession(email, password);
      const user = await this.account.get();
      this.setUserSession(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSession('current');
      this.clearSession();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async register(email: string, password: string, name: string): Promise<void> {
    try {
      await this.account.create(ID.unique(), email, password, name);
      await this.login(email, password);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async updateProfile(name: string): Promise<void> {
    try {
      await this.account.updateName(name);
      const user = await this.account.get();
      this.setUserSession(user);
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    try {
      await this.account.updatePassword(newPassword, oldPassword);
    } catch (error) {
      console.error('Password change error:', error);
      throw error;
    }
  }
}
