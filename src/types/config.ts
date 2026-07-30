export interface SiteConfig {
    website: string;
    author: string;
    desc: string;
    title: string;
    ogImage: string;
    favicon: string;
    lang: string;
}

export interface ThemeConfig {
    lightAndDark: boolean;
    themeLight: string;
    themeDark: string;
    /** 3つ目のテーマ（ネイチャーモード）。装飾の葉はこのテーマのみ表示される */
    themeNature: string;
}

export interface UmamiAnalyticsConfig {
    websiteId: string;
    src: string;
}

export interface AnalyticsConfig {
    ga4Id?: string;
    umami?: UmamiAnalyticsConfig;
}

export interface NavLink {
    href: string;
    label: string;
}

export interface SocialLink {
    name: string;
    href: string;
    linkTitle: string;
    isActive: boolean;
}