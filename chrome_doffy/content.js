(function () {
  // Function to scrape job details from Indeed
  const scrapeIndeedJobs = () => {
    const jobData = [];
    const jobCards = document.querySelectorAll('[class*="job_seen_beacon"]'); // Targeting job cards

    jobCards.forEach((jobCard) => {
      try {
        // Extract job details using selectors
        const titleElement = jobCard.querySelector(
          '[class*="jobTitle css-1psdjh5 eu4oa1w0"]'
        );
        const companyElement = jobCard.querySelector(
          '[class*="css-1h7lukg eu4oa1w0"]'
        );
        const locationElement = jobCard.querySelector(
          '[class*="css-1restlb eu4oa1w0"]'
        );
        const summaryElement = jobCard.querySelector(
          '[class*="jobMetaDataGroup css-qspwa8 eu4oa1w0"]'
        );

        const title = titleElement ? titleElement.innerText.trim() : "N/A";
        const company = companyElement
          ? companyElement.innerText.trim()
          : "N/A";
        const location = locationElement
          ? locationElement.innerText.trim()
          : "N/A";
        const summary = summaryElement
          ? summaryElement.innerText.trim()
          : "N/A";

        // Add job details to the list
        jobData.push({ title, company, location, summary });
      } catch (error) {
        console.error("Error extracting job details:", error);
      }
    });

    return jobData;
  };

  // Listen for messages from the popup or background script
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.command === "scrape") {
      const jobs = scrapeIndeedJobs();
      sendResponse({ jobs });
    }
  });
})();
