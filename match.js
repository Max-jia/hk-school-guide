// match.js v3 — 择校匹配引擎（小学 + 幼稚园）
// 综合推荐分 = 适配分(55%) + 学校实力分(45%)：好学校 + 合适 → 分高，排序也用它。
// 兼容浏览器(<script>)和 Node(require)。

(function (global) {
  "use strict";

  // 等级：徽章文案/评语/样式 + 学校实力分(用于综合分)
  const TIER_META = {
    "S":  { label: "🏆 S级 · 顶尖神校", blurb: "全港公认顶尖，竞争极大", cls: "s", strength: 100 },
    "A+": { label: "🥇 A+级 · 一流名校", blurb: "老牌名校，升学出色", cls: "aplus", strength: 88 },
    "A":  { label: "🌟 A级 · 区内名校", blurb: "区内热门，口碑扎实", cls: "a", strength: 78 },
    "B":  { label: "✅ B级 · 优质之选", blurb: "稳健可靠的好学校", cls: "b", strength: 68 },
  };
  function tierMeta(t) { return TIER_META[t] || { label: "⚪ 暂无评级", blurb: "暂无公开评级，仅供参考", cls: "none", strength: 58 }; }
  // 综合分：适配分55% + 实力分45%
  function overall(fit, tier) { return Math.round(0.55 * Math.min(100, fit) + 0.45 * tierMeta(tier).strength); }

  function haversineKm(a, b) {
    if (!a || !b || a.lat == null || b.lat == null) return null;
    const R = 6371, toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng);
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  }

  // ===== 小学 适配分 =====
  function fitSchool(school, profile) {
    let score = 0; const reasons = []; const ft = school.finance_type;
    if (ft === "官立" || ft === "资助") {
      if (profile.net && school.school_net === profile.net) { score += 45; reasons.push(`✅ 在你的校网内（${profile.net} 网），可参加统一派位`); }
      else if (school.school_net && school.school_net !== "不限校网") { score += 15; reasons.push(`不在你校网（${school.school_net} 网），仅"自行分配"可报`); }
      else { score += 20; reasons.push(`校网待确认`); }
    } else { score += 25; reasons.push(`${ft}·全港自由招生，不受校网限制`); }
    const table = {
      local: { 官立: 28, 资助: 28, 直资: 16, 私立: 8, 英基: 2 },
      dss: { 直资: 28, 私立: 16, 资助: 10, 官立: 10, 英基: 4 },
      international: { 英基: 28, 私立: 20, 直资: 10, 资助: 2, 官立: 2 },
      any: { 官立: 16, 资助: 16, 直资: 16, 私立: 16, 英基: 16 },
    }[profile.track || "any"] || {};
    if (table[ft] != null) score += table[ft];
    const b = profile.budget || "any";
    if (b === "free") { if (ft === "官立" || ft === "资助") { score += 15; reasons.push(`免费（官津）`); } else reasons.push(`💰 收费学校，可能超预算`); }
    else if (b === "mid") { if (ft === "直资") { score += 15; reasons.push(`直资·学费中等`); } else if (ft === "官立" || ft === "资助") score += 9; }
    else if (b === "high") score += 12;

    // ⑧ 孩子性格配分（8分）：根据学校特征推断氛围，匹配性格偏好
    const pers = profile.personality;
    if (pers && pers !== "balanced") {
      var pScore = 0;
      var isHighTier = (school.tier === "S" || school.tier === "A+");
      var isDss = (ft === "直资");
      var isReligious = (school.religion_zh && (school.religion_zh.indexOf("天主") >= 0 || school.religion_zh.indexOf("基督") >= 0));
      var isGovt = (ft === "官立");
      if (pers === "active") {
        // 活泼好动 → 活动型学校：直资非宗教、有多元活动特征
        if (isDss && !isReligious) pScore += 5;
        else if (isDss) pScore += 3;
        if (school.features && /活动|STEAM|课外|探索|体验/.test(school.features)) pScore += 3;
        reasons.push("🎯 活动丰富·适合活泼孩子");
      } else if (pers === "quiet") {
        // 安静守规 → 传统纪律型：宗教背景、官立
        if (isReligious && isGovt) pScore += 5;
        else if (isReligious) pScore += 4;
        else if (isGovt) pScore += 3;
        if (school.religion_zh && school.religion_zh !== "不適用") pScore += 3;
        reasons.push("📏 校风严谨·适合安静守规的孩子");
      } else if (pers === "challenge") {
        // 喜欢挑战 → 名校竞争型
        if (school.tier === "S") pScore += 8;
        else if (school.tier === "A+") pScore += 6;
        else if (school.tier === "A") pScore += 4;
        else if (isHighTier) pScore += 5;
        if (pScore > 0) reasons.push("🏅 名校竞争环境·适合喜欢挑战的孩子");
      }
      score += Math.min(8, pScore);
    }

    return { fit: Math.round(Math.min(100, score)), reasons };
  }

  function rankSchools(schools, profile, topN) {
    return schools.map((s) => { const r = fitSchool(s, profile); return { school: s, score: overall(r.fit, s.tier), fit: r.fit, reasons: r.reasons }; })
      .sort((a, b) => b.score - a.score).slice(0, topN || 12);
  }

  // ===== 幼稚园：实力分(等级90%+师生比10%) + 适配分评分卡 =====
  function ratioScore(r) {
    if (!r) return null;
    const m = /(\d+):([\d.]+)/.exec(r);
    if (!m) return null;
    const x = parseFloat(m[2]);                 // 1:x
    return Math.max(0, Math.min(100, 100 - (x - 6) * 8));  // 1:6→100, 1:8→84, 1:10→68
  }
  function kgStrength(kg) {
    const base = tierMeta(kg.tier).strength;
    const rs = ratioScore(kg.teacher_ratio);
    return rs == null ? base : Math.round(base * 0.9 + rs * 0.1);
  }
  // 适配分评分卡：没填/没数据的因子自动跳过，按“生效因子”归一到100
  function fitKindergarten(kg, profile) {
    let earned = 0, total = 0; const reasons = []; const label = profile.homeLabel || "所选区";
    // 通勤 20（总计）
    const dist = haversineKm(profile.home, { lat: kg.lat, lng: kg.lng });
    if (dist != null) {
      total += 20; const cap = profile.maxCommuteKm || 3;
      if (dist > cap) reasons.push(`⚠️ 距 ${label} 中心约 ${dist.toFixed(1)} 公里，超出通勤`);
      else { earned += 20 * (1 - dist / cap); reasons.push(`距 ${label} 中心约 ${dist.toFixed(1)} 公里`); }
    }
    // 直升小学 30（仅当用户想要）
    if (profile.wantFeeder) {
      total += 30;
      if (kg.feeder_primary) { earned += 30; reasons.push(`🎓 直升 ${kg.feeder_primary}`); }
      else reasons.push(`无直属小学`);
    }
    // 学费预算 20（预算上限逻辑：不超即满分）
    if (profile.budgetMax != null && kg.fee_year != null) {
      total += 20;
      if (kg.fee_year <= profile.budgetMax) { earned += 20; reasons.push(`💰 ${kg.fees || "在预算内"}`); }
      else reasons.push(`💰 ${kg.fees}（超预算）`);
    }
    // 学校类型 15
    if (profile.typePref && kg.kg_type) {
      total += 15;
      if (kg.kg_type === profile.typePref) { earned += 15; reasons.push(`✅ ${kg.kg_type}`); }
    }
    // 授课语言 15
    if (profile.langPref && kg.teaching_language) {
      total += 15;
      const ok = profile.langPref === "普通话" ? kg.lang_mand : (profile.langPref === "英语" ? kg.lang_eng : true);
      if (ok) { earned += 15; reasons.push(`🗣️ ${kg.teaching_language}`); }
      else reasons.push(`🗣️ ${kg.teaching_language}`);
    }
    const fit = total > 0 ? Math.round(earned / total * 100) : 60;
    return { fit, reasons };
  }
  function rankKindergartens(kgs, profile, topN) {
    return kgs.map((k) => {
      const r = fitKindergarten(k, profile);
      return { school: k, score: Math.round(0.6 * kgStrength(k) + 0.4 * r.fit), fit: r.fit, reasons: r.reasons };
    }).sort((a, b) => b.score - a.score).slice(0, topN || 12);
  }

  const api = { haversineKm, fitSchool, rankSchools, fitKindergarten, rankKindergartens, TIER_META, tierMeta, overall };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else global.Match = api;
})(typeof window !== "undefined" ? window : globalThis);
