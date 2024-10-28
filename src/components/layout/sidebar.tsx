import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Menu, Home, FileText, Users, Settings, Package, BarChart,
  CreditCard, PieChart, Calendar, MessageSquare, HelpCircle,
  Bell, Briefcase, Building2, DollarSign
} from 'lucide-react';

const menuItems = [
  { 
    icon: Home, 
    label: 'Dashboard',
    submenu: ['Overview', 'Analytics', 'Reports']
  },
  { 
    icon: FileText, 
    label: 'Invoices',
    submenu: ['Create New', 'All Invoices', 'Drafts', 'Templates']
  },
  { 
    icon: Users, 
    label: 'Customers',
    submenu: ['All Customers', 'Add Customer', 'Groups']
  },
  { 
    icon: Package, 
    label: 'Products',
    submenu: ['Inventory', 'Categories', 'Stock Management']
  },
  { 
    icon: CreditCard, 
    label: 'Payments',
    submenu: ['Transactions', 'Payment Methods', 'Refunds']
  },
  { 
    icon: PieChart, 
    label: 'Reports',
    submenu: ['Financial', 'Sales', 'Inventory', 'Custom']
  },
  { 
    icon: Calendar, 
    label: 'Calendar',
    submenu: ['Schedule', 'Events', 'Reminders']
  },
  { 
    icon: MessageSquare, 
    label: 'Messages',
    submenu: ['Inbox', 'Sent', 'Drafts']
  },
  { 
    icon: Building2, 
    label: 'Company',
    submenu: ['Profile', 'Branches', 'Departments']
  },
  { 
    icon: DollarSign, 
    label: 'Finance',
    submenu: ['Accounts', 'Expenses', 'Budget']
  },
  { 
    icon: Settings, 
    label: 'Settings',
    submenu: ['General', 'Security', 'Notifications']
  },
  { 
    icon: HelpCircle, 
    label: 'Help & Support',
    submenu: ['Documentation', 'FAQs', 'Contact Support']
  }
];

export function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-3 left-3 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">ERP System</h2>
          </div>
          <nav className="space-y-1 p-2">
            {menuItems.map((item) => (
              <div key={item.label}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                </Button>
                {activeMenu === item.label && (
                  <div className="ml-6 space-y-1 mt-1">
                    {item.submenu.map((subItem) => (
                      <Button
                        key={subItem}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-sm text-muted-foreground"
                      >
                        {subItem}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 border-r bg-background overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">ERP System</h2>
        </div>
        <nav className="flex-1 p-2">
          {menuItems.map((item) => (
            <div key={item.label}>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
              {activeMenu === item.label && (
                <div className="ml-6 space-y-1 mt-1">
                  {item.submenu.map((subItem) => (
                    <Button
                      key={subItem}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm text-muted-foreground"
                    >
                      {subItem}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}