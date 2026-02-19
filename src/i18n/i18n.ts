import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { z } from 'zod'
import { makeZodI18nMap } from 'zod-i18n-map'
import zodEs from 'zod-i18n-map/locales/es/zod.json'
import zodEn from 'zod-i18n-map/locales/en/zod.json'

import es from './messages/es.json'
import en from './messages/en.json'

export type Lang = 'en' | 'es'

type LangOption = {
  value: Lang
  label: string
}

export const langOptions: Array<LangOption> = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    keySeparator: '.',
    resources: {
      es: { ...es, zod: zodEs },
      en: { ...en, zod: zodEn },
    },
  })

z.setErrorMap(makeZodI18nMap({ ns: ['zod'], handlePath: false }))

export const i18nSetLang = async (lang: Lang) => {
  await i18n.changeLanguage(lang)
}

export const i18nGetLang = () => {
  return i18n.language
}

export default i18n
