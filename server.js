const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globalpulse24')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schema
const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    source: { type: String },
    sourceUrl: { type: String },
    category: { type: String, default: 'World' },
    createdAt: { type: Date, default: Date.now }
});

const News = mongoose.model('News', NewsSchema);

// API Endpoints

// GET /api/news: Returns all news sorted by newest first
app.get('/api/news', async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// POST /api/news: Create a new article
app.post('/api/news', async (req, res) => {
    try {
        const { title, content, imageUrl, source, sourceUrl, category } = req.body;
        const newArticle = new News({
            title,
            content,
            imageUrl,
            source,
            sourceUrl,
            category
        });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create news', details: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
