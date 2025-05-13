<template>
  <div :dir="dir" class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
    <div
      class="max-w-md w-full bg-white p-8 rounded-lg shadow text-center"
      :class="{ 'text-right': dir === 'rtl' }"
    >
      <h1 class="text-9xl font-bold text-gray-300 mb-4">404</h1>
      <h2 class="text-2xl font-bold mb-4">{{ t('404.title') }}</h2>
      <p class="text-gray-600 mb-6">{{ t('404.description') }}</p>
      <NuxtLink 
        to="/" 
        class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {{ t('404.back_home') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

defineProps({ error: Object })
const { t, dir } = useI18n()
</script>
