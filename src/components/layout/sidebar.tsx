import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Home,
  FileText,
  Users,
  Settings,
  Package,
  BarChart,
  CreditCard,
  PieChart,
  Calendar,
  MessageSquare,
  HelpCircle,
  Bell,
  Briefcase,
  Building2,
  DollarSign,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const menuItems = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/dashboard",
    submenu: ["Overview", "Analytics", "Reports"],
  },
  {
    icon: FileText,
    label: "Invoices",
    path: "/invoices",
    submenu: ["Create New", "All Invoices", "Drafts", "Templates"],
  },
  {
    icon: Users,
    label: "Profile",
    path: "/profile",
    submenu: ["Settings", "Security", "Preferences"],
  },
  // {
  //   icon: Package,
  //   label: "Products",
  //   submenu: ["Inventory", "Categories", "Stock Management"],
  // },
  // {
  //   icon: CreditCard,
  //   label: "Payments",
  //   submenu: ["Transactions", "Payment Methods", "Refunds"],
  // },
  // {
  //   icon: PieChart,
  //   label: "Reports",
  //   submenu: ["Financial", "Sales", "Inventory", "Custom"],
  // },
  // {
  //   icon: Calendar,
  //   label: "Calendar",
  //   submenu: ["Schedule", "Events", "Reminders"],
  // },
  // {
  //   icon: MessageSquare,
  //   label: "Messages",
  //   submenu: ["Inbox", "Sent", "Drafts"],
  // },
  // {
  //   icon: Building2,
  //   label: "Company",
  //   submenu: ["Profile", "Branches", "Departments"],
  // },
  // {
  //   icon: DollarSign,
  //   label: "Finance",
  //   submenu: ["Accounts", "Expenses", "Budget"],
  // },
  // {
  //   icon: Settings,
  //   label: "Settings",
  //   submenu: ["General", "Security", "Notifications"],
  // },
  // {
  //   icon: HelpCircle,
  //   label: "Help & Support",
  //   submenu: ["Documentation", "FAQs", "Contact Support"],
  // },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-3 left-3 z-50"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0"></SheetContent>
      </Sheet>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex h-screen flex-col fixed left-0 top-0 border-r bg-background z-30 transition-all duration-300",
          isCollapsed ? "w-16" : "w-72"
        )}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className={cn("text-xl font-bold", isCollapsed && "hidden")}>
            ERP System
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-6 w-6" />
            ) : (
              <ChevronLeft className="h-6 w-6" />
            )}
          </Button>
        </div>
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.label}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-base hover:bg-accent/50",
                  !isCollapsed && "px-4 py-3"
                )}
                onClick={() => {
                  navigate(item.path);
                  setActiveMenu(activeMenu === item.label ? null : item.label);
                }}
              >
                <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
              {!isCollapsed && activeMenu === item.label && (
                <div className="ml-6 space-y-1 mt-1">
                  {item.submenu.map((subItem) => (
                    <Button
                      key={subItem}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm text-muted-foreground hover:text-primary"
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
