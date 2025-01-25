import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page";

const router = createBrowserRouter([
  {
    path: "/:pageId?/:mId?",
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>,
  },
]);

export default router;
