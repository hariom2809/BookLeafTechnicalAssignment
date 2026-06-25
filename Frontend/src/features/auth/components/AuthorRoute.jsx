import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../auth/hooks/useAuth"

export default function AuthorRoute({ children }) {
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111827]">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#3B82F6] border-t-transparent" />
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  const isAdmin = currentUser.role === "admin" || currentUser.is_staff

  if (isAdmin) {
    return <Navigate to="/admin/tickets" replace />
  }

  return children
}
