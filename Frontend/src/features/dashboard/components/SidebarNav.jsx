import { NavLink } from "react-router-dom"
import { ChevronIcon } from "../icons/DashboardIcons"

export default function SidebarNav({ navItems, onNavigate }) {
  return (
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
                  <ChevronIcon />
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}