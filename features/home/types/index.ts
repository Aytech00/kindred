/** @format */

export type ExplainerItem = {
  eyebrow?: string;
  title: string;
  body?: string;
  lead?: string;
  list?: string[];
  showCircle?: boolean;
  circlePosition?: "top" | "bottom";
  showButton?: boolean;
  buttonLabel?: string;
  buttonHref?: string;
};

export type HomePageData = {
  hero: {
    title: string;
    subtitle?: string;
    buttonLabel?: string;
    buttonHref?: string;
  };
  explainerItems: ExplainerItem[];
  explainerTwo?: {
    title?: string;
    intro?: string;
    sideTitle?: string;
    heading?: string;
    items?: { title: string; body?: string }[];
  };
  cta?: {
    title?: string;
    subtitle?: string;
    buttonLabel?: string;
    buttonHref?: string;
  };
};
