let activeTab = "";
let startTime = 0;

let blockedSites = ["facebook.com", "instagram.com"];

chrome.tabs.onActivated.addListener((info) => {

  chrome.tabs.get(info.tabId, (tab) => {
    trackTime(tab.url);
  });

});

chrome.tabs.onUpdated.addListener((id, change, tab) => {

  if (change.status === "complete") {
    trackTime(tab.url);
  }

});

function trackTime(url) {

  if (!url) return;

  let domain = new URL(url).hostname;

  // Block sites
  blockedSites.forEach(site => {
    if (domain.includes(site)) {
      chrome.tabs.update({ url: "https://www.google.com" });
    }
  });

  let now = Date.now();

  if (activeTab !== "") {

    let timeSpent = now - startTime;

    chrome.storage.local.get([activeTab], (data) => {

      let total = data[activeTab] || 0;

      chrome.storage.local.set({
        [activeTab]: total + timeSpent
      });

    });

  }

  activeTab = domain;
  startTime = now;
}
