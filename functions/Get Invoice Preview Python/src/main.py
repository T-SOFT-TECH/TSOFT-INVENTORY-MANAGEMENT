import json
import os
from datetime import datetime
from io import BytesIO
from typing import Dict, Any, Optional

# HTML to PDF conversion
from xhtml2pdf import pisa

# Appwrite imports
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.services.storage import Storage
from appwrite.id import ID
from appwrite.query import Query
from appwrite.input_file import InputFile

def main(context):
    # Init logging
    log = context.log
    log("Starting invoice generation function")

    try:
        # Parse request
        body = json.loads(context.req.body)
        sale_id = body.get('saleId')
        log(f"Request parsed successfully, saleId: {sale_id}")

        if not sale_id:
            log("Request missing required saleId parameter")
            return context.res.json({
                'success': False,
                'message': 'Sale ID is required'
            }, 400)

        # Initialize Appwrite
        log("Initializing Appwrite client")
        client = Client()
        client.set_endpoint(os.environ.get('APPWRITE_ENDPOINT'))
        client.set_project(os.environ.get('APPWRITE_FUNCTION_PROJECT_ID'))
        client.set_key(os.environ.get('APPWRITE_API_KEY'))

        databases = Databases(client)
        storage = Storage(client)
        log("Appwrite client initialized successfully")

        # Fetch sale data
        log(f"Fetching sale document with ID: {sale_id}")
        sale = databases.get_document(
            os.environ.get('APPWRITE_DATABASE_ID'),
            'sales',
            sale_id
        )
        log(f"Sale fetched successfully: {json.dumps(sale)}")

        # Fetch customer
        customer_id = sale.get('customerId')
        customer = None
        try:
            if customer_id:
                customer = databases.get_document(
                    os.environ.get('APPWRITE_DATABASE_ID'),
                    'customers',
                    customer_id
                )
                log(f"Customer fetched successfully: {json.dumps(customer)}")
            else:
                log("No customer ID found in sale")
                customer = {"name": "Unknown Customer", "email": "", "phone": ""}
        except Exception as e:
            log(f"Failed to fetch customer: {str(e)}")
            customer = {"name": "Unknown Customer", "email": "", "phone": ""}
            log("Using placeholder customer data to continue")

        # Process items
        processed_items = []
        if 'products' in sale and isinstance(sale['products'], list) and len(sale['products']) > 0:
            log(f"Using embedded products data from sale record. Count: {len(sale['products'])}")
            for item in sale['products']:
                product = item.get('product', {})
                processed_items.append({
                    'product': product,
                    'quantity': item.get('quantity', 1),
                    'priceAtSale': item.get('priceAtSale', 0)
                })
        else:
            log("No product data found, using placeholder")
            processed_items.append({
                'product': {'name': 'Complete Sale'},
                'quantity': 1,
                'priceAtSale': sale.get('totalAmount', 0)
            })

        # Calculate summary values
        subtotal = sum(item.get('quantity', 1) * item.get('priceAtSale', 0) for item in processed_items)
        tax = subtotal * 0.1  # 10% tax
        total = sale.get('totalAmount', subtotal + tax)

        # Compile sale data
        sale_data = {
            'invoiceNumber': sale.get('invoiceNumber', f"INV-{sale_id[:8]}"),
            'date': format_date(sale.get('date')),
            'customer': customer,
            'items': processed_items,
            'subtotal': subtotal,
            'tax': tax,
            'total': total,
            'paymentStatus': sale.get('paymentStatus', 'Unknown'),
            'paymentMethod': sale.get('paymentMethod', 'Cash')
        }

        # Generate PDF from HTML
        log("Generating PDF invoice from HTML")
        pdf_bytes = convert_html_to_pdf(generate_invoice_html(sale_data), log)
        log(f"PDF generation successful. Size: {len(pdf_bytes)} bytes")

        # Upload to storage
        log(f"Uploading PDF to storage bucket: {os.environ.get('APPWRITE_INVOICES_BUCKET_ID')}")
        filename = f"invoice-{sale_data['invoiceNumber']}.pdf"
        log(f"Uploading with filename: {filename}")

        file = storage.create_file(
            bucket_id=os.environ.get('APPWRITE_INVOICES_BUCKET_ID'),
            file_id=ID.unique(),
            file=InputFile.from_bytes(pdf_bytes, filename=filename, mime_type='application/pdf'),
            permissions=['read("any")']
        )
        log(f"File uploaded successfully. File ID: {file['$id']}")

        # Get preview URL
        preview_url = f"{os.environ.get('APPWRITE_ENDPOINT')}/storage/buckets/{os.environ.get('APPWRITE_INVOICES_BUCKET_ID')}/files/{file['$id']}/view?project={os.environ.get('APPWRITE_FUNCTION_PROJECT_ID')}"
        log(f"Preview URL generated: {preview_url}")

        return context.res.json({
            'success': True,
            'previewUrl': preview_url
        })

    except Exception as e:
        context.error(f"Unhandled error in invoice preview function: {str(e)}")
        import traceback
        context.error(f"Stack trace: {traceback.format_exc()}")
        return context.res.json({
            'success': False,
            'message': 'Failed to generate invoice preview',
            'error': str(e)
        }, 500)

def convert_html_to_pdf(html_content: str, log) -> bytes:
    """Convert HTML to PDF using xhtml2pdf"""
    try:
        log("Starting HTML to PDF conversion")
        pdf_buffer = BytesIO()

        # Convert the HTML
        pisa_status = pisa.CreatePDF(
            src=html_content,
            dest=pdf_buffer
        )

        if pisa_status.err:
            log(f"HTML to PDF conversion failed: {pisa_status.err}")
            raise Exception("HTML to PDF conversion failed")

        pdf_bytes = pdf_buffer.getvalue()
        pdf_buffer.close()

        log(f"PDF conversion successful, size: {len(pdf_bytes)} bytes")
        return pdf_bytes

    except Exception as e:
        log(f"Error converting HTML to PDF: {str(e)}")
        raise

def generate_invoice_html(sale: Dict[str, Any]) -> str:
    """Generate HTML content for invoice"""

    # Inline CSS styles
    css = """
    body {
        font-family: 'Helvetica', Arial, sans-serif;
        margin: 0;
        padding: 20px;
        color: #333;
        font-size: 12px;
        line-height: 1.5;
    }
    .invoice-container {
        max-width: 800px;
        margin: 0 auto;
        border: 1px solid #eee;
        padding: 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
    }
    .company-info {
        text-align: left;
    }
    .invoice-title {
        text-align: right;
    }
    h1 {
        font-size: 24px;
        color: #2c3e50;
        margin: 0 0 5px 0;
    }
    h3 {
        font-size: 16px;
        margin: 0 0 5px 0;
    }
    .customer-info {
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 30px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }
    th {
        background-color: #2c3e50;
        color: white;
        text-align: left;
        padding: 10px;
    }
    td {
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }
    .summary {
        margin-left: auto;
        width: 40%;
    }
    .summary-row {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
    }
    .total {
        font-weight: bold;
        font-size: 14px;
        border-top: 2px solid #ddd;
        padding-top: 5px;
    }
    .payment-info {
        margin-bottom: 30px;
    }
    .footer {
        text-align: center;
        color: #777;
        margin-top: 40px;
        border-top: 1px solid #eee;
        padding-top: 20px;
    }
    .text-right {
        text-align: right;
    }
    """

    # Generate items rows
    items_rows = ""
    for item in sale.get('items', []):
        product = item.get('product', {})
        product_name = product.get('name', 'Unknown Product')
        quantity = item.get('quantity', 1)
        price = item.get('priceAtSale', 0)
        total = quantity * price

        items_rows += f"""
        <tr>
            <td>{product_name}</td>
            <td class="text-right">{quantity}</td>
            <td class="text-right">₦{price:.2f}</td>
            <td class="text-right">₦{total:.2f}</td>
        </tr>
        """

    # Get customer info
    customer = sale.get('customer', {})
    customer_name = customer.get('name', 'Unknown Customer')
    customer_email = customer.get('email', '')
    customer_phone = customer.get('phone', '')

    # Company info from environment
    company_name = os.environ.get('COMPANY_NAME', 'Company Name')
    company_address = os.environ.get('COMPANY_ADDRESS', 'Company Address')
    company_phone = os.environ.get('COMPANY_PHONE', 'Company Phone')
    company_email = os.environ.get('COMPANY_EMAIL', 'Company Email')

    # HTML template
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Invoice {sale.get('invoiceNumber')}</title>
        <style>{css}</style>
    </head>
    <body>
        <div class="invoice-container">
            <!-- Header -->
            <div class="header">
                <div class="company-info">
                    <h3>{company_name}</h3>
                    <p>{company_address}</p>
                    <p>{company_phone}</p>
                    <p>{company_email}</p>
                </div>
                <div class="invoice-title">
                    <h1>INVOICE</h1>
                    <p><strong>Invoice Number:</strong> {sale.get('invoiceNumber')}</p>
                    <p><strong>Date:</strong> {sale.get('date')}</p>
                </div>
            </div>

            <!-- Customer Info -->
            <div class="customer-info">
                <h3>Bill To:</h3>
                <p><strong>{customer_name}</strong></p>
                <p>{customer_email}</p>
                <p>{customer_phone}</p>
            </div>

            <!-- Products Table -->
            <table>
                <thead>
                    <tr>
                        <th style="width: 50%;">Product</th>
                        <th style="width: 15%; text-align: right;">Quantity</th>
                        <th style="width: 15%; text-align: right;">Price</th>
                        <th style="width: 20%; text-align: right;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items_rows}
                </tbody>
            </table>

            <!-- Summary -->
            <div class="summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>₦{sale.get('subtotal', 0):.2f}</span>
                </div>
                <div class="summary-row">
                    <span>Tax (10%):</span>
                    <span>₦{sale.get('tax', 0):.2f}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>₦{sale.get('total', 0):.2f}</span>
                </div>
            </div>

            <!-- Payment Info -->
            <div class="payment-info">
                <p><strong>Payment Status:</strong> {sale.get('paymentStatus', '').upper()}</p>
                <p><strong>Payment Method:</strong> {sale.get('paymentMethod', 'Cash').upper()}</p>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p>Thank you for your business!</p>
            </div>
        </div>
    </body>
    </html>
    """

    return html

def format_date(date_str: Optional[str]) -> str:
    """Format a date string for display"""
    if not date_str:
        return datetime.now().strftime('%Y-%m-%d')

    try:
        # Handle ISO format with timezone
        if 'T' in date_str:
            date_obj = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
            return date_obj.strftime('%Y-%m-%d')
        return date_str
    except Exception:
        return datetime.now().strftime('%Y-%m-%d')
