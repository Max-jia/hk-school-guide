import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import districts from "@/content/districts.json";

const DISTRICTS = districts as { slug: string; zh: string; en: string; blurb: string }[];

export const metadata: Metadata = {
  title: "香港 18 区小学与幼稚园盘点：校网、评级、学费一次看清",
  description:
    "按地区浏览香港小学与幼稚园：中西区、湾仔、九龙城、沙田……每区列出学校清单、评级、学费与师生比，数据来自教育局公开资料。",
};

export default function DistrictsPage() {
  return (
    <main className="w-full">
      <SiteHeader />
      <div className="mx-auto max-w-[1280px] px-4 pb-24">
        <div className="py-8">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Districts · 分区盘点</p>
          <h1 className="font-serif text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-1px] text-[var(--p-fg)]">
            香港 18 区小学与幼稚园盘点
          </h1>
          <p className="mt-2 max-w-[620px] text-[var(--p-secondary)]">
            从「我住哪区」出发选校：每区列出小学与幼稚园清单、平台评级、学费与师生比。
          </p>
          <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-[var(--p-secondary)]">
            数据来自教育局学校概览（KGP/PSP 2025）与公开资料，评级为本平台参考体系，
            不构成入学建议；各校实际收生与收费以校方最新公布为准。
          </p>
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {DISTRICTS.map((d) => (
            <li key={d.slug}>
              <a
                href={`/districts/${d.slug}`}
                className="block h-full rounded-[12px] border border-black/10 bg-[var(--p-bg)] p-5 no-underline shadow-[0_2px_1px_rgba(0,0,0,.3)] transition-transform duration-100 hover:-translate-y-0.5 dark:border-white/10"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-serif text-xl font-bold text-[var(--p-fg)]">{d.zh}</h2>
                  <span className="font-mono text-xs uppercase text-[var(--p-secondary)]">{d.en}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{d.blurb}</p>
                <span className="mt-3 inline-block font-mono text-xs font-bold uppercase text-[var(--p-fg)]">
                  查看分区学校 →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <SiteFooter />
    </main>
  );
}
