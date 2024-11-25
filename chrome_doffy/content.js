(function () {
  const scrapeJobs = () => {
    const jobData = [];
    const jobElements = document.querySelectorAll("input[name='q']"); // Update this selector for target sites

    jobElements.forEach((job) => {
      const title = job.querySelector(".job-title")?.innerText;
      const company = job.querySelector(".company-name")?.innerText;
      const description = job.querySelector(".job-description")?.innerText;

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
