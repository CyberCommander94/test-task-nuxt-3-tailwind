import { useI18n } from 'vue-i18n'

export function useLocale() {
  const { locale } = useI18n()

  const isRtl = computed(() => ['ar', 'he', 'fa', 'ur'].includes(locale.value))

  return { isRtl }
}
