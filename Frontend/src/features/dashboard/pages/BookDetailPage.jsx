import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Card from "../../../components/ui/Card"
import { getBookDetail } from "../services/userApi"
import StatusBadge from "../components/StatusBadge"

const fmt = (val) =>
  val != null
    ? `₹${Number(val).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
      })}`
    : "—"

const formatValue = (value) => {
  if (value == null || value === "") return "—"
  if (Array.isArray(value)) return value.join(", ")
  return value
}

export default function BookDetailPage() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    const loadBook = async () => {
      setLoading(true)
      setError("")

      try {
        const data = await getBookDetail(bookId)
        if (isMounted) {
          setBook(data)
        }
      } catch {
        if (isMounted) {
          setError("Failed to load book details. Please try again.")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadBook()

    return () => {
      isMounted = false
    }
  }, [bookId])

  const detailItems = useMemo(() => {
    if (!book) return []

    return [
      { label: "Book ID", value: book.book_id },
      { label: "ISBN", value: book.isbn },
      { label: "Genre", value: book.genre },
      { label: "Publication Date", value: book.publication_date },
      { label: "Status", value: book.status },
      { label: "MRP", value: fmt(book.mrp) },
      { label: "Royalty / Copy", value: fmt(book.author_royalty_per_copy) },
      { label: "Copies Sold", value: book.total_copies_sold },
      { label: "Royalty Paid", value: fmt(book.royalty_paid) },
      { label: "Last Payout", value: book.last_royalty_payout_date },
      { label: "Print Partner", value: book.print_partner },
    ]
  }, [book])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-60">
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

  if (!book) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
          >
            ← Back to books
          </button>
          <h1 className="text-2xl font-bold text-[#F9FAFB] mt-2">{book.title}</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">Detailed book information</p>
        </div>
        <StatusBadge status={book.status} type="book" />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-[#374151]">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#6B7280]">Title</p>
                <p className="text-lg font-semibold text-[#F9FAFB]">{book.title}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {detailItems.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs uppercase tracking-wide text-[#6B7280]">{item.label}</p>
                    <p className="mt-1 text-sm text-[#F9FAFB]">{formatValue(item.value)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-[#6B7280]">Available On</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {(book.available_on || []).map((platform) => (
                  <span
                    key={platform}
                    className="inline-flex items-center rounded-full border border-[#4B5563] bg-[#111827] px-3 py-1 text-sm text-[#F9FAFB]"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-[#374151] bg-[#111827] p-4">
              <p className="text-sm font-medium text-[#F9FAFB]">Author</p>
              <p className="text-sm text-[#9CA3AF] mt-1">Author ID: {book.author ?? "—"}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
