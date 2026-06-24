import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMyBooks } from "../services/booksApi"
import { createTicket } from "../services/ticketsApi"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"

export default function SubmitQueryPage() {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    book: "",           
    subject: "",
    description: "",
  })

  useEffect(() => {
    getMyBooks().then(setBooks).catch(() => {})
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await createTicket({
        subject: form.subject,
        description: form.description,
        book: form.book || null,
      })
      setSuccess(true)
    } catch {
      setError("Failed to submit your query. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto mt-10 rounded-lg border border-green-500/20 bg-green-500/10 px-6 py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-[#F9FAFB] mb-1">Query submitted!</h2>
        <p className="text-sm text-[#9CA3AF]">Our team will review and respond shortly.</p>
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => navigate("/dashboard/my-tickets")}
            className="px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors"
          >
            View My Tickets
          </button>
          <button
            onClick={() => { setSuccess(false); setForm({ book: "", subject: "", description: "", }) }}
            className="px-4 py-2 rounded-lg border border-[#374151] text-[#9CA3AF] hover:text-[#F9FAFB] text-sm transition-colors"
          >
            Submit Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">Submit a Query</h1>
        <p className="text-sm text-[#9CA3AF] mt-1">Our team typically responds within 48 hours.</p>
      </div>

      <div className="rounded-lg border border-[#374151] bg-[#1F2937] p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Book selector */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#F9FAFB] font-medium">
              This query is about
            </label>
            <select
              name="book"
              value={form.book}
              onChange={handleChange}
              className="px-3 py-2 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F9FAFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#4B5563] transition"
            >
              <option value="">General / Account Level</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <Input
            label="Subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder="e.g. Royalty payment not received for Q1"
            required
          />

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#F9FAFB] font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Describe your issue in as much detail as possible..."
              className="px-3 py-2 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F9FAFB] placeholder-[#6B7280] text-sm focus:outline-none focus:ring-2 focus:ring-[#4B5563] transition resize-none"
            />
          </div>

          {/* Attachment — UI only as per assignment spec */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#F9FAFB] font-medium">
              Attachment <span className="text-[#6B7280] font-normal">(optional)</span>
            </label>
            <div className="border border-dashed border-[#4B5563] rounded-lg px-4 py-5 text-center">
              <p className="text-xs text-[#6B7280]">Drag & drop a file here, or click to browse</p>
              <p className="text-[10px] text-[#4B5563] mt-1">PDF, PNG, JPG up to 10 MB</p>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Submitting..." : "Submit Query"}
            </Button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg border border-[#374151] text-[#9CA3AF] hover:text-[#F9FAFB] text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}