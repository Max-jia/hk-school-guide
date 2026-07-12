
(function(){
  var current = document.documentElement.lang || 'zh-CN';
  var isTC = current === 'zh-HK' || location.pathname.indexOf('-tc') > -1;
  // 在nav中添加切换按钮
  function addSwitcher(){
    var nav = document.querySelector('.nav-links');
    if (!nav) return;
    var btn = document.createElement('a');
    btn.href = '#';
    btn.style.cssText = 'font-size:14px;margin-left:8px;padding:4px 10px;border:1px solid #ccc;border-radius:6px';
    btn.textContent = isTC ? '简' : '繁';
    btn.onclick = function(e){
      e.preventDefault();
      var path = location.pathname;
      if (isTC) {
        // 切到简体
        location.href = path.replace('-tc.html', '.html').replace('-tc/', '/');
      } else {
        // 切到繁体
        location.href = path.replace('.html', '-tc.html');
      }
    };
    nav.appendChild(btn);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSwitcher);
  } else {
    addSwitcher();
  }
})();
