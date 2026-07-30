// 数値の自己採点ではなく、実際にできることを基準にした4段階の申告制。
// 低い順：使ったことがある → 使い方がわかる → 使える → 実践的／使いこなせる
export type SkillLevel =
    | "使ったことがある"
    | "使い方がわかる"
    | "使える"
    | "実践的"
    | "使いこなせる";

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

// 申告のランク（1が最低、4が最高）。バッジの色分けと並び順に使う。
// 最高ランクは対象によって言い方を変える:
//   実践的     … 言語・フレームワークなど、自分でコードを実践的もの
//   使いこなせる … ツールなど、そもそも「書く」対象ではないもの
export const SKILL_LEVEL_RANK: Record<SkillLevel, number> = {
    使ったことがある: 1,
    使い方がわかる: 2,
    使える: 3,
    実践的: 4,
    使いこなせる: 4,
};

// 凡例の表示内容（高い順）
export const SKILL_LEGEND: { label: string; rank: number }[] = [
    { label: "実践的", rank: 4 },
    { label: "使える", rank: 3 },
    { label: "使い方がわかる", rank: 2 },
    { label: "使ったことがある", rank: 1 },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        category: "プログラミング言語",
        items: [
            { name: "Python", level: "実践的" },
            { name: "HTML", level: "実践的" },
            { name: "JavaScript", level: "使える" },
            { name: "C++", level: "使える" },
            { name: "CSS", level: "使い方がわかる" },
            { name: "TypeScript", level: "使ったことがある" },
        ],
    },
    {
        category: "Webフレームワーク・ライブラリ",
        items: [
            { name: "FastAPI", level: "実践的" },
            { name: "Flask", level: "使い方がわかる" },
            { name: "React", level: "使い方がわかる" },
            { name: "Jinja2", level: "使い方がわかる" },
            { name: "SQLAlchemy / SQLModel", level: "使い方がわかる" },
            { name: "Pydantic", level: "使える" },
        ],
    },
    {
        category: "データ分析・機械学習・画像処理",
        items: [
            { name: "LightGBM", level: "使い方がわかる" },
            { name: "NumPy", level: "実践的" },
            { name: "OpenCV", level: "使い方がわかる" },
            { name: "PyTorch", level: "使える" },
            { name: "MediaPipe", level: "使ったことがある" },
            { name: "YOLO", level: "使ったことがある" },
        ],
    },
    {
        category: "インフラ・データベース・環境",
        items: [
            { name: "Git / GitHub", level: "実践的" },
            { name: "PostgreSQL", level: "実践的" },
            { name: "Windows (CMD / PowerShell)", level: "使い方がわかる" },
            { name: "Linux (Git Bash)", level: "使い方がわかる" },
            { name: "Docker", level: "使い方がわかる" },
            { name: "AWS (ECS, Lambda, RDS, S3 等)", level: "使い方がわかる" },
            { name: "SSH", level: "使い方がわかる" },
            { name: "Google Cloud", level: "使い方がわかる" },
            { name: "Terraform", level: "使ったことがある" },
            { name: "Alembic", level: "使ったことがある" },
        ],
    },
    {
        category: "ハードウェア・電子工作",
        items: [
            { name: "Arduino", level: "使える" },
            { name: "サーボモーター", level: "使える" },
            { name: "回路設計", level: "使える" },
            { name: "Raspberry Pi", level: "使い方がわかる" },
            { name: "ESP32", level: "使い方がわかる" },
            { name: "ステッピングモーター", level: "使い方がわかる" },
            { name: "BLE通信", level: "使い方がわかる" },
            { name: "9軸IMUセンサー", level: "使ったことがある" },
        ],
    },
    {
        category: "AI・API・外部連携",
        items: [
            { name: "Claude Skills", level: "実践的" },
            { name: "Claude Code", level: "使いこなせる" },
            { name: "OpenAI API (GPT-4o, TTSなど)", level: "使える" },
            { name: "LLM (プロンプトエンジニアリング)", level: "使える" },
            { name: "Google Workspace API", level: "使い方がわかる" },
            { name: "Google OAuth 2.0", level: "使える" },
        ],
    },
    {
        category: "ツール・ソフトウェア",
        items: [
            { name: "Fusion360", level: "使える" },
            { name: "VS Code", level: "使える" },
            { name: "Unity (WebGL含む)", level: "使ったことがある" },
            { name: "3Dフォトグラメトリ (COLMAP/OpenMVS)", level: "使ったことがある" },
        ],
    },
];
