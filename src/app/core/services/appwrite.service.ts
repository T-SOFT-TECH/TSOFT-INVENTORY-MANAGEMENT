import { Injectable } from '@angular/core';
import {Client, Account, Databases, Functions} from 'appwrite';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppwriteService {
  readonly client: Client;
  public account: Account;
  public database: Databases;
  public functions: Functions;

  constructor() {
    this.client = new Client()
      .setEndpoint(environment.appwrite.endpoint)
      .setProject(environment.appwrite.projectId);

    this.account = new Account(this.client);
    this.database = new Databases(this.client);
    this.functions = new Functions(this.client);
  }

  // Authentication methods
  async login(email: string, password: string) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      throw error;
    }
  }
}
