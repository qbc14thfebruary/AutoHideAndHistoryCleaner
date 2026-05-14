chrome.storage.local.get(['isEnabled', 'hideRules', 'pageTitle', 'blackList', 'keywordBlackList', 'adKeywords'], function (result) {
  if (result.isEnabled === false) return;

  const url = window.location.href.toLowerCase();
  const adKeywords = result.adKeywords || [];

  // --- LOGIC 1: CHẶN CLICK QUẢNG CÁO (LUÔN BẬT TRÊN MỌI TRANG) ---
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target && target.href) {
      const linkUrl = target.href.toLowerCase();
      if (adKeywords.some(kw => linkUrl.includes(kw.toLowerCase()))) {
        e.preventDefault();
        console.log("Đã chặn click quảng cáo: " + linkUrl);
      }
    }
  }, true);

  // --- LOGIC 2: ẨN PHẦN TỬ & ĐỔI TITLE (CHỈ KHI URL THUỘC DANH SÁCH ĐEN) ---
  const isBlacklistedDomain = (result.blackList || []).some(d => url.includes(d.toLowerCase()));
  const isBlacklistedKeyword = (result.keywordBlackList || []).some(k => url.includes(k.toLowerCase()));
  const isAdKeywordInUrl = adKeywords.some(k => url.includes(k.toLowerCase()));

  // Nếu URL hiện tại không vi phạm, dừng lại không inject CSS/đổi Title
  if (!isBlacklistedDomain && !isBlacklistedKeyword && !isAdKeywordInUrl) return;

  console.log("Phát hiện URL trong danh sách hạn chế, thực thi ẩn phần tử...");

  // Đổi title trang
  if (result.pageTitle && result.pageTitle.trim() !== '') {
    document.title = result.pageTitle.trim();
  }

  // Inject CSS ẩn phần tử
  const rules = result.hideRules || [];
  if (rules.length > 0) {
    const selector = rules.map(r => r.value).join(', ');
    const style = document.createElement('style');
    style.id = 'ext-hide-style';
    style.textContent = `${selector} { display: none !important; }`;
    document.head.appendChild(style);
  }
});
