/* paywall.js — 付费墙检查逻辑（无注册版：付款 + localStorage 解锁） */

(function(){
  // 从 URL 提取报告代码（去除 -tc 后缀，简体/繁体共享同一份购买记录）
  var path = location.pathname;
  var match = path.match(/report-([a-z0-9-]+)\.html/);
  var RAW_CODE = match ? match[1] : (document.documentElement.getAttribute('data-report-code') || '');
  var REPORT_CODE = RAW_CODE.replace(/-tc$/, '');  // 简繁统一
  var IS_FREE = document.documentElement.getAttribute('data-report-free') === 'true';

  // 等 DOM 就绪后再检查（避免 document.body 为 null）
  function init() {
    // 保存当前报告到 localStorage（解锁页读取）
    if (REPORT_CODE && !IS_FREE) {
      localStorage.setItem('pending_report', REPORT_CODE);
    }

    if (IS_FREE) { showContent(); return; }

    // 1. 检查 localStorage
    if (localStorage.getItem('purchased_'+REPORT_CODE) === 'true' ||
        localStorage.getItem('all_access') === 'true') {
      showContent();
      return;
    }

    // 2. 查 URL 是否有 token/share 参数
    var params = new URLSearchParams(location.search);
    var token = params.get('token');
    if (token) {
      activateToken(token);
      return;
    }

    // 3. 付款跳转回跳（unlock.html 已处理解锁，此处兜底）
    var session = params.get('session');
    if (session && localStorage.getItem('pending_report')) {
      showContent();
    }
  }

  function showContent() {
    document.body.classList.add('purchased');
    // 已购报告：在 hero 区域显示分享按钮
    addShareButton();
  }

  function addShareButton() {
    var container = document.querySelector('.report-hero .container');
    if (!container) return;
    // 检查是否已加过
    if (document.getElementById('share-btn')) return;

    var token = localStorage.getItem('share_token_' + REPORT_CODE);
    if (!token) {
      token = 'shr_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem('share_token_' + REPORT_CODE, token);
      localStorage.setItem('share_count_' + token, '0');
    }

    var shareUrl = location.origin + '/unlock.html?token=' + token + '&report=' + REPORT_CODE;
    var html = '<div id="share-btn" style="display:inline-flex;align-items:center;gap:6px;margin-left:12px">' +
      '<button onclick="navigator.clipboard.writeText(\'' + shareUrl + '\').then(function(){var b=document.getElementById(\'share-copy\');b.textContent=\'已复制!\';setTimeout(function(){b.textContent=\'分享' + "\\u2197" + '\';},2000)})" ' +
      'style="font-size:12px;padding:3px 12px;border:1px solid rgba(255,255,255,.5);border-radius:6px;background:none;color:#fff;cursor:pointer;font-weight:600">' +
      '<span id="share-copy">分享 ↗</span></button></div>';
    container.querySelector('.hero-title-row').insertAdjacentHTML('beforeend', html);
  }

  function activateToken(token) {
    // 无后端版：前端校验 token 格式后放行（分享机制）
    if (token.length >= 8) {
      localStorage.setItem('purchased_'+REPORT_CODE, 'true');
      showContent();
    } else {
      alert('分享链接无效');
    }
  }

    // 0. 更新全解锁按钮文案（无需注册）
    document.querySelectorAll('.pw-all-access .pw-label').forEach(function(el){
      if (el.textContent.indexOf('注册解锁') >= 0) {
        el.textContent = el.textContent.replace('注册解锁', '解锁全部');
      }
      if (el.textContent.indexOf('註冊解鎖') >= 0) {
        el.textContent = el.textContent.replace('註冊解鎖', '解鎖全部');
      }
    });

    // 1.「全解锁」按钮：直接跳 Stripe
    var allAccessBtns = document.querySelectorAll('.pw-all-access .pw-btn-all[href*="stripe.com"]');
    allAccessBtns.forEach(function(btn){
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
    });

    // 2.「单份解锁」按钮：直接跳 Stripe + 提示
    var singleBtns = document.querySelectorAll('.pw-btn-primary[href*="stripe.com"]');
    singleBtns.forEach(function(btn){
      if (btn.parentNode.querySelector('.pw-single-notice')) return;
      var notice = document.createElement('div');
      notice.className = 'pw-single-notice';
      notice.style.cssText = 'font-size:12px;color:#57534E;margin-top:10px;text-align:center;line-height:1.6';
      notice.textContent = '解锁保存在当前浏览器 · 换手机或清缓存后需重新购买';
      btn.parentNode.insertBefore(notice, btn.nextSibling);
    });

    // 3.「注册购买」按钮（无注册系统）：等同单份购买
    var regBtns = document.querySelectorAll('.pw-btn-secondary[href*="stripe.com"]');
    regBtns.forEach(function(btn){
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
    });

    // 4. 恢复链接：付款后跳回解锁页
    var recoverLinks = document.querySelectorAll('.pw-recover a[href*="unlock"]');
    recoverLinks.forEach(function(link){
      link.textContent = '已购买？点此恢复 →';
      link.setAttribute('href', '/unlock.html?report=' + REPORT_CODE);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
