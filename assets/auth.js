/* auth.js — Supabase 认证模块（方案O · 2026-07）
   提供：登录/注册/登出/状态检查
   用法：<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
         <script src="./assets/auth.js"></script>
*/

(function () {
  "use strict";

  const SUPABASE_URL = "https://sjnjbshnuokatlcrdnqp.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbmpic2hudW9rYXRsY3JkbnFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3OTYzMTYsImV4cCI6MjA5NzM3MjMxNn0.BWcr37x2VIllupuuvTF81uVjFCzxgfIrC5RfUbnoWsg";

  // 等待 Supabase SDK 加载后初始化
  function initSupabase() {
    if (typeof supabase === "undefined") {
      console.warn("[Auth] Supabase SDK 尚未載入，延遲初始化");
      return false;
    }
    if (window.__sb) return true; // 已初始化
    window.__sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("[Auth] Supabase 已初始化");
    return true;
  }

  // 獲取 Supabase client（自動延遲初始化）
  function getSB() {
    if (!window.__sb) initSupabase();
    return window.__sb;
  }

  // === 註冊 ===
  async function signUp(email, password) {
    const sb = getSB();
    if (!sb) return { error: "Supabase 未載入，請刷新頁面後重試" };
    const { data, error } = await sb.auth.signUp({ email, password });
    return { data, error };
  }

  // === 登入 ===
  async function signIn(email, password) {
    const sb = getSB();
    if (!sb) return { error: "Supabase 未載入，請刷新頁面後重試" };
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    return { data, error };
  }

  // === 登出 ===
  async function signOut() {
    const sb = getSB();
    if (!sb) return;
    await sb.auth.signOut();
  }

  // === 取得當前用戶 ===
  async function getUser() {
    const sb = getSB();
    if (!sb) return null;
    const { data } = await sb.auth.getUser();
    return data?.user || null;
  }

  // === 取得當前 session ===
  async function getSession() {
    const sb = getSB();
    if (!sb) return null;
    const { data } = await sb.auth.getSession();
    return data?.session || null;
  }

  // === 監聽認證狀態變化 ===
  function onAuthChange(callback) {
    const sb = getSB();
    if (!sb) return;
    sb.auth.onAuthStateChange((event, session) => {
      callback(event, session?.user || null);
    });
  }

  // === 渲染登入彈窗 ===
  function showAuthModal(options) {
    options = options || {};
    const onSuccess = options.onSuccess || function () { location.reload(); };

    // 移除已存在的彈窗
    var existing = document.getElementById("auth-modal");
    if (existing) existing.remove();

    var html = '<div id="auth-modal" style="position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);backdrop-filter:blur(4px)">';
    html += '<div style="background:#fff;border-radius:16px;padding:32px 28px;max-width:400px;width:90%;box-shadow:0 24px 80px rgba(0,0,0,0.2);position:relative">';
    html += '<button onclick="document.getElementById(\'auth-modal\').remove()" style="position:absolute;top:12px;right:16px;background:none;border:0;font-size:22px;cursor:pointer;color:#94a3b8">&times;</button>';
    html += '<h3 style="font-family:Newsreader,serif;font-size:22px;font-weight:700;margin:0 0 4px;color:#0f172a">註冊 / 登入</h3>';
    html += '<p style="font-size:14px;color:#64748b;margin:0 0 20px">登入後購買的報告永久保存，跨裝置同步</p>';
    html += '<div id="auth-msg" style="font-size:13px;margin-bottom:12px;min-height:1.2em"></div>';
    html += '<input id="auth-email" type="email" placeholder="電子郵箱" style="width:100%;padding:12px 14px;font-size:15px;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:10px;outline:none" />';
    html += '<input id="auth-password" type="password" placeholder="密碼（至少6位）" style="width:100%;padding:12px 14px;font-size:15px;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:16px;outline:none" />';
    html += '<div style="display:flex;gap:10px">';
    html += '<button id="auth-btn-login" style="flex:1;padding:12px;background:#6366f1;color:#fff;border:0;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer">登入</button>';
    html += '<button id="auth-btn-signup" style="flex:1;padding:12px;background:#fff;color:#6366f1;border:2px solid #6366f1;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer">註冊</button>';
    html += '</div></div></div>';

    document.body.insertAdjacentHTML("beforeend", html);

    var msg = document.getElementById("auth-msg");
    function showMsg(text, isError) {
      msg.textContent = text;
      msg.style.color = isError ? "#dc2626" : "#059669";
    }

    document.getElementById("auth-btn-login").onclick = async function () {
      var email = document.getElementById("auth-email").value.trim();
      var pw = document.getElementById("auth-password").value;
      if (!email || !pw) { showMsg("請填寫郵箱和密碼", true); return; }
      if (pw.length < 6) { showMsg("密碼至少6位", true); return; }
      showMsg("登入中…", false);
      var r = await signIn(email, pw);
      if (r.error) {
        var msg2 = r.error.message || '';
        if (msg2.indexOf('Invalid login') >= 0 || msg2.indexOf('invalid') >= 0) {
          showMsg("郵箱或密碼不正確", true);
        } else if (msg2.indexOf('Email not confirmed') >= 0) {
          showMsg("郵箱尚未驗證，請檢查收件箱", true);
        } else {
          showMsg("登入失敗：" + msg2, true);
        }
        return;
      }
      showMsg("登入成功！", false);
      setTimeout(function () { document.getElementById("auth-modal").remove(); onSuccess(r.data?.user); }, 800);
    };

    document.getElementById("auth-btn-signup").onclick = async function () {
      var email = document.getElementById("auth-email").value.trim();
      var pw = document.getElementById("auth-password").value;
      if (!email || !pw) { showMsg("請填寫郵箱和密碼", true); return; }
      if (pw.length < 6) { showMsg("密碼至少6位", true); return; }
      showMsg("註冊中…", false);
      var r = await signUp(email, pw);
      if (r.error) {
        var msg = r.error.message || '';
        if (msg.indexOf('rate limit') >= 0 || msg.indexOf('too many') >= 0) {
          showMsg("註冊太頻繁，請稍等 30 秒後重試", true);
        } else if (msg.indexOf('already registered') >= 0 || msg.indexOf('already exists') >= 0) {
          showMsg("此郵箱已註冊，請點擊「登入」", true);
        } else {
          showMsg("註冊失敗：" + msg, true);
        }
        return;
      }
      if (r.data?.user?.identities?.length === 0) {
        showMsg("此郵箱已註冊，請點擊「登入」", true);
      } else {
        showMsg("註冊成功！自動登入中…", false);
        // 註冊後自動嘗試登入
        var loginR = await signIn(email, pw);
        if (loginR.error) {
          showMsg("註冊成功！但需驗證郵箱，請檢查收件箱後重新登入", true);
        } else {
          document.getElementById("auth-modal").remove();
          onSuccess(loginR.data?.user);
        }
      }
    };
  }

  // 暴露到全局
  window.Auth = {
    init: initSupabase,
    getSB: getSB,
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    getUser: getUser,
    getSession: getSession,
    onAuthChange: onAuthChange,
    showModal: showAuthModal,
  };

  // 自動初始化（等 Supabase SDK 載入後）
  function autoInit() {
    initSupabase();
    // 自動更新導航欄登入按鈕
    setTimeout(function(){
      var btn = document.getElementById('nav-auth-btn');
      if (!btn) return;
      getUser().then(function(user){
        if (user) {
          btn.textContent = '👤 ' + (user.email ? user.email.split('@')[0] : '已登录');
          btn.removeAttribute('onclick');
          btn.href = '#';
          btn.addEventListener('click', function(e){ e.preventDefault(); signOut().then(function(){ location.reload(); }); });
        }
      }).catch(function(){});
    }, 800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(autoInit, 100); });
  } else {
    setTimeout(autoInit, 100);
  }
})();
