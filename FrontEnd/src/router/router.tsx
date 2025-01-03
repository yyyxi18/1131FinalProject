import { createHashRouter } from "react-router";

import EnterPage from "../view/EnterPage";
import Mainpage from "../view/Mainpage";
import App from '../view/App';


export const router = createHashRouter([
    {
        path: "/0",
        element: <EnterPage />,
    },

    {
        path: "/1",
        element: <Mainpage />,
    },

    {
        path: "/",
        element: <App />,
    },
])