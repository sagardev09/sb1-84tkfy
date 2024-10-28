import React from 'react';
import { Sidebar } from './components/layout/sidebar';
import { Navbar } from './components/layout/navbar';
import { InvoiceForm } from './components/invoices/invoice-form';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Navbar />
      <main className="md:pl-64 pt-16">
        <div className="container mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Create Invoice</h1>
            <p className="text-muted-foreground">Generate a new invoice based on business type</p>
          </div>
          <div className="bg-white rounded-lg shadow">
            <InvoiceForm />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;