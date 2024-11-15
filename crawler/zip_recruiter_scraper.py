from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import time

def zip_recruiter():

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    driver.get("https://www.ziprecruiter.com/candidate/search?search=Software+Engineer&location=Remote")

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "site_content"))
    )

    soup = BeautifulSoup(driver.page_source, "html.parser")

    job_listings = soup.find_all("div", class_="job_result_two_pane")
    
    for job in job_listings:
        title = job.find("a", attrs={"target" : "_self"}).get_text(strip=True) if job.find("a", attrs={"target" : "_self"}) else "N/A"
        company = job.find("a", attrs={"data-testid" : "job-card-company"}).get_text(strip=True) if job.find("a", attrs={"data-testid" : "job-card-company"}) else "N/A"
        location = job.find("a", attrs={"data-testid" : "job-card-location"}).get_text(strip=True) if job.find("a", attrs={"data-testid" : "job-card-location"}).get_text(strip=True) else "N/A"

        print(f"Job Title: {title}")
        print(f"Location: {location}")
        print("-" * 40)

    driver.quit()

zip_recruiter()