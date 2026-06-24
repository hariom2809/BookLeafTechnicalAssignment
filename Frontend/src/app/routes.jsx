import { createBrowserRouter, Navigate } from "react-router-dom"

import LoginPage from "../features/auth/pages/LoginPage"
import DashboardLayout from "../components/layout/DashboardLayout"
import MyBooksPage from "../features/dashboard/pages/MyBooksPage"
import MyTicketsPage from "../features/dashboard/pages/MyTicketsPage"
import SubmitQueryPage from "../features/dashboard/pages/SubmitQueryPage"

export const router = createBrowserRouter([

  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="my-books" replace /> },
      { path: "my-books", element: <MyBooksPage /> },
      { path: "my-tickets", element: <MyTicketsPage /> },
      { path: "submit-query", element: <SubmitQueryPage /> },
    ],
  },
])