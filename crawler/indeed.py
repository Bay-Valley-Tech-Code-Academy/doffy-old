from playwright.async_api import async_playwright
import pandas as pd
import asyncio

async def scrape_indeed(job_title, location, num_pages):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()
        
        # Navigate to Indeed
        await page.goto('https://www.indeed.com')
        
        # Allow time for initial page load and possible CAPTCHA
        await page.wait_for_timeout(10000)
        
        # Fill and submit search form
        await page.fill("input[name='q']", job_title)
        await page.fill("input[name='l']", location)
        await page.press("input[name='l']", "Enter")
        
        # Wait for search results to load
        await page.wait_for_load_state('networkidle')
        
        jobs = []
        for page_num in range(num_pages):
            # Wait for job cards to be visible
            await page.wait_for_selector('[class*="job_seen_beacon"]', state='visible')
            
            # Get all job cards
            job_cards = await page.query_selector_all('[class*="job_seen_beacon"]')
            
            for job_card in job_cards:
                try:
                    # All selectors now use the exact class names from Indeed
                    title = await job_card.query_selector('[class*="jobTitle css-1psdjh5 eu4oa1w0"]')
                    company = await job_card.query_selector('[class*="css-1h7lukg eu4oa1w0"]')
                    location = await job_card.query_selector('[class*="css-1restlb eu4oa1w0"]')
                    summary = await job_card.query_selector('[class*="jobMetaDataGroup css-qspwa8 eu4oa1w0"]')  # Updated summary class
                    
                    # Extract text content with error handling
                    title_text = await title.inner_text() if title else "N/A"
                    company_text = await company.inner_text() if company else "N/A"
                    location_text = await location.inner_text() if location else "N/A"
                    summary_text = await summary.inner_text() if summary else "N/A"
                    
                    # Debug print
                    print(f"\nFound job:")
                    print(f"Title: {title_text}")
                    print(f"Company: {company_text}")
                    print(f"Location: {location_text}")
                    print(f"Summary: {summary_text[:100]}...")  # Print first 100 chars of summary
                    
                    jobs.append({
                        'Title': title_text.strip(),
                        'Company': company_text.strip(),
                        'Location': location_text.strip(),
                        'Summary': summary_text.strip()
                    })
                    
                except Exception as e:
                    print(f"Error extracting job details: {str(e)}")
                    continue
            
            print(f"\nScraped page {page_num + 1}")
            
            # Check for and click next page button
            if page_num < num_pages - 1:
                next_button = await page.query_selector('[aria-label="Next Page"]')
                if next_button:
                    await next_button.click()
                    # Wait for new results to load
                    await page.wait_for_load_state('networkidle')
                    await page.wait_for_timeout(2000)  # Additional wait for content to settle
                else:
                    print("No more pages available")
                    break
        
        await browser.close()
        return jobs

def save_to_csv(data, filename):
    df = pd.DataFrame(data)
    df.to_csv(filename, index=False, encoding='utf-8-sig')
    print(f"\nSaved {len(data)} job listings to {filename}")
    
    # Print first few rows of the saved data
    print("\nFirst few jobs saved:")
    print(df.head().to_string())

if __name__ == '__main__':
    job_title = 'Software Engineer'
    location = 'Remote'
    num_pages = 1
    
    job_listings = asyncio.run(scrape_indeed(job_title, location, num_pages))
    save_to_csv(job_listings, 'indeed_job_listings.csv')