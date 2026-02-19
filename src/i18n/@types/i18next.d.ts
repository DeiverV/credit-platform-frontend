import type en from '../messages/es.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof en
  }
}
