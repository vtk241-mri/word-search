import React from "react";
import Modal from "./Modal";
import {
  applyConsentToDocument,
  defaultConsent,
  loadConsent,
  saveConsent,
} from "../utils/cookieConsent";

function ConsentPreferences({ draft, setDraft, onSave }) {
  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginTop: 0 }}>Налаштування cookie та локального зберігання</h3>
      <p className="small-muted">
        Проєкт працює відповідно до GDPR-підходу: обов'язкові технічні дані
        зберігаються для роботи гри, а аналітика та маркетингові категорії
        вимкнені за замовчуванням.
      </p>

      <div className="consent-grid">
        <label className="consent-row">
          <div>
            <strong>Необхідні</strong>
            <div className="small-muted">
              Зберігають налаштування гри, історію результатів і сам факт вашої
              згоди. Без них застосунок працює нестабільно.
            </div>
          </div>
          <input type="checkbox" checked readOnly disabled />
        </label>

        <label className="consent-row">
          <div>
            <strong>Аналітика</strong>
            <div className="small-muted">
              Дозвіл на збирання агрегованих технічних подій. У цьому проєкті
              зовнішня аналітика не підключена, але категорія збережена як GDPR
              конфігурація.
            </div>
          </div>
          <input
            type="checkbox"
            checked={draft.analytics}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                analytics: event.target.checked,
              }))
            }
          />
        </label>

        <label className="consent-row">
          <div>
            <strong>Маркетинг</strong>
            <div className="small-muted">
              Дозвіл на рекламні або ремаркетингові cookie. У проєкті вони не
              використовуються, але категорія доступна для явної відмови або
              майбутнього розширення.
            </div>
          </div>
          <input
            type="checkbox"
            checked={draft.marketing}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                marketing: event.target.checked,
              }))
            }
          />
        </label>
      </div>

      <p className="small-muted" style={{ marginTop: 12 }}>
        Деталі обробки даних описані у файлах
        {" "}
        <strong>PRIVACY_POLICY.md</strong>
        {" "}
        та
        {" "}
        <strong>USER_GUIDE.md</strong>
        {" "}
        в корені проєкту.
      </p>

      <div className="cookie-actions">
        <button className="btn" onClick={() => onSave({ ...draft })}>
          Зберегти вибір
        </button>
      </div>
    </div>
  );
}

export default function CookieConsentBanner() {
  const [consent, setConsent] = React.useState(() => loadConsent());
  const [isPreferencesOpen, setIsPreferencesOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(() => consent || defaultConsent);

  React.useEffect(() => {
    if (consent) {
      applyConsentToDocument(consent);
      return;
    }

    applyConsentToDocument(defaultConsent);
  }, [consent]);

  const handleSave = (nextConsent) => {
    const saved = saveConsent(nextConsent);
    setConsent(saved);
    setDraft(saved);
    setIsPreferencesOpen(false);
  };

  const handleAcceptNecessary = () => {
    handleSave({
      ...defaultConsent,
      analytics: false,
      marketing: false,
    });
  };

  const handleAcceptAll = () => {
    handleSave({
      ...defaultConsent,
      analytics: true,
      marketing: true,
    });
  };

  const isConfigured = Boolean(consent);

  return (
    <>
      {!isConfigured && (
        <div className="cookie-banner">
          <div className="card cookie-card">
            <strong>Cookie consent</strong>
            <p className="small-muted" style={{ marginBottom: 8 }}>
              Ми використовуємо лише локальне зберігання та технічні cookie для
              роботи гри. Додаткові категорії керуються окремо, згідно з GDPR.
            </p>
            <div className="cookie-actions">
              <button className="btn" onClick={handleAcceptNecessary}>
                Лише необхідні
              </button>
              <button
                className="btn subtle"
                onClick={() => setIsPreferencesOpen(true)}
              >
                Налаштувати
              </button>
              <button className="btn primary" onClick={handleAcceptAll}>
                Прийняти все
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfigured && (
        <div className="cookie-pill">
          <button className="btn" onClick={() => setIsPreferencesOpen(true)}>
            Параметри cookie
          </button>
        </div>
      )}

      {isPreferencesOpen && (
        <Modal onClose={() => setIsPreferencesOpen(false)}>
          <ConsentPreferences
            draft={draft}
            setDraft={setDraft}
            onSave={handleSave}
          />
        </Modal>
      )}
    </>
  );
}
