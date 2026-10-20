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
};

export type MediaVariation =
  | "LandscapeRight"
  | "LandscapeCenter"
  | "LandscapeRightBottom"
  | "PortraitRight";

export type CardVariant = "play" | "win" | "earn";

export type TabVariant = "board" | "prize" | "reward" | "team";

export type NewsItem = {
  date: string;
  title: string;
  description: string;
  url: string;
  image: CmsMedia;
};

export type CarouselCard = {
  label: string;
  title: string;
  image: CmsMedia;
  video: CmsMedia;
};

export type ScrollListSection = {
  title: string;
  description: string;
  sectionId: string;
};

export type GamesTab = {
  label: string;
  title: string;
  description: string;
  tabVariant: TabVariant;
};
