import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../hooks/useAuth"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"

const LoginForm = () => {
  
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const { login } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      await login(email, password)
      navigate("/")
    } catch (error) {
      setError("Login Failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input 
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <Input 
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <Button 
          type="submit"
          disabled={loading}
          className='w-full mt-5'
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  )
}

export default LoginForm