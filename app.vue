<template>
  <main class="w-screen h-screen font-montserrat">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<script setup>
const { locale, locales } = useI18n()
const currentLocale = computed(() => {
  return locales.value.find(l => l.code === locale.value)
})

useHead({
  htmlAttrs: {
    dir: computed(() => currentLocale.value?.dir || 'ltr'),
    lang: computed(() => locale.value)
  }
})
</script>
