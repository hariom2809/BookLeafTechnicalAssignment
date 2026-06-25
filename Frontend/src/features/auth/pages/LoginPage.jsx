import { Navigate } from "react-router-dom"
import AuthLayout from "../../../components/layout/AuthLayout"
import LoginForm from "../components/LoginForm"
import { useAuth } from "../hooks/useAuth"

export default function LoginPage () {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111827]">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#3B82F6] border-t-transparent" />
      </div>
    )
  }

  const isAdmin = currentUser?.role === "admin" || currentUser?.is_staff

  if (isAdmin) {
    return <Navigate to="/admin/tickets" replace />
  }

  if (currentUser) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Log in"
    >
      <LoginForm />
    </AuthLayout>
  )
}