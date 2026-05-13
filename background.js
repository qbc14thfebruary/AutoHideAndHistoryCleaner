chrome.history.onVisited.addListener((historyItem) => {
  chrome.storage.local.get(['isEnabled', 'blackList', 'keywordBlackList'], (result) => {
    if (result.isEnabled === false) return;

    const url = historyItem.url.toLowerCase();
    const domainMatch  = (result.blackList        || []).some(d => url.includes(d));
    const keywordMatch = (result.keywordBlackList || []).some(k => url.includes(k));

    if (!domainMatch && !keywordMatch) return;

    console.log("Phát hiện URL vi phạm, đang xóa: " + url);
    chrome.history.deleteUrl({ url: historyItem.url });

    chrome.history.search({ text: url, maxResults: 10 }, (items) => {
      items.forEach(item => chrome.history.deleteUrl({ url: item.url }));
    });

    try {
      const origin = new URL(url).origin;
      chrome.browsingData.remove({ origins: [origin] }, { cache: true, cookies: true });
    } catch (e) {}
  });
});

chrome.tabs.onCreated.addListener((tab) => {
  setTimeout(() => {
    chrome.storage.local.get(['isEnabled', 'adKeywords'], (result) => {
      if (result.isEnabled === false) return;

      chrome.tabs.get(tab.id, (currentTab) => {
        if (chrome.runtime.lastError || !currentTab?.url) return;
        const url = currentTab.url.toLowerCase();
        const isAd = (result.adKeywords || []).some(k => url.includes(k));
        if (isAd) {
          console.log("Đóng tab quảng cáo: " + url);
          chrome.tabs.remove(tab.id);
        }
      });
    });
  }, 500);
});
