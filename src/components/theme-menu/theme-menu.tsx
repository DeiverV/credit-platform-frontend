import { useTranslation } from 'react-i18next'
import { LucideBrush, LucideMoon, LucideSun, LucideCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { i18nSetLang, type Lang } from '@/i18n/i18n'
import { SectionLabel } from './components/section-label'
import { ThemeButton } from './components/theme-button'
import { useThemeMenu } from './use-theme-menu'
import { useOutsideClick } from '@/hooks/use-outside-click'

interface StylesMenuProps {
  alignment?: 'top' | 'bottom'
}

export const CustomizeStylesMenu = ({ alignment = 'top' }: StylesMenuProps) => {
  const { t, i18n } = useTranslation('common')
  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false))

  const {
    applyPrimary,
    applyTheme,
    isOpen,
    primary,
    setIsOpen,
    theme,
    LANG_OPTIONS,
    PRIMARY_OPTIONS,
  } = useThemeMenu()

  const currentLang = i18n.language.slice(0, 2) as Lang

  const panelPosition =
    alignment === 'top' ? 'bottom-12 right-0' : 'top-12 right-0'

  return (
    <div className="relative" aria-label="Customize styles" ref={ref}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open theme settings"
        className={cn(
          'h-9 w-9 rounded-default flex items-center justify-center transition-all duration-200',
          'bg-primary border border-white/20 shadow-lg',
          'hover:brightness-110 active:scale-95',
          isOpen && 'rotate-12',
        )}
      >
        <LucideBrush size={16} className="stroke-white" />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 w-52 p-4 rounded-default shadow-2xl',
            'bg-neutral border border-text/10',
            'animate-[slideUp_0.2s_ease-out_forwards]',
            panelPosition,
          )}
        >
          <section className="mb-4">
            <SectionLabel>{t('theme')}</SectionLabel>
            <div className="flex gap-2">
              <ThemeButton
                active={theme === 'light'}
                onClick={() => applyTheme('light')}
                title="Light mode"
              >
                <LucideSun
                  size={16}
                  className={
                    theme === 'light' ? 'stroke-neutral' : 'stroke-white'
                  }
                />
              </ThemeButton>
              <ThemeButton
                active={theme === 'dark'}
                onClick={() => applyTheme('dark')}
                title="Dark mode"
              >
                <LucideMoon size={16} />
              </ThemeButton>
            </div>
          </section>

          <section className="mb-4">
            <SectionLabel>{t('primaryColor')}</SectionLabel>
            <div className="flex gap-2">
              {PRIMARY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  title={opt.label}
                  onClick={() => applyPrimary(opt.value)}
                  className={cn(
                    'relative h-7 w-7 rounded-full border-2 transition-transform duration-200 hover:scale-110',
                    primary === opt.value
                      ? 'border-text scale-110'
                      : 'border-transparent',
                  )}
                  style={{ backgroundColor: opt.hex }}
                >
                  {primary === opt.value && (
                    <LucideCheck
                      size={12}
                      className="absolute inset-0 m-auto stroke-white stroke-3"
                    />
                  )}
                </button>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel>{t('language')}</SectionLabel>
            <div className="flex gap-2">
              {LANG_OPTIONS.map((opt) => (
                <ThemeButton
                  key={opt.value}
                  active={currentLang === opt.value}
                  onClick={() => i18nSetLang(opt.value)}
                  title={opt.value === 'en' ? 'English' : 'Español'}
                >
                  <span
                    className={cn(
                      'text-xs font-bold leading-none',
                      currentLang === opt.value
                        ? 'dark:text-white text-white'
                        : 'dark:text-white text-text',
                    )}
                  >
                    {opt.label}
                  </span>
                </ThemeButton>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
