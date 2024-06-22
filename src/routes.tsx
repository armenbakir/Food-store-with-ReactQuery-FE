import App from "@App";
import {
  CustomersPage,
  FoodFormPage,
  FoodsPage,
  LoginPage,
  NotFoundPage,
  OrdersPage,
  RegisterPage,
} from "@pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/foods", element: <FoodsPage /> },
      { path: "/foods/:id", element: <FoodFormPage /> },
      { path: "/customers", element: <CustomersPage /> },
      { path: "/orders", element: <OrdersPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
]);

export default router;
