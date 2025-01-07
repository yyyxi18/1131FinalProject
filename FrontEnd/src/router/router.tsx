import { createBrowserRouter } from 'react-router-dom';
import EnterPage from "../view/EnterPage";
import Mainpage from "../view/Mainpage";
import App from '../view/App';

const router = createBrowserRouter([
  {
    path: "/0",
    element: <EnterPage />,
  },
  {
    path: "/1",
    element: <Mainpage />,
  },
  {
    path: "*",
    element: <App />,
  },
]);

export default router;