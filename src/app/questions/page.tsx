"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle, ThumbsUp, Star, Share2, Check } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import questions from "@/content/questions.json";

type Q = {
  n: string; t?: string; d?: string; lvl?: string; yr?: string; format?: string;
  rounds?: { title: string; items: string[] }[]; sources?: string[];
};
type QaItem = { id: string; school: string; category: string; question: string; createdAt: number; replies?: number; likes?: number; favorites?: number; shares?: number };
type QaReply = { id: string; body: string; createdAt: number; likes?: number };
const LIST: Q[] = (questions as (Q | null)[]).filter((x): x is Q => x != null);

const TYPES = ["全部", "直资", "私立", "资助", "幼稚园"];
const LEVELS = ["全部", "S", "A+", "A", "B"];

export default function QuestionsPage() {
  const [deviceId] = useState<string>(() => {
    if (typeof window === "undefined") return "ssr";
    const k = "hksg_qa_device";
    let v = window.localStorage.getItem(k);
    if (!v) {
      v = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      window.localStorage.setItem(k, v);
    }
    return v;
  });
  const [type, setType] = useState("全部");
  const [lvl, setLvl] = useState("全部");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [qaItems, setQaItems] = useState<QaItem[]>([]);
  const [qaSchool, setQaSchool] = useState("");
  const [qaCategory, setQaCategory] = useState("面试");
  const [qaText, setQaText] = useState("");
  const [qaMsg, setQaMsg] = useState("");
  const [openReplyId, setOpenReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyMap, setReplyMap] = useState<Record<string, QaReply[]>>({});
  const [replyMsg, setReplyMsg] = useState("");
  const [qaSort, setQaSort] = useState<"new" | "hot">("new");
  const [qaFilter, setQaFilter] = useState<"all" | "fav">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function getFavs(): string[] {
    try {
      return JSON.parse(window.localStorage.getItem("hksg_qa_favs") || "[]") as string[];
    } catch {
      return [];
    }
  }
  function setFavs(list: string[]) {
    window.localStorage.setItem("hksg_qa_favs", JSON.stringify(list));
  }

  async function interact(id: string, type: "like" | "favorite" | "share") {
    try {
      const r = await fetch(`/api/questions/${id}/interact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, deviceId }),
      });
      const d = await r.json();
      if (!d?.ok) return;
      setQaItems((p) =>
        p.map((x) =>
          x.id === id
            ? {
                ...x,
                likes: type === "like" ? d.likes : x.likes,
                favorites: type === "favorite" ? d.favorites : x.favorites,
                shares: type === "share" ? d.shares : x.shares,
              }
            : x
        )
      );
      if (type === "favorite") {
        const favs = getFavs();
        const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
        setFavs(next);
      }
    } catch {
      // ignore
    }
  }

  async function likeReply(questionId: string, replyId: string) {
    try {
      const r = await fetch(`/api/questions/${questionId}/replies/${replyId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId }),
      });
      const d = await r.json();
      if (!d?.ok) return;
      setReplyMap((p) => ({
        ...p,
        [questionId]: (p[questionId] || []).map((rep) =>
          rep.id === replyId ? { ...rep, likes: d.likes } : rep
        ),
      }));
    } catch {
      // ignore
    }
  }

  async function share(id: string) {
    await interact(id, "share");
    const url = `${window.location.origin}/questions#qa-${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    fetch("/api/questions")
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) setQaItems(d.items || []);
      })
      .catch(() => {});
  }, []);

  async function submitQa() {
    if (qaText.trim().length < 5) {
      setQaMsg("问题至少 5 个字，描述具体一点更容易得到回应。");
      return;
    }
    setQaMsg("");
    try {
      const r = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school: qaSchool, category: qaCategory, question: qaText }),
      });
      const d = await r.json();
      if (d?.ok) {
        setQaItems((p) => [d.item, ...p].slice(0, 50));
        setQaSchool("");
        setQaText("");
        setQaMsg("✅ 已提交，会展示在下方公开列表。");
      } else if (d?.reason === "rate_limited") {
        setQaMsg("提交太频繁，请一分钟后再试。");
      } else {
        setQaMsg("提交失败，请稍后再试。");
      }
    } catch {
      setQaMsg("提交失败，请稍后再试。");
    }
  }

  async function toggleReplies(id: string) {
    const next = openReplyId === id ? null : id;
    setOpenReplyId(next);
    if (next && !replyMap[id]) {
      try {
        const r = await fetch(`/api/questions/${id}/replies`);
        const d = await r.json();
        if (d?.ok) setReplyMap((p) => ({ ...p, [id]: d.items || [] }));
      } catch {
        // ignore
      }
    }
  }

  async function submitReply(id: string) {
    if (replyText.trim().length < 2) {
      setReplyMsg("回答至少 2 个字。");
      return;
    }
    setReplyMsg("");
    try {
      const r = await fetch(`/api/questions/${id}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: replyText }),
      });
      const d = await r.json();
      if (d?.ok) {
        setReplyMap((p) => ({ ...p, [id]: [d.item, ...(p[id] || [])] }));
        setReplyText("");
      } else if (d?.reason === "rate_limited") {
        setReplyMsg("提交太频繁，请一分钟后再试。");
      } else {
        setReplyMsg("回答提交失败，请稍后再试。");
      }
    } catch {
      setReplyMsg("回答提交失败，请稍后再试。");
    }
  }

  const list = useMemo(() => {
    const chars = q.trim().toLowerCase().split("");
    return LIST.filter((x) => {
      if (type !== "全部" && x.t !== type) return false;
      if (lvl !== "全部" && x.lvl !== lvl) return false;
      if (!q.trim()) return true;
      const hay = (x.n + " " + (x.d || "")).toLowerCase();
      return chars.every((c) => hay.includes(c));
    });
  }, [type, lvl, q]);

  return (
    <main className="w-full">
      <SiteHeader />
      <div className="mx-auto max-w-[980px] px-4 pb-24">
        <div className="py-8">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Interview Questions · 面试真题</p>
          <h1 className="font-serif text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-1px] text-[var(--p-fg)]">
            25 所学校的面试真题库
          </h1>
          <p className="mt-2 max-w-[560px] text-[var(--p-secondary)]">
            每套真题标注多源核实，来源见题内标注。点击展开面试流程与题目。
          </p>
          <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-[var(--p-secondary)]">
            面试题库按学校、类型、评级整理，收录直资、私立、资助小学与名幼的历年面试形式、
            常见题目与家长问卷要点。题目来源为校方公布资料与家长分享，部分年份题目可能调整，
            实际面试内容以学校当年通知为准。
          </p>
          <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-[var(--p-secondary)]">
            题库的整理逻辑是「流程 + 题目 + 考察点」三层：先看学校面试怎么组织（个人/小组/家长环节），
            再看历年出现过的真题类型，最后拆解学校真正考察的能力。直资与私立小学更看重表达与逻辑，
            幼稚园则普遍采用情境观察，了解差异能帮你把准备时间花在刀刃上。
          </p>
        </div>

        {/* 家长问答 UGC */}
        <div className="mb-10 rounded-[12px] border border-black/10 bg-[var(--p-bg)] p-5 dark:border-white/10">
          <h2 className="font-serif text-xl font-bold text-[var(--p-fg)]">家长问答 · 你遇到过什么问题？</h2>
          <p className="mt-1 text-sm text-[var(--p-secondary)]">
            提交你实际遇到的面试/报名问题，其他家长和我们的编辑会一起补答案。公开显示，请勿留个人联系方式。
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_2fr]">
            <input
              value={qaSchool}
              onChange={(e) => setQaSchool(e.target.value)}
              placeholder="学校（可选）"
              className="rounded-[6px] border border-[rgba(48,48,48,.4)] bg-[var(--p-bg)] p-2 text-sm text-[var(--p-fg)] outline-none"
            />
            <select
              value={qaCategory}
              onChange={(e) => setQaCategory(e.target.value)}
              className="rounded-[6px] border border-[rgba(48,48,48,.4)] bg-[var(--p-bg)] p-2 text-sm text-[var(--p-fg)] outline-none"
            >
              <option>面试</option>
              <option>报名</option>
              <option>学费</option>
              <option>插班</option>
              <option>其他</option>
            </select>
            <div className="flex gap-2">
              <input
                value={qaText}
                onChange={(e) => setQaText(e.target.value)}
                placeholder="例如：协恩 K1 面试家长要陪同吗？"
                className="min-w-0 flex-1 rounded-[6px] border border-[rgba(48,48,48,.4)] bg-[var(--p-bg)] p-2 text-sm text-[var(--p-fg)] outline-none"
                onKeyDown={(e) => e.key === "Enter" && submitQa()}
              />
              <button
                onClick={submitQa}
                className="shrink-0 rounded-[6px] bg-[var(--p-fg)] px-4 py-2 font-mono text-sm uppercase text-[var(--p-bg)] transition-opacity hover:opacity-85"
              >
                提交
              </button>
            </div>
          </div>
          {qaMsg && <p className="mt-3 text-sm text-[var(--p-secondary)]">{qaMsg}</p>}

          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-sm uppercase">
            <button
              onClick={() => setQaFilter("all")}
              className={`rounded-full border border-[var(--p-fg)] px-3 py-1 ${qaFilter === "all" ? "bg-[var(--p-fg)] text-[var(--p-bg)]" : "text-[var(--p-fg)]"}`}
            >
              全部问题
            </button>
            <button
              onClick={() => setQaFilter("fav")}
              className={`rounded-full border border-[var(--p-fg)] px-3 py-1 ${qaFilter === "fav" ? "bg-[var(--p-fg)] text-[var(--p-bg)]" : "text-[var(--p-fg)]"}`}
            >
              <span className="inline-flex items-center gap-1"><Star className="size-3.5" />我的收藏</span>
            </button>
            <span className="opacity-33">|</span>
            <button
              onClick={() => setQaSort("new")}
              className={`rounded-full border border-[var(--p-fg)] px-3 py-1 ${qaSort === "new" ? "bg-[var(--p-fg)] text-[var(--p-bg)]" : "text-[var(--p-fg)]"}`}
            >
              最新
            </button>
            <button
              onClick={() => setQaSort("hot")}
              className={`rounded-full border border-[var(--p-fg)] px-3 py-1 ${qaSort === "hot" ? "bg-[var(--p-fg)] text-[var(--p-bg)]" : "text-[var(--p-fg)]"}`}
            >
              最有帮助
            </button>
          </div>

          {qaItems.filter((x) => qaFilter !== "fav" || getFavs().includes(x.id))
            .sort((a, b) => (qaSort === "hot" ? (b.likes || 0) - (a.likes || 0) : b.createdAt - a.createdAt))
            .length > 0 && (
            <ul className="m-0 mt-4 list-none divide-y divide-black/10 p-0 dark:divide-white/10">
              {qaItems.filter((x) => qaFilter !== "fav" || getFavs().includes(x.id))
                .sort((a, b) => (qaSort === "hot" ? (b.likes || 0) - (a.likes || 0) : b.createdAt - a.createdAt))
                .slice(0, 50)
                .map((x) => (
                <li key={x.id} id={`qa-${x.id}`} className="py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[var(--p-fg)] px-2 py-0.5 font-mono text-xs uppercase text-[var(--p-fg)]">
                      {x.category}
                    </span>
                    {x.school && (
                      <span className="font-mono text-xs text-[var(--p-secondary)]">{x.school}</span>
                    )}
                    <span className="ml-auto font-mono text-xs text-[var(--p-secondary)]">
                      {new Date(x.createdAt).toLocaleDateString("zh-HK")}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--p-fg)]">{x.question}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => toggleReplies(x.id)}
                      className="rounded-full border border-[var(--p-fg)] px-3 py-0.5 font-mono text-xs uppercase text-[var(--p-fg)] transition-colors hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]"
                    >
                      <span className="inline-flex items-center gap-1"><MessageCircle className="size-3.5" />回答 ({replyMap[x.id]?.length ?? x.replies ?? 0})</span>
                    </button>
                    <button
                      onClick={() => interact(x.id, "like")}
                      className="rounded-full border border-[var(--p-fg)] px-3 py-0.5 font-mono text-xs uppercase text-[var(--p-fg)] transition-colors hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]"
                    >
                      <span className="inline-flex items-center gap-1"><ThumbsUp className="size-3.5" />{x.likes ?? 0}</span>
                    </button>
                    <button
                      onClick={() => interact(x.id, "favorite")}
                      className={`rounded-full border border-[var(--p-fg)] px-3 py-0.5 font-mono text-xs uppercase transition-colors ${
                        getFavs().includes(x.id) ? "bg-[var(--p-fg)] text-[var(--p-bg)]" : "text-[var(--p-fg)] hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]"
                      }`}
                    >
                      <span className="inline-flex items-center gap-1"><Star className="size-3.5" />{x.favorites ?? 0}</span>
                    </button>
                    <button
                      onClick={() => share(x.id)}
                      className="rounded-full border border-[var(--p-fg)] px-3 py-0.5 font-mono text-xs uppercase text-[var(--p-fg)] transition-colors hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]"
                    >
                      <span className="inline-flex items-center gap-1">
                        {copiedId === x.id ? <Check className="size-3.5" /> : <Share2 className="size-3.5" />}
                        {copiedId === x.id ? "已复制链接" : `转发 ${x.shares ?? 0}`}
                      </span>
                    </button>
                  </div>

                  {openReplyId === x.id && (
                    <div className="mt-3 rounded-[8px] bg-black/[0.03] p-3 dark:bg-white/[0.05]">
                      {(replyMap[x.id] || []).length > 0 ? (
                        <ul className="m-0 list-none space-y-2 p-0">
                          {(replyMap[x.id] || []).map((r) => (
                            <li key={r.id} className="text-sm text-[var(--p-fg)]">
                              <span className="mr-2 font-mono text-xs text-[var(--p-secondary)]">
                                {new Date(r.createdAt).toLocaleDateString("zh-HK")}
                              </span>
                              {r.body}
                              <button
                                onClick={() => likeReply(x.id, r.id)}
                                className="ml-2 rounded-full border border-[var(--p-fg)] px-2 py-0.5 font-mono text-xs uppercase text-[var(--p-fg)] transition-colors hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]"
                              >
                                <span className="inline-flex items-center gap-1"><ThumbsUp className="size-3" />{r.likes ?? 0}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-[var(--p-secondary)]">还没有回答，来写第一条。</p>
                      )}
                      <div className="mt-3 flex gap-2">
                        <input
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && submitReply(x.id)}
                          placeholder="写下你的回答…"
                          className="min-w-0 flex-1 rounded-[6px] border border-[rgba(48,48,48,.4)] bg-[var(--p-bg)] p-2 text-sm text-[var(--p-fg)] outline-none"
                        />
                        <button
                          onClick={() => submitReply(x.id)}
                          className="shrink-0 rounded-[6px] bg-[var(--p-fg)] px-4 py-2 font-mono text-xs uppercase text-[var(--p-bg)] transition-opacity hover:opacity-85"
                        >
                          回答
                        </button>
                      </div>
                      {replyMsg && <p className="mt-2 text-xs text-[var(--p-secondary)]">{replyMsg}</p>}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4 font-mono text-sm uppercase">
          {TYPES.map((t) => (
            <button key={t} onClick={() => setType(t)}
              className={`transition-opacity ${type === t ? "font-bold opacity-100" : "opacity-33 hover:opacity-60"}`}>
              {t}
            </button>
          ))}
          <span className="opacity-33">|</span>
          {LEVELS.map((l) => (
            <button key={l} onClick={() => setLvl(l)}
              className={`transition-opacity ${lvl === l ? "font-bold opacity-100" : "opacity-33 hover:opacity-60"}`}>
              {l} 级
            </button>
          ))}
          <input
            type="text" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)}
            className="ml-auto rounded-[6px] border border-[rgba(48,48,48,.4)] bg-[var(--p-bg)] p-2 text-sm normal-case text-[var(--p-fg)] shadow-[0_2px_1px_rgba(0,0,0,.3)] outline-none"
          />
        </div>

        {list.length === 0 && <p className="py-12 text-center text-[var(--p-secondary)]">没有匹配的学校</p>}
        <ul className="m-0 list-none p-0" id="iqList">
          {list.map((x) => {
            const isOpen = open === x.n;
            return (
              <li key={x.n} id={x.n} className="mb-4 rounded-[6px] border border-[var(--p-gray-300)] bg-[var(--p-bg)]">
                <button
                  onClick={() => setOpen(isOpen ? null : x.n)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left"
                >
                  <span>
                    <span className="font-serif text-xl font-bold text-[var(--p-fg)]">{x.n}</span>
                    <span className="ml-2 font-mono text-xs uppercase text-[var(--p-secondary)]">
                      {x.t} · {x.lvl} 级 · {x.d} · {x.yr}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-sm uppercase text-[var(--p-secondary)]">
                    {isOpen ? "收起 −" : "展开 +"}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-[var(--p-gray-200)] p-4">
                    <p className="mb-4 text-[var(--p-secondary)]">{x.format}</p>
                    {x.rounds?.map((r, i) => (
                      <div key={i} className="mb-4">
                        <h3 className="mb-2 font-bold text-[var(--p-fg)]">{r.title}</h3>
                        <ul className="m-0 list-disc pl-5">
                          {r.items.map((it, j) => (
                            <li key={j} className="mb-1 text-[var(--p-fg)]">{it}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {x.sources && (Array.isArray(x.sources) ? x.sources : [x.sources]).length > 0 && (
                      <p className="mt-4 text-xs text-[var(--p-secondary)]">
                        来源：{(Array.isArray(x.sources) ? x.sources : [x.sources]).join(" · ")}
                      </p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <SiteFooter />
    </main>
  );
}
