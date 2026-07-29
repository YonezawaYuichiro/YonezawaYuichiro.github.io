// 数値の自己採点ではなく、実際にできることを基準にした4段階の申告制。
// 低い順：使ったことがある → 使い方がわかる → 使える → 書ける
export type SkillLevel = "使ったことがある" | "使い方がわかる" | "使える" | "書ける";

export interface SkillItem {
    /** スキル名 */
    name: string;
    /** 習熟度（4段階の自己申告） */
    level: SkillLevel;
}

export interface SkillCategory {
    /** カテゴリ名（日本語） */
    category: string;
    items: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        category: "プログラミング言語",
        items: [
            { name: "HTML", level: "書ける" },
            { name: "CSS", level: "使える" },
            { name: "Python", level: "使える" },
            { name: "JavaScript", level: "使える" },
            { name: "TypeScript", level: "使い方がわかる" },
            { name: "C++ (Arduino)", level: "使い方がわかる" },
        ],
    },
    {
        category: "フレームワーク・ライブラリ",
        items: [
            { name: "FastAPI", level: "使える" },
            { name: "PyTorch", level: "使い方がわかる" },
            { name: "React", level: "使い方がわかる" },
        ],
    },
    {
        category: "インフラ・データベース",
        items: [
            { name: "Git / GitHub", level: "使える" },
            { name: "PostgreSQL", level: "使える" },
            { name: "Docker", level: "使い方がわかる" },
            { name: "AWS", level: "使い方がわかる" },
            { name: "Alembic", level: "使ったことがある" },
            { name: "Terraform", level: "使ったことがある" },
        ],
    },
    {
        category: "ハードウェア・設計",
        items: [
            { name: "Fusion360", level: "使える" },
            { name: "電気回路", level: "使える" },
            { name: "BLE", level: "使い方がわかる" },
            { name: "Unity", level: "使ったことがある" },
        ],
    },
    {
        category: "ドメイン知識",
        items: [{ name: "LLM", level: "使える" }],
    },
];

// スキルの脇に添える、AI活用スタンスについての一言
export const AI_STANCE_NOTE = {
    title: "AIとの付き合い方",
    body:
        "実装のスピードには生成AIを積極的に活用しています。大事にしているのは、出てきたコードをそのまま使わず、動作原理や妥当性を自分の言葉で説明できる状態まで理解すること。上の習熟度は、AIの補助なしに自分だけでどこまでできるかを基準に、できるだけ盛らずに申告したものです。",
};
