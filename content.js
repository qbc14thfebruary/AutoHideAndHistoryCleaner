chrome.storage.local.get(['isEnabled', 'hideRules', 'pageTitle'], function (result) {
  if (result.isEnabled === false) return;

  const rules = result.hideRules || [];

  // Đổi title trang theo giá trị trong storage (để trống = giữ nguyên)
  if (result.pageTitle && result.pageTitle.trim() !== '') {
    document.title = result.pageTitle.trim();
  }

  // Inject CSS ẩn phần tử theo danh sách động
  if (rules.length > 0) {
    const selector = rules.map(r => r.value).join(', ');
    const style = document.createElement('style');
    style.id = 'ext-hide-style';
    style.textContent = `${selector} { display: none !important; }`;
    document.head.appendChild(style);
  }

  // Chặn click vào link quảng cáo
  chrome.storage.local.get(['adKeywords'], function (res) {
    const adKeywords = res.adKeywords || [];
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (target && target.href) {
        const url = target.href.toLowerCase();
        if (adKeywords.some(kw => url.includes(kw))) {
          e.preventDefault();
          console.log("Đã chặn click quảng cáo: " + url);
        }
      }
    }, true);
  });
});
