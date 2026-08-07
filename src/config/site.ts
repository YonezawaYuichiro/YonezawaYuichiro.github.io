import type { SiteConfig, ThemeConfig, AnalyticsConfig, UmamiAnalyticsConfig } from "../types";

export const SITE: SiteConfig = {
    website: "https://YonezawaYuichiro.github.io/",
    author: "米澤 佑一郎",
    desc: "フィジカルAI領域を志すエンジニア志望学生のポートフォリオサイト。",
    title: "Yuichiro Yonezawa Portfolio",
    ogImage: "main_page.jpg",
    favicon: "/favicon.svg",
    lang: "ja",
};

export const THEME_CONFIG: ThemeConfig = {
    lightAndDark: true,
    themeLight: "light_default",
    themeDark: "dark_default",
    themeNature: "nature_forest",
};

const umami: UmamiAnalyticsConfig = {
    websiteId: "", // e.g., 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    src: "https://cloud.umami.is/script.js", // Default Umami cloud script URL
}

export const ANALYTICS: AnalyticsConfig = {
    // Google Analytics 4 Measurement ID (e.g., 'G-XXXXXXXXXX')
    ga4Id: "G-Z1WZVFQJXT",
    // Umami Analytics configuration
    umami: umami
};
