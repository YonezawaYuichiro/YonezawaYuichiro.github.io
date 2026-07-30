/**
 * 植物のパス生成。
 *
 * 手で書いたパスだと、同じ形の繰り返しになってクリップアートに見える。
 * 実際の葉は「軸に沿って葉片の長さ・角度が連続的に変化し、縁が鋸歯で、
 * 左右が非対称」なので、そこを数式で作る。
 *
 * 乱数は種を固定しているので、ビルドのたびに形が変わることはない。
 */

type P = readonly [number, number];

const n = (v: number) => Math.round(v * 10) / 10;

/** 線形合同法。形を毎回同じにするため種を固定して使う */
function rng(seed: number) {
    let s = seed >>> 0;
    return () => {
        s = (s * 1664525 + 1013904223) >>> 0;
        return s / 4294967296;
    };
}

/** 2次ベジェ上の座標 */
function qPos(p0: P, p1: P, p2: P, t: number): P {
    const u = 1 - t;
    return [
        u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
        u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
    ];
}

/** 2次ベジェ上の接線角（度） */
function qAngle(p0: P, p1: P, p2: P, t: number): number {
    const u = 1 - t;
    const dx = 2 * u * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
    const dy = 2 * u * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
    return (Math.atan2(dy, dx) * 180) / Math.PI;
}

/**
 * 先細りの軸。均一な太さの線を引くと茎ではなく針金に見えるため、
 * 両側に法線方向のオフセットを取って閉じた図形にする。
 */
function taperedSpine(p0: P, p1: P, p2: P, hw0: number, hw1: number, steps = 18): string {
    const up: P[] = [];
    const dn: P[] = [];
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const [x, y] = qPos(p0, p1, p2, t);
        const u = 1 - t;
        const dx = 2 * u * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
        const dy = 2 * u * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const hw = hw0 + (hw1 - hw0) * t;
        up.push([x + nx * hw, y + ny * hw]);
        dn.push([x - nx * hw, y - ny * hw]);
    }
    const fwd = up.map((p) => `${n(p[0])} ${n(p[1])}`).join("L");
    const back = dn.reverse().map((p) => `${n(p[0])} ${n(p[1])}`).join("L");
    return `M${fwd}L${back}Z`;
}

/**
 * 葉片1枚。縁を裂片（lobe）で作るのが要点で、
 * なめらかな楕円にすると途端に葉に見えなくなる。
 */
function leaflet(
    len: number,
    wid: number,
    lobesTop: number,
    lobesBot: number,
    asym: number,
    /** 裂片の張り出し。大きいほど深い切れ込みになる */
    bulge = 1.38,
    /** 切れ込みの深さ。bulge との差が鋸歯の粗さを決める */
    notch = 0.7,
    /** 先端の尖り。1で楕円、大きいほど尾状に伸びる */
    tip = 0.78,
): string {
    // 葉片の輪郭。u=0が付け根、u=1が先端
    const env = (u: number, k: number): P => [
        len * u,
        -k * wid * Math.sin(Math.PI * Math.pow(u, tip)),
    ];

    let d = "M0 0";

    // 上側の縁：裂片の先を外へ張り出させ、間を切れ込みで結ぶ
    for (let j = 0; j < lobesTop; j++) {
        const u0 = j / lobesTop;
        const u1 = (j + 1) / lobesTop;
        const um = (u0 + u1) / 2;
        const [cx, cy] = env(um, bulge);
        const [x1, y1] = env(u1, notch);
        d += `Q${n(cx)} ${n(cy)} ${n(x1)} ${n(y1)}`;
    }

    // 下側の縁：裂片の数と張り出しを変えて左右非対称にする
    for (let j = lobesBot; j > 0; j--) {
        const u0 = j / lobesBot;
        const u1 = (j - 1) / lobesBot;
        const um = (u0 + u1) / 2;
        const [cx, cy] = env(um, -bulge * 0.94 * asym);
        const [x1, y1] = env(u1, -notch * 0.92 * asym);
        d += `Q${n(cx)} ${n(cy)} ${n(x1)} ${n(y1)}`;
    }

    return d + "Z";
}

export interface Part {
    d: string;
    /** 葉片は個別に回転・移動させる */
    transform?: string;
    /**
     * fill … 葉の本体（currentColor で塗る）
     * cut  … 葉の上に地の色で重ねて主脈を抜く
     * vein … 地の色の線で側脈を描く
     */
    mode?: "fill" | "cut" | "vein";
}

export interface Shape {
    viewBox: string;
    parts: Part[];
}

/* ============ シダ（羽状複葉） ============ */
export function frond(): Shape {
    const p0: P = [0, 0];
    const p1: P = [126, 2];
    const p2: P = [232, 78];
    const rand = rng(20260731);
    const parts: Part[] = [];

    // 中軸
    parts.push({ d: taperedSpine(p0, p1, p2, 3.4, 0.7) });

    // 羽片は細く、間隔を空ける。太いと隣とくっついて塊に見える
    const stations = 12;
    for (let i = 1; i <= stations; i++) {
        const t = i / (stations + 1);
        const [x, y] = qPos(p0, p1, p2, t);
        const base = qAngle(p0, p1, p2, t);

        // 長さは中ほどで最大、根元と先端で短い
        const grow = Math.sin(Math.PI * Math.pow(t, 0.62));
        const len = 17 + 46 * grow;
        const wid = len * 0.185;

        // 先端へ行くほど軸に沿って前へ寝る
        const spread = 76 - 36 * t;

        for (const side of [-1, 1]) {
            const jitter = (rand() - 0.5) * 14;
            const scale = 0.86 + rand() * 0.28;
            const deg = base + side * (spread + jitter);
            parts.push({
                d: leaflet(
                    len * scale,
                    wid * scale,
                    4 + Math.round(rand() * 2),
                    3 + Math.round(rand() * 2),
                    0.82 + rand() * 0.3,
                    1.5,
                    0.52,
                    0.72,
                ),
                transform: `translate(${n(x)} ${n(y)}) rotate(${n(deg)})`,
            });
        }
    }

    return { viewBox: "-18 -56 286 190", parts };
}

/* ============ 杉の枝 ============ */
export function bough(): Shape {
    const p0: P = [0, 0];
    const p1: P = [104, 10];
    const p2: P = [196, 76];
    const rand = rng(77321);
    const parts: Part[] = [];

    parts.push({ d: taperedSpine(p0, p1, p2, 3, 0.8) });

    // 小枝を2本出す。これがないと1本の羽根に見えて針葉樹にならない
    const branches: Array<{ t: number; deg: number; len: number }> = [
        { t: 0.28, deg: -34, len: 0.5 },
        { t: 0.56, deg: 30, len: 0.42 },
    ];

    const needlesAlong = (
        a0: P,
        a1: P,
        a2: P,
        count: number,
        maxLen: number,
        seedShift: number,
    ) => {
        for (let i = 1; i <= count; i++) {
            const t = i / (count + 1);
            const [x, y] = qPos(a0, a1, a2, t);
            const base = qAngle(a0, a1, a2, t);
            const grow = Math.sin(Math.PI * Math.pow(t, 0.55));
            const len = maxLen * (0.45 + 0.55 * grow);
            for (const side of [-1, 1]) {
                const jitter = (rand() - 0.5) * 16 + seedShift * 0;
                const deg = base + side * (62 - 26 * t + jitter);
                const l = len * (0.85 + rand() * 0.3);
                // 針葉は細長い先細り。二次曲線でわずかに反らせる
                parts.push({
                    d: `M0 0Q${n(l * 0.55)} ${n(-l * 0.1)} ${n(l)} ${n(-l * 0.06)}Q${n(l * 0.55)} ${n(l * 0.06)} 0 1.4Z`,
                    transform: `translate(${n(x)} ${n(y)}) rotate(${n(deg)})`,
                });
            }
        }
    };

    needlesAlong(p0, p1, p2, 16, 26, 0);

    for (const b of branches) {
        const [bx, by] = qPos(p0, p1, p2, b.t);
        const base = qAngle(p0, p1, p2, b.t);
        const L = 118 * b.len;
        const s0: P = [bx, by];
        const rad = ((base + b.deg) * Math.PI) / 180;
        const s2: P = [bx + Math.cos(rad) * L, by + Math.sin(rad) * L];
        const s1: P = [
            bx + Math.cos(rad) * L * 0.55,
            by + Math.sin(rad) * L * 0.55 - 6,
        ];
        parts.push({ d: taperedSpine(s0, s1, s2, 1.9, 0.6) });
        needlesAlong(s0, s1, s2, 9, 19, 1);
    }

    return { viewBox: "-16 -42 232 152", parts };
}

/* ============ 広葉 ============ */
export function broadleaf(): Shape {
    const len = 178;
    const wid = 38;
    const parts: Part[] = [];

    // 広葉は「なだらかな輪郭に細かい鋸歯」。裂片を深くするとシダに見えるので、
    // 張り出しと切れ込みの差を詰めて縁だけギザつかせる。
    // tip を大きめにして先端を尾状に尖らせるのが広葉らしさの決め手
    parts.push({ d: leaflet(len, wid, 17, 16, 0.96, 1.06, 0.94, 0.56) });

    // 主脈：葉の上に地の色で重ねて抜く
    parts.push({
        d: taperedSpine([2, 0], [len * 0.5, 1], [len * 0.97, 0], 1.7, 0.4),
        mode: "cut",
    });

    // 側脈。主脈から出て縁へ向かって反る
    for (let i = 1; i <= 7; i++) {
        const u = i / 8.4;
        const x = len * u;
        const halfW = wid * Math.sin(Math.PI * Math.pow(u, 0.56));
        for (const side of [-1, 1]) {
            const tipX = x + len * 0.17;
            const tipY = side * halfW * 0.82;
            parts.push({
                d: `M${n(x)} 0Q${n(x + len * 0.07)} ${n(side * halfW * 0.34)} ${n(tipX)} ${n(tipY)}`,
                mode: "vein",
            });
        }
    }

    return { viewBox: "-6 -56 190 112", parts };
}

/* ============ 下草 ============ */
export function grass(): Shape {
    const rand = rng(4410);
    const parts: Part[] = [];
    const blades = 15;

    for (let i = 0; i < blades; i++) {
        const x0 = 8 + i * 8.6 + (rand() - 0.5) * 9;
        const h = 84 + rand() * 116;
        // しなりを強めに。直線的だと草ではなく棒に見える
        const lean = (rand() - 0.5) * 128;
        const w = 2.8 + rand() * 2.6;

        // 根元から立ち上がり、先端でしなる
        const p0: P = [x0, 200];
        const p1: P = [x0 + lean * 0.35, 200 - h * 0.55];
        const p2: P = [x0 + lean, 200 - h];
        parts.push({ d: taperedSpine(p0, p1, p2, w, 0.3, 12) });
    }

    return { viewBox: "0 0 140 205", parts };
}
