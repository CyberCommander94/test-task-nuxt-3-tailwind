<template>
  <div class="flex flex-col md:flex-row items-center justify-start h-full w-full">
    <div class="w-full h-full md:w-1/2 md:min-w-[50%] order-2 md:order-1 text-center pt-[60px] md:pt-0 px-4 flex md:flex-1 flex-col items-center md:justify-center gap-10">
      <div class="flex flex-col gap-4 items-center text-black max-w-[343px] w-full">
        <img
          src="@/assets/images/logo.png"
          class="w-[73px] h-[64px] md:w-[90px] md:h-[78px]"
          alt="Ready to go image"
        />
        <h1 class="text-3xl font-black">{{ t('phoneCheck') }}</h1>
        <p class="font-semibold">
          {{ t('phoneCheckText') }}
        </p>
      </div>
      <div class="flex flex-col items-center gap-4 w-full max-w-[343px]">
        <BaseInput :hint="t('codeHint')" />
        <BaseButton @click="handleContinue">{{ t('continue') }}</BaseButton>
      </div>
    </div>
    <div class="flex md:flex-1 w-full md:w-1/2 order-1 md:order-2 bg-[url('@/assets/images/login-image.png')] bg-cover bg-top md:bg-center h-[228px] md:h-full"></div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'login'
})

const router = useRouter()
const { t } = useI18n()

const handleContinue = () => {
  router.push('/home')
}
</script>
