import type { SocialLink } from "../types";

export const SOCIALS: SocialLink[] = [
    {
        name: "Github",
        href: "https://github.com/YonezawaYuichiro",
        linkTitle: "GitHubを見る",
        isActive: true,
    },
    {
        name: "Mail",
        href: "mailto:uuitiro@gmail.com",
        linkTitle: "メールを送る",
        isActive: true,
    },
    {
        // TODO: X(Twitter)のアカウントURLが決まったら href を設定して isActive を true にする
        name: "Twitter",
        href: "",
        linkTitle: "Xを見る",
        isActive: false,
    },
];

export const SOCIAL_ICONS: Record<string, string> = {
    Github: "Github",
    Mail: "Mail",
    Twitter: "Twitter",
};
