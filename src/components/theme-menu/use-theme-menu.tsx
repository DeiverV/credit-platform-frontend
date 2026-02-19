import { type Lang } from '@/i18n/i18n'
import { useState } from 'react'

type Theme = 'light' | 'dark'
type Primary = 'blue' | 'green' | 'purple'

const PRIMARY_OPTIONS: { value: Primary; hex: string; label: string }[] = [
  { value: 'blue', hex: '#001bb7', label: 'Blue' },
  { value: 'green', hex: '#0c6113', label: 'Green' },
  { value: 'purple', hex: '#38158a', label: 'Purple' },
]

const LANG_OPTIONS: { value: Lang; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'es', label: 'ES' },
]

export const useThemeMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    return saved ?? 'light'
  })

  const [primary, setPrimary] = useState<Primary>(() => {
    const saved = localStorage.getItem('primary') as Primary | null
    return saved ?? 'blue'
  })

  const applyTheme = (t: Theme) => {
    document.body.setAttribute('data-theme', t)
    localStorage.setItem('theme', t)
    setTheme(t)
  }

  const applyPrimary = (p: Primary) => {
    document.body.setAttribute('data-theme-primary', p)
    localStorage.setItem('primary', p)
    setPrimary(p)
  }

  return {
    isOpen,
    setIsOpen,
    theme,
    applyTheme,
    primary,
    applyPrimary,
    PRIMARY_OPTIONS,
    LANG_OPTIONS,
  }
}
