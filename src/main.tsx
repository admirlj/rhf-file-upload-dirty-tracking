import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Homepage from "./components/homepage";
import ReactDOM from "react-dom/client";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Homepage,
    errorElement: <p>Something went wrong</p>
  },
]);

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);
