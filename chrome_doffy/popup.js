document.getElementById("scrape-btn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { command: "scrape" }, (response) => {
      if (response?.jobs?.length) {
        console.log("Scraped Jobs:", response.jobs);
        const blob = new Blob([JSON.stringify(response.jobs, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);

        // Trigger file download
        const currentUrl = tabs[0].url;
        const urlParts = new URL(currentUrl);
        const domain = urlParts.hostname;
        const filename = `${domain}_jobs_.json`;

        chrome.downloads.download({
          url: url,
          filename: filename,
        });

        document.getElementById("status").innerText =
          "Jobs scraped and downloaded!";
      } else {
        document.getElementById("status").innerText = "No jobs found!";
      }
    });
  });
});
