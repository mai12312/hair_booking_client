import { Metadata } from "next";
const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'development';
const url = isProduction ? 'https://webtoon-theta.vercel.app' : 'http://localhost:3000';
export function constructMetadata({
    title = `${process.env.NEXT_PUBLIC_PROD_URL}`,
    description = `${process.env.NEXT_PUBLIC_PROD_URL}`,
    image = `/img_logo.png`,
    icons = `/img_logo.png`,
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title,
        description,
        referrer: "no-referrer",
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                    alt: description,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "dinhkhanh.dk",
        },
        icons,
        metadataBase: new URL(url),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}