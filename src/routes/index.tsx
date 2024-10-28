import { createBrowserRouter } from "react-router-dom";

import { InvoiceForm } from "../components/invoices/invoice-form";
import { Profile } from "../pages/profile";
import { Layout } from "../components/layout";
import { Dashboard } from "../pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "invoices",
        element: <InvoiceForm />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
