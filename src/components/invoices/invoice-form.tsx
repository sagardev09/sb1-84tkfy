import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { InvoicePreview } from "./invoice-preview";
import { useCallback } from "react";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { ModernInvoice } from "./invoice-styles/modern";

const businessTypes = [
  {
    id: "retail",
    name: "Retail",
    fields: ["itemName", "quantity", "unitPrice"],
  },
  {
    id: "service",
    name: "Service",
    fields: ["serviceName", "hours", "ratePerHour"],
  },
  {
    id: "consulting",
    name: "Consulting",
    fields: ["projectName", "consultingHours", "ratePerHour"],
  },
];

const invoiceStyles = [
  { id: "modern", name: "Modern Minimal", primaryColor: "#0f172a" },
  { id: "professional", name: "Professional", primaryColor: "#2563eb" },
  { id: "classic", name: "Classic", primaryColor: "#334155" },
  { id: "creative", name: "Creative", primaryColor: "#ec4899" },
  { id: "bold", name: "Bold & Dynamic", primaryColor: "#7c3aed" },
];

interface InvoiceItem {
  id: number;
  [key: string]: any;
}

export function InvoiceForm() {
  const [businessType, setBusinessType] = React.useState("retail");
  const [invoiceStyle, setInvoiceStyle] = React.useState("modern");
  const [logo, setLogo] = React.useState<string | null>(null);
  const [companyInfo, setCompanyInfo] = React.useState({
    name: "",
    website: "",
    phone: "",
    taxId: "",
  });
  const [items, setItems] = React.useState<InvoiceItem[]>([{ id: 1 }]);
  const [formData, setFormData] = React.useState({
    invoiceNumber: "",
    date: "",
    customerName: "",
    email: "",
    address: "",
    items: [],
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    setItems([...items, { id: items.length + 1 }]);
  };

  const downloadInvoice = useCallback(async () => {
    const InvoiceComponent =
      {
        modern: ModernInvoice,
        // professional: ProfessionalInvoice,
        // classic: ClassicInvoice,
        // creative: CreativeInvoice,
      }[invoiceStyle] || ModernInvoice;

    const blob = await pdf(
      <InvoiceComponent
        data={{ ...formData, logo, companyInfo }}
        businessType={businessType}
      />
    ).toBlob();
    saveAs(blob, `invoice-${formData.invoiceNumber}.pdf`);
  }, [formData, invoiceStyle, businessType, logo, companyInfo]);

  const selectedType = businessTypes.find((type) => type.id === businessType);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update handleInputChange to handle items properly
  const handleItemChange = (itemId: number, field: string, value: string) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(updatedItems);
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const removeItem = (itemId: number) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    setFormData((prev) => ({ ...prev, items: updatedItems }));
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
            <Label>Company Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
            />
            {logo && (
              <img
                src={logo}
                alt="Company logo"
                className="h-20 object-contain rounded-lg border p-2"
              />
            )}
          </div>
          <div className="space-y-2">
            <Label>Company Information</Label>
            <Input
              placeholder="Company Name"
              name="companyName"
              value={companyInfo.name}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, name: e.target.value })
              }
            />
            <Input
              placeholder="Website"
              name="website"
              value={companyInfo.website}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, website: e.target.value })
              }
            />
            <Input
              placeholder="Phone"
              name="phone"
              value={companyInfo.phone}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, phone: e.target.value })
              }
            />
            <Input
              placeholder="Tax ID / VAT Number"
              name="taxId"
              value={companyInfo.taxId}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, taxId: e.target.value })
              }
            />
          </div>
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
            <Input type="date" name="date" onChange={handleInputChange} />
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
            <div
              key={item.id}
              className="space-y-4 p-6 border rounded-lg bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">Item #{item.id}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {selectedType?.fields.map((field) => (
                  <div key={field} className="space-y-2">
                    <Label className="text-sm font-medium">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </Label>
                    <Input
                      value={item[field] || ""}
                      onChange={(e) =>
                        handleItemChange(item.id, field, e.target.value)
                      }
                      className="border-gray-300 focus:border-sky-500"
                    />
                  </div>
                ))}
              </div>
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
              data={{ ...formData, logo, companyInfo }}
              style={invoiceStyle}
              businessType={businessType}
            />
          </div>
          <Button className="w-full" onClick={downloadInvoice}>
            Download Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}
