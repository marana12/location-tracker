import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import ShortUrl from "../components/ShortUrl/ShortUrl";
import Admin from "../components/Admin";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/:hashUrl", element: <Home /> },
  {
    path: "/admin",
    element: <Admin />,
    children: [{ path: "/admin/short-url/:hashUrl?", element: <ShortUrl /> }],
  },
]);

export default router;