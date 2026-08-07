// モーダルの項目は固定。すべてのプロジェクトが同じ枠を同じ粒度で埋める。
//   概要     … 何を作ったか（1〜2文）
//   設計意匠 … 何が課題で、それにどう設計・対処したか（{ポイント, 課題, 設計}のペアを1〜3件、実際の課題数に合わせる）
//   成果     … 結果どうなったか（1〜2文）
// リンクの種別。ラベルをここで固定し、プロジェクトごとに表記がぶれないようにする
export type ProjectLinkKind =
    | "repo"
    | "slide"
    | "article"
    | "demo"
    | "site"
    | "gallery";

export const PROJECT_LINK_LABELS: Record<ProjectLinkKind, string> = {
    repo: "リポジトリ",
    slide: "発表資料",
    article: "記事",
    demo: "デモ",
    site: "関連サイト",
    gallery: "画像・動画",
};

export interface ProjectMedia {
    type: "image" | "video";
    /** public/ 配下からの絶対パス（例: "/images/xxx/yyy.png"） */
    src: string;
    /** 何を写しているかの説明 */
    caption: string;
}

export interface ProjectDesignPoint {
    /** この工夫を一言で表す短い見出し */
    title: string;
    /** 何が課題だったか */
    problem: string;
    /** その課題に対してどう設計・対処したか（理由込み） */
    solution: string;
}

export interface ProjectLink {
    kind: ProjectLinkKind;
    /** リンク先の内容（例: "GitHub", "PDF"） */
    title: string;
    /**
     * URL。public/ 配下のファイルは "/files/xxx.pdf" と書く。
     * "public" は付けない（ビルド時に public/ の中身が公開ルートへ展開されるため）。
     * Windowsのパス区切り "\" は文字列内でエスケープ扱いになるので必ず "/" を使う。
     */
    url: string;
}

export interface ProjectData {
    id: string;
    title: string;
    /** 種別（インターン業務、個人開発 など） */
    category: string;
    /** 所属・組織 */
    org: string;
    /** 期間 */
    period: string;
    /** 担当範囲 */
    role: string;
    /** 概要（カードにも表示するため3行以内に収める） */
    summary: string;
    /** 設計意匠（課題と、それへの設計・対処のペア。実際の課題数に合わせて1〜3件） */
    design: ProjectDesignPoint[];
    /** 成果 */
    result: string;
    /** 関連技術タグ（カードは先頭4件まで表示） */
    tech: string[];
    /** リポジトリ・発表資料・記事などへのリンク（無い場合は空配列） */
    links: ProjectLink[];
    /**
     * 画像・動画。先頭がモーダルに表示する代表メディアで、
     * 2件以上ある場合は一覧ページ /projects/<id> へのリンクが自動で付く。
     */
    media: ProjectMedia[];
}

export const PROJECTS: ProjectData[] = [
    {
        id: "daily-brief",
        title: "Daily-Brief",
        category: "インターン業務",
        org: "信濃ロボティクスイノベーションズ合同会社",
        period: "2025年10月 〜 2026年4月",
        role: "企画は社長。設計・実装・デプロイを担当",
        summary:
            "Gmailとカレンダーの内容をLLMで選別・要約し、音声ブリーフィングとして毎朝自動生成するWebアプリ。FastAPI + React + PostgreSQL を AWS 上で運用しています。",
        design: [
            {
                title: "FPとFNのトレードオフ",
                problem:
                    "メールの選別では『重要なメールを見逃さないこと』と『スパムを除くこと』が相反し、単一のプロンプトではどちらかが必ず犠牲になりました。",
                solution:
                    "「見逃しを減らす担当」と「スパムを除く担当」の2段階にAIの判定を分け、それぞれ別々のプロンプト（AIへの指示文）で動かすことで、片方の精度を上げてももう片方が悪化しない構造にしました。改善が本当にうまくいっているか毎回確認できるよう、判定が難しい境界ケースを含む400件超のテスト用メールを自作し、F1スコア（見逃しと誤検知のバランスを表す指標）を基準に57回以上の検証を繰り返しました。",
            },
            {
                title: "ポーリング処理",
                problem:
                    "生成処理はメール取得・要約・音声合成を含むため重く、HTTPのタイムアウト内に完了しませんでした。",
                solution:
                    "生成処理をPENDING→PROCESSING→COMPLETEDで管理する非同期ジョブ方式に変更し、即座にジョブIDを返してフロントがポーリングする設計にしました。定時実行にも対応しています。",
            },
        ],
        result:
            "重要なメールの見逃しを0件に保ったまま、F1スコア0.978まで改善しました。Google の Limited Use 要件への準拠とプライバシーポリシーの策定まで行い、AWS ECS Fargate 上での実運用に到達しています。",
        tech: [
            "FastAPI",
            "React",
            "PostgreSQL",
            "AWS ECS Fargate",
            "TypeScript",
            "Docker",
            "Terraform",
            "OpenAI API",
            "Google OAuth 2.0",
        ],
        links: [
            {
                kind: "repo",
                title: "GitHub",
                url: "https://github.com/YonezawaYuichiro/Daily-Brief",
            },
            {
                kind: "slide",
                title: "PDF",
                url: "/files/Daily-Brief.pdf",
            },
        ],
        media: [
            { type: "image", src: "/images/Daily-Brief/D-DailyBrief.png", caption: "生成されたデイリーブリーフの画面" },
            { type: "video", src: "/video/Daily-Brief.mp4", caption: "デモ動画：ブリーフィングの生成から音声再生まで" },
            { type: "image", src: "/images/Daily-Brief/A-Login.png", caption: "ログイン画面" },
            { type: "image", src: "/images/Daily-Brief/B-Cognito.png", caption: "AWS Cognito による認証" },
            { type: "image", src: "/images/Daily-Brief/C-OAuth.png", caption: "Google アカウントの連携" },
            { type: "image", src: "/images/Daily-Brief/E-TTS.png", caption: "音声ブリーフィングの再生" },
            { type: "image", src: "/images/Daily-Brief/F-Annotation.png", caption: "メールへの KEEP / SKIP アノテーション" },
            { type: "image", src: "/images/Daily-Brief/G-Rule.png", caption: "フィルタリング条件の設定" },
            { type: "image", src: "/images/Daily-Brief/H-profile.png", caption: "プロフィール設定" },
            { type: "image", src: "/images/Daily-Brief/I-Privacy.png", caption: "プライバシーポリシー" },
            { type: "image", src: "/images/Daily-Brief/J-Terms.png", caption: "利用規約" },
            { type: "image", src: "/images/Daily-Brief/K-GDPR.png", caption: "アカウント・データの削除（GDPR対応）" },
        ],
    },
    {
        id: "3d-photogrammetry",
        title: "3Dフォトグラメトリ",
        category: "インターン選考課題",
        org: "Hutzper",
        period: "2026年7月",
        role: "回転台の製作は先方。撮影から3D化までのパイプライン構築を担当",
        summary:
            "回転台に載せた物体をステッピングモーターで回しながら撮影し、写真から3Dモデルを復元するパイプライン。COLMAPとOpenMVSを繋いで自動化しました。",
        design: [
            {
                title: "マスキング処理",
                problem:
                    "回転台での撮影は背景と台が画像間で動かないため、そのまま特徴点を突き合わせると被写体ではなく背景を基準に位置合わせされ、モデルが破綻しました。",
                solution:
                    "rembg（写っている物体だけを切り抜くAIツール）で背景を自動で除外したうえで、画像間で動いていない点（＝背景や台の一部）を対応点の候補から外す処理を既定で有効にしました。",
            },
            {
                title: "被写体の選別",
                problem:
                    "反射しやすい黒や金属面の物体や、模様の少ない滑らかな物体は特徴点を抽出しにくく、再構成ができません。",
                solution:
                    "被写体を、マット樹脂かつ模様のある被写体（車のフィギュア）へ変更し、成立させました。",
            },
        ],
        result:
            "撮影から点群・メッシュ・テクスチャ生成までを一連のコマンドで実行できる状態にしました。被覆率・法線・UV・空面を検査するスクリプトも用意し、出力の妥当性を目視以外でも確認できるようにしています。",
        tech: ["COLMAP", "OpenMVS", "Python", "rembg", "ステッピングモーター制御"],
        links: [
            {
                kind: "slide",
                title: "PDF",
                url: "/files/３D化パイプライン.pdf",
            },
        ],
        media: [
            { type: "image", src: "/images/３Dパイプライン/メッシュ1.png", caption: "生成したテクスチャ付きメッシュ" },
            { type: "image", src: "/images/３Dパイプライン/メッシュ2.png", caption: "メッシュの別アングル" },
            { type: "image", src: "/images/３Dパイプライン/点群.png", caption: "OpenMVS で生成した密点群" },
            { type: "image", src: "/images/３Dパイプライン/カメラ姿勢.png", caption: "COLMAP が推定したカメラ位置" },
        ],
    },
    {
        id: "dialogue-preference-learning",
        title: "対話式選好学習",
        category: "研究課題（進行中）",
        org: "大阪ハイテクノロジー専門学校（課題研究）",
        period: "2026年6月 〜 継続中",
        role: "テーマ設定から実装まで一人で担当",
        summary:
            "就活生に合う企業を提示するため、対話の中から本人の価値観を抽出する手法を提案・実装しています。現在も開発中です。",
        design: [
            {
                title: "Claude Skills",
                problem:
                    "就職活動では、本人が自分の価値観を言語化できていないまま企業を探すことになります。そのため勤務地や年収といった条件検索では、本当に合う企業に辿り着けません。",
                solution:
                    "求人条件ではなく価値観を軸に絞り込むため、対話のやり取りから選好を抽出するアプローチを提案しました。抽出のルールをClaude Skillsとして記述し、対話ログから価値観を構造化して取り出す実装を進めています。抽出した選好をもとに企業を提示し、その反応を次の抽出に反映する対話ループを設計しています。",
            },
        ],
        result:
            "実装途中のため成果はまだ出ていません。手法の提案と、価値観抽出部分の実装までが現時点の到達点です。",
        tech: ["Claude Skills", "LLM", "Python"],
        links: [
            {
                kind: "repo",
                title: "GitHub",
                url: "https://github.com/YonezawaYuichiro/kigyou",
            },
            {
                kind: "slide",
                title: "PDF",
                url: "/files/対話式選好学習.pdf",
            },
        ],
        media: [
            { type: "image", src: "/images/対話式選好学習/問題.png", caption: "取り組んでいる課題の整理" },
            { type: "image", src: "/images/対話式選好学習/リザルト.png", caption: "価値観抽出の実行結果" },
        ],
    },
    {
        id: "face-tracker",
        title: "face-tracker",
        category: "ハード開発",
        org: "大阪ハイテクノロジー専門学校（授業）",
        period: "2025年11月 〜 2025年12月",
        role: "カメラ処理・サーボ制御・機能統合を担当（3名チーム）",
        summary:
            "Raspberry Pi 4 とUSBカメラで顔を検出し、2軸のサーボモーターでカメラを追従させるシステム。顔の中心と画面中心のズレを角度に変換して駆動します。",
        design: [
            {
                title: "安定した追従能力",
                problem:
                    "顔の検出位置は毎フレーム微妙に揺れます。そのズレをそのまま角度に変換して追従させると、サーボが小刻みに震え続けました。",
                solution:
                    "画面中心とのズレが50px以内なら「誤差の範囲」とみなしてサーボを動かさない不感帯を設けたうえ、標準のモーター制御方式ではタイミングのブレ（ジッタ）が出やすいため、より安定した制御方式（pigpioによるハードウェアPWM）に切り替えました。",
            },
        ],
        result:
            "パン±90°・チルト-90〜0°の範囲で、震えずに顔を追従できる状態になりました。顔検出はHaar-Cascade版とMediaPipe版を分けて実装し、検出方式を差し替えて比較できる構成にしています。",
        tech: ["Python", "OpenCV", "Raspberry Pi 4", "gpiozero / pigpio", "MG90S サーボ"],
        links: [
            {
                kind: "repo",
                title: "GitHub",
                url: "https://github.com/YonezawaYuichiro/face-tracker",
            },
            {
                kind: "article",
                title: "Protopedia",
                url: "https://protopedia.net/prototype/private/4fa1857e-525a-4dc3-b826-8d57e2958cde",
            },
        ],
        media: [
            { type: "image", src: "/images/face-tracker/IMG_5992.JPEG", caption: "2軸のサーボに載せたUSBカメラ" },
            { type: "image", src: "/images/face-tracker/IMG_5995.JPEG", caption: "実機（別アングル）" },
            { type: "video", src: "/video/face-tracker.mp4", caption: "デモ動画：顔への追従動作" },
        ],
    },
    {
        id: "signate-flood-prediction",
        title: "SIGNATE（木材含水率予測）",
        category: "コンペ課題",
        org: "大阪ハイテクノロジー専門学校（授業）",
        period: "2026年4月 〜 2026年5月",
        role: "データ分析からモデル構築まで一人で担当",
        summary:
            "近赤外スペクトル1555波長から木材の含水率を予測する回帰コンペ。系統の異なる6モデルの予測をメタモデルで統合するスタッキング構成を組みました。",
        design: [
            {
                title: "アンサンブル学習",
                problem:
                    "訓練データとテストデータで樹種が完全に分離しており、手元の交差検証スコアを改善してもリーダーボードのスコアに転移しないのが最大の難所でした。",
                solution:
                    "同じ間違い方をしないよう、性質の異なる6種類の予測モデル（ニューラルネット系・決定木系・線形系）を組み合わせました。さらに、それらの予測をまとめる「統合役」のモデルには、各モデルの予測値そのものだけでなく「モデル同士の予測がどれだけ一致しているか」も判断材料として与え、見たことのない樹種でも崩れにくくしました。",
            },
            {
                title: "偏った分布に適した学習方法の選択",
                problem:
                    "含水率の分布も0.84〜298.6%と、少数の極端に高い値へ大きく偏っていました。",
                solution:
                    "統合役のモデル（LightGBM）を、この偏った分布を扱うのに適した学習方法（Tweedie目的関数）で学習させました。",
            },
        ],
        result:
            "入賞には届きませんでしたが、18回の試行それぞれで何を変えて何が起きたかと、精度が落ちたため棄却したモデルの経緯をドキュメントとして残しています。",
        tech: ["LightGBM", "PyTorch", "Optuna", "Wavelet変換", "スタッキング"],
        // TODO: 授業の発表資料があれば { kind: "slide", ... } を追加する
        links: [
            {
                kind: "site",
                title: "SIGNATE コンペページ",
                url: "https://user.competition.signate.jp/ja/competition/detail/?competition=37308d147238487c96551300b8e4cb76&task=8940dcfa70434a6aaaa28d661652d536&tab=leaderboard&leaderboard=private",
            },
        ],
        media: [],
    },
    {
        id: "handon-power-device",
        title: "デコピン強化装置",
        category: "ハッカソン",
        org: "大阪ハイテクノロジー専門学校（ハッカソン）",
        period: "2026年6月 〜 2026年7月",
        role: "アイデアと回路設計、Unity側のゲームとデバイス連携画面を担当",
        summary:
            "手に装着したデバイスでデコピンの衝撃を検出し、Unityのリズムゲームに反映する装置。9軸IMUの値をBLEでPCへ送り、UDPでUnityに流し込みます。",
        design: [
            {
                title: "加速度センサーでの高頻度サンプリング",
                problem:
                    "デコピンの衝撃は非常に短く、Unity側の20FPSの処理だけで見ると検出を取りこぼしました。",
                solution:
                    "デバイス側で5ミリ秒ごとに加速度を細かく読み取り、衝撃の強さを表す値を計算したうえで、その中の「ピーク（一番強かった瞬間）」だけを20ミリ秒ごとにUnityへ送る構成にしました。全部の生データを送らずピークだけ送ることで、短い衝撃を取りこぼさずに済みます。",
            },
        ],
        result:
            "短い衝撃の取りこぼしを抑えたうえ、ハードを触らずに感度を追い込める状態にしました。リズムゲームのレベル設計、タップテンポによるタイミング調整画面、WebGLビルドとランキングAPI連携まで実装しています。",
        tech: ["Unity / C#", "Arduino UNO Q", "MPU9250（9軸IMU）", "BLE", "UDP通信"],
        links: [
            {
                kind: "repo",
                title: "GitHub",
                url: "https://github.com/sousci/decopin-project",
            },
            {
                kind: "slide",
                title: "PDF",
                url: "/files/デコピンマシーン紹介スライド.pdf",
            },
            {
                kind: "article",
                title: "Protopedia",
                url: "https://protopedia.net/prototype/9061",
            },
        ],
        media: [
            { type: "image", src: "/images/Dekopin/デコピン強化装置.JPEG", caption: "完成したデバイス。手に装着して使う" },
            { type: "image", src: "/images/Dekopin/初期設計.JPEG", caption: "初期の設計" },
            { type: "image", src: "/images/Dekopin/設計.png", caption: "設計図" },
            { type: "image", src: "/images/Dekopin/機構モデル.png", caption: "巻き上げ機構のモデル" },
            { type: "image", src: "/images/Dekopin/構造解説.png", caption: "装置の構造" },
            { type: "image", src: "/images/Dekopin/イメージ図.png", caption: "全体のイメージ図" },
            { type: "image", src: "/images/Dekopin/尻尾.JPEG", caption: "3Dプリントしたセグメント構造の尻尾機構" },
            { type: "image", src: "/images/Dekopin/バックエンド.png", caption: "ランキングAPIの構成" },
        ],
    },
    {
        id: "tango-de-go",
        title: "単語でGO",
        category: "個人開発（初）",
        org: "信濃ロボティクスイノベーションズ合同会社（インターン選考課題）",
        period: "2025年7月 〜 2025年8月",
        role: "一人で開発",
        summary:
            "自分用の単語帳Webアプリ。単語を登録するとGPT-4o-miniが意味を生成し、習熟度を記録できます。初めての個人開発です。",
        design: [
            {
                title: "CRUD APIとfetchによる基本構造の理解",
                problem:
                    "初めての個人開発で、Webアプリがどういう仕組みで動いているのかを理解していませんでした。",
                solution:
                    "Flask（Pythonのフレームワーク）でデータの追加・取得・更新・削除ができるAPI（画面とデータをやり取りする窓口）を実装し、単語帳ごとにデータをファイルへ保存する構成にしたうえ、画面側からその窓口を直接呼び出すことで、ページ全体を読み込み直さずに単語の追加・編集・削除ができるようにしました。",
            },
            {
                title: "LLM",
                problem:
                    "単語帳として使うには、意味を毎回手で入力する手間が大きく、自分でも続きませんでした。",
                solution:
                    "単語をOpenAI APIへ渡して意味を生成するエンドポイントを追加し、入力の手間をなくしました。",
            },
        ],
        result:
            "自分で使える単語帳として動く状態まで完成させました。リクエストとレスポンス、APIとフロントの分担といったWebアプリの基本構造を、この開発で一通り理解しています。",
        tech: ["Python", "Flask", "Jinja2", "JavaScript", "OpenAI API"],
        links: [
            {
                kind: "repo",
                title: "GitHub",
                url: "https://github.com/YonezawaYuichiro/tango_table",
            },
        ],
        media: [],
    },
];
