import requests
from bs4 import BeautifulSoup
import sys

def scrape_techcrunch():
    url = "https://techcrunch.com/"
    print(f"Fetching latest news from {url}...\n")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # TechCrunch architecture often changes, but usually posts are in h2 or h3 tags
        # We'll look for headings that have links inside them.
        articles = []
        seen_urls = set()
        
        # Try finding typical article containers
        # Strategy: Find all h2 and h3 elements, check if they contain an 'a' tag, 
        # and filtering for length to avoid small UI elements.
        candidates = soup.find_all(['h2', 'h3'])
        
        for header in candidates:
            link = header.find('a')
            if link and link.get('href'):
                title = link.get_text().strip()
                article_url = link.get('href')
                
                # Basic filtering
                if not title or len(title) < 20:
                    continue
                if article_url in seen_urls:
                    continue
                
                seen_urls.add(article_url)
                articles.append({
                    'title': title,
                    'url': article_url
                })
                
                if len(articles) >= 5:
                    break
        
        if not articles:
            print("No articles found! The site structure might have changed.")
            return

        print("=== LATEST HEADLINES FOR CURATION ===\n")
        for i, article in enumerate(articles, 1):
            print(f"{i}. {article['title']}")
            print(f"   URL: {article['url']}")
            print("-" * 50)
            
        print("\nDone. Copy these into your admin panel.")

    except Exception as e:
        print(f"Error scraping data: {e}")

if __name__ == "__main__":
    scrape_techcrunch()
