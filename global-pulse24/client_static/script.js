const API_URL = 'http://localhost:5000/api/news';

// State Management
let newsData = [];

// Utility: Format Date
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric'
    });
};

const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// 1. Fetch Data
async function fetchNews() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        newsData = await response.json();
        renderAll();
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('ticker-text').textContent = 'Failed to load news stream.';
    }
}

// 2. Ticker Logic
function updateTicker() {
    const ticker = document.getElementById('ticker-text');
    if (newsData.length > 0) {
        // Most recent article (Index 0)
        const latest = newsData[0];
        ticker.textContent = `BREAKING: ${latest.title} — ${latest.source || 'GlobalPulse24'}`;
    }
}

// 3. Render Hero Section
function renderHero() {
    const container = document.getElementById('hero-story');
    if (newsData.length === 0) {
        container.innerHTML = '<div class="placeholder-loader">No active headlines.</div>';
        return;
    }

    const article = newsData[0]; // Top story

    // Pass ID to detail page
    container.onclick = () => window.location.href = `news-detail.html?id=${article._id}`;

    container.innerHTML = `
        <div class="hero-image-wrapper">
            ${article.imageUrl ? `<img src="${article.imageUrl}" alt="${article.title}">` : ''}
            <div class="hero-content-overlay">
                <span class="hero-tag">${article.source || 'Top Story'}</span>
                <h2 class="hero-title">${article.title}</h2>
                <p class="hero-excerpt">
                    ${article.content ? article.content.substring(0, 150) + '...' : ''}
                </p>
            </div>
        </div>
    `;
}

// 4. Render Sidebar List
function renderSidebarList() {
    const listContainer = document.getElementById('latest-news-list');
    // Using items 1-5 for sidebar
    const sidebarItems = newsData.slice(1, 6);

    listContainer.innerHTML = sidebarItems.map(item => `
        <div class="news-list-item" onclick="window.location.href='news-detail.html?id=${item._id}'">
            <span class="news-time">${formatTime(item.createdAt)}</span>
            <h4>${item.title}</h4>
        </div>
    `).join('');
}

// 5. Render Grid
function renderGrid() {
    const gridContainer = document.getElementById('secondary-grid');
    // Using items 6-10 for grid
    const gridItems = newsData.slice(6, 10);

    gridContainer.innerHTML = gridItems.map(item => `
        <div class="grid-item" onclick="window.location.href='news-detail.html?id=${item._id}'">
            <div class="grid-image-wrapper">
                ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}">` : ''}
                <div class="cat-badge">${item.category || 'News'}</div>
            </div>
            <h4>${item.title}</h4>
            <p>${item.content || ''}</p>
        </div>
    `).join('');
}

// 6. Render Categories with Filtering
function renderCategories() {
    const renderList = (id, categoryName) => {
        // Filter by category
        const filtered = newsData.filter(item =>
            (item.category && item.category.toLowerCase() === categoryName.toLowerCase())
        ).slice(0, 5); // Take top 5

        const el = document.querySelector(`#${id} .category-content`);
        if (filtered.length === 0) {
            el.innerHTML = '<div style="color:#999; font-size:0.9rem;">No stories in this category.</div>';
            return;
        }

        el.innerHTML = filtered.map(item => `
            <div class="cat-story-link" onclick="window.location.href='news-detail.html?id=${item._id}'" style="cursor:pointer">
                <div class="bullet"></div>
                <span class="text-content">${item.title}</span>
            </div>
        `).join('');
    };

    renderList('cat-world', 'World');
    renderList('cat-business', 'Business');
    renderList('cat-tech', 'Tech');
}

function renderAll() {
    updateTicker();
    renderHero();
    renderSidebarList();
    renderGrid();
    renderCategories();
}

// 7. Category Page Logic
function initCategoryPage() {
    const params = new URLSearchParams(window.location.search);
    const categoryType = params.get('type');
    const container = document.getElementById('category-feed-list');
    const titleEl = document.getElementById('page-title');
    const bcrumb = document.getElementById('breadcrumb-category');

    if (!categoryType) {
        window.location.href = 'index.html';
        return;
    }

    // Capitalize for display
    const displayCat = categoryType.charAt(0).toUpperCase() + categoryType.slice(1);

    // Update DOM - [CATEGORY] PULSE Branding
    document.title = `${displayCat} Pulse - GlobalPulse24`;
    titleEl.innerHTML = `<span class="accent-bar"></span>${displayCat.toUpperCase()} PULSE`;
    bcrumb.textContent = displayCat;

    // Filter Data
    const filtered = newsData.filter(item =>
        item.category && item.category.toLowerCase() === categoryType.toLowerCase()
    );

    // Trending List (Sidebar) - show random/latest excluding current cat or just latest
    const sidebarList = document.getElementById('trending-list');
    const trending = newsData.slice(0, 5); // Just take top 5 for now
    sidebarList.innerHTML = trending.map(item => `
        <div class="news-list-item" onclick="window.location.href='news-detail.html?id=${item._id}'">
            <span class="news-time">${formatTime(item.createdAt)}</span>
            <h4>${item.title}</h4>
        </div>
    `).join('');

    // Render Feed
    if (filtered.length === 0) {
        container.innerHTML = '<div style="padding: 2rem; color: #6b7280;">No stories found in this category.</div>';
        return;
    }

    container.innerHTML = filtered.map(item => `
        <article class="feed-card">
            <div class="feed-card-image">
                ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}">` : ''}
            </div>
            <div class="feed-card-content">
                <div class="feed-card-meta">
                    <span class="text-red">${item.source || 'GlobalPulse24'}</span> • ${formatDate(item.createdAt)}
                </div>
                <h3><a href="news-detail.html?id=${item._id}">${item.title}</a></h3>
                <p>${item.content ? item.content.substring(0, 150) + '...' : ''}</p>
                <a href="${item.sourceUrl || 'sources.html'}" target="_blank" class="btn-source-sm" onclick="event.stopPropagation();">
                    Read Source
                </a>
            </div>
        </article>
    `).join('');
}

// Main Init Function
document.addEventListener('DOMContentLoaded', () => {
    // Set Header Date
    const dateEl = document.getElementById('current-date');
    if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    fetchNews().then(() => {
        // Router Logic check
        if (window.location.pathname.includes('category.html')) {
            initCategoryPage();
        }
    });
});
