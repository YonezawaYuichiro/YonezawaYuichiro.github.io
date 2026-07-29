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
            { name: "C++", level: "使える" },
            { name: "CSS", level: "使い方がわかる" },
            { name: "TypeScript", level: "使ったことがある" },
            { name: "C#", level: "使ったことがある" },
        ],
    },
    {
        category: "Webフレームワーク・ライブラリ",
        items: [
            { name: "FastAPI", level: "書ける" },
            { name: "Flask", level: "使い方がわかる" },
            { name: "React", level: "使い方がわかる" },
            { name: "Jinja2", level: "使い方がわかる" },
            { name: "SQLAlchemy / SQLModel", level: "使い方がわかる" },
            { name: "Pydantic", level: "使える" },
            { name: "Astro", level: "使ったことがある" },
            { name: "Vite", level: "使ったことがある" },
            { name: "Uvicorn", level: "使ったことがある" },
        ],
    },
    {
        category: "データ分析・機械学習・画像処理",
        items: [
            { name: "LightGBM", level: "使い方がわかる" },
            { name: "NumPy", level: "書ける" },
            { name: "OpenCV", level: "使い方がわかる" },
            { name: "PyTorch", level: "使える" },
            { name: "MediaPipe", level: "使ったことがある" },
            { name: "YOLO", level: "使ったことがある" },
            { name: "SciPy", level: "使ったことがある" },
            { name: "rembg", level: "使ったことがある" },
        ],
    },
    {
        category: "インフラ・データベース・環境",
        items: [
            { name: "Git / GitHub", level: "書ける" },
            { name: "PostgreSQL", level: "書ける" },
            { name: "Windows (CMD / PowerShell)", level: "使い方がわかる" },
            { name: "Linux (Git Bash)", level: "使い方がわかる" },
            { name: "Docker", level: "使い方がわかる" },
            { name: "AWS (ECS, Lambda, RDS, S3 等)", level: "使い方がわかる" },
            { name: "SSH", level: "使い方がわかる" },
            { name: "Google Cloud", level: "使ったことがある" },
            { name: "Terraform", level: "使ったことがある" },
            { name: "Alembic", level: "使ったことがある" },
            { name: "pytest", level: "使ったことがある" },
        ],
    },
    {
        category: "ハードウェア・電子工作",
        items: [
            { name: "Arduino", level: "使える" },
            { name: "サーボモーター", level: "使える" },
            { name: "電気回路", level: "使える" },
            { name: "Raspberry Pi", level: "使い方がわかる" },
            { name: "ESP32", level: "使い方がわかる" },
            { name: "ステッピングモーター", level: "使い方がわかる" },
            { name: "BLE通信", level: "使い方がわかる" },
            { name: "9軸IMUセンサー", level: "使ったことがある" },
            { name: "UDP通信", level: "使ったことがある" },
            { name: "Zephyr RTOS", level: "使ったことがある" },
            { name: "pigpio", level: "使ったことがある" },
        ],
    },
    {
        category: "AI・API・外部連携",
        items: [
            { name: "Claude Skills", level: "書ける" },
            { name: "Claude Code", level: "書ける" },
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
            { name: "CloudCompare", level: "使ったことがある" },
        ],
    },
];
