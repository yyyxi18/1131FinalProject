import { createBrowserRouter } from 'react-router-dom';
import EnterPage from "../view/EnterPage";
import Mainpage from "../view/Mainpage";
import ActivityPage from "../view/ActivityPage";
import MapPage from "../view/MapPage";
import LoginMainPage from "../view/LoginMainPages";
import OnlineService from "../view/OnlineService";
import Edit from "../view/Edit";
import SignupPage from "../view/SignupPage";
import F12userPage from '../view/F12usePage'
import Inquiry from '../view/InquiryPage';


const router = createBrowserRouter([
  { path: "/", element: <EnterPage /> }, // 初始頁面
  { path: "/main", element: <Mainpage /> }, // 主頁面
  { path: "/activity", element: <ActivityPage /> },
  { path: "/map", element: <MapPage /> },
  { path: "/login", element: <LoginMainPage /> },
  { path: "/onlineService", element: <OnlineService /> },
  { path: "/edit", element: <Edit /> },
  { path: "/signup", element: <SignupPage /> },
 { path: "/user", element: <F12userPage /> },
  { path: "/inquiry", element: <Inquiry /> },
]);

export default router;
