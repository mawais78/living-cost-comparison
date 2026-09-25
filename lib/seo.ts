import type { Metadata } from "next"

export const siteName = "Living Cost Comparison"
export const siteUrl = "https://livingcostcomparison.com"

export const defaultSocialImage = {
  url: "/images/guides/compare-cost-of-living.jpg",
  width: 1536,
  height: 1024,
  alt: "Planning materials for comparing household costs between two cities",
}

type SocialMetadataOptions = {
  title: string
  description: string
  path: string
  type?: "website" | "article"
  image?: typeof defaultSocialImage
}

export function getSocialMetadata({
  title,
  description,
  path,
  type = "website",
  image = defaultSocialImage,
}: SocialMetadataOptions): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type,
      siteName,
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}
