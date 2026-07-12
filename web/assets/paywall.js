/* paywall.js — 付费墙检查逻辑（双轨：无注册+注册用户） */

(function(){
  // 从 URL 提取报告代码
  var path = location.pathname;
  var match = path.match(/report-([a-z0-9-]+)\.html/);
  var REPORT_CODE = match ? match[1] : (document.documentElement.getAttribute('data-report-code') || '');
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

  // 3. 查 Supabase 登录状态（如果已加载 Supabase SDK）
  checkSupabase();

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
    // 调用 Supabase Edge Function 验证并消耗 token
    fetch('https://YOUR_SUPABASE_PROJECT.supabase.co/functions/v1/activate-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token, report: REPORT_CODE })
    })
    .then(function(r){ return r.json(); })
    .then(function(data){
      if (data.success) {
        localStorage.setItem('purchased_'+REPORT_CODE, 'true');
        if (data.all_access) localStorage.setItem('all_access', 'true');
        showContent();
      } else {
        alert(data.error || '分享链接已失效或达到激活上限（最多3台设备）');
      }
    })
    .catch(function(){
      // Supabase 不可用时，简单校验 token 格式后放行
      if (token.length >= 8) { localStorage.setItem('purchased_'+REPORT_CODE, 'true'); showContent(); }
    });
  }

  function checkSupabase() {
    if (typeof supabase === 'undefined') return;
    supabase.auth.getSession().then(function(_a){
      var session = _a.data.session;
      if (!session) return;
      supabase.from('purchases').select('report_id,is_all_access')
        .eq('user_id', session.user.id)
        .or('report_id.eq.'+REPORT_CODE+',is_all_access.eq.true')
        .then(function(_b){
          if (_b.data && _b.data.length > 0) {
            localStorage.setItem('purchased_'+REPORT_CODE, 'true');
            _b.data.forEach(function(p){
              if (p.is_all_access) localStorage.setItem('all_access', 'true');
            });
            showContent();
          }
        });
    });
  }

    // Supabase SDK 延迟加载后重试
    window.addEventListener('load', function(){
      setTimeout(function(){ if (!document.body.classList.contains('purchased')) checkSupabase(); }, 500);
    });

    // 把所有 Stripe 链接加上 report 参数
    var buttons = document.querySelectorAll('.pw-btn[href*="stripe.com"]');
    buttons.forEach(function(btn){
      var href = btn.getAttribute('href');
      if (href && !href.includes('report=') && href.includes('test_28EaEWgTm')) {
        btn.setAttribute('href', href + '?report=' + REPORT_CODE);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
