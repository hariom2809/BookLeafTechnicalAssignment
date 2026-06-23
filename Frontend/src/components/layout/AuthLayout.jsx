export default function AuthLayout({title, subtitle, children}) {

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-lg shadow-2xl bg-[#1F2937] border border-[#4B5563] p-6">
                <div className="text-center mb-8">
                    <h1 className="text-white text-3xl font-bold">
                        Jire Clone
                    </h1>

                    <h3 className="mt-4 text-xl text-white font-semibold">
                        {title}
                    </h3>

                    {subtitle && (
                        <p className="mt-2 text-sm text-[#F9FAFB]">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="mt-8">
                    {children}
                </div>
            </div>
        </div>
    )
}