import App from "@App";
import { CustomersPage, NotFoundPage, OrdersPage } from "@pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <NotFoundPage /> },
  { path: "/customers", element: <CustomersPage /> },
  { path: "/orders", element: <OrdersPage /> },
]);

export default router;
