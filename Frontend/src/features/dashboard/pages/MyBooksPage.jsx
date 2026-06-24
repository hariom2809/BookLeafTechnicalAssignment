import { useEffect, useState } from "react"
import { getMyBooks } from "../services/booksApi"
import BookCard from "../components/BookCard"

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
          <BookCard
            key={book.id}
            book={book}
          />
        ))}
      </div>
    </div>
  )
}