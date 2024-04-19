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
import IEA from "./pages/Sponsors/IEA";
import PageNotFound from "./pages/Errors/404/PageNotFound";
import ShowProfile from "./pages/Profile/ShowProfile";
import MediaAppearances from "./pages/MediaAppearances/MediaAppearances";
import PressRelease from "./pages/PressRelease/PressRelease";

//Uploads
import Upload from "./pages/Upload/Upload";
import UploadArticle from "./pages/Upload/UploadArticle/UploadArticle";
import ViewArticles from "./pages/Upload/ViewArticles/ViewArticles";
import Edit from "./pages/Edit/Edit";
import EditArticle from "./pages/Edit/EditArticle/EditArticle";
import ViewUser from "./pages/Upload/ViewUsers/ViewUser";
import ViewEmails from "./pages/Upload/ViewEmails/ViewEmails";
import ViewAuthors from "./pages/Upload/ViewAuthors/ViewAuthors";
import CreateMember from "./pages/Upload/CreateMember/CreateMember";

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
        path: "/about-us",
        children: [
          {
            path: "/about-us/platform",
            element: <AboutUs />,
          },
          {
            path: "/about-us/team",
            element: <Team />,
          },
        ],
      },
      {
        path: "/media",
        children: [
          {
            path: "/media/appearances",
            element: <MediaAppearances />,
          },
          {
            path: "/media/press-releases",
            element: <PressRelease />,
          },
        ],
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
        children: [
          {
            path: "/sponsors/iea",
            element: <IEA />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profiles/:profile",
        element: <ShowProfile />,
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
          {
            path: "/portal/upload/users",
            element: <ViewUser />,
          },
          {
            path: "/portal/upload/emails",
            element: <ViewEmails />,
          },
          {
            path: "/portal/upload/author",
            element: <CreateMember />,
          },
          {
            path: "/portal/upload/authors",
            element: <ViewAuthors />,
          },
        ],
      },
      {
        path: "/portal/edit",
        element: <Edit />,
        children: [
          {
            path: "/portal/edit/article/:article",
            element: <EditArticle />,
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
