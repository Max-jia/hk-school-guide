// 報告頁增強：hero 副標題拆為關鍵事實條（McKinsey 式資訊掃描）
(function() {
  function init() {
    var sub = document.querySelector('.report-hero .sub');
    if (!sub) return;
    var parts = sub.textContent.split('·').map(function(s) { return s.trim(); }).filter(Boolean);
    if (parts.length < 2) return;
    var wrap = document.createElement('div');
    wrap.className = 'hero-facts';
    parts.forEach(function(p) {
      var c = document.createElement('span');
      c.className = 'hero-fact';
      c.textContent = p;
      wrap.appendChild(c);
    });
    sub.replaceWith(wrap);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
