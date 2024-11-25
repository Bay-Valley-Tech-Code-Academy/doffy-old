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
        EC.presence_of_element_located((By.CLASS_NAME, "css-kyg8or eu4oa1w0"))
    )

    soup = BeautifulSoup(driver.page_source, "html_parser")
    
    job_listings = soup.find_all("div", class_="css-pprl14 eu4oa1w0")

    for job in job_listings:
        title = job.find("a", attrs={"target" : "_self"}).get_text(strip=True) if job.find("a", attrs={"target" : "_self"}) else "N/A"
        company = job.find("a", attrs={"data-testid" : "job-card-company"}).get_text(strip=True) if job.find("a", attrs={"data-testid" : "job-card-company"}) else "N/A"
        location = job.find("a", attrs={"data-testid" : "job-card-location"}).get_text(strip=True) if job.find("a", attrs={"data-testid" : "job-card-location"}).get_text(strip=True) else "N/A"

        print(f"Job Title: {title}")
        print(f"Company: {company}")
        print(f"Location: {location}")
        print("-" * 40)
    
    driver.quit()

scrape_indeed()