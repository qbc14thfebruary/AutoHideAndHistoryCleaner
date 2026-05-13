document.addEventListener('DOMContentLoaded', function () {
  const tog    = document.getElementById('tog');
  const togLbl = document.getElementById('togLbl');

  const DEFAULTS = {
    isEnabled:        false,
    blackList:        ['youtube.com', 'facebook.com', 'ttks.tw'],
    keywordBlackList: ['truyen'],
    adKeywords:       ['doubleclick', 'adservice', 'popads', 'bet88', 'shopee.vn/universal-link'],
    hideRules: [
      { type: 'cls',   value: '.ads-banner' },
      { type: 'cls',   value: '.nav_frame' },
      { type: 'cls',   value: '.social_share_frame' },
      { type: 'id',   value: '#popup-overlay' },
      { type: 'tag-el',   value: 'img' },
    ],
    pageTitle: 'DevTools gemini.google.com/'
  };

  let state = {};

  // Load toàn bộ từ storage
  chrome.storage.local.get(null, function (saved) {
    state = {
      isEnabled:        saved.isEnabled        ?? DEFAULTS.isEnabled,
      blackList:        saved.blackList        ?? DEFAULTS.blackList,
      keywordBlackList: saved.keywordBlackList ?? DEFAULTS.keywordBlackList,
      adKeywords:       saved.adKeywords       ?? DEFAULTS.adKeywords,
      hideRules:        saved.hideRules        ?? DEFAULTS.hideRules,
      pageTitle:        saved.pageTitle        ?? DEFAULTS.pageTitle,
    };
    render();
  });

  // Render toàn bộ UI từ state
  function render() {
    tog.className = 'tog' + (state.isEnabled ? '' : ' off');
    togLbl.textContent = state.isEnabled ? 'Đang Bật' : 'Đang Tắt';
    togLbl.style.color = state.isEnabled ? '#2196F3' : '#888';

    renderSimple('domain', state.blackList);
    renderSimple('kw',     state.keywordBlackList);
    renderSimple('ad',     state.adKeywords);
    renderHide(state.hideRules);

    document.getElementById('inp-title').value = state.pageTitle || '';
  }

  function renderSimple(listId, arr) {
    const el = document.getElementById('list-' + listId);
    el.innerHTML = '';
    arr.forEach((val, i) => {
      const span = document.createElement('span');
      span.className = 'tag ' + listId;
      span.innerHTML = `${val} <span class="del" data-i="${i}" data-list="${listId}">×</span>`;
      el.appendChild(span);
    });
  }

  function renderHide(arr) {
    const el = document.getElementById('list-hide');
    el.innerHTML = '';
    arr.forEach((rule, i) => {
      const span = document.createElement('span');
      span.className = 'tag ' + rule.type;
      span.innerHTML = `${rule.value} <span class="del" data-i="${i}" data-list="hide">×</span>`;
      el.appendChild(span);
    });
  }

  // Toggle bật/tắt
  tog.addEventListener('click', function () {
    state.isEnabled = !state.isEnabled;
    render();
  });

  // Xóa tag — event delegation
  document.addEventListener('click', function (e) {
    if (!e.target.classList.contains('del')) return;
    const listId = e.target.dataset.list;
    const i      = parseInt(e.target.dataset.i);
    if      (listId === 'domain') state.blackList.splice(i, 1);
    else if (listId === 'kw')     state.keywordBlackList.splice(i, 1);
    else if (listId === 'ad')     state.adKeywords.splice(i, 1);
    else if (listId === 'hide')   state.hideRules.splice(i, 1);
    render();
  });

  // Thêm tag đơn (domain / kw / ad)
  document.querySelectorAll('[data-list]').forEach(btn => {
    btn.addEventListener('click', function () {
      const listId = btn.dataset.list;
      const inp    = document.getElementById('inp-' + listId);
      const val    = inp.value.trim();
      if (!val) return;
      if      (listId === 'domain') state.blackList.push(val);
      else if (listId === 'kw')     state.keywordBlackList.push(val);
      else if (listId === 'ad')     state.adKeywords.push(val);
      inp.value = '';
      render();
    });
  });

  // Thêm hideRule
  document.getElementById('btn-add-hide').addEventListener('click', function () {
    const type = document.getElementById('htype').value;
    const inp  = document.getElementById('inp-hide');
    let val    = inp.value.trim();
    if (!val) return;
    if (type === 'cls'   && !val.startsWith('.')) val = '.' + val;
    if (type === 'id'    && !val.startsWith('#')) val = '#' + val;
    state.hideRules.push({ type, value: val });
    inp.value = '';
    render();
  });

  // Enter để thêm nhanh
  ['domain', 'kw', 'ad'].forEach(id => {
    document.getElementById('inp-' + id).addEventListener('keydown', e => {
      if (e.key === 'Enter') document.querySelector(`[data-list="${id}"]`).click();
    });
  });
  document.getElementById('inp-hide').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-add-hide').click();
  });

  // Lưu & reload tab hiện tại
  document.getElementById('btn-save').addEventListener('click', function () {
    state.pageTitle = document.getElementById('inp-title').value.trim();
    chrome.storage.local.set(state, function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0]) chrome.tabs.reload(tabs[0].id);
      });
    });
  });

  // Reset về mặc định
  document.getElementById('btn-rst').addEventListener('click', function () {
    if (confirm('Reset tất cả về mặc định?')) {
      state = JSON.parse(JSON.stringify(DEFAULTS));
      render();
    }
  });
});
