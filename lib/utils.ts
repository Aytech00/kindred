import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function waitForNuFiWidget(
  timeoutMs = 15000
): Promise<HTMLIFrameElement | null> {
  const matches = (el: Element) => {
    if (el.tagName !== "IFRAME") return false;
    const src = (el as HTMLIFrameElement).src || "";
    return /https:\/\/wallet(?:-[a-z]+)?\.nu\.fi\/.*widget/i.test(src);
  };

  const existing = Array.from(document.querySelectorAll("iframe")).find(
    matches
  );
  if (existing) return Promise.resolve(existing as HTMLIFrameElement);

  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      obs.disconnect();
      resolve(null);
    }, timeoutMs);

    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const n of Array.from(m.addedNodes)) {
          if (n instanceof HTMLElement) {
            if (matches(n)) {
              clearTimeout(timer);
              obs.disconnect();
              resolve(n as HTMLIFrameElement);
              return;
            }
            const nested = Array.from(
              n.querySelectorAll?.("iframe") ?? []
            ).find(matches);
            if (nested) {
              clearTimeout(timer);
              obs.disconnect();
              resolve(nested as HTMLIFrameElement);
              return;
            }
          }
        }
      }
    });

    obs.observe(document.body, { childList: true, subtree: true });
  });
}
