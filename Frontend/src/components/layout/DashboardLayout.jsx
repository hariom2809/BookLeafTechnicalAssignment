import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../features/auth/hooks/useAuth"

const Icons = {
  Books: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Ticket: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  ),
  Plus: () => (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Logout: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Menu: () => (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Chevron: () => (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Leaf: () => (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-5 8z"/>
    </svg>
  ),
}

const navItems = [
  {
    to: "/dashboard/my-books",
    label: "My Books",
    Icon: Icons.Books,
    description: "Your published titles",
  },
  {
    to: "/dashboard/my-tickets",
    label: "My Tickets",
    Icon: Icons.Ticket,
    description: "Support requests & queries",
  },
]

function Sidebar({ onClose, onNavigate }) {
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
      {}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#374151]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white">
            <Icons.Leaf />
          </div>
          <span className="text-white font-bold tracking-tight text-base">
            BookLeaf
          </span>
        </div>
        {}
        {onClose && (
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-white transition-colors lg:hidden"
          >
            <Icons.Close />
          </button>
        )}
      </div>

      { }
      <div className="px-5 py-4 border-b border-[#374151]">
        <p className="text-xs text-[#6B7280] uppercase tracking-widest mb-1.5">
          Author Portal
        </p>
        <p className="text-sm font-semibold text-[#F9FAFB] truncate">
          {currentUser?.first_name
            ? `${currentUser.first_name} ${currentUser.last_name ?? ""}`.trim()
            : "Author"}
        </p>
        <p className="text-xs text-[#9CA3AF] truncate mt-0.5">
          {currentUser?.email ?? ""}
        </p>
        {currentUser?.author_id && (
          <span className="inline-block mt-2 text-[10px] font-mono bg-[#374151] text-[#9CA3AF] px-2 py-0.5 rounded">
            {currentUser.author_id}
          </span>
        )}
      </div>

      {}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, Icon, description }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-[#3B82F6]/20 text-[#3B82F6]"
                  : "text-[#9CA3AF] hover:bg-[#374151] hover:text-[#F9FAFB]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? "text-[#3B82F6]" : "text-[#6B7280] group-hover:text-[#9CA3AF]"}>
                  <Icon />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium leading-tight">{label}</p>
                  <p className="text-[11px] text-[#6B7280] truncate mt-0.5 group-hover:text-[#9CA3AF]">
                    {description}
                  </p>
                </div>
                {isActive && (
                  <span className="text-[#3B82F6] flex-shrink-0">
                    <Icons.Chevron />
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {}
      <div className="px-4 pb-3">
        <button
          onClick={handleSubmitQuery}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors"
        >
          <Icons.Plus />
          Submit a Query
        </button>
      </div>

      {}
      <div className="px-3 pb-5 pt-3 border-t border-[#374151]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-[#9CA3AF] hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Icons.Logout />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-[#111827]">
      {}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {}
      <div
        className={`
          fixed top-0 left-0 h-full z-30
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:z-auto lg:flex lg:flex-shrink-0
        `}
      >
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          onNavigate={() => setSidebarOpen(false)}
        />
      </div>

      {}
      <div className="flex-1 flex flex-col min-w-0">
        {}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[#374151] bg-[#1F2937]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#9CA3AF] hover:text-white transition-colors"
          >
            <Icons.Menu />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#3B82F6] flex items-center justify-center text-white">
              <Icons.Leaf />
            </div>
            <span className="text-white font-bold text-sm">BookLeaf</span>
          </div>
        </header>

        {}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}