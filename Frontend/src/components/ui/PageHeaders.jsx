export default function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
      <div>
        <h1 className="text-2xl font-bold text-[#F9FAFB]">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-[#9CA3AF] mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  )
}