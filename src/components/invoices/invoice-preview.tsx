<<<<<<< HEAD
import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { ModernInvoice } from './invoice-styles/modern';
import { ProfessionalInvoice } from './invoice-styles/professional';
import { ClassicInvoice } from './invoice-styles/classic';
import { CreativeInvoice } from './invoice-styles/creative';
=======
import React, { useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { ModernInvoice } from "./invoice-styles/modern";
// import { ProfessionalInvoice } from './invoice-styles/professional';
// import { ClassicInvoice } from './invoice-styles/classic';
// import { CreativeInvoice } from './invoice-styles/creative';
>>>>>>> d0f1276b630fdf02751cec37bd7865b1b61f1225

interface InvoicePreviewProps {
  data: any;
  style: string;
  businessType: string;
}

<<<<<<< HEAD
export function InvoicePreview({ data, style, businessType }: InvoicePreviewProps) {
  const InvoiceComponent = {
    modern: ModernInvoice,
    professional: ProfessionalInvoice,
    classic: ClassicInvoice,
    creative: CreativeInvoice,
  }[style] || ModernInvoice;
=======
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
>>>>>>> d0f1276b630fdf02751cec37bd7865b1b61f1225

  return (
    <div className="w-full h-[600px] bg-white">
      <PDFViewer width="100%" height="100%">
        <InvoiceComponent data={data} businessType={businessType} />
      </PDFViewer>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> d0f1276b630fdf02751cec37bd7865b1b61f1225
