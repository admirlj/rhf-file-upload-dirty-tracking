import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Homepage from "./components/homepage";
import { createRoot } from "react-dom/client";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Homepage,
    errorElement: <p>Something went wrong</p>
  },
]);

const reactRoot = createRoot(document.getElementById('root')!);

reactRoot.render(
  <RouterProvider router={router} />
)