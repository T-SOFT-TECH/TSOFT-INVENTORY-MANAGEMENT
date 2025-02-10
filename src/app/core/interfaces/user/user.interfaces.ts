// src/interfaces/user/user.interfaces.ts
import { BaseDocument, UserPreferences } from '../base/base.interfaces';

export interface User extends BaseDocument {
  name: string;
  email: string;
  role: 'admin' | 'sales_rep';
  isActive: boolean;
  lastLogin?: string;
  preferences?: UserPreferences;
}

export type UserCreateDTO = Omit<User, keyof BaseDocument | 'lastLogin'>;
export type UserUpdateDTO = Partial<UserCreateDTO>;