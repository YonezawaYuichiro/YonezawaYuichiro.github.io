export interface ProjectData {
    id: string;
    title: string;
    /** 開発組織 */
    org: string;
    /** 種別（インターン業務、個人開発 など） */
    category: string;
    /** 担当範囲 */
    role: string;
    /** 概要（カードに表示。3行で切れるため2〜3文まで） */
    summary: string;
    /** 技術的な工夫（モーダルにのみ表示） */
    highlights?: string[];
    /** 関連技術タグ（カードは先頭4件まで表示） */
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
        org: "信濃ロボティクスイノベーションズ合同会社",
        category: "インターン業務",
        role: "アイデアは社長、設計と実装は米澤佑一郎が担当",
        summary:
            "Gmailとカレンダーの内容をLLMで選別・要約し、音声ブリーフィングとして毎朝自動生成するWebアプリ。FastAPI + React + PostgreSQL を AWS ECS Fargate で運用しています。",
        highlights: [
            "メールの選別では「重要メールを見逃さない（再現率）」と「スパムを除く（適合率）」が相反し、単一プロンプトではどちらかが必ず犠牲になりました。そこで再現率重視のLayer1と適合率重視のLayer2に役割を分ける2層構成を設計しています。",
            "改善を再現できる状態にするため、境界ケースを含む合成メール400件超の評価データセットを自作。混同行列とF1スコアを指標に19ラウンド・57回以上のテストを回し、重要メールの見逃し0件を保ったままF1 0.978まで改善しました。",
            "生成処理はメール取得・AI要約・音声合成・アップロードを含み、HTTPのタイムアウトに収まりません。ジョブを PENDING → PROCESSING → COMPLETED で管理する非同期方式にし、即座にジョブIDを返してフロントがポーリングする設計にしています。APScheduler で定時の自動生成にも対応しました。",
            "Gmail・Calendarを扱うため、Google の Limited Use 要件への準拠とプライバシーポリシーの策定を担当。アカウント削除APIでGDPRの「忘れられる権利」にも対応しています。",
            "Docker のマルチステージビルドで React と FastAPI を1つのイメージに同梱し、デプロイを1コマンドに集約しました。",
        ],
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
        repoUrl: "https://github.com/YonezawaYuichiro/Daily-Brief",
        imageUrl: "", // TODO: スクリーンショット等を追加
    },
    {
        id: "3d-photogrammetry",
        title: "3Dフォトグラメトリ",
        org: "Hutzper（インターン選考課題）",
        category: "インターン選考課題",
        role: "回転台の製作は先方。撮影から3D化までのパイプライン構築を米澤佑一郎が担当",
        summary:
            "回転台に載せた物体をステッピングモーターで回しながら撮影し、写真から3Dモデルを復元するパイプライン。COLMAPでカメラ位置を推定し、OpenMVSで密点群からテクスチャ付きメッシュまでを自動化しました。",
        highlights: [
            "ターンテーブル撮影では背景と回転台が画像間で動かないため、そのまま特徴点を突き合わせると被写体ではなく背景基準で位置合わせされてしまいます。rembgで生成したマスクで背景を除外したうえで、静止したままの対応点を除去する処理を既定で有効にしました。",
            "CPU環境で 5712×4284 を原寸処理するとRAMが足りず落ちるため、画像サイズ上限・スレッド数・SIFTのfirst_octaveを調整。first_octaveは既定の -1 が「2倍に拡大してから処理」でメモリを4倍消費するため、0 に変更しています。",
            "特徴点抽出器（SIFT / ALIKED）とマッチャ（BruteForce / LightGlue）をコマンドライン引数で差し替えられるようにし、被写体ごとに条件を比較できる形にしました。",
            "工程が長く途中で落ちると最初からやり直しになるため、`--from` と `--resume` で任意の工程から再開できる構成にしています。",
            "出力が妥当かを目視以外でも確認できるよう、被覆率・法線・UV・空面をチェックするスクリプトを用意しました。",
        ],
        tech: ["COLMAP", "OpenMVS", "Python", "rembg", "ステッピングモーター制御"],
        repoUrl: "", // リポジトリなし
        imageUrl: "",
    },
    {
        id: "dialogue-preference-learning",
        title: "対話式選好学習",
        org: "学校（研究の授業）",
        category: "研究課題（未完成）",
        role: "アイデアから実装まで全て米澤佑一郎が担当",
        summary:
            "就職活動で就活生にどんどん企業を紹介してもらうため、Claude Skillsを用いた価値観抽出法を提案・実装中。未完成。",
        tech: ["Claude Skills", "LLM", "Python"],
        repoUrl: "https://github.com/YonezawaYuichiro/kigyou",
        imageUrl: "",
    },
    {
        id: "face-tracker",
        title: "face-tracker",
        org: "学校（授業）",
        category: "ハード開発",
        role: "カメラ処理・サーボ制御・機能統合を担当（3名チーム）",
        summary:
            "Raspberry Pi 4 とUSBカメラで顔を検出し、2軸のサーボモーターでカメラを追従させるシステム。顔の中心と画面中心のズレを角度に変換してサーボを駆動します。",
        highlights: [
            "検出位置は毎フレーム微妙に揺れるため、そのまま追従させるとサーボが震え続けます。50pxのデッドゾーンを設けて微小なズレを無視し、パンは±90°、チルトは-90〜0°に可動範囲を制限しました。",
            "gpiozeroの標準のPWMではジッタが出てサーボが唸るため、pigpioデーモンをピンファクトリに指定してハードウェアPWMで制御しています。",
            "目標角へ動かした後は `servo.value = None` でPWM出力を止め、保持トルクによる発熱とうなりを避けました。",
            "顔検出はHaar-Cascade版とMediaPipe版を別ディレクトリで実装し、検出方式を差し替えて比較できるようにしています。",
        ],
        tech: ["Python", "OpenCV", "Raspberry Pi 4", "gpiozero / pigpio", "MG90S サーボ"],
        repoUrl: "https://github.com/YonezawaYuichiro/face-tracker",
        imageUrl: "",
    },
    {
        id: "signate-flood-prediction",
        title: "SIGNATE（木材含水率予測）",
        org: "学校（授業）",
        category: "コンペ課題",
        role: "米澤佑一郎が担当",
        summary:
            "近赤外スペクトル1555波長から木材の含水率を予測する回帰コンペ。系統の異なる6モデルの予測をメタモデルで統合するスタッキング構成を組み、最終スコアは RMSE 11.103 でした。",
        highlights: [
            "訓練データとテストデータで樹種が完全に分離しており、手元の交差検証スコアの改善がリーダーボードに転移しないのが最大の難所でした。含水率も0.84〜298.6%と極端に右へ偏っています。",
            "誤差が相関しないよう、NN系（TCN・EfficientNet+Wavelet）、GBDT系（Huber-LGBM・高含水率特化LGBM・LightGBM+DWT）、線形系（PLS回帰）を混ぜて多様性を確保しました。",
            "統合するメタモデルのLightGBMは、右へ偏った分布に合わせて Tweedie 目的関数で学習。入力にはベースモデルの予測に加えて、平均・ばらつき・最大最小差といったモデル間の一致度も特徴量として与えています。",
            "18回の試行それぞれで何を変えて何が起きたかと、精度が落ちたため棄却したモデル（CatBoost・ExtraTrees）の経緯をドキュメントに残しました。",
        ],
        tech: ["LightGBM", "PyTorch", "Optuna", "Wavelet変換", "スタッキング"],
        repoUrl: "",
        imageUrl: "",
    },
    {
        id: "handon-power-device",
        title: "デコピン強化装置",
        org: "学校（ハッカソン）",
        category: "ハッカソン",
        role: "アイデアと回路設計、Unity側のゲームとデバイス連携画面を担当",
        summary:
            "手に装着したデバイスでデコピンの衝撃を検出し、Unityのリズムゲームに反映する装置。9軸IMUの値をBLEでPCへ送り、UDPでUnityに流し込みます。",
        highlights: [
            "デコピンは衝撃が非常に短く、Unity側の20FPS処理だけで見ると取りこぼします。デバイス内で5ms周期で加速度を読み、ハイパスフィルタ成分とjerk成分から算出した衝撃パワーの「その間のピーク値」を約20ms周期で送る構成にして検出漏れを抑えました。",
            "BLEのNotifyをUDPに中継するブリッジを挟み、Unity側は入力ソースを Serial / HTTP / UDP で切り替えられる設計にしています。実機がなくても開発を進められる形です。",
            "デバイスの姿勢をUnity内にデジタルツインとして表示し、しきい値・ジャイロゲイン・HPFカットオフをゲーム画面から調整できるデバッグ画面を実装しました。ハードを触らずに感度を追い込めます。",
            "リズムゲームのレベル設計、タップテンポによるタイミング調整画面、WebGLビルドとランキングAPI連携までを担当しています。",
        ],
        tech: ["Unity / C#", "Arduino UNO Q", "MPU9250（9軸IMU）", "BLE", "UDP通信"],
        repoUrl: "https://github.com/sousci/decopin-project",
        imageUrl: "",
    },
    {
        id: "tango-de-go",
        title: "単語でGO",
        org: "信濃ロボティクスイノベーションズ合同会社（インターン選考課題）",
        category: "個人開発（初）",
        role: "本人一人で開発",
        summary:
            "自分用の単語帳Webアプリ。単語を登録するとGPT-4o-miniが意味を生成し、習熟度を記録できます。初めての個人開発で、Webアプリがどう動くのかを一通り学びました。",
        highlights: [
            "FlaskでGET/POST/PUT/DELETEのCRUD APIを実装し、単語帳ごとにJSONファイルへ保存。フロントはfetchでAPIを叩き、ページを再読み込みせずに追加・編集・削除できるようにしました。",
            "意味を毎回手入力するのが面倒だったため、単語をOpenAI APIに投げて意味を生成するエンドポイントを追加しています。",
            "APIの失敗理由が分からないと直せないため、認証エラー・レートリミット・接続エラーを個別に捕捉し、それぞれ原因の分かるメッセージとステータスコードを返すようにしました。",
        ],
        tech: ["Python", "Flask", "Jinja2", "JavaScript", "OpenAI API"],
        repoUrl: "https://github.com/YonezawaYuichiro/tango_table",
        imageUrl: "",
    },
];
