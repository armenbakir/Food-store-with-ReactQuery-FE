import App from "@App";
import { CustomersPage, FoodsPage, NotFoundPage, OrdersPage } from "@pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/foods", element: <FoodsPage /> },
      { path: "/customers", element: <CustomersPage /> },
      { path: "/orders", element: <OrdersPage /> },
    ],
  },
]);

export default router;
