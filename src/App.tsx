import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import UserManagement from "./pages/user-management";
import MainLayout from "./layout/main";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/user-management",
          element: <UserManagement />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
