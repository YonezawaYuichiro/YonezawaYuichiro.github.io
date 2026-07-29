export interface ProjectData {
    id: string;
    title: string;
    /** 開発組織 */
    org: string;
    /** 種別（インターン業務、個人開発 など） */
    category: string;
    /** 担当範囲 */
    role: string;
    /** 概要 */
    summary: string;
    /** 関連技術タグ */
    tech: string[];
    /** リポジトリURL（未公開の場合は空文字） */
    repoUrl?: string;
    /** 画像URL（public/ 配下からの相対パス。未設定の場合は空文字） */
    imageUrl?: string;
}

export const PROJECTS: ProjectData[] = [
    {
        id: "daily-brief",
        title: "Daily-Brief",
        org: "信濃ロボティクスイノベーションズ合同会社（5ヶ月インターン）",
        category: "インターン業務",
        role: "アイデアは社長、実装は米澤佑一郎が担当",
        summary:
            "メールやカレンダーから重要な予定を抽出して要約し、音声データとして提供するツール。",
        // TODO: 実際に使用したAPI名など、より具体的な技術要素があれば追記する
        tech: ["Python", "LLM", "各種API", "音声合成"],
        repoUrl: "", // TODO: リポジトリURLを追加
        imageUrl: "", // TODO: スクリーンショット等を追加
    },
    {
        id: "3d-photogrammetry",
        title: "3Dフォトグラメトリ",
        org: "Hutzper（インターン選考課題）",
        category: "インターン選考課題",
        role: "回転台は先方が製作。撮影・3D化は米澤佑一郎が担当",
        summary:
            "物体を回転台に乗せ、ステッピングモーターで回転させながら撮影。撮影した点群～メッシュ化と多視点3Dモデル化のパイプラインを構築。",
        tech: ["COLMAP", "OpenMVS", "Python", "ステッピングモーター制御"],
        repoUrl: "", // TODO: リポジトリURLを追加
        imageUrl: "",
    },
    {
        id: "dialogue-preference-learning",
        title: "対話式嗜好学習",
        org: "学校（研究の授業）",
        category: "研究課題（未完成）",
        role: "アイデアから実装まで全て米澤佑一郎が担当",
        summary:
            "就職活動で就活生にどんどん企業を紹介してもらうため、Claude Skillsを用いた価値観抽出法を提案・実装中。未完成。",
        tech: ["Claude Skills", "LLM", "Python"],
        repoUrl: "", // TODO: リポジトリURLを追加
        imageUrl: "",
    },
    {
        id: "face-tracker",
        title: "face-tracker",
        org: "学校（授業）",
        category: "ハード開発",
        role: "サーボモーターの制御およびWebカメラとモーターの統合を担当",
        summary: "カメラで顔を認識し、サーボモーターで顔を追従させるシステム。",
        // TODO: より詳細な技術要素（マイコン種別など）が分かれば追記する
        tech: ["OpenCV", "サーボ制御", "Webカメラ"],
        repoUrl: "", // TODO: リポジトリURLを追加
        imageUrl: "",
    },
    {
        id: "signate-flood-prediction",
        title: "SIGNATE（果樹園含水率予測）",
        org: "学校（授業）",
        category: "コンペ課題",
        role: "米澤佑一郎が担当",
        summary:
            "果樹園の含水率を予測するモデルの開発。コンペ自体には入賞しなかったものの、モデルの精度を可能な限り向上させることに成功。",
        tech: ["TCN", "LightGBM", "PLS+CV", "EfficientNet (CNN)"],
        repoUrl: "", // TODO: リポジトリURLを追加
        imageUrl: "",
    },
    {
        id: "handon-power-device",
        title: "ハンドオン強化装置",
        org: "学校（ハッカソン）",
        category: "ハッカソン",
        role: "アイデアと回路設計を担当。UnityでのハンドオンゲームはHutzperが担当",
        summary:
            "指の巻き上げと放出を使ったハンドオン強化装置。UDPを使ってArduino UNO QとUnityを連携。",
        tech: ["Arduino UNO Q", "Unity", "UDP通信", "加速度センサ"],
        repoUrl: "", // TODO: リポジトリURLを追加
        imageUrl: "",
    },
    {
        id: "tango-de-go",
        title: "単語でGO",
        org: "信濃ロボティクスイノベーションズ合同会社（インターン選考課題）",
        category: "個人開発（初）",
        role: "本人一人で開発",
        summary:
            "初めての個人開発。HTML/CSS/JavaScriptで作った基本的なWebアプリ。Webの基礎を学んだ。",
        tech: ["HTML", "CSS", "JavaScript"],
        repoUrl: "", // TODO: リポジトリURLを追加
        imageUrl: "",
    },
    {
        id: "robot-simulation",
        title: "ロボットシミュレーション",
        org: "学校（期末課題）",
        category: "期末課題",
        role: "セオリーに沿ってUnityを操作",
        summary: "ロボットのシミュレーションを学ぶための課題。",
        tech: ["Unity"],
        repoUrl: "", // TODO: リポジトリURLを追加
        imageUrl: "",
    },
];
