export default function Input ({label, error, className = "", ...props}) {
    
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm text-[#F9FAFB] font-medium">
                    {label}
                </label>
            )}

            <input
                className={`
                    px-2
                    py-1
                    bg-[#374151]
                    border
                    rounded-lg
                    text-[#9CA3AF]
                    placeholder-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#4B5563]
                    focus:border-[#4B5563]
                    transition
                    ${error ? "border-red-500" : "border-[#4B5563]" }
                    ${className}`
                }
                {...props}
            />

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    )
}