import en from './en.json';
import fr from './fr.json';
import es from './es.json';

export const languages = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
} as const;

export const defaultLang = 'en' as const;

export type Lang = keyof typeof languages;

const translations = { en, fr, es } as const;

export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  let result: any = translations[lang];
  for (const k of keys) {
    result = result?.[k];
  }
  return result ?? key;
}

export function getLocalizedData<T extends Record<string, any>>(data: T, lang: Lang): string {
  if (typeof data === 'object' && data !== null && lang in data) {
    return data[lang];
  }
  return String(data);
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function getLocalizedUrl(lang: Lang, hash?: string): string {
  return `/${lang}/${hash ? '#' + hash : ''}`;
}

export function formatDate(dateStr: string | null, lang: Lang): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'fr' ? 'fr-FR' : 'es-ES', {
    month: 'short',
    year: 'numeric',
  });
}
