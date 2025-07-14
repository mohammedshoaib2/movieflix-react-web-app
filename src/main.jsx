import ReactDom from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<App />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
    </Route>
  )
);

ReactDom.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
