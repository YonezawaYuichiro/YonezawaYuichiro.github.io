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

// 低い順に並んだ4段階。バッジの色分け（濃淡）にもこの並び順を使う。
export const SKILL_LEVELS: SkillLevel[] = [
    "使ったことがある",
    "使い方がわかる",
    "使える",
    "書ける",
];

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        category: "プログラミング言語",
        items: [
            { name: "Python", level: "書ける" },
            { name: "HTML", level: "書ける" },
            { name: "JavaScript", level: "使える" },
            { name: "C/C++", level: "使える" },
            { name: "CSS", level: "使い方がわかる" },
            { name: "TypeScript", level: "使ったことがある" },
            { name: "C#", level: "使ったことがある" },
        ],
    },
    {
        category: "フレームワーク・ライブラリ",
        items: [
            { name: "FastAPI", level: "書ける" },
            { name: "LightGBM", level: "使い方がわかる" },
            { name: "OpenCV", level: "使い方がわかる" },
            { name: "Flask", level: "使い方がわかる" },
            { name: "Jinja2", level: "使い方がわかる" },
            { name: "PyTorch", level: "使える" },
            { name: "React", level: "使い方がわかる" },
            { name: "SQLAlchemy", level: "使い方がわかる" },
            { name: "Astro", level: "使ったことがある" },
        ],
    },
    {
        category: "インフラ・データベース・環境",
        items: [
            { name: "Git / GitHub", level: "書ける" },
            { name: "PostgreSQL", level: "使える" },
            { name: "Windows (CMD / PowerShell)", level: "使い方がわかる" },
            { name: "Linux (Git Bash)", level: "使い方がわかる" },
            { name: "Docker", level: "使い方がわかる" },
            { name: "AWS", level: "使い方がわかる" },
            { name: "Alembic", level: "使ったことがある" },
            { name: "Terraform", level: "使ったことがある" },
        ],
    },
    {
        category: "ハードウェア・電子工作",
        items: [
            { name: "Arduino", level: "使える" },
            { name: "電気回路", level: "使える" },
            { name: "サーボモーター", level: "使える" },
            { name: "Raspberry Pi", level: "使い方がわかる" },
            { name: "ESP32", level: "使い方がわかる" },
            { name: "ステッピングモーター", level: "使い方がわかる" },
            { name: "BLE", level: "使い方がわかる" },
        ],
    },
    {
        category: "AI・生成AIツール",
        items: [
            { name: "Claude Skills", level: "書ける" },
            { name: "Claude Code", level: "書ける" },
            { name: "LLM (API連携など)", level: "使える" },
        ],
    },
    {
        category: "ツール・その他",
        items: [
            { name: "Fusion360", level: "使える" },
            { name: "Unity", level: "使ったことがある" },
            { name: "3Dフォトグラメトリ (COLMAP / OpenMVS)", level: "使ったことがある" },
        ],
    },
];

// スキルの脇に添える、AI活用スタンスについての一言
export const AI_STANCE_NOTE = {
    title: "AIとの付き合い方",
    body:
        "実装のスピードには生成AIを積極的に活用しています。大事にしているのは、出てきたコードをそのまま使わず、動作原理や妥当性を自分の言葉で説明できる状態まで理解すること。上の習熟度は、AIの補助なしに自分だけでどこまでできるかを基準に、できるだけ盛らずに申告したものです。",
};
