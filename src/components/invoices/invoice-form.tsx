import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { InvoicePreview } from './invoice-preview';

const businessTypes = [
  { id: 'retail', name: 'Retail', fields: ['itemName', 'quantity', 'unitPrice'] },
  { id: 'service', name: 'Service', fields: ['serviceName', 'hours', 'ratePerHour'] },
  { id: 'consulting', name: 'Consulting', fields: ['projectName', 'consultingHours', 'ratePerHour'] },
];

const invoiceStyles = [
  { id: 'modern', name: 'Modern Minimal' },
  { id: 'professional', name: 'Professional' },
  { id: 'classic', name: 'Classic' },
  { id: 'creative', name: 'Creative' },
];

export function InvoiceForm() {
  const [businessType, setBusinessType] = React.useState('retail');
  const [invoiceStyle, setInvoiceStyle] = React.useState('modern');
  const [items, setItems] = React.useState([{ id: 1 }]);
  const [formData, setFormData] = React.useState({
    invoiceNumber: '',
    date: '',
    customerName: '',
    email: '',
    address: '',
    items: [],
  });

  const addItem = () => {
    setItems([...items, { id: items.length + 1 }]);
  };

  const selectedType = businessTypes.find(type => type.id === businessType);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Invoice Style</Label>
          <Select value={invoiceStyle} onValueChange={setInvoiceStyle}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {invoiceStyles.map((style) => (
                <SelectItem key={style.id} value={style.id}>
                  {style.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Business Type</Label>
          <Select value={businessType} onValueChange={setBusinessType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Invoice Number</Label>
            <Input 
              name="invoiceNumber"
              placeholder="INV-001" 
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input 
              type="date" 
              name="date"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Customer Information</Label>
          <Input 
            placeholder="Customer Name" 
            name="customerName"
            onChange={handleInputChange}
          />
          <Input 
            placeholder="Email" 
            name="email"
            type="email"
            onChange={handleInputChange}
          />
          <Input 
            placeholder="Address" 
            name="address"
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Items</Label>
            <Button onClick={addItem} variant="outline" size="sm">
              Add Item
            </Button>
          </div>

          {items.map((item) => (
            <div key={item.id} className="space-y-4 p-4 border rounded-lg">
              {selectedType?.fields.map((field) => (
                <div key={field} className="space-y-2">
                  <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                  <Input 
                    name={`${field}_${item.id}`}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Invoice</Button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="lg:border-l lg:pl-6">
        <div className="sticky top-24">
          <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <InvoicePreview 
              data={formData}
              style={invoiceStyle}
              businessType={businessType}
            />
          </div>
          <Button className="w-full">
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}