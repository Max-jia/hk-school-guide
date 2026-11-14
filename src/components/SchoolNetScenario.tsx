"use client";

import { useState } from "react";
import { L, type Locale } from "@/lib/i18n";

type Config = {
  district: string;
  samples: { label: string; boys: number; girls: number; shared: number }[];
};

export default function SchoolNetScenario({ config, locale }: { config: Config; locale: Locale }) {
  const [sample, setSample] = useState(0);
  const [boys, setBoys] = useState("");
  const [girls, setGirls] = useState("");
  const [share, setShare] = useState(50);
  const data = config.samples[sample];
  const maleSupply = data.boys + data.shared * share / 100;
  const femaleSupply = data.girls + data.shared * (100 - share) / 100;
  const t = (text: string) => L(text, locale);
  function ratio(value: string, supply: number): string {
    if (!value.trim()) return t("未输入假设人数");
    const n = Number(value);
    if (!Number.isSafeInteger(n) || n < 0) return t("请输入非负整数");
    if (supply === 0) return t("供给为0，不能计算");
    return (n / supply).toFixed(2);
  }
  const field = "mt-2 block w-full rounded border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-3 py-2 text-[var(--p-fg)]";
  return (
    <section id="competition-tool" className="mt-10 scroll-mt-24 rounded-xl border border-[var(--p-gray-300)] p-5" aria-label={t("男女竞争情境计算")}>
      <h2 className="!mt-0">{t(config.district + "：改变假设，看结果怎样变")}</h2>
      <p>{t("以下只用2026/27乙部历史样本的非保留位，已排除直属、联系保留位。学校Banding为民间参考，样本定义及分歧见正文。人数及共享比例由你假设，不是2027实际竞争比或录取概率。")}</p>
      <label className="block text-sm font-semibold">{t("学校样本")}
        <select id="net-sample" className={field} value={sample} onChange={(event) => setSample(Number(event.target.value))}>{config.samples.map((item, index) => <option key={item.label} value={index}>{t(item.label)}</option>)}</select>
      </label>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">{t("假设男生竞争人数")}<input id="net-boys" className={field} type="number" min="0" step="1" value={boys} onChange={(event) => setBoys(event.target.value)} /></label>
        <label className="block text-sm">{t("假设女生竞争人数")}<input id="net-girls" className={field} type="number" min="0" step="1" value={girls} onChange={(event) => setGirls(event.target.value)} /></label>
      </div>
      <label className="mt-5 block text-sm">{t("共享位假设分给男生")}：{share}%<input id="net-share" className="mt-3 block w-full" type="range" min="0" max="100" value={share} onChange={(event) => setShare(Number(event.target.value))} /></label>
      <p className="text-sm">{t("男校位")} {data.boys} · {t("女校位")} {data.girls} · {t("男女共享位")} {data.shared} · {t("合计")} {data.boys + data.girls + data.shared}</p>
      <div id="net-results" className="rounded-lg bg-[var(--p-bg-yellow)] p-4 text-sm leading-relaxed" aria-live="polite">
        <p>{t("男生模型供给")} {maleSupply.toFixed(1)}，{t("情境指数")} {ratio(boys, maleSupply)}；{t("女生模型供给")} {femaleSupply.toFixed(1)}，{t("情境指数")} {ratio(girls, femaleSupply)}。</p>
      </div>
      <p className="text-sm">{t("公式：假设人数 ÷（同性别单性别学校非保留位 ＋ 共享位的假设分配）。共享位合计只算一次；小数源于演示分摊，实际学位是整数。指数低于1也不保证录取，实际还受组别、志愿与随机编号等影响。")}</p>
    </section>
  );
}
