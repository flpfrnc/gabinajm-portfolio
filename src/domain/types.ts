/**
 * Shared domain types and enums
 */

export type SocialPlatform = "github" | "linkedin" | "twitter" | "email" | "instagram";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface ImageCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface ImageHotspot {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SanityImageAsset {
  id?: string;
  url: string;
  alt: string;
  lqip: string;
}

export interface ProfileAvatar {
  asset: SanityImageAsset;
  alt: string;
}

export interface ExperienceCompany {
  name: string;
  logo: SanityImageAsset;
}

export interface ProjectImage {
  asset: SanityImageAsset;
  alt: string;
  lqip: string;
  assetRef?: string;
  crop?: ImageCrop;
  hotspot?: ImageHotspot;
}

export interface Technology {
  name: string;
  category: "Frontend" | "Backend" | "DevOps" | "Other";
}

export interface ContentSectionImage {
  asset?: { url: string; lqip?: string };
  alt?: string;
}

export interface ContentSectionCard {
  metric: string;
  label: string;
}

export interface ContentSection {
  _type: string;
  _key: string;
  sectionLabel?: string;
  heading?: string;
  body?: string;
  bullets?: string[];
  bgColor?: string;
  textColor?: string;
  subtitle?: string;
  caption?: string;
  columns?: number;
  alt?: string;
  image?: ContentSectionImage;
  images?: ContentSectionImage[];
  cards?: ContentSectionCard[];
  videoUrl?: string;
  externalUrl?: string;
  poster?: ContentSectionImage;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export type SectionPadding = "none" | "small" | "medium" | "large";

export type SectionBackgroundType = "color" | "image";

export interface SectionBackground {
  type: SectionBackgroundType;
  color?: string;
  imageUrl?: string;
  imageLqip?: string;
  imageAlt?: string;
}

export type SectionOverlay = "none" | "light" | "dark";

export enum FetchErrorCode {
  NOT_FOUND = "NOT_FOUND",
  NETWORK_ERROR = "NETWORK_ERROR",
  INVALID_DATA = "INVALID_DATA",
  UNAUTHORIZED = "UNAUTHORIZED",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

export class FetchError extends Error {
  constructor(
    public code: FetchErrorCode,
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "FetchError";
  }
}
