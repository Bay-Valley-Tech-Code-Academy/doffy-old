# Setting Up and Running the Indeed Scraper

Follow these steps to set up and run the scraper script (`indeed.py`) for collecting job listings from Indeed.

---

## Prerequisites
Before running the script, ensure you have the following:
- Python 3.7 or later installed on your system.
- A stable internet connection.
- Administrator privileges (if required to install dependencies).

---

## Setup Instructions

1. **Navigate to the Project Directory**  
   Open your terminal or command prompt and navigate to the directory containing the `crawler` folder:  
   ```bash
   cd crawler
   ```

2. **Create a Virtual Environment**  
   Create a virtual environment to manage dependencies:  
   ```bash
   python -m venv env
   ```

3. **Activate the Virtual Environment**  
   - For **Windows**:  
     ```bash
     .\env\Scripts\activate
     ```
   - For **macOS/Linux**:  
     ```bash
     source env/bin/activate
     ```

4. **Install Dependencies**  
   Install the required dependencies, including Playwright and Pandas:  
   ```bash
   pip install playwright pandas
   ```

5. **Install Playwright Browsers**  
   Install the necessary browsers for Playwright:  
   ```bash
   playwright install
   ```

6. **Verify Playwright Installation**  
   Confirm that Playwright is installed correctly by running this command:  
   ```bash
   python -c "from playwright.sync_api import sync_playwright; print('Playwright is installed')"
   ```
   If Playwright is installed correctly, you will see the message:  
   `Playwright is installed`.

---

## Running the Script

1. Run the script:  
   ```bash
   python indeed.py
   ```

2. When prompted, solve the CAPTCHA manually in the browser window that opens.  
   This ensures the scraper can access job listings without interruptions.

3. Once the CAPTCHA is solved, the scraper will begin extracting job listings and save the data to `indeed_job_listings.csv`.

4. To deactivate the virtual environment simply run: 
    ```bash
    deactivate
    ``` 
   this command works the same for all operating systems.

---

## Notes

- **CAPTCHA Handling**:  
  You may occasionally be prompted to solve a CAPTCHA due to Indeed's anti-bot measures. Solve it manually and allow the scraper to proceed.

- **Output File**:  
  The scraper saves the extracted job data in a CSV file named `indeed_job_listings.csv` in the same directory as `indeed.py`.

- **Debugging**:  
  If the script fails or encounters errors, verify the following:  
  - You are connected to the internet.  
  - All dependencies are installed.  
  - The CAPTCHA was solved correctly.

---

## Troubleshooting

- **Environment Activation Issues**:  
  If you encounter issues activating the virtual environment, ensure you are using the correct command for your operating system.  
  For Windows, use `.\env\Scripts\activate`.  
  For macOS/Linux, use `source env/bin/activate`.

- **Playwright Installation Issues**:  
  If Playwright fails to install, ensure you have the required permissions or try running the terminal as an administrator.

---

## Example Output

The scraper outputs a CSV file named `indeed_job_listings.csv` containing the following columns:  
- **Title**: Job title  
- **Company**: Company name  
- **Location**: Job location  
- **Summary**: Job description snippet

---
