import imageUrlBuilder from "@sanity/image-url";
import type { ImageCrop, ImageHotspot } from "@domain/types";
import { getSanityClient } from "./sanityClient";

export type SanityImageFit = "crop" | "clip" | "fill" | "fillmax" | "max" | "scale" | "min";

export interface SanityImageSource {
  assetRef?: string;
  assetId?: string;
  crop?: ImageCrop;
  hotspot?: ImageHotspot;
}

export interface SanityImageOptions {
  width?: number;
  height?: number;
  fit?: SanityImageFit;
  quality?: number;
}

export function buildSanityImageUrl(
  source: SanityImageSource | null | undefined,
  options: SanityImageOptions = {}
): string | null {
  const ref = source?.assetRef || source?.assetId;
  if (!ref) {
    return null;
  }

  const builder = imageUrlBuilder(getSanityClient());
  const imageSource = {
    _type: "image",
    asset: { _ref: ref },
    crop: source?.crop,
    hotspot: source?.hotspot,
  };

  let image = builder.image(imageSource).fit(options.fit || "crop");

  if (options.width) {
    image = image.width(options.width);
  }

  if (options.height) {
    image = image.height(options.height);
  }

  if (options.quality) {
    image = image.quality(options.quality);
  }

  return image.url();
}
