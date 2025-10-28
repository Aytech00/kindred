/** @format */

import groq from "groq";

export const homePageQuery = groq`*[_type == "homePage"][0]{
  hero{
    title,
    span,
    subtitle,
    "buttonLabel": primaryButton.label,
    "buttonHref": primaryButton.href
  },
  "explainerItems": explainerItems[]{
    eyebrow,
    title,
    body,
    lead,
    list,
    showCircle,
    circlePosition,
    "showButton": coalesce(showButton, defined(button.label)),
    "buttonLabel": button.label,
    "buttonHref": button.href
  },
  "explainerTwo": {
    title,
    intro,
    sideTitle,
    heading,
    items[]{ title, body }
  },
  cta{
    title,
    subtitle,
    "buttonLabel": button.label,
    "buttonHref": button.href
  }
}`;
