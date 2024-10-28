import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <main className="md:ml-72 p-6 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
