import { createHashRouter } from "react-router-dom";

//Window imports
import Admin from "./windows/admin";
import Client from "./windows/client";

//Webpage Imports
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Team from "./pages/Team/Team";
import Articles from "./pages/Articles/Articles";
import ShowArticle from "./pages/Articles/ShowArticle/ShowArticle";
import Reports from "./pages/Reports/Reports";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Sponsors from "./pages/Sponsors/Sponsors";
import PageNotFound from "./pages/Errors/404/PageNotFound";

//Uploads
import Upload from "./pages/Upload/Upload";
import UploadArticle from "./pages/Upload/UploadArticle/UploadArticle";
import ViewArticles from "./pages/Upload/ViewArticles/ViewArticles";

const router = createHashRouter([
  {
    path: "/",
    element: <Client />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/articles",
        element: <Articles />,
        children: [
          {
            path: "/articles/:article",
            element: <ShowArticle />,
          },
        ],
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/sponsors",
        element: <Sponsors />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/portal",
    element: <Admin />,
    children: [
      {
        path: "/portal/upload",
        element: <Upload />,
        children: [
          {
            path: "/portal/upload/article",
            element: <UploadArticle />,
          },
          {
            path: "/portal/upload/articles",
            element: <ViewArticles />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
