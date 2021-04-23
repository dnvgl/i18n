export function isBrowserCompatible(): boolean {
  return typeof Intl !== "undefined" && typeof Intl.RelativeTimeFormat !== "undefined";
}