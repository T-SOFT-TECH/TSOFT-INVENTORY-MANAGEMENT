
declare module 'html2pdf.js' {
  function html2pdf(): html2pdf.Html2PdfWrapper;

  namespace html2pdf {
    interface Html2PdfWrapper {
      from(element: HTMLElement | string): Html2PdfWrapper;
      set(options: any): Html2PdfWrapper;
      save(): Promise<void>;
      outputPdf(type: 'blob'): Promise<Blob>;
      outputPdf(type: 'datauristring'): Promise<string>;
      outputPdf(type: string): Promise<any>;
    }
  }

  export = html2pdf;
}
