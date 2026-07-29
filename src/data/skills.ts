export interface SkillItem {
    /** スキル名 */
    name: string;
    /** 自己評価レベル（1〜5） */
    level: number;
    /** 補足コメント（任意） */
    note?: string;
}

export interface SkillCategory {
    /** カテゴリ名（日本語） */
    category: string;
    items: SkillItem[];
}

export const SKILL_MAX_LEVEL = 5;

// 自己評価・10点満点スケールを5点満点に換算して掲載（portfolio_info.txt準拠）
export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        category: "言語 / フレームワーク",
        items: [
            { name: "Python", level: 5 },
            { name: "HTML", level: 4 },
            { name: "FastAPI", level: 3 },
            { name: "PyTorch", level: 3 },
            { name: "JavaScript", level: 3 },
            { name: "C++ (Arduino)", level: 2 },
            { name: "CSS", level: 2 },
            { name: "TypeScript", level: 2 },
            { name: "React", level: 2 },
        ],
    },
    {
        category: "インフラ / ツール",
        items: [
            { name: "Git / GitHub", level: 5 },
            { name: "PostgreSQL", level: 3 },
            { name: "Docker", level: 2 },
            { name: "AWS", level: 2 },
            { name: "Alembic", level: 1 },
            { name: "Terraform", level: 1 },
        ],
    },
    {
        category: "ハード / その他",
        items: [
            { name: "Fusion360", level: 3 },
            { name: "電気回路", level: 3 },
            { name: "BLE", level: 2 },
            {
                name: "Unity",
                level: 1,
                note: "シリアル通信を使った機器連携の実装経験はあり。ゲームロジックの設計はまだこれから。",
            },
        ],
    },
    {
        category: "ドメイン",
        items: [{ name: "LLM", level: 3 }],
    },
];

// スキル数値の脇に添える、AI活用スタンスについての一言（自己評価への迷いを誠実さとして提示する）
export const AI_STANCE_NOTE = {
    title: "AIとの付き合い方",
    body:
        "実装のスピードには生成AIを積極的に活用しています。大事にしているのは、出てきたコードをそのまま使わず、動作原理や妥当性を自分の言葉で説明できる状態まで理解すること。上のスキル数値は、その理解度をできるだけ盛らずに自己申告したものです。",
};
