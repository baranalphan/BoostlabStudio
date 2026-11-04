export type SiteLink = {
  label: string;
  url: string;
  newTab?: boolean | null;
};

export type SiteMedia = {
  mime: string;
  alt: string | null;
  url: string;
  width?: number | null;
  height?: number | null;
};

export type NewsItem = {
  /** ISO date; omitted for announcements that don't have a date yet. */
  date?: string;
  title: string;
  description: string;
  /** Optional link; items without one are shown but not clickable. */
  url?: string;
};

export type ShowreelGame = {
  title: string;
  /** Tints the progress light, the selected tile's glow and the light behind the video. */
  accent: string;
  /** The backdrop and particles the games page's stage turns into while this game is on. */
  theme: GameTheme;
  /** Shown until the video loads, and on its own while there is no video yet. */
  poster: SiteMedia;
  /**
   * The game's tile in the picker. A full square image fills the tile; a cut-out
   * (`cutout: true`) sits whole on a dark ground tinted with the game's accent.
   */
  icon: { url: string; cutout?: boolean };
  /**
   * Optional gameplay clip. The stage is 16:9: export at 1920 × 1080 (or 1280 × 720),
   * H.264 MP4, 10–20 seconds, ideally under 8 MB.
   */
  video?: string;
  /**
   * Scale for a clip with black bars baked in, so the picture fills the 16:9 stage (the
   * sides crop a little in exchange). For bars of b px on a clip h px tall: h / (h - 2b).
   */
  videoZoom?: number;

  /* ---- "Our games": each game's chapter in the scroll journey ---- */

  /** One punchy line under the game's name. */
  tagline: string;
  /** Two sentences about the game. */
  blurb: string;
  /** Short labels: genre, hook. */
  tags: string[];
  /** Store page, linked from the chapter. */
  url?: string;
  /** Transparent wordmark shown as the chapter title; without one the name is set in type. */
  logo?: { url: string; width: number; height: number };
  /** 16:9 stills (two or three) from the game. Without them the chapter shows the poster. */
  shots?: string[];
};

/** Backdrop + particle scene per game: aquarium, desert sunset, crime city. */
export type GameTheme = "reef" | "desert" | "city";

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  /** What the visitor typed, handed back so a failed send doesn't wipe the form. */
  values: Record<ContactField, string>;
  errors?: Partial<Record<ContactField, string>>;
};

