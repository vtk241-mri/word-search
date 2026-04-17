const STORAGE_KEY = "wordsearch:cookie-consent";
const CONSENT_VERSION = "2025.1";

export const defaultConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  version: CONSENT_VERSION,
  updatedAt: null,
};

export function loadConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return {
      ...defaultConsent,
      ...parsed,
      necessary: true,
      version: CONSENT_VERSION,
    };
  } catch (error) {
    console.warn("Failed to load cookie consent preferences.", error);
    return null;
  }
}

export function saveConsent(consent) {
  const next = {
    ...defaultConsent,
    ...consent,
    necessary: true,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.warn("Failed to persist cookie consent preferences.", error);
  }

  return next;
}

export function applyConsentToDocument(consent) {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.cookieNecessary = String(
    Boolean(consent.necessary)
  );
  document.documentElement.dataset.cookieAnalytics = String(
    Boolean(consent.analytics)
  );
  document.documentElement.dataset.cookieMarketing = String(
    Boolean(consent.marketing)
  );
}
