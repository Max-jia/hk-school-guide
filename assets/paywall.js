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

    // 显示登录状态（如果已登录）
    addAuthUI();

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

  // 登录状态显示：在报告 hero 区域显示用户信息和登出按钮
  function addAuthUI() {
    if (typeof Auth === 'undefined') return;
    // 等 paywall.css 的 body.purchased 逻辑跑完再检查
    setTimeout(function(){
      Auth.getUser().then(function(user){
        if (!user) return;
        var container = document.querySelector('.report-hero .hero-title-row');
        if (!container) container = document.querySelector('.report-hero .container');
        if (!container || document.getElementById('auth-ui')) return;
        var html = '<div id="auth-ui" style="display:inline-flex;align-items:center;gap:8px;margin-left:12px;font-size:12px;color:rgba(255,255,255,.7)">' +
          '<span>👤 ' + (user.email || '已登录') + '</span>' +
          '<button onclick="Auth.signOut().then(function(){location.reload()})" style="font-size:11px;padding:2px 10px;border:1px solid rgba(255,255,255,.4);border-radius:4px;background:none;color:rgba(255,255,255,.8);cursor:pointer">登出</button>' +
          '</div>';
        container.insertAdjacentHTML('beforeend', html);
      }).catch(function(){});
    }, 600);
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
    fetch('https://sjnjbshnuokatlcrdnqp.supabase.co/functions/v1/activate-token', {
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
    // 使用 auth.js 初始化好的 client
    var sb = (window.Auth && window.Auth.getSB) ? window.Auth.getSB() : supabase.createClient(
      'https://sjnjbshnuokatlcrdnqp.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbmpic2hudW9rYXRsY3JkbnFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3OTYzMTYsImV4cCI6MjA5NzM3MjMxNn0.BWcr37x2VIllupuuvTF81uVjFCzxgfIrC5RfUbnoWsg'
    );
    sb.auth.getSession().then(function(_a){
      var session = _a.data.session;
      if (!session) return;
      sb.from('purchases').select('report_id,is_all_access')
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

    // 辅助：带登录跳 Stripe
    function openStripeWithAuth(url) {
      if (typeof Auth !== 'undefined' && Auth.showModal) {
        Auth.showModal({
          onSuccess: function(user) {
            var finalUrl = url;
            if (user && user.id) {
              var refId = user.id + '::' + (url.includes('7sY8wO') ? 'all' : REPORT_CODE);
              finalUrl += (finalUrl.includes('?') ? '&' : '?') + 'client_reference_id=' + refId;
            }
            window.open(finalUrl, '_blank');
          }
        });
      } else {
        window.open(url, '_blank');
      }
    }

    // 0. 更新全解锁按钮文案（从"一键"改为"注册"）
    document.querySelectorAll('.pw-all-access .pw-label').forEach(function(el){
      if (el.textContent.indexOf('一键解锁') >= 0) {
        el.textContent = el.textContent.replace('一键解锁', '注册解锁');
      }
      if (el.textContent.indexOf('一鍵解鎖') >= 0) {
        el.textContent = el.textContent.replace('一鍵解鎖', '註冊解鎖');
      }
    });
    document.querySelectorAll('.pw-all-access .pw-strike').forEach(function(el){
      if (el.textContent.indexOf('省') >= 0 && el.textContent.indexOf('换手机') < 0) {
        el.innerHTML = el.innerHTML + ' · <span style="color:rgba(255,255,255,.75)">换手机也能看</span>';
      }
    });

    // 1.「HK$198 一键解锁全部」→ 必须先注册登录，再跳 Stripe
    var allAccessBtns = document.querySelectorAll('.pw-all-access .pw-btn-all[href*="stripe.com"]');
    allAccessBtns.forEach(function(btn){
      var stripeUrl = btn.getAttribute('href');
      btn.setAttribute('data-stripe-url', stripeUrl);
      btn.removeAttribute('href');
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', function(e){
        e.preventDefault();
        openStripeWithAuth(stripeUrl);
      });
    });

    // 2.「单份解锁」按钮旁边加限制提示
    var singleBtns = document.querySelectorAll('.pw-btn-primary[href*="stripe.com"]');
    singleBtns.forEach(function(btn){
      // 避免重复加
      if (btn.parentNode.querySelector('.pw-single-notice')) return;
      var notice = document.createElement('div');
      notice.className = 'pw-single-notice';
      notice.style.cssText = 'font-size:12px;color:#94a3b8;margin-top:10px;text-align:center;line-height:1.6';
      notice.innerHTML = '💡 仅保存在当前浏览器<br>换手机或清缓存后需重新购买<br><a href="#" style="color:#6366f1;font-weight:600">推荐注册解锁全部 →</a>';
      notice.querySelector('a').addEventListener('click', function(e){
        e.preventDefault();
        // 滚动到顶部的全解锁区
        var allAccess = document.querySelector('.pw-all-access');
        if (allAccess) allAccess.scrollIntoView({ behavior: 'smooth' });
      });
      btn.parentNode.insertBefore(notice, btn.nextSibling);
    });

    // 3.「创建帐号」按钮 → 仅注册入口（不购买）
    var regBtns = document.querySelectorAll('.pw-btn-secondary[href*="stripe.com"]');
    regBtns.forEach(function(btn){
      // 更新文案
      var label = btn.querySelector('.pw-label');
      if (label) {
        if (label.textContent.indexOf('註冊購買') >= 0 || label.textContent.indexOf('注册购买') >= 0) {
          label.textContent = '创建帐号 · 永久保存购买记录';
        }
      }
      btn.removeAttribute('href');
      btn.style.cursor = 'pointer';
      // 隐藏价格（创建帐号不是购买行为）
      var price2 = btn.querySelector('.pw-price');
      if (price2) price2.style.display = 'none';
      btn.addEventListener('click', function(e){
        e.preventDefault();
        if (typeof Auth !== 'undefined' && Auth.showModal) {
          Auth.showModal({ onSuccess: function(){ location.reload(); } });
        }
      });
    });

    // 3b. 已登录状态：隐藏创建帐号按钮 + 更新单份解锁提示 + 全解锁跳过登录
    if (typeof Auth !== 'undefined') {
      Auth.getUser().then(function(user){
        if (!user) return;

        // 隐藏「创建帐号」按钮
        regBtns.forEach(function(btn){ btn.style.display = 'none'; });

        // 全解锁按钮：已登录直接跳 Stripe（不再弹登录窗）
        allAccessBtns.forEach(function(btn){
          var url = btn.getAttribute('data-stripe-url');
          if (url) {
            btn.setAttribute('href', url + (url.includes('?') ? '&' : '?') + 'client_reference_id=' + user.id);
            btn.style.cursor = '';
            // 移除旧的 click listener（新 href 生效）
            var newBtn = btn.cloneNode(true);
            newBtn.setAttribute('href', url + (url.includes('?') ? '&' : '?') + 'client_reference_id=' + user.id + '::all');
            newBtn.style.cursor = '';
            newBtn.setAttribute('target', '_blank');
            newBtn.setAttribute('rel', 'noopener');
            btn.parentNode.replaceChild(newBtn, btn);
          }
        });

        // 单份解锁按钮：已登录时带 client_reference_id（格式: user_id::report_code）
        singleBtns.forEach(function(btn){
          var url = btn.getAttribute('href');
          if (url && url.includes('stripe.com')) {
            var sep = url.includes('?') ? '&' : '?';
            btn.setAttribute('href', url + sep + 'client_reference_id=' + user.id + '::' + REPORT_CODE);
          }
        });

        // 更新单份解锁下方的提示
        var notices = document.querySelectorAll('.pw-single-notice');
        notices.forEach(function(n){
          n.innerHTML = '💡 已登录 · 购买记录永久保存至 <b>' + (user.email || '你的帐号') + '</b>';
          n.style.color = '#64748b';
        });
      }).catch(function(){});
    }
    var recoverLinks = document.querySelectorAll('.pw-recover a[href*="unlock"]');
    recoverLinks.forEach(function(link){
      link.textContent = '已注册？登录恢复 →';
      link.setAttribute('href', '#');
      link.addEventListener('click', function(e){
        e.preventDefault();
        if (typeof Auth !== 'undefined' && Auth.showModal) {
          Auth.showModal({ onSuccess: function(){ location.reload(); } });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
