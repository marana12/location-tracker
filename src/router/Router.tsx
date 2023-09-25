import { Navigate, createBrowserRouter } from "react-router-dom";
import RedirectPage from "../components/RedirectPage";
import Home from "../components/Home";
import ShortUrl from "../components/ShortUrl/ShortUrl";
import Admin from "../components/Admin";
import LinkForm from "../components/ShortUrl/LinkForm";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/:hashUrl", element: <RedirectPage /> },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "short-url/:hashUrl", element: <ShortUrl /> },
      { path: "short-url/", element: <LinkForm /> },
    ],
  },
  { path: "/404", element: <NotFound /> },
  { path: "*", element: <Navigate to={"/404"} /> },
]);

export default router;
