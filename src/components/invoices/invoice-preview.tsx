import React, { useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { ModernInvoice } from "./invoice-styles/modern";
// import { ProfessionalInvoice } from './invoice-styles/professional';
// import { ClassicInvoice } from './invoice-styles/classic';
// import { CreativeInvoice } from './invoice-styles/creative';

interface InvoicePreviewProps {
  data: any;
  style: string;
  businessType: string;
}

export function InvoicePreview({
  data,
  style,
  businessType,
}: InvoicePreviewProps) {
  const InvoiceComponent =
    {
      modern: ModernInvoice,
      // professional: ProfessionalInvoice,
      // classic: ClassicInvoice,
      // creative: CreativeInvoice,
    }[style] || ModernInvoice;

  return (
    <div className="w-full h-[600px] bg-white">
      <PDFViewer width="100%" height="100%">
        <InvoiceComponent data={data} businessType={businessType} />
      </PDFViewer>
    </div>
  );
}
