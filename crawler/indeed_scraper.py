from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import time

def scrape_indeed():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get("https://www.indeed.com/jobs?q=tech%20jobs&l=")

    WebDriverWait(driver,10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, ".job_seen_beacon"))
    )

    soup = BeautifulSoup(driver.page_source, "html.parser")
    
    job_listings = soup.find_all("div", class_="slider_container")

    for job in job_listings:
        title = job.find("h2","jobTitle").get_text(strip=True) if job.find("h2","jobTitle") else "N/A"
        company = job.find("span", attrs={"data-testid" : "company-name"}).get_text(strip=True) if job.find("span", attrs={"data-testid" : "company-name"}) else "N/A"
        location = job.find("div", attrs={"data-testid" : "text-location"}).get_text(strip=True) if job.find("div", attrs={"data-testid" : "text-location"}) else "N/A"

        print(f"Job Title: {title}")
        print(f"Company: {company}")
        print(f"Location: {location}")
        print("-" * 40)
    
    driver.quit()

scrape_indeed()