"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { L, LOCALE_META, localeHref, otherLocale, type Locale } from "@/lib/i18n";
import { REPORT_COUNT } from "@/lib/report-count";
import { useDirectoryQuery } from "@/lib/use-directory-query";

const NAV: { label: string; href: string; rot: string }[] = [
  { label: "开始规划", href: "/planning", rot: "rotate-1" },
  { label: "深度报告", href: "/reports", rot: "-rotate-2" },
  { label: "择校工具", href: "/tools", rot: "rotate-1" },
  { label: "学校对比", href: "/compare", rot: "-rotate-1" },
  { label: "我的候选", href: "/shortlist", rot: "rotate-2" },
];

const STAGE_NAV: { label: string; href: string }[] = [
  { label: "幼稚园", href: "/schools/kindergarten" },
  { label: "小学", href: "/schools/primary" },
  { label: "中学", href: "/schools/secondary" },
];

const MENU: { label: string; sub: string; href: string; rot: string }[] = [
  { label: "首页", sub: "12 个精选故事", href: "/", rot: "-rotate-2" },
  { label: "开始规划", sub: "按阶段与路线进入", href: "/planning", rot: "rotate-1" },
  { label: "深度报告", sub: `${REPORT_COUNT} 所学校 · 8 章讲透`, href: "/reports", rot: "rotate-1" },
  { label: "分区盘点", sub: "18 区学校逐区看", href: "/districts", rot: "rotate-2" },
  { label: "幼稚园", sub: "幼稚园学校资料与择校攻略", href: "/schools/kindergarten", rot: "-rotate-1" },
  { label: "小学", sub: "小学学校资料与择校攻略", href: "/schools/primary", rot: "rotate-1" },
  { label: "中学", sub: "本地中学资料与升学路径", href: "/schools/secondary", rot: "rotate-2" },
  { label: "择校工具", sub: "输入条件 · 排出结果", href: "/tools", rot: "-rotate-1" },
  { label: "学校对比", sub: "两所学校并排比较", href: "/compare", rot: "rotate-2" },
  { label: "我的候选", sub: "收藏的学校清单", href: "/shortlist", rot: "rotate-1" },
  { label: "面试题库", sub: "按学校筛真题", href: "/questions", rot: "rotate-2" },
  { label: "热文", sub: "按主题查找择校攻略", href: "/blog", rot: "-rotate-1" },
];

export default function SiteHeader({ locale = "tc", compact = false }: { locale?: Locale; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || "/";

  // 语言切换:去掉当前路径上的 /cn 前缀,再套到另一种语言。
  // 用真正的 <a> 而不是纯前端 toggle,Google 才抓得到简体版本。
  const basePath = pathname.replace(/^\/cn(?=\/|$)/, "") || "/";
  const target = otherLocale(locale);
  const directoryQuery = useDirectoryQuery();
  const switchHref = localeHref(basePath, target) + (basePath.startsWith("/schools/kindergarten/directory") ? directoryQuery : "");

  useEffect(() => {
    if (!open) return;

    const panel = menuPanelRef.current;
    const trigger = menuTriggerRef.current;
    if (!panel) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const previousBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    panel.querySelector<HTMLButtonElement>("[data-menu-close]")?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
      ));
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.left = previousBodyStyles.left;
      body.style.right = previousBodyStyles.right;
      body.style.width = previousBodyStyles.width;
      body.style.overflow = previousBodyStyles.overflow;
      trigger?.focus();
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => window.scrollTo(0, scrollY));
      });
    };
  }, [open]);

  return (
    <header className={`mx-auto w-full max-w-[1280px] px-4 py-3 font-sans ${compact ? "md:pb-2 md:pt-4" : "md:pb-4 md:pt-8"}`}>
      <div className="flex items-center justify-between gap-2 md:gap-3">
        <a
          href={localeHref("/", locale)}
          className="group flex shrink-0 flex-col items-start no-underline"
        >
          <span className="inline-block -rotate-3 text-2xl font-bold tracking-tight text-[var(--p-fg)] transition-transform duration-100 group-hover:-rotate-1 group-hover:scale-105 md:text-3xl lg:text-4xl">
            {L("港学荟", locale)}
          </span>
          <span className="mt-1 whitespace-nowrap text-xs font-bold tracking-[0.08em] text-[var(--p-secondary)]">
            香港教育规划第一站
          </span>
        </a>
        <nav className="flex items-center gap-2 md:flex-wrap md:gap-3" aria-label={L("主要服務", locale)}>
          {NAV.map((n) => (
            <a
              key={n.href}
              href={localeHref(n.href, locale)}
              className={`hidden min-h-11 items-center rounded-[8px] border-2 border-[var(--p-fg)] bg-[var(--p-bg)] px-3 py-2 text-xs font-bold text-[var(--p-fg)] no-underline shadow-[2px_3px_0_rgba(0,0,0,0.15)] transition-transform duration-100 md:inline-flex ${n.rot} hover:rotate-0 hover:scale-105 md:text-sm`}
            >
              {L(n.label, locale)}
            </a>
          ))}
          <a
            href={switchHref}
            hrefLang={LOCALE_META[target].hreflang}
            aria-label={`${L("切换到", locale)}${LOCALE_META[target].label}`}
            className="inline-flex min-h-11 items-center whitespace-nowrap rounded-[8px] border-2 border-dashed border-[var(--p-fg)] bg-transparent px-2.5 py-2 text-xs font-bold text-[var(--p-fg)] no-underline transition-transform duration-100 hover:scale-105 md:text-sm"
          >
            {LOCALE_META[target].label}
          </a>
          <button
            ref={menuTriggerRef}
            aria-label={L("開啟導覽選單", locale)}
            aria-expanded={open}
            aria-controls="site-nav-menu"
            onClick={() => setOpen(true)}
            className="flex min-h-11 min-w-11 items-center justify-center transition-transform duration-100 hover:rotate-6 hover:scale-110"
          >
            <Image src="/stickers/more@2x.png" alt="" width={454} height={240} sizes="(max-width: 767px) 56px, 102px" className="h-auto w-14 max-w-none md:w-[102px]" />
          </button>
        </nav>
      </div>
      <nav aria-label={L("按學段瀏覽學校", locale)} className={`${compact ? "mt-2 py-1" : "mt-4 py-2"} flex gap-2 overflow-x-auto border-y border-black/10 dark:border-white/10`}>
        {STAGE_NAV.map((item) => (
          <a key={item.href} href={localeHref(item.href, locale)} className="inline-flex min-h-10 shrink-0 items-center rounded-full bg-[#eaf1ec] px-4 py-2 text-sm font-bold text-[#214b3c] no-underline transition-colors hover:bg-[#dce9df] dark:bg-white/10 dark:text-white dark:hover:bg-white/15">
            {L(item.label, locale)}
          </a>
        ))}
      </nav>

      {open && (
        <>
          {/* 隐形遮罩:点面板外空白关闭(原站无遮罩,这里视觉不可见,只保功能) */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[1000] cursor-default border-0 bg-transparent p-0"
          />
          <div
            ref={menuPanelRef}
            id="site-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label={L("網站導覽", locale)}
            className="fixed right-0 top-0 z-[1001] h-dvh max-h-dvh w-[85vw] max-w-[360px] overflow-y-auto overscroll-contain bg-[#262626]"
          >
            <div className="sticky top-0 z-10 flex justify-end bg-[#262626] px-4 pt-[env(safe-area-inset-top)]">
              <button
                data-menu-close
                aria-label={L("關閉導覽選單", locale)}
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center text-xl font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-6 px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-4">
              {MENU.map((m) => (
                <a
                  key={m.href}
                  href={localeHref(m.href, locale)}
                  onClick={() => setOpen(false)}
                  className={`group w-fit rounded-[10px] border-2 border-[#111] bg-white px-6 py-3 no-underline shadow-[3px_4px_0_rgba(0,0,0,0.35)] transition-transform duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${m.rot} hover:translate-x-1 hover:rotate-0`}
                >
                  <span className="block font-serif text-xl font-bold leading-tight text-black md:text-2xl">
                    {L(m.label, locale)}
                  </span>
                  <span className="mt-1 block text-xs text-[#666]">{L(m.sub, locale)}</span>
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
