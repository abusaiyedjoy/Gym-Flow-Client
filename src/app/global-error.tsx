'use client'

import { useEffect } from 'react'
import { XCircle, RefreshCcw, Home } from 'lucide-react'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Global Error:', error)
    }, [error])

    return (
        <html>
            <body>
                <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center px-4">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />
                    
                    {/* Animated Orbs */}
                    <div className="absolute top-20 left-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />

                    <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
                        {/* Error Icon */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-red-600 rounded-full blur-2xl opacity-50 animate-pulse" />
                                <div className="relative p-6 bg-linear-to-r from-red-600 to-red-700 rounded-full">
                                    <XCircle className="w-16 h-16 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-6xl font-bold text-white">
                                Critical{" "}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-600">
                                    Error
                                </span>
                            </h1>
                            <p className="text-xl text-zinc-400 max-w-lg mx-auto">
                                We're experiencing a critical issue. Please try refreshing the page or come back later.
                            </p>
                        </div>

                        {/* Error Details */}
                        {process.env.NODE_ENV === 'development' && error && (
                            <div className="bg-red-950/30 backdrop-blur-sm border border-red-900/50 rounded-xl p-6 text-left">
                                <p className="text-sm font-mono text-red-400 break-all">
                                    {error.message || 'Unknown error'}
                                </p>
                                {error.digest && (
                                    <p className="text-xs text-zinc-500 mt-2">
                                        Error ID: {error.digest}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <button
                                onClick={reset}
                                className="inline-flex items-center justify-center px-8 py-6 text-lg font-semibold text-white bg-linear-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg transition-all group"
                            >
                                <RefreshCcw className="mr-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                                Try Again
                            </button>
                            <a
                                href="/"
                                className="inline-flex items-center justify-center px-8 py-6 text-lg font-semibold text-white border-2 border-zinc-700 hover:bg-zinc-800 rounded-lg transition-all"
                            >
                                <Home className="mr-2 w-5 h-5" />
                                Go Home
                            </a>
                        </div>

                        {/* Support Info */}
                        <div className="pt-8 border-t border-zinc-800">
                            <p className="text-sm text-zinc-500">
                                If this problem persists, please contact our support team at{' '}
                                <a href="mailto:support@gymflow.com" className="text-orange-400 hover:text-orange-300 underline">
                                    support@gymflow.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}