import type { Theme, ThemeColors, ThemeName } from "../types/themes";

export { type Theme, type ThemeName, type ThemeColors };

// 各テーマは6トークン。surface は background と必ず差を付ける
// （同色にするとカードが背景に溶けて階層が消えるため）。
export const THEMES: Record<string, Theme> = {
    light_default: {
        isDark: false,
        background: "#fbfbfd",
        surface: "#ffffff",
        foreground: "#14161c",
        // background / surface / surface-sunken すべての上で 7:1（AAA）を満たす明度
        muted: "#4d525f",
        border: "#e4e7ee",
        accent: "#3358d4",
    },
    dark_default: {
        isDark: true,
        background: "#0e1116",
        surface: "#161a22",
        foreground: "#e7eaf0",
        // background / surface / surface-sunken すべての上で 7:1（AAA）を満たす明度
        muted: "#9ea6b5",
        border: "#242a35",
        accent: "#83a8ff",
    },
    light_notepad: {
        isDark: false,
        background: "#fbf6e9",
        surface: "#fffdf6",
        foreground: "#26211a",
        muted: "#6f6355",
        border: "#e8dcc4",
        accent: "#b3492c",
    },
    dark_notepad: {
        isDark: true,
        background: "#1e1a17",
        surface: "#272220",
        foreground: "#e8e1d5",
        muted: "#a29587",
        border: "#3a322b",
        accent: "#e08b6b",
    },
};
