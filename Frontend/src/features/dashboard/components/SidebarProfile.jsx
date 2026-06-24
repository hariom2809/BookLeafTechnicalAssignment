export default function SidebarProfile({ currentUser }) {
  return (
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
  )
}