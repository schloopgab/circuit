// localStorage-backed replacement for the window.storage API the component
// was originally written against (that API only exists inside a Claude.ai
// Artifact sandbox). Same shape — get() resolves { value } | null, set()
// resolves truthy on success — so swapping in a real backend later only
// means rewriting this one file.
const PREFIX = "circuit-app:";

export const storage = {
  async get(key) {
    try {
      const raw = window.localStorage.getItem(PREFIX + key);
      return raw === null ? null : { value: raw };
    } catch (e) {
      return null;
    }
  },
  async set(key, value) {
    try {
      window.localStorage.setItem(PREFIX + key, value);
      return true;
    } catch (e) {
      return false;
    }
  },
};
