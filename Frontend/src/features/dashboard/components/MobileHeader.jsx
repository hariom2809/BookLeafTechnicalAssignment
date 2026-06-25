import { MenuIcon, LeafIcon } from "../icons/DashboardIcons"

export default function MobileHeader({ onOpenSidebar }) {
  return (
    <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[#374151] bg-[#1F2937]">
      <button
        onClick={onOpenSidebar}
        className="text-[#9CA3AF] hover:text-white transition-colors"
      >
        <MenuIcon />
      </button>

      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-[#3B82F6] flex items-center justify-center text-white">
          <LeafIcon />
        </div>

        <span className="text-white font-bold text-sm">
          BookLeaf
        </span>
      </div>
    </header>
  )
}