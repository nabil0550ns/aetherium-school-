import { ar } from './ar';
import { fr } from './fr';
import { en } from './en';

export type Language = 'ar' | 'fr' | 'en';
export type LocaleData = typeof ar;

export const locales: Record<Language, LocaleData> = {
  ar,
  fr,
  en,
};
