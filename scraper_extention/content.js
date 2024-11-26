(function() {
    const scrapeJobs = () => {
      const jobData = [];
      const jobElements = document.querySelectorAll('[class*="JobCardWrap"]'); // Update this selector for target sites
  
      jobElements.forEach((job) => {
        const title = job.querySelector('[class*="Title"]')?.innerText;
        const company = job.querySelector('[class*="indexmodern__Company-sc"]')?.innerText;
        const description = job.querySelector('[class*="JobMetaDetails"]')?.innerText;
        
        if (title && company) {
          jobData.push({ title, company, description });
        }
      });
  
      return jobData;
    };
  
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.command === "scrape") {
        const data = scrapeJobs();
        sendResponse({ jobs: data });
      }
    });
  })();
