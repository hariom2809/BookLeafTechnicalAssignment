import AuthLayout from "../../../components/layout/AuthLayout"
import LoginForm from "../components/LoginForm"
import { Link } from "react-router-dom"

export default function LoginPage () {

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Log in"
    >
      <LoginForm />
    </AuthLayout>
  )
}