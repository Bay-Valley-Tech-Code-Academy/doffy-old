// Listener for messages from popup or content scripts
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "logJobData") {
    console.log("Received job data:", message.data);
    sendResponse({ status: "Data logged successfully" });
  } else {
    console.log("Unknown command received.");
    sendResponse({ status: "Unknown command" });
  }
});

// Example of periodic tasks (if needed)
browser.alarms.create("jobScraperAlarm", {
  delayInMinutes: 1,
  periodInMinutes: 60,
});

browser.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "jobScraperAlarm") {
    console.log("Job scraper alarm triggered!");
    // Add code to perform background tasks here
  }
});
