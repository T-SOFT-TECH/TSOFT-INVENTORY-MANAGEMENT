import json
import os
from datetime import datetime
from typing import Dict, List, Any, Optional, Union

from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.services.storage import Storage
from appwrite.id import ID
from appwrite.query import Query
from appwrite.input_file import InputFile
from fpdf import FPDF

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

        # Validate customer exists
        customer_id = None
        if 'customer' in sale and '$id' in sale['customer']:
            customer_id = sale['customer']['$id']
        elif 'customerId' in sale:
            customer_id = sale['customerId']

        if not customer_id:
            log(f"Sale is missing customer information. Sale data: {json.dumps(sale)}")
            return context.res.json({
                'success': False,
                'message': 'Sale record is missing customer information'
            }, 400)

        # Fetch customer
        log(f"Fetching customer with ID: {customer_id}")
        customer = None
        try:
            customer = databases.get_document(
                os.environ.get('APPWRITE_DATABASE_ID'),
                'customers',
                customer_id
            )
            log(f"Customer fetched successfully: {json.dumps(customer)}")
        except Exception as e:
            log(f"Failed to fetch customer: {str(e)}")
            customer = {"name": "Unknown Customer", "email": "", "phone": ""}
            log("Using placeholder customer data to continue")

        # Process items
        processed_items = []

        if 'products' in sale and isinstance(sale['products'], list) and len(sale['products']) > 0:
            log(f"Using embedded products data from sale record. Count: {len(sale['products'])}")
            # Map embedded products
            for item in sale['products']:
                product = item.get('product', {})
                product_id = product.get('$id') or product.get('id') or 'unknown'
                name = product.get('name', 'Unknown Product')
                price = item.get('priceAtSale') or product.get('price', 0)
                quantity = item.get('quantity', 1)

                log(f"Mapped embedded product: {name}, ID: {product_id}, Price: {price}, Qty: {quantity}")

                processed_items.append({
                    'product': {
                        '$id': product_id,
                        'name': name,
                        'price': price
                    },
                    'quantity': quantity,
                    'priceAtSale': price
                })
        else:
            # Fetch sale items
            log(f"Fetching sale items for saleId: {sale_id}")
            try:
                sale_items = databases.list_documents(
                    os.environ.get('APPWRITE_DATABASE_ID'),
                    'sale-items',
                    [Query.equal('saleId', sale_id)]
                )

                if not sale_items['documents']:
                    log("Warning: No sale items found for this sale")
                    # Create a placeholder item
                    processed_items.append({
                        'product': {
                            '$id': 'placeholder',
                            'name': 'Sale Item',
                            'price': sale.get('totalAmount', 0)
                        },
                        'quantity': 1,
                        'priceAtSale': sale.get('totalAmount', 0)
                    })
                else:
                    log(f"Sale items fetched successfully. Count: {len(sale_items['documents'])}")

                    for item in sale_items['documents']:
                        try:
                            product_id = None
                            if item.get('product') and item['product'] is not None and '$id' in item['product']:
                                product_id = item['product']['$id']
                            elif 'productId' in item:
                                product_id = item['productId']

                            if not product_id:
                                log(f"Item missing productId: {json.dumps(item)}")
                                # Add as unknown product
                                processed_items.append({
                                    'product': {
                                        '$id': 'unknown',
                                        'name': 'Unknown Product',
                                        'price': item.get('priceAtSale', 0)
                                    },
                                    'quantity': item.get('quantity', 1),
                                    'priceAtSale': item.get('priceAtSale', 0)
                                })
                                continue

                            # Fetch product details
                            log(f"Fetching product: {product_id}")
                            product = databases.get_document(
                                os.environ.get('APPWRITE_DATABASE_ID'),
                                'products',
                                product_id
                            )

                            processed_items.append({
                                'product': product,
                                'quantity': item.get('quantity', 1),
                                'priceAtSale': item.get('priceAtSale') or product.get('price', 0)
                            })

                            log(f"Added product to invoice: {product['name']}")
                        except Exception as e:
                            log(f"Error processing item: {str(e)}")
                            # Add with available info
                            processed_items.append({
                                'product': {
                                    '$id': 'unknown',
                                    'name': 'Unknown Product',
                                    'price': item.get('priceAtSale', 0)
                                },
                                'quantity': item.get('quantity', 1),
                                'priceAtSale': item.get('priceAtSale', 0)
                            })
            except Exception as e:
                log(f"Failed to fetch sale items: {str(e)}")
                # Create a placeholder
                processed_items.append({
                    'product': {
                        '$id': 'placeholder',
                        'name': 'Complete Sale',
                        'price': sale.get('totalAmount', 0)
                    },
                    'quantity': 1,
                    'priceAtSale': sale.get('totalAmount', 0)
                })
                log("Created placeholder sale item with total amount")

        # Compile sale data
        log("Compiling complete sale data")
        sale_data = {**sale, 'customer': customer, 'items': processed_items}
        log(f"Sale data compilation complete. Items count: {len(processed_items)}")

        # Generate PDF
        log("Generating PDF invoice")
        pdf_bytes = generate_invoice_pdf(sale_data, log)
        log(f"PDF generation successful. Size: {len(pdf_bytes)} bytes")

        # Upload to storage
        log(f"Uploading PDF to storage bucket: {os.environ.get('APPWRITE_INVOICES_BUCKET_ID')}")
        invoice_number = sale.get('invoiceNumber', f"INV-{sale_id[:8]}")
        filename = f"invoice-{invoice_number}-preview.pdf"
        log(f"Uploading with filename: {filename}")

        file = storage.create_file(
            bucket_id=os.environ.get('APPWRITE_INVOICES_BUCKET_ID'),
            file_id=ID.unique(),
            file=InputFile.from_bytes(pdf_bytes, filename=filename, mime_type='application/pdf'),
            permissions = ['read("any")']
        )
        log(f"File uploaded successfully. File ID: {file['$id']}")

        # Get preview URL
        log(f"Generating preview URL for file: {file['$id']}")
        preview_url = f"{os.environ.get('APPWRITE_ENDPOINT')}/storage/buckets/{os.environ.get('APPWRITE_INVOICES_BUCKET_ID')}/files/{file['$id']}/view?project={os.environ.get('APPWRITE_FUNCTION_PROJECT_ID')}"
        log(f"Preview URL generated: {preview_url}")

        log("Function completed successfully")
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

def generate_invoice_pdf(sale, log):
    log("Starting PDF generation")
    pdf = FPDF()
    pdf.add_page()
    page_width = pdf.w
    y_pos = 20

    try:
        log("Adding company info to PDF")
        # Company Info
        pdf.set_font('Arial', 'B', 20)
        pdf.set_text_color(44, 62, 80)
        pdf.cell(0, 10, 'INVOICE', 0, 1, 'R')

        pdf.set_font('Arial', '', 12)
        pdf.set_text_color(0, 0, 0)
        pdf.text(20, y_pos, os.environ.get('COMPANY_NAME', 'Company Name'))
        pdf.set_font('Arial', '', 10)
        pdf.text(20, y_pos + 5, os.environ.get('COMPANY_ADDRESS', 'Company Address'))
        pdf.text(20, y_pos + 10, os.environ.get('COMPANY_PHONE', 'Company Phone'))
        pdf.text(20, y_pos + 15, os.environ.get('COMPANY_EMAIL', 'Company Email'))

        y_pos += 30

        log("Adding invoice details to PDF")
        # Invoice Details - Fixed to use cell() instead of text() with align
        invoice_number = sale.get('invoiceNumber', 'N/A')
        try:
            date_str = datetime.fromisoformat(sale.get('date', datetime.now().isoformat()).replace('Z', '+00:00')).strftime('%Y-%m-%d')
        except:
            date_str = datetime.now().strftime('%Y-%m-%d')

        pdf.set_font('Arial', '', 12)
        # Use right-aligned cells instead of aligned text
        invoice_text = f"Invoice Number: {invoice_number}"
        text_width = pdf.get_string_width(invoice_text)
        pdf.text(page_width - 20 - text_width, y_pos, invoice_text)

        date_text = f"Date: {date_str}"
        text_width = pdf.get_string_width(date_text)
        pdf.text(page_width - 20 - text_width, y_pos + 7, date_text)

        y_pos += 20

        log("Adding customer info to PDF")
        # Customer Info
        pdf.set_fill_color(241, 245, 249)
        pdf.rect(20, y_pos, page_width - 40, 25, 'F')

        pdf.set_font('Arial', '', 10)
        pdf.text(25, y_pos + 7, 'Bill To:')
        pdf.set_font('Arial', 'B', 12)
        customer_name = sale.get('customer', {}).get('name', 'Customer')
        pdf.text(25, y_pos + 15, customer_name)
        pdf.set_font('Arial', '', 10)
        customer_email = sale.get('customer', {}).get('email', '')
        pdf.text(25, y_pos + 22, customer_email if customer_email else '')

        y_pos += 35

        log("Creating products table")
        # Products Table
        items = sale.get('items', [])
        log(f"Processing {len(items)} items for table")

        # Table headers
        col_widths = [80, 25, 35, 35]
        headers = ['Product', 'Quantity', 'Price', 'Total']

        # If no items, add warning
        if not items:
            pdf.set_text_color(255, 0, 0)
            pdf.text(20, y_pos, "Warning: No items found for this sale")
            pdf.set_text_color(0, 0, 0)
            y_pos += 15

        # Table header
        pdf.set_fill_color(44, 62, 80)
        pdf.set_text_color(255, 255, 255)
        pdf.set_font('Arial', 'B', 10)

        x_pos = 20
        for i, header in enumerate(headers):
            pdf.rect(x_pos, y_pos, col_widths[i], 10, 'F')
            pdf.text(x_pos + 2, y_pos + 7, header)
            x_pos += col_widths[i]

        y_pos += 10
        pdf.set_text_color(0, 0, 0)
        pdf.set_font('Arial', '', 10)

        # Table rows
        for item in items:
            name = item.get('product', {}).get('name', 'Unknown Product')
            quantity = item.get('quantity', 1)
            price = item.get('priceAtSale') or item.get('product', {}).get('price', 0)
            total = quantity * price

            log(f"Table row: {name}, Qty: {quantity}, Price: {price}, Total: {total}")

            # Truncate name if too long
            if len(name) > 35:
                name = name[:32] + "..."

            x_pos = 20
            pdf.rect(x_pos, y_pos, col_widths[0], 10)
            pdf.text(x_pos + 2, y_pos + 7, name)
            x_pos += col_widths[0]

            pdf.rect(x_pos, y_pos, col_widths[1], 10)
            pdf.text(x_pos + 2, y_pos + 7, str(quantity))
            x_pos += col_widths[1]

            pdf.rect(x_pos, y_pos, col_widths[2], 10)
            pdf.text(x_pos + 2, y_pos + 7, f"${price:.2f}")
            x_pos += col_widths[2]

            pdf.rect(x_pos, y_pos, col_widths[3], 10)
            pdf.text(x_pos + 2, y_pos + 7, f"${total:.2f}")

            y_pos += 10

            # Check if we need a new page
            if y_pos > 260:
                pdf.add_page()
                y_pos = 20

        log("Table created successfully")
        y_pos += 10

        log("Adding summary section")
        # Summary
        subtotal = sale.get('subtotal', sale.get('totalAmount', 0) / 1.1)
        tax = sale.get('tax', sale.get('totalAmount', 0) - subtotal)
        total = sale.get('totalAmount', subtotal + tax)

        pdf.set_font('Arial', '', 10)
        # Right align summary values
        pdf.text(page_width - 80, y_pos, 'Subtotal:')
        subtotal_text = f"${subtotal:.2f}"
        text_width = pdf.get_string_width(subtotal_text)
        pdf.text(page_width - 20 - text_width, y_pos, subtotal_text)

        pdf.text(page_width - 80, y_pos + 7, 'Tax (10%):')
        tax_text = f"${tax:.2f}"
        text_width = pdf.get_string_width(tax_text)
        pdf.text(page_width - 20 - text_width, y_pos + 7, tax_text)

        pdf.set_font('Arial', 'B', 12)
        pdf.text(page_width - 80, y_pos + 15, 'Total:')
        total_text = f"${total:.2f}"
        text_width = pdf.get_string_width(total_text)
        pdf.text(page_width - 20 - text_width, y_pos + 15, total_text)

        log("Adding payment info")
        # Payment Info
        y_pos += 30
        pdf.set_font('Arial', '', 10)
        payment_status = sale.get('paymentStatus', 'UNKNOWN').upper()
        payment_method = sale.get('paymentMethod', 'Cash').upper()

        pdf.text(20, y_pos, f"Payment Status: {payment_status}")
        pdf.text(20, y_pos + 7, f"Payment Method: {payment_method}")

        log("Adding footer")
        # Footer - Use cell for center alignment instead of text with align
        footer_text = 'Thank you for your business!'
        text_width = pdf.get_string_width(footer_text)
        pdf.text((page_width - text_width) / 2, pdf.h - 20, footer_text)

        log("PDF generation complete, returning bytes")
        return pdf.output(dest='S').encode('latin1')

    except Exception as e:
        log(f"Error in PDF generation: {str(e)}")
        import traceback
        log(f"PDF generation error stack: {traceback.format_exc()}")
        raise
