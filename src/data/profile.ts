export interface TimelineItem {
    /** 見出し（学校名・資格名など） */
    label: string;
    /** 補足（期間・詳細） */
    detail: string;
}

export interface CertificationItem {
    /** 取得年月（表示用。例: "2024.09"） */
    date: string;
    /** 資格・免許名 */
    label: string;
    /** 補足（任意） */
    note?: string;
}

export interface ProfileData {
    name: string;
    reading: string;
    tagline: string;
    intro: string[];
    birthDate: string;
    birthPlace: string;
    base: string;
    aspiration: string;
    education: TimelineItem[];
    certifications: CertificationItem[];
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
    birthDate: "2004年12月14日",
    birthPlace: "香川県高松市",
    base: "大阪府",
    aspiration:
        "製造・ロボティクス・物流など、物理世界へのAI実装を志向したエンジニアになりたいと考えています。",
    education: [
        {
            label: "大阪ハイテクノロジー専門学校 人工知能学科",
            detail: "3年制・現在2年生／2025年4月~2028年3月卒業見込み",
        },
    ],
    // 時系列順（古い→新しい）
    certifications: [
        { date: "2024.09", label: "普通自動車第一種免許（AT限定）" },
        { date: "2024.11", label: "MOS Word365 Expert" },
        { date: "2025.01", label: "フォークリフト免許" },
        { date: "2025.02", label: "ITパスポート" },
        { date: "2025.02", label: "基本情報技術者" },
        { date: "2025.05", label: "技術英語能力検定3級" },
        { date: "2025.10", label: "応用情報技術者" },
        { date: "2025.10", label: "Paiza Bランク" },
        { date: "2025.12", label: "3次元CAD利用技術者試験2級" },
        { date: "2026.01", label: "JDLA Deep Learning for GENERAL" },
        { date: "2026.05", label: "第二種電気工事士（学科試験）" },
        { date: "2026.06", label: "AVILEN E資格講座" },
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
            detail: "デナリパム フィジカル ブルー エンジニア賞",
        },
    ],
    internships: [
        {
            label: "信濃ロボティクスイノベーションズ合同会社",
            detail: "5ヶ月間のインターンでDaily-Briefの開発を担当",
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
