<template>
  <BasePopup ref="popup">
    <div class="flex flex-col items-center justify-start gap-4 px-4 py-9">
      <img
        src="@/assets/images/ready-to-go-image.png"
        width="218"
        height="182"
        alt="Ready to go image"
      />
      <p class="font-bold text-[30px] text-center">{{ t('readyToGo') }}</p>
      <p class="font-bold text-[16px] text-center">{{ t('readyToGoText') }}</p>
      <BaseButton class="mt-[24px]">{{ t('takeTour') }}</BaseButton>
    </div>
  </BasePopup>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

definePageMeta({
  layout: 'default'
})

const { t } = useI18n()

const popup = ref(null)

const showPopup = () => {
  popup.value?.open()
}

onMounted(() => {
  showPopup()
})
</script>
