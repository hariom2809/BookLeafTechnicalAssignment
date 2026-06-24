import { CloseIcon, LeafIcon } from "../icons/dashboardIcons"

export default function SidebarHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-[#374151]">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white">
          <LeafIcon />
        </div>

        <span className="text-white font-bold tracking-tight text-base">
          BookLeaf
        </span>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="text-[#9CA3AF] hover:text-white transition-colors lg:hidden"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}