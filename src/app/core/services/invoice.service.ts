// invoice.service.ts
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { environment } from '../../../environments/environment';
import { Sale, } from '../interfaces/sales/sales.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private companyInfo = {
    name: environment.company.name,
    address: environment.company.address,
    phone: environment.company.phone,
    email: environment.company.email,
    website: environment.company.website,
    logo: environment.company.logo
  };






}
