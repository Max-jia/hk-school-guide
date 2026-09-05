"use client";

import { useState } from "react";

const NAV: { label: string; href: string; rot: string }[] = [
  { label: "深度报告", href: "/reports", rot: "-rotate-2" },
  { label: "分区盘点", href: "/districts", rot: "rotate-2" },
  { label: "择校工具", href: "/tools", rot: "rotate-1" },
  { label: "学校对比", href: "/compare", rot: "-rotate-1" },
  { label: "面试题库", href: "/questions", rot: "-rotate-1" },
  { label: "热文", href: "/blog", rot: "rotate-2" },
];

const MENU: { label: string; sub: string; href: string; rot: string }[] = [
  { label: "首页", sub: "12 个精选故事", href: "/", rot: "-rotate-2" },
  { label: "深度报告", sub: "126 所学校 · 8 章讲透", href: "/reports", rot: "rotate-1" },
  { label: "分区盘点", sub: "18 区学校逐区看", href: "/districts", rot: "rotate-2" },
  { label: "择校工具", sub: "输入条件 · 排出结果", href: "/tools", rot: "-rotate-1" },
  { label: "学校对比", sub: "2-3 所并排看", href: "/compare", rot: "rotate-2" },
  { label: "面试题库", sub: "按学校筛真题", href: "/questions", rot: "rotate-2" },
  { label: "热文", sub: "33 篇择校攻略", href: "/blog", rot: "-rotate-1" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 pb-4 pt-8 font-sans">
      <a
        href="/"
        className="inline-block -rotate-3 text-2xl font-bold tracking-tight text-[var(--p-fg)] no-underline transition-transform duration-100 hover:-rotate-1 hover:scale-105 md:text-3xl lg:text-4xl"
      >
        港学荟
      </a>
      <nav className="flex flex-wrap items-center gap-2 md:gap-3">
        {NAV.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className={`rounded-[8px] border-2 border-[var(--p-fg)] bg-[var(--p-bg)] px-3 py-1.5 text-xs font-bold text-[var(--p-fg)] no-underline shadow-[2px_3px_0_rgba(0,0,0,0.15)] transition-transform duration-100 ${n.rot} hover:rotate-0 hover:scale-105 md:text-sm`}
          >
            {n.label}
          </a>
        ))}
        <button
          aria-label="open menu"
          onClick={() => setOpen(true)}
          className="transition-transform duration-100 hover:rotate-6 hover:scale-110"
        >
          <img src="/stickers/more@2x.png" alt="menu" className="w-[102px] max-w-none" />
        </button>
      </nav>

      {open && (
        <>
          {/* 隐形遮罩:点面板外空白关闭(原站无遮罩,这里视觉不可见,只保功能) */}
          <div className="fixed inset-0 z-[1000]" onClick={() => setOpen(false)} />
          <div className="fixed right-0 top-0 z-[1001] h-full w-[85vw] max-w-[360px] bg-[#262626]">
            <button
              aria-label="close menu"
              onClick={() => setOpen(false)}
              className="absolute right-0 top-0 flex h-[42px] w-[42px] items-center justify-center text-xl font-bold text-white"
            >
              ✕
            </button>
            <nav className="flex flex-col gap-6 px-6 pt-20">
              {MENU.map((m) => (
                <a
                  key={m.label}
                  href={m.href}
                  onClick={() => setOpen(false)}
                  className={`group w-fit rounded-[10px] border-2 border-[#111] bg-white px-6 py-3 no-underline shadow-[3px_4px_0_rgba(0,0,0,0.35)] transition-transform duration-100 ${m.rot} hover:translate-x-1 hover:rotate-0`}
                >
                  <span className="block font-serif text-xl font-bold leading-tight text-black md:text-2xl">
                    {m.label}
                  </span>
                  <span className="mt-1 block text-xs text-[#666]">{m.sub}</span>
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
