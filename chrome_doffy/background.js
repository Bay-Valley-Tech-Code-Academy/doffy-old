// Listener for messages from the popup or content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "logJobData") {
    // Example: Log job data to the console
    console.log("Received job data:", message.data);

    // Optionally perform other actions (e.g., save data)
    sendResponse({ status: "Data logged successfully" });
  } else {
    sendResponse({ status: "Unknown command" });
  }
});

// Listener for browser action click
chrome.action.onClicked.addListener((tab) => {
  // Example: Send a message to the active tab's content script
  chrome.tabs.sendMessage(tab.id, { command: "scrape" }, (response) => {
    if (response?.jobs) {
      console.log("Scraped jobs:", response.jobs);
    } else {
      console.log("No jobs found or scrape failed");
    }
  });
});

// Optionally use alarms for periodic tasks
chrome.alarms.create("scrapeAlarm", { delayInMinutes: 1, periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "scrapeAlarm") {
    console.log("Triggered scrapeAlarm - perform background job scrape");
    // Add background job scraping logic if needed
  }
});
