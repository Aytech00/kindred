/** @format */

export const isIOS = () =>
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

export const isAndroid = () =>
  typeof navigator !== "undefined" && /Android/.test(navigator.userAgent);

export const isMobile = () => isIOS() || isAndroid();
