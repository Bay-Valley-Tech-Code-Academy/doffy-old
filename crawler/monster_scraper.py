from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium_stealth import stealth
from seleniumwire import webdriver
from proxy_rotator import get_random_proxy
import requests
import random
import time


#download packages in requirements-monster


def scrape_website():
    
     #change request header to hide from anti-bot detection
    def interceptor(request):
      request.headers["Accept-Language"] = "en-US,en;q=0.9"
      request.headers["Referer"] = "https://www.google.com/"
      #delete header
      del request.headers["User-Agent"]
      del request.headers["Sec-Ch-Ua"]
      del request.headers["Sec-Fetch-Site"]
      del request.headers["Accept-Encoding"]
      # replace deleted headers
      request.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      request.headers["Sec-Ch-Ua"] = "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\""
      request.headers["Sec-Fetch-Site"] = "cross-site"
      request.headers["Accept-Encoding"] = "gzip, deflate, br, zstd"

    #Driver for selenium
    service = ChromeService(executable_path=ChromeDriverManager().install())

    #Options
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    # Disable features that show up on antibot
    options.add_argument('--disable-blink-features=AutomationControlled')
    options.add_argument('--disable-popup-blocking')
    options.add_argument('--start-maximized')
    options.add_argument('--disable-extensions')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')

    #get and set random proxy
    proxy = get_random_proxy()
    print(f"Using proxy: {proxy}")
    options.add_argument(f'--proxy-server=http://{proxy}')


    driver = webdriver.Chrome(service=service, options=options)

    #change the value of the navigator so the webdriver is undefined
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    #replace headers
    driver.request_interceptor = interceptor
    
    #randomize user_agents
    user_agents = ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.2420.81',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.4; rv:124.0) Gecko/20100101 Firefox/124.0',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36,Mozilla/5.0 (X11; Linux i686; rv:124.0) Gecko/20100101 Firefox/124.0',
    ]

    user_agent = random.choice(user_agents)

    options.add_argument(f'user-agent={user_agent}')

    #activate stealth mode
    stealth(driver,
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True,
        )
    
    # def human():



    try:

        driver.get('https://www.monster.com/jobs/search?q=&where=Merced+Ca&page=1&so=m.s.sh')

        time.sleep(random.uniform(10, 20))
        html = driver.page_source
        WebDriverWait(driver, 50).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'indexmodern__JobCardComponent-sc-9vl52l-0 cTMPqx job-card-style__JobCardComponent-sc-306f0e9d-0 hTLvsC'))
        )

        return html
    finally:
        print(html)


result = scrape_website()
print(result)