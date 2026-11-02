export type CmsLink = {
  label: string;
  url: string;
  newTab?: boolean | null;
};

export type CmsMedia = {
  mime: string;
  alt: string | null;
  url: string;
  width?: number | null;
  height?: number | null;
  /** A short looping logo animation (a video standing in for a GIF), framed like a GIF. */
  animation?: boolean;
};

export type NewsItem = {
  /** ISO date; omitted for announcements that don't have a date yet. */
  date?: string;
  title: string;
  description: string;
  /** Optional link; items without one are shown but not clickable. */
  url?: string;
  image: CmsMedia;
};

export type CarouselCard = {
  title: string;
  /** Optional store page; the whole card links there. */
  url?: string;
  image: CmsMedia;
};

export type DepartmentLink = {
  title: string;
  description: string;
  cta: CmsLink;
};

