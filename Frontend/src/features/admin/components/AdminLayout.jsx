import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../auth/hooks/useAuth"
import Button from "../../../components/ui/Button"

export default function AdminLayout() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-[#111827]">
      <header className="border-b border-[#374151] bg-[#1F2937]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#6B7280]">BookLeafPub Support</p>
            <h1 className="text-lg font-semibold text-[#F9FAFB]">Admin Ticket Management</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[#9CA3AF] sm:inline">
              {currentUser?.email}
            </span>
            <Button
              type="button"
              onClick={handleLogout}
              className="!py-2 !px-3 !text-sm !bg-[#374151] hover:!bg-[#4B5563]"
            >
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  )
}
