const Button = ({children, onClick, type="button", className=""}) => {
  return (
    <button
        type={type}
        onClick={onClick}
        className={`
          py-3
          px-4
          rounded-lg 
          font-medium 
          border 
          border-[#4B5563] 
          text-[#F9FAFB]
          bg-[#3B82F6] 
          hover:bg-[#2563EB] 
          transition-colors
          disabled:opacity-50
          disabled:cursor-not-allowed
          ${className}
        `}
    >
        {children}
    </button>
  )
}

export default Button