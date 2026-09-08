import { SETTINGS_STORAGE_KEY } from "@/lib/settings/storage-key"

/**
 * Applies the stored theme before React hydrates.
 *
 * Without this the page paints with the default dark palette and then snaps to
 * the user's theme, which is very visible when the choice is light.
 */
export function ThemeScript() {
  const js = `
(function () {
  try {
    var raw = localStorage.getItem(${JSON.stringify(SETTINGS_STORAGE_KEY)});
    if (!raw) return;
    var a = (JSON.parse(raw).state || {}).settings;
    a = a && a.appearance;
    if (!a) return;
    var root = document.documentElement;
    if (a.theme) root.setAttribute('data-theme', a.theme);
    if (typeof a.radius === 'number') root.style.setProperty('--radius', a.radius + 'rem');
    if (typeof a.uiFontSize === 'number') root.style.setProperty('--ui-font-size', a.uiFontSize + 'px');
    if (a.uiFontFamily) root.style.setProperty('--ui-font-family', a.uiFontFamily);
    if (a.theme === 'custom' && a.custom) {
      Object.keys(a.custom).forEach(function (k) {
        if (/^[a-z-]+$/.test(k) && /^#[0-9a-fA-F]{3,8}$/.test(a.custom[k])) {
          root.style.setProperty('--' + k, a.custom[k]);
        }
      });
    }
  } catch (e) {}
})();`.trim()

  return <script dangerouslySetInnerHTML={{ __html: js }} />
}
