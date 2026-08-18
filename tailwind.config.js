// 港校指南 Tailwind 預編譯設定 — 色板與首頁/工具頁 inline config 同步
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./index-tc.html", "./kindergarten.html", "./primary.html", "./reports.html"],
  theme: {
    extend: {
      colors: {
        ink: "#1C1C1C", muted: "#57534E", bg: "#FBF9F5", surface: "#ffffff",
        primary: "#0F766E", "primary-dark": "#115E59", accent: "#C2410C",
        success: "#059669", border: "#E4E0D8", soft: "#F3EFE6",
      },
      fontFamily: { sans: ["Roboto", "PingFang SC", "Microsoft YaHei", "sans-serif"], serif: ["Newsreader", "serif"] },
    },
  },
  plugins: [],
};
