// Shared helpers used by every page of the Spain Housing Observatory.

// ---------------------------------------------------------------------------
// Data sources
// ---------------------------------------------------------------------------

const SPAIN_STATS_CSV =
  'https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv';
const SPAIN_STATS_QUARTERLY_CSV =
  'https://raw.githubusercontent.com/galetaire/spahousing/refs/heads/main/public/docs/spain_stats_quarterly.csv';

const csvRequests = {};

/**
 * Loads a CSV file with d3, downloading each file only once per page.
 * Every chart that asks for the same file shares the same request.
 * @param {string} url
 * @returns {Promise<Array<object>>} the parsed rows
 */
function loadCsv(url) {
  if (!csvRequests[url]) {
    csvRequests[url] = d3.csv(url);
  }
  return csvRequests[url];
}

// ---------------------------------------------------------------------------
// Language switcher
// ---------------------------------------------------------------------------

// The same page in each language, keyed by the page's file name.
const METHODOLOGY_PAGES = { en: '/methodology.html', es: '/es/metodologia.html', ca: '/ca/metodologia.html' };
const TRANSLATED_PAGES = {
  'index.html': { en: '/index.html', es: '/es/index.html', ca: '/ca/index.html' },
  'barometer.html': { en: '/barometer.html', es: '/es/barometer.html', ca: '/ca/barometer.html' },
  'methodology.html': METHODOLOGY_PAGES,
  'metodologia.html': METHODOLOGY_PAGES,
};

function currentLanguage() {
  const path = window.location.pathname;
  if (path.includes('/es/')) return 'es';
  if (path.includes('/ca/')) return 'ca';
  return 'en';
}

/**
 * Opens the current page in another language ('en', 'es' or 'ca').
 * Does nothing if that language is already shown.
 */
function setLanguage(lang) {
  if (lang === currentLanguage()) return;

  const fileName = window.location.pathname.split('/').pop() || 'index.html';
  const pages = TRANSLATED_PAGES[fileName] || TRANSLATED_PAGES['index.html'];
  window.location.href = pages[lang];
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = year;
  });
});
