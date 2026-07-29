export interface TimelineItem {
    /** 見出し（学校名・資格名など） */
    label: string;
    /** 補足（期間・詳細） */
    detail: string;
}

export interface ProfileData {
    name: string;
    reading: string;
    tagline: string;
    intro: string[];
    base: string;
    aspiration: string;
    education: TimelineItem[];
    certifications: TimelineItem[];
    workHistory: TimelineItem[];
    awards: TimelineItem[];
    internships: TimelineItem[];
    recentLearning: TimelineItem[];
    avatar: string;
    contact: {
        email: string;
        github: string;
        // TODO: X(Twitter)のアカウントURLが決まったら入力する
        x: string;
    };
}

export const PROFILE: ProfileData = {
    name: "米澤 佑一郎",
    reading: "Yonezawa Yuichiro",
    tagline: "物理世界にAIを実装するエンジニアを目指しています。",
    intro: [
        "フィジカルAI分野でのエンジニアを志望しています。前職で物流倉庫の搬送業務を担当した経験から、自動搬送機のような未普及の最新技術への憧れを感じ、自分もこうした現場を助けるシステムを作って普及させたいと考えています。",
        "学校ではAIやプログラミングの勉強だけでなく、Raspberry PiやArduino、ESP32などのマイコンを活用した学習も行っています。また、AI時代において信用されるエンジニアになりたいと考え、応用情報技術者やE資格などの難関資格取得へ挑戦しています。",
    ],
    base: "大阪府",
    aspiration:
        "製造・ロボティクス・物流など、物理世界へのAI実装（Forward Deployed Engineer, FDE）を志向したキャリアを歩みたいと考えています。",
    education: [
        {
            label: "大阪ハイテクノロジー専門学校 人工知能学科",
            detail: "3年制・現在2年生／28歳／2028年3月卒業見込み",
        },
    ],
    certifications: [
        { label: "応用情報技術者", detail: "2025年10月合格（IT学習開始から最短9ヶ月）" },
        { label: "基本情報技術者", detail: "2025年2月合格" },
        { label: "ITパスポート", detail: "2025年2月合格" },
        { label: "第二種電気工事士（学科試験）", detail: "2026年5月合格" },
        { label: "3次元CAD利用技術者試験2級", detail: "2025年12月合格" },
        { label: "JDLA Deep Learning for GENERAL", detail: "2026年1月合格" },
        { label: "AVILEN E資格講座", detail: "2026年6月修了" },
        { label: "技術英語能力検定3級", detail: "2025年5月合格" },
        { label: "MOS Word365 Expert", detail: "2024年11月取得" },
        { label: "フォークリフト免許", detail: "2025年1月取得" },
        { label: "普通自動車第一種免許（AT限定）", detail: "2024年9月取得" },
    ],
    workHistory: [
        {
            label: "三興物流株式会社（アルバイト）",
            detail: "物流倉庫での搬送業務を担当／2024年2月〜2025年1月",
        },
    ],
    awards: [
        {
            label: "テックシーカーハッカソン",
            detail: "デナリパム フィジカル ブルーエンジニア賞",
        },
    ],
    internships: [
        {
            label: "信濃ロボティクスイノベーションズ合同会社",
            detail: "5ヶ月間のインターンでDaily-Briefの開発等を担当",
        },
        {
            label: "Hutzper（大阪／製造業向け検査AIスタートアップ）",
            detail: "2026年8月上旬よりインターン開始予定",
        },
    ],
    recentLearning: [
        { label: "JDLA Deep Learning for ENGINEER（E資格）", detail: "受験予定" },
    ],
    avatar: "IMG_1215_A.JPEG",
    contact: {
        email: "uuitiro@gmail.com",
        github: "https://github.com/YonezawaYuichiro",
        x: "",
    },
};
