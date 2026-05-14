chrome.storage.local.get(['isEnabled', 'hideRules', 'pageTitle', 'blackList', 'keywordBlackList', 'adKeywords'], function (result) {
  if (result.isEnabled === false) return;

  const url = window.location.href.toLowerCase();
  
  // Kiểm tra xem URL hiện tại có thuộc các danh sách cần xử lý không
  const isBlacklistedDomain = (result.blackList || []).some(d => url.includes(d.toLowerCase()));
  const isBlacklistedKeyword = (result.keywordBlackList || []).some(k => url.includes(k.toLowerCase()));
  const isAdKeyword = (result.adKeywords || []).some(k => url.includes(k.toLowerCase()));

  // Nếu không thuộc bất kỳ danh sách nào thì dừng lại, không inject CSS
  if (!isBlacklistedDomain && !isBlacklistedKeyword && !isAdKeyword) return;

  console.log("Trang web thuộc danh sách hạn chế, đang thực thi các quy tắc ẩn...");

  // 1. Đổi title trang (Chỉ đổi nếu URL hợp lệ)
  if (result.pageTitle && result.pageTitle.trim() !== '') {
    document.title = result.pageTitle.trim();
  }

  // 2. Inject CSS ẩn phần tử theo danh sách động
  const rules = result.hideRules || [];
  if (rules.length > 0) {
    const selector = rules.map(r => r.value).join(', ');
    const style = document.createElement('style');
    style.id = 'ext-hide-style';
    style.textContent = `${selector} { display: none !important; }`;
    document.head.appendChild(style);
  }

  // 3. Chặn click vào link quảng cáo
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    const adKeywords = result.adKeywords || [];
    if (target && target.href) {
      const linkUrl = target.href.toLowerCase();
      if (adKeywords.some(kw => linkUrl.includes(kw.toLowerCase()))) {
        e.preventDefault();
        console.log("Đã chặn click quảng cáo: " + linkUrl);
      }
    }
  }, true);
});
