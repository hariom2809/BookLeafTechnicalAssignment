import { useEffect, useState } from "react"
import { getMyBooks } from "../services/userApi"

const StatusBadge = ({ status }) => {
  const map = {
    published:    { label: "Published",     cls: "bg-green-500/15 text-green-400 border-green-500/20" },
    cover_design: { label: "Cover Design",  cls: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20" },
    typesetting:  { label: "Typesetting",   cls: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
  }
  const { label, cls } = map[status] ?? { label: status, cls: "bg-[#374151] text-[#9CA3AF] border-[#4B5563]" }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {label}
    </span>
  )
}

const fmt = (val) =>
  val != null ? `₹${Number(val).toLocaleString("en-IN", { minimumFractionDigits: 2 })}` : "—"

export default function MyBooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getMyBooks()
      .then(setBooks)
      .catch(() => setError("Failed to load your books. Please try again."))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-7 h-7 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-5 py-4 text-red-400 text-sm">
        {error}
      </div>
    )
  }

  return (
    <div>
      {}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">My Books</h1>
        <p className="text-sm text-[#9CA3AF] mt-1">
          {books.length} {books.length === 1 ? "title" : "titles"} in your catalog
        </p>
      </div>

      {}
      {books.length === 0 && (
        <div className="rounded-lg border border-[#374151] bg-[#1F2937] px-6 py-12 text-center">
          <p className="text-[#9CA3AF] text-sm">No books found in your account.</p>
          <p className="text-[#6B7280] text-xs mt-1">Books you publish with BookLeaf will appear here.</p>
        </div>
      )}

      {}
      <div className="grid gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="rounded-lg border border-[#374151] bg-[#1F2937] p-5 hover:border-[#4B5563] transition-colors"
          >
            {}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-[#F9FAFB] truncate">{book.title}</h2>
                <p className="text-xs text-[#6B7280] mt-0.5 font-mono">ISBN: {book.isbn}</p>
              </div>
              <StatusBadge status={book.status} />
            </div>

            {}
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#9CA3AF]">
              {book.genre && <span>Genre: <span className="text-[#F9FAFB]">{book.genre}</span></span>}
              {book.publication_date && (
                <span>Published: <span className="text-[#F9FAFB]">{book.publication_date}</span></span>
              )}
              {book.mrp && <span>MRP: <span className="text-[#F9FAFB]">{fmt(book.mrp)}</span></span>}
            </div>

            {}
            {book.status === "published" && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Copies Sold",     value: book.total_copies_sold ?? 0 },
                  { label: "Total Earned",     value: fmt(book.total_royalty_earned) },
                  { label: "Royalty Paid",     value: fmt(book.royalty_paid) },
                  { label: "Pending",          value: fmt(book.royalty_pending), highlight: Number(book.royalty_pending) > 0 },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className="bg-[#111827] rounded-lg px-3 py-2.5">
                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wide">{label}</p>
                    <p className={`text-sm font-semibold mt-0.5 ${highlight ? "text-yellow-400" : "text-[#F9FAFB]"}`}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {}
            {book.status !== "published" && (
              <div className="mt-3 text-xs text-[#6B7280] bg-[#111827] rounded px-3 py-2">
                This book is currently in production. Royalty data will be available once published.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}