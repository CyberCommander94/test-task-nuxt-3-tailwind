<template>
  <div class="w-full h-full flex flex-col bg-white">
    <header class="w-full fixed top-0 left-0 z-[1000] py-[18px] px-4">
      <div class="flex justify-between items-center ltr:flex-row rtl:flex-row-reverse">
        <div class="text-lg font-bold text-black">
          <Logo class="block md:hidden"/>
          <LogoFull class="hidden md:block"/>
        </div>
        <div class="flex items-center justify-center gap-2 ltr:flex-row rtl:flex-row-reverse">
          <Lang />
          <template v-for="(loc, index) in availableLocales">
            <button href="#" class="text-black cursor-pointer px-3 py-2" @click="changeLocale(loc)">
              <div class="flex items-center justify-center gap-[2px]">
                <span :class="{'underline': locale == loc}">{{ loc }}</span>
              </div>
            </button>
            <span v-if="index !== availableLocales.length - 1">|</span>
          </template>
          <NuxtLink to="/" class=" px-3 py-2">{{ t('login') }}</NuxtLink>
        </div>
      </div>
    </header>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import Logo from '@/assets/images/icons/logo.svg'
import LogoFull from '@/assets/images/icons/logo-full.svg'
import Lang from '@/assets/images/icons/lang.svg'

defineProps({ error: Object })
const { t, locale, availableLocales, setLocale } = useI18n()

const changeLocale = async (newLocale) => {
  await setLocale(newLocale)
}
</script>
