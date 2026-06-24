import { useNavigate } from "react-router-dom"
import Card from "../../../components/ui/Card"
import StatusBadge from "./StatusBadge"

const fmt = (val) =>
  val != null
    ? `₹${Number(val).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
      })}`
    : "—"

export default function BookCard({ book }) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/dashboard/my-books/${book.id}`)}
      className="hover:border-[#6B7280] transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-[#F9FAFB] truncate">
            {book.title}
          </h2>

          <p className="text-xs text-[#6B7280] mt-0.5 font-mono">
            ISBN: {book.isbn}
          </p>
        </div>

        <StatusBadge
          status={book.status}
          type="book"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#9CA3AF]">
        {book.genre && (
          <span>
            Genre: <span className="text-[#F9FAFB]">{book.genre}</span>
          </span>
        )}

        {book.publication_date && (
          <span>
            Published:{" "}
            <span className="text-[#F9FAFB]">
              {book.publication_date}
            </span>
          </span>
        )}

        {book.mrp && (
          <span>
            MRP: <span className="text-[#F9FAFB]">{fmt(book.mrp)}</span>
          </span>
        )}
      </div>

      {book.status === "published" ? (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Copies Sold",
              value: book.total_copies_sold ?? 0,
            },
            {
              label: "Total Earned",
              value: fmt(book.total_royalty_earned),
            },
            {
              label: "Royalty Paid",
              value: fmt(book.royalty_paid),
            },
            {
              label: "Pending",
              value: fmt(book.royalty_pending),
              highlight:
                Number(book.royalty_pending) > 0,
            },
          ].map(({ label, value, highlight }) => (
            <div
              key={label}
              className="bg-[#111827] rounded-lg px-3 py-2.5"
            >
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wide">
                {label}
              </p>

              <p
                className={`text-sm font-semibold mt-0.5 ${
                  highlight
                    ? "text-yellow-400"
                    : "text-[#F9FAFB]"
                }`}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 text-xs text-[#6B7280] bg-[#111827] rounded px-3 py-2">
          This book is currently in production. Royalty data
          will be available once published.
        </div>
      )}
    </Card>
  )
}