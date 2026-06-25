import { LogoutIcon, PlusIcon } from "../icons/DashboardIcons"

export default function SidebarFooter({
  onSubmitQuery,
  onLogout,
}) {
  return (
    <>
      <div className="px-4 pb-3">
        <button
          onClick={onSubmitQuery}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors"
        >
          <PlusIcon />
          Submit a Query
        </button>
      </div>

      <div className="px-3 pb-5 pt-3 border-t border-[#374151]">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-[#9CA3AF] hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogoutIcon />
          <span>Log out</span>
        </button>
      </div>
    </>
  )
}