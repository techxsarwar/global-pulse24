import './globals.css'
import { Inter, Merriweather } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const merriweather = Merriweather({
    weight: ['300', '400', '700', '900'],
    subsets: ['latin'],
    variable: '--font-merriweather'
})

export const metadata = {
    title: 'GlobalPulse24 - Real News, Real Time',
    description: 'Breaking news and analysis from around the world.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${merriweather.variable} antialiased`}>

                {/* TOP CATEGORY BAR */}
                <div className="bg-black text-white text-xs font-bold uppercase tracking-widest border-b-4 border-red-600">
                    <div className="container mx-auto px-4 h-10 flex justify-between items-center">
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-red-500 transition-colors">World</a>
                            <a href="#" className="hover:text-red-500 transition-colors">Business</a>
                            <a href="#" className="hover:text-red-500 transition-colors">Tech</a>
                            <a href="#" className="hover:text-red-500 transition-colors">Science</a>
                            <a href="#" className="hover:text-red-500 transition-colors">Health</a>
                        </div>
                        <div className="flex gap-4 text-gray-400">
                            <span>Login</span>
                            <span>Subscribe</span>
                        </div>
                    </div>
                </div>

                {/* LOGO HEADER */}
                <header className="bg-white border-b border-gray-200 py-8">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest hidden md:block">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>

                        <div className="text-center">
                            <a href="/" className="group">
                                <h1 className="text-5xl md:text-7xl font-black font-serif tracking-tighter leading-none">
                                    GlobalPulse<span className="text-red-600">24</span>
                                </h1>
                                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mt-1 group-hover:text-red-600 transition-colors">
                                    Worldwide News
                                </p>
                            </a>
                        </div>

                        <div className="flex gap-3">
                            <button className="bg-red-600 hover:bg-black text-white text-xs font-bold uppercase px-4 py-2 transition-colors">
                                Newsletter
                            </button>
                            <a href="/admin" className="border border-black hover:bg-black hover:text-white text-black text-xs font-bold uppercase px-4 py-2 transition-colors">
                                Admin Panel
                            </a>
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <main className="min-h-screen bg-white">
                    {children}
                </main>

                {/* MEGA FOOTER */}
                <footer className="bg-black text-white pt-16 pb-8 border-t-8 border-red-600">
                    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <h3 className="text-xl font-bold font-serif mb-6">PULSE24.</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Truth, delivered daily. We provide the comprehensive news, analysis, and perspective you need to navigate a complex world.
                            </p>
                            <div className="flex gap-4">
                                {/* Social Icons Placeholder */}
                                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-xs">FB</div>
                                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-xs">TW</div>
                                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-xs">IG</div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-red-600 mb-6">Sections</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">World News</a></li>
                                <li><a href="#" className="hover:text-white">Business & Economy</a></li>
                                <li><a href="#" className="hover:text-white">Technology</a></li>
                                <li><a href="#" className="hover:text-white">Science & Health</a></li>
                                <li><a href="#" className="hover:text-white">Opinion</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-red-600 mb-6">Network</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">Pulse TV</a></li>
                                <li><a href="#" className="hover:text-white">Podcasts</a></li>
                                <li><a href="#" className="hover:text-white">Newsletters</a></li>
                                <li><a href="#" className="hover:text-white">Mobile App</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-red-600 mb-6">Support</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                                <li><a href="#" className="hover:text-white">Code of Ethics</a></li>
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                        <p>&copy; 2024 GlobalPulse24 Media Inc. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-gray-400">Privacy</a>
                            <a href="#" className="hover:text-gray-400">Cookies</a>
                            <a href="#" className="hover:text-gray-400">Accessibility</a>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    )
}
