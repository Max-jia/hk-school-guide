"use client";

import { useState } from "react";
import SchoolCombobox, { type SchoolOpt } from "@/components/SchoolCombobox";
import { assessSchoolFit } from "@/lib/sim-engine";

export default function SchoolFitCard({
  options, score, kidGender, unlocked, buying, buy,
}: {
  options: SchoolOpt[];
  score: number;
  kidGender: string;
  unlocked: boolean;
  buying: boolean;
  buy: () => void;
}) {
  const [picked, setPicked] = useState("");
  const [count, setCount] = useState(0);
  const [sibAtSchool, setSibAtSchool] = useState(false);
  const [parentAtSchool, setParentAtSchool] = useState(false);
  const locked = !unlocked && count >= 1;

  const school = options.find((o) => o.name === picked);
  const outOfRoster = picked.trim() && !school;
  const genderBad =
    school?.gender &&
    kidGender !== "不限" &&
    ((school.gender === "男校" && kidGender === "女") || (school.gender === "女校" && kidGender === "男"));
  const catA = Boolean(school) && (sibAtSchool || parentAtSchool);

  function analyse() {
    if (!picked.trim() || outOfRoster || locked) return;
    if (!unlocked) setCount((c) => c + 1);
  }

  const fit = school ? assessSchoolFit(score, school.quota ?? null, school.name) : null;
  const toneColor =
    fit?.tone === "good" ? "#0F766E" : fit?.tone === "mid" ? "#B45309" : "#C2410C";
  const toneBg =
    fit?.tone === "good" ? "#E7F6F2" : fit?.tone === "mid" ? "#FEF3E2" : "#FDEBE7";

  // 自行分配投表策略（本站方法论，非官方规则；失败无损失、录取即锁定是官方规则）
  function strategy(score: number): { title: string; text: string; tone: "good" | "mid" | "warn" } {
    if (score >= 30) return { title: "强势组合 · 可锁定心仪校", text: "自行分配直接填你最想去的那间：中了就注册，等于提前上岸；不中自动进统派，没损失。", tone: "good" };
    if (score === 25) return { title: "有竞争力 · 放心冲", text: "热门校同分靠抽签，但失败无损失——自行分配就该冲最想进的，别保守。", tone: "good" };
    if (score === 20) return { title: "最常见组合 · 冲一下不亏", text: "热门校基本靠抽签，中了是惊喜，不中自动进统派继续抽。填最想去的，别浪费这次免费机会。", tone: "mid" };
    return { title: "底牌偏弱 · 重心放统派", text: "自行分配陪跑为主，别抱期待；把精力放在统一派位乙部结构和叩门预案上。", tone: "warn" };
  }
  const strat = school && !catA ? strategy(score) : null;

  return (
    <section className="mt-8 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
      <div className="flex items-center gap-2">
        <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">底牌卡 · 我这点分能进吗</h2>
        <span className="rounded-full bg-[#FEF3E2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#B45309]">阶段一 · 自行分配</span>
        {!unlocked && (
          <span className="rounded-full bg-[var(--p-fg)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--p-bg)]">PRO</span>
        )}
      </div>
      <p className="mt-1 text-sm text-[var(--p-secondary)]">
        选一所官津学校，结合你的计分（{score} 分）和该校学额，给出相对竞争位置。免费 1 次，解锁后不限次。
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1">
          <SchoolCombobox options={options} value={picked} onChange={setPicked} placeholder="选择一所官津学校…" />
        </div>
        <button
          onClick={analyse}
          disabled={!picked.trim() || outOfRoster || locked}
          className="rounded-[8px] bg-[var(--p-fg)] px-5 py-2.5 text-sm font-bold text-[var(--p-bg)] disabled:opacity-40"
        >
          {locked ? "已用免费次数 · 解锁后继续" : "分析"}
        </button>
      </div>

      {school && (
        <div className="mt-3 rounded-[8px] bg-[var(--p-bg)] px-4 py-3">
          <p className="font-mono text-xs font-bold uppercase text-[var(--p-secondary)]">甲类资格预检（官方：凡属此类别必获录取）</p>
          <p className="mt-1 text-[11px] leading-relaxed text-[var(--p-secondary)]">
            官方甲类仅限：兄/姊在同一小学（小学部）就读、或父/母在该小学任职。兄/姊在同一校址中学部就读、父/母在同址中学部任职属计分 20 分关系项，不是甲类必录取。
          </p>
          <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--p-fg)]">
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" checked={sibAtSchool} onChange={(e) => setSibAtSchool(e.target.checked)} className="mt-0" />
              兄/姊正在 {school.name} 就读
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" checked={parentAtSchool} onChange={(e) => setParentAtSchool(e.target.checked)} className="mt-0" />
              父/母在 {school.name} 任职
            </label>
          </div>
        </div>
      )}

      {outOfRoster && (
        <p className="mt-3 rounded-[8px] bg-[#FDEBE7] px-4 py-3 text-sm font-bold text-[#C2410C]">
          ⚠️ 「{picked.trim()}」不在官津名册内（可能是直资/私立/国际学校）——不看计分，走自行申请。
        </p>
      )}

      {genderBad && school && (
        <p className="mt-3 rounded-[8px] bg-[#FDEBE7] px-4 py-3 text-sm font-bold text-[#C2410C]">
          ⚠️ 性别不符：{school.name} 为{school.gender}，{kidGender === "女" ? "女孩" : "男孩"}不会获派；这张底牌卡没有实际意义，请改填男女校或在志愿表中移除。
        </p>
      )}

      {catA && school && (
        <div className="mt-3 rounded-[10px] border-l-4 border-[#0F766E] bg-[#E7F6F2] px-4 py-3">
          <p className="font-bold text-[#0F766E]">甲类 · 必录取（官方规则）</p>
          <p className="mt-1 text-sm text-[var(--p-fg)]">
            你符合「{sibAtSchool ? "兄/姊在该校就读" : ""}{sibAtSchool && parentAtSchool ? " ／ " : ""}{parentAtSchool ? "父/母在该校任职" : ""}」条件，属官方甲类——只要申请，必获录取，不看计分、不用抽签。
          </p>
          <p className="mt-1 text-sm text-[#B45309]">
            ⚠️ 关键提醒：获录取后须在指定日期注册，等于退出统一派位。如果这不是你最想去的学校，请想清楚再填——填了被录取，就不能再去统派抽心仪校了。
          </p>
        </div>
      )}

      {fit && school && (
        <div className="relative mt-4">
          <div className="rounded-[12px] border-l-4 px-5 py-4" style={{ borderColor: toneColor, background: toneBg }}>
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl font-bold" style={{ color: toneColor }}>{fit.label}</span>
              <span className="font-mono text-xs text-[var(--p-secondary)]">
                {school.name} · 计分 {score} 分 · 学额 {school.quota ?? "—"}
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--p-fg)]">{fit.advice}</p>
            <p className="mt-2 text-xs text-[var(--p-secondary)]">
              ⓘ 本卡为相对竞争位置（计分段位 × 学额稀缺度），非录取概率；同分一律抽签，数据依据教育局 2027/28 名册。
            </p>
          </div>
          {strat && (
            <div
              className="mt-3 rounded-[10px] border-l-4 px-4 py-3"
              style={{
                borderColor: strat.tone === "good" ? "#0F766E" : strat.tone === "mid" ? "#B45309" : "#C2410C",
                background: strat.tone === "good" ? "#E7F6F2" : strat.tone === "mid" ? "#FEF3E2" : "#FDEBE7",
              }}
            >
              <p className="font-bold text-[var(--p-fg)]">自行分配投表策略 · {strat.title}</p>
              <p className="mt-1 text-sm text-[var(--p-fg)]">{strat.text}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--p-secondary)]">
                规则底线：只能申请 1 间（多交作废）· 失败自动参加统一派位（无损失）· 录取须注册（退出统派）· 没中仍可在统派把同一校放第一志愿（双保险）。
              </p>
            </div>
          )}
          {locked && (
            <div className="absolute inset-0 flex items-center justify-center rounded-[12px] bg-[rgba(255,255,255,.82)]">
              <div className="rounded-[10px] bg-[#FEF3E2] px-6 py-4 text-center text-[#B45309]">
                <p className="font-bold">🔒 免费次数已用完</p>
                <button
                  onClick={buy}
                  disabled={buying}
                  className="mt-3 rounded-[8px] bg-[var(--p-fg)] px-5 py-2 text-sm font-bold text-[var(--p-bg)] disabled:opacity-50"
                >
                  {buying ? "正在前往支付…" : "解锁 · HK$68"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
