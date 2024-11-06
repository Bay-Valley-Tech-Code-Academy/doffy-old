import requests
from bs4 import BeautifulSoup

def scrape_government_jobs():
    url = "https://www.governmentjobs.com/jobs?keyword=tech+jobs&location="

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all job cards in the page
    job_cards = soup.find_all('li', class_='job-item')

    # Iterate through each job card and extract the relevant information
    for job_card in job_cards:
        # Extract job title
        job_title_tag = job_card.find('a', class_='job-details-link')
        job_title = job_title_tag.get_text(strip=True) if job_title_tag else 'No job title available'

        # Extract job location
        job_location_tag = job_card.find('div', class_='primaryInfo job-location')
        job_location = job_location_tag.get_text(strip=True) if job_location_tag else 'No location found'
        
        # Print or store the job details
        print(f"Job Title: {job_title}")
        print(f"Company Location: {job_location}")
        print('-' * 40)
    
scrape_government_jobs()