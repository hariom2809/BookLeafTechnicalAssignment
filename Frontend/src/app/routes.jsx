import { createBrowserRouter, Navigate } from "react-router-dom"

import LoginPage from "../features/auth/pages/LoginPage"
import AuthorRoute from "../features/auth/components/AuthorRoute"
import DashboardLayout from "../features/dashboard/components/DashboardLayout"
import MyBooksPage from "../features/dashboard/pages/MyBooksPage"
import BookDetailPage from "../features/dashboard/pages/BookDetailPage"
import MyTicketsPage from "../features/dashboard/pages/MyTicketsPage"
import TicketDetailPage from "../features/dashboard/pages/TicketDetailPage"
import SubmitQueryPage from "../features/dashboard/pages/SubmitQueryPage"
import AdminLayout from "../features/admin/components/AdminLayout"
import AdminRoute from "../features/admin/components/AdminRoute"
import AdminTicketsPage from "../features/admin/pages/AdminTicketsPage"

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
    element: (
      <AuthorRoute>
        <DashboardLayout />
      </AuthorRoute>
    ),
    children: [
      { index: true, element: <Navigate to="my-books" replace /> },
      { path: "my-books", element: <MyBooksPage /> },
      { path: "my-books/:bookId", element: <BookDetailPage /> },
      { path: "my-tickets", element: <MyTicketsPage /> },
      { path: "my-tickets/:ticketId", element: <TicketDetailPage /> },
      { path: "submit-query", element: <SubmitQueryPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <Navigate to="tickets" replace /> },
      { path: "tickets", element: <AdminTicketsPage /> },
    ],
  },
])