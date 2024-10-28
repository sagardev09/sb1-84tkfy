import { Bell, Search, User } from "lucide-react";
import { Button } from "../ui/button";

export function Navbar() {
  return (
    <header className="border-b bg-background fixed top-0 right-0 left-0 z-20 md:left-64">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full bg-white shadow-none appearance-none pl-8 h-9 rounded-md border border-input"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
