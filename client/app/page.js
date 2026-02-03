'use client';

import { useEffect, useState } from 'react';
import { fetchNews } from '@/utils/api';

export default function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews()
            .then(setNews)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Split news into sections
    const heroNews = news.length > 0 ? news[0] : null; // Top story
    const sidebarNews = news.slice(1, 6); // Next 5 stories for sidebar
    const gridNews = news.slice(6, 10); // Next 4 for 2x2 grid
    // Just reusing news for categories for demo purposes
    const categoryNews = news.slice(0, 5);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center font-serif italic text-gray-400">Loading the pulse...</div>;
    }

    return (
        <div className="bg-white">

            {/* BREAKING NEWS BAR */}
            <div className="bg-red-600 text-white font-bold italic py-2 px-4 shadow-md sticky top-0 z-40">
                <div className="container mx-auto flex items-center gap-4 text-sm overflow-hidden">
                    <span className="bg-black text-white px-2 py-0.5 text-xs not-italic uppercase tracking-widest">Breaking</span>
                    <span className="truncate">
                        Global markets surge as new trade agreements are finalized in Brussels...
                    </span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">

                {/* HERO SECTION: 2/3 Main + 1/3 Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 border-b border-gray-200 pb-12">

                    {/* Main Hero Story (Left, 8 cols) */}
                    <div className="lg:col-span-8 group cursor-pointer">
                        {heroNews ? (
                            <>
                                <div className="relative h-[500px] w-full bg-gray-200 mb-4 overflow-hidden">
                                    {heroNews.imageUrl ? (
                                        <img src={heroNews.imageUrl} alt={heroNews.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-6xl font-serif">P24</div>
                                    )}
                                    <div className="absolute bottom-0 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase">
                                        {heroNews.source || 'Top Story'}
                                    </div>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold font-serif leading-tight mb-4 group-hover:text-red-700 transition-colors">
                                    {heroNews.title}
                                </h2>
                                <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-black pl-4">
                                    {heroNews.content ? heroNews.content.substring(0, 150) + "..." : "Full coverage of this developing story..."}
                                </p>
                            </>
                        ) : (
                            <div className="h-64 flex items-center justify-center bg-gray-100 italic text-gray-500">No headlines available.</div>
                        )}
                    </div>

                    {/* Sidebar (Right, 4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-8">

                        {/* Ad Slot */}
                        <div className="bg-gray-100 h-[250px] flex flex-col items-center justify-center text-xs text-gray-400 uppercase tracking-widest border border-gray-200">
                            <span>Advertisement</span>
                            <span className="text-lg font-bold text-gray-300">300x250</span>
                        </div>

                        {/* Latest Headlines List */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest border-b-2 border-black mb-4 pb-2">
                                Latest News
                            </h3>
                            <div className="flex flex-col gap-4 divide-y divide-gray-100">
                                {sidebarNews.map((item, idx) => (
                                    <div key={idx} className="pt-4 first:pt-0 group cursor-pointer">
                                        <span className="text-xs text-red-600 font-bold uppercase block mb-1">
                                            {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <h4 className="font-serif font-bold text-lg leading-snug group-hover:text-red-700 transition-colors">
                                            {item.title}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECONDARY GRID (2x2) */}
                <h3 className="text-center text-2xl font-black font-serif mb-8 flex items-center justify-center gap-4">
                    <span className="h-px bg-gray-300 flex-1"></span>
                    <span>IN DEPTH</span>
                    <span className="h-px bg-gray-300 flex-1"></span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {gridNews.map((item, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="h-48 bg-gray-100 mb-3 overflow-hidden relative">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : null}
                                <div className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase font-bold px-2 py-0.5">
                                    Analysis
                                </div>
                            </div>
                            <h4 className="font-serif font-bold text-lg leading-tight mb-2 group-hover:text-red-700 transition-colors">
                                {item.title}
                            </h4>
                            <p className="text-sm text-gray-500 line-clamp-2">
                                {item.content || "Expert analysis on this global event regarding..."}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CATEGORY COLUMNS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-200 pt-12">
                    {['World News', 'Business Economy', 'Technology'].map((category, idx) => (
                        <div key={idx}>
                            <h3 className="text-lg font-black uppercase tracking-wider border-b-2 border-red-600 mb-6 flex justify-between items-end">
                                {category}
                                <span className="text-xs text-red-600 font-normal normal-case cursor-pointer hover:underline">View All &rarr;</span>
                            </h3>
                            {/* Header Image for Category */}
                            <div className="h-40 bg-gray-200 mb-4 group cursor-pointer relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <span className="absolute bottom-2 left-2 text-white font-bold font-serif text-lg leading-none">
                                    Top Story in {category.split(' ')[0]}
                                </span>
                            </div>

                            {/* List */}
                            <ul className="space-y-3">
                                {categoryNews.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start group cursor-pointer">
                                        <span className="mt-1.5 w-1.5 h-1.5 bg-red-600 shrink-0"></span>
                                        <span className="font-serif font-medium text-gray-800 group-hover:text-red-700 transition-colors leading-tight">
                                            {item.title}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
