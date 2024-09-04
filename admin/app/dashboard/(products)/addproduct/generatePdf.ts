import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import { ProductVariant } from '@/store/productStore';

export const generatePdf = (product: {
  name: string;
  category?: string;
  price: number;
  stock?: number;
  description?: string;
  mainImage?: string;
  subImages?: string[];
  variants?: ProductVariant[];
  barcode?: string;
  color?: string;
  size?: string;
  packedDate?: string;
}) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [2, 1.2],  // Size adjusted for better layout and visibility
  });

  const margin = 0.1; // Margin for the content
  const lineHeight = 0.2;
  const barcodeCanvas = document.createElement('canvas');
  JsBarcode(barcodeCanvas, product.barcode || '305000002020136', { format: 'CODE128' });
  const barcodeDataUrl = barcodeCanvas.toDataURL('image/png');

  doc.setTextColor(128, 128, 128); // Set text color to grey

  // Product Name
  doc.setFontSize(4.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`${product.name}`, margin, lineHeight);

  // Product Price
  doc.setFontSize(6);
  doc.text(`MRP: ${product.price}`, margin, margin + 1.5 * lineHeight);

  // Category and Product ID
  doc.setFontSize(5);
  doc.setFont('helvetica', 'normal');
  let categoryText = `Category: ${product.category || 'N/A'}`;
  let productIdText = `Product ID: ${product.barcode || 'N/A'}`;

  let categoryTextWidth = doc.getTextWidth(categoryText);
  doc.text(categoryText, margin, margin + 2.0 * lineHeight);
  doc.text(productIdText, margin + categoryTextWidth + 0.1, margin + 2.5 * lineHeight); // Adjusted for proper alignment

  // Barcode image
  doc.addImage(barcodeDataUrl, 'PNG', margin, margin + 2.5 * lineHeight, 1.6, 0.3);

  // Adding current date
  const currentDate = new Date().toLocaleDateString(); // Gets the current date in local date format
  doc.setFontSize(4);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${currentDate}`, margin, margin + 4.5 * lineHeight); // Positioned right below the barcode

  // Save the PDF with the product name as the filename
  doc.save(`${product.name}_MRP_Tag.pdf`);
};
