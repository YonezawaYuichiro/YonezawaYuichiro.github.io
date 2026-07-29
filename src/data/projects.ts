// モーダルの項目は固定。すべてのプロジェクトが同じ枠を同じ粒度で埋める。
//   概要     … 何を作ったか（1〜2文）
//   課題     … 何が問題だったか（1〜2文）
//   取り組み … 課題に対して何をしたか（3件）
//   成果     … 結果どうなったか（1〜2文）
// リンクの種別。ラベルをここで固定し、プロジェクトごとに表記がぶれないようにする
export type ProjectLinkKind = "repo" | "slide" | "article" | "demo" | "site";

export const PROJECT_LINK_LABELS: Record<ProjectLinkKind, string> = {
    repo: "リポジトリ",
    slide: "発表資料",
    article: "記事",
    demo: "デモ",
    site: "関連サイト",
};

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
    /** 課題 */
    challenge: string;
    /** 取り組み（見た目を揃えるため3件で統一する） */
    approach: string[];
    /** 成果 */
    result: string;
    /** 関連技術タグ（カードは先頭4件まで表示） */
    tech: string[];
    /** リポジトリ・発表資料・記事などへのリンク（無い場合は空配列） */
    links: ProjectLink[];
    /** 画像URL（public/ 配下からの絶対パス。未設定の場合は空文字） */
    imageUrl?: string;
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
        challenge:
            "メールの選別では「重要なメールを見逃さないこと」と「スパムを除くこと」が相反し、単一のプロンプトではどちらかが必ず犠牲になりました。また生成処理はメール取得・要約・音声合成を含むため重く、HTTPのタイムアウト内に完了しませんでした。",
        approach: [
            "再現率を優先するLayer1と適合率を優先するLayer2に役割を分ける2層構成にし、各層のプロンプトを独立させて、片方の改善がもう片方に干渉しない構造にしました。",
            "改善を再現できる状態にするため、境界ケースを含む合成メール400件超の評価データセットを自作し、混同行列とF1スコアを指標に19ラウンド・57回以上のテストを反復しました。",
            "生成処理をPENDING→PROCESSING→COMPLETEDで管理する非同期ジョブ方式に変更し、即座にジョブIDを返してフロントがポーリングする設計にしました。定時実行にも対応しています。",
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
        imageUrl: "",
    },
    {
        id: "3d-photogrammetry",
        title: "3Dフォトグラメトリ",
        category: "インターン選考課題",
        org: "Hutzper（大阪／製造業向け検査AIスタートアップ）",
        period: "2026年7月",
        role: "回転台の製作は先方。撮影から3D化までのパイプライン構築を担当",
        summary:
            "回転台に載せた物体をステッピングモーターで回しながら撮影し、写真から3Dモデルを復元するパイプライン。COLMAPとOpenMVSを繋いで自動化しました。",
        challenge:
            "回転台での撮影は背景と台が画像間で動かないため、そのまま特徴点を突き合わせると被写体ではなく背景を基準に位置合わせされ、モデルが破綻しました。またCPU環境では原寸画像の処理でメモリが不足し、途中で落ちる問題もありました。",
        approach: [
            "rembgで生成したマスクで背景を除外したうえで、画像間で静止したままの対応点を除去する処理を既定で有効にしました。",
            "画像サイズ上限・スレッド数・SIFTのfirst_octaveを調整しました。first_octaveは既定値が「画像を2倍に拡大してから処理」でメモリを4倍消費するため、原寸開始に変更しています。",
            "特徴点抽出器とマッチャをコマンドライン引数で差し替えられるようにし、工程が長いことを踏まえて任意の地点から再開できるオプションを用意しました。",
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
        imageUrl: "",
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
        challenge:
            "就職活動では、本人が自分の価値観を言語化できていないまま企業を探すことになります。そのため勤務地や年収といった条件検索では、本当に合う企業に辿り着けません。",
        approach: [
            "求人条件ではなく価値観を軸に絞り込むため、対話のやり取りから選好を抽出するアプローチを提案しました。",
            "抽出のルールをClaude Skillsとして記述し、対話ログから価値観を構造化して取り出す実装を進めています。",
            "抽出した選好をもとに企業を提示し、その反応を次の抽出に反映する対話ループを設計しています。",
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
        imageUrl: "",
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
        challenge:
            "顔の検出位置は毎フレーム微妙に揺れます。そのズレをそのまま角度に変換して追従させると、サーボが小刻みに震え続け、異音と発熱が発生しました。",
        approach: [
            "50pxのデッドゾーンを設け、画面中心とのズレが小さいうちはサーボを動かさないようにしました。",
            "gpiozeroの標準のPWMではジッタが出るため、pigpioデーモンをピンファクトリに指定してハードウェアPWMに切り替えました。",
            "目標角へ動かした後はPWM出力を停止し、保持トルクによる発熱とうなりを避けました。",
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
        imageUrl: "",
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
        challenge:
            "訓練データとテストデータで樹種が完全に分離しており、手元の交差検証スコアを改善してもリーダーボードのスコアに転移しないのが最大の難所でした。含水率も0.84〜298.6%と極端に右へ偏っていました。",
        approach: [
            "誤差が互いに相関しないよう、NN系・GBDT系・線形系から性質の異なる6モデルを選んで多様性を確保しました。",
            "統合するメタモデルのLightGBMを、右へ偏った分布に合わせてTweedie目的関数で学習させました。",
            "メタモデルの入力に、各モデルの予測値だけでなく、平均・ばらつき・最大最小差といったモデル間の一致度も特徴量として与えました。",
        ],
        result:
            "最終スコアは RMSE 11.103 でした。入賞には届きませんでしたが、18回の試行それぞれで何を変えて何が起きたかと、精度が落ちたため棄却したモデルの経緯をドキュメントとして残しています。",
        tech: ["LightGBM", "PyTorch", "Optuna", "Wavelet変換", "スタッキング"],
        // TODO: 授業の発表資料があれば { kind: "slide", ... } を追加する
        links: [
            {
                kind: "site",
                title: "SIGNATE コンペページ",
                url: "https://user.competition.signate.jp/ja/competition/detail/?competition=37308d147238487c96551300b8e4cb76&task=8940dcfa70434a6aaaa28d661652d536&tab=leaderboard&leaderboard=private",
            },
        ],
        imageUrl: "",
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
        challenge:
            "デコピンの衝撃は非常に短く、Unity側の20FPSの処理だけで見ると検出を取りこぼしました。またしきい値の調整のたびにファームウェアを書き込み直す必要があり、感度を追い込むのに時間がかかりました。",
        approach: [
            "デバイス内で5ms周期で加速度を読み、ハイパスフィルタ成分とjerk成分から算出した衝撃パワーの「その間のピーク値」を約20ms周期で送る構成にしました。",
            "BLEのNotifyをUDPへ中継するブリッジを挟み、Unity側の入力ソースを Serial / HTTP / UDP で切り替えられるようにしました。",
            "デバイスの姿勢をUnity内にデジタルツインとして表示し、しきい値・ジャイロゲイン・HPFカットオフをゲーム画面から調整できるデバッグ画面を実装しました。",
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
                kind: "article",
                title: "Protopedia",
                url: "https://protopedia.net/prototype/9061",
            },
        ],
        imageUrl: "",
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
        challenge:
            "初めての個人開発で、Webアプリがどういう仕組みで動いているのかを理解していませんでした。また単語帳として使うには、意味を毎回手で入力する手間が大きく、自分でも続きませんでした。",
        approach: [
            "FlaskでGET/POST/PUT/DELETEのCRUD APIを実装し、単語帳ごとにJSONファイルへ保存する構成にしました。",
            "フロントからfetchでAPIを呼び、ページを再読み込みせずに単語の追加・編集・削除ができるようにしました。",
            "単語をOpenAI APIへ渡して意味を生成するエンドポイントを追加し、入力の手間をなくしました。",
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
        imageUrl: "",
    },
];
