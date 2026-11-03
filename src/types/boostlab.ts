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
  /** Doubles as the video poster and lights the back of the card. */
  image: CmsMedia;
  /**
   * Optional looping clip that replaces the still. The card frame is 1496 × 1792
   * (187:224, just under 5:6) — export at that size, or 1080 × 1294 for a lighter file.
   */
  video?: string;
  /** The scene the "Our games" section turns into while this game is in front. */
  theme?: GameTheme;
};

/** Backdrop + particle scene per game: aquarium, desert sunset, crime city. */
export type GameTheme = "reef" | "desert" | "city";

export type DepartmentLink = {
  title: string;
  description: string;
  cta: CmsLink;
};

