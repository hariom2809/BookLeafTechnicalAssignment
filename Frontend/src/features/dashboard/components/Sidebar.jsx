import { useNavigate } from "react-router-dom"
import { useAuth } from "../../auth/hooks/useAuth"

import SidebarHeader from "./SidebarHeader"
import SidebarProfile from "./SidebarProfile"
import SidebarNav from "./SidebarNav"
import SidebarFooter from "./SidebarFooter"

import { navItems } from "../constants/navItems"

export default function Sidebar({
  onClose,
  onNavigate,
}) {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const handleSubmitQuery = () => {
    navigate("/dashboard/submit-query")
    onNavigate?.()
  }

  return (
    <aside className="h-full w-64 flex flex-col bg-[#1F2937] border-r border-[#374151]">
      <SidebarHeader onClose={onClose} />

      <SidebarProfile currentUser={currentUser} />

      <SidebarNav
        navItems={navItems}
        onNavigate={onNavigate}
      />

      <SidebarFooter
        onSubmitQuery={handleSubmitQuery}
        onLogout={handleLogout}
      />
    </aside>
  )
}