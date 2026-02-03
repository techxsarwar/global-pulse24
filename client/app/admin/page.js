'use client';

import { useState } from 'react';
import { createNews } from '@/utils/api';

export default function AdminPage() {
    const [formData, setFormData] = useState({ title: '', imageUrl: '', source: '', content: '' });
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await createNews(formData);
            setStatus('success');
            setFormData({ title: '', imageUrl: '', source: '', content: '' });
            setTimeout(() => setStatus(null), 3000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-3xl font-serif font-bold mb-8 text-slate-900 border-b border-gray-200 pb-4">
                    CMS Dashboard
                </h1>

                <div className="bg-white p-8 border border-gray-200 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Headline</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 p-3 text-lg font-serif focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                                placeholder="Enter article headline..."
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Source</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-2 text-sm focus:border-red-600 outline-none"
                                    placeholder="e.g. AFP"
                                    value={formData.source}
                                    onChange={e => setFormData({ ...formData, source: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    className="w-full border border-gray-300 p-2 text-sm focus:border-red-600 outline-none"
                                    placeholder="https://..."
                                    value={formData.imageUrl}
                                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Content</label>
                            <textarea
                                className="w-full border border-gray-300 p-3 text-base text-slate-700 h-48 focus:border-red-600 outline-none resize-none"
                                placeholder="Article content..."
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                required
                            ></textarea>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 text-sm uppercase tracking-wider transition-colors disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Publishing...' : 'Publish Article'}
                            </button>

                            {status === 'success' && (
                                <span className="text-green-600 font-bold text-sm">News Published!</span>
                            )}
                            {status === 'error' && (
                                <span className="text-red-600 font-bold text-sm">Error Publishing.</span>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
