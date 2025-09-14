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

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />,
  );
}
