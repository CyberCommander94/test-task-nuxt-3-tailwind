<template>
  <div class="relative flex flex-col items-start gap-1 w-full text-[14px]">
    <label v-if="hint" class="w-full ltr:text-left rtl:text-right text-[12px] font-semibold uppercase">{{ hint }}</label>
    <div class="relative w-full">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="w-full h-[40px] py-1 ltr:pl-3 ltr:pr-[32px] rtl:pr-3 rtl:pl-[32px] border-black border-[1px] focus:outline-none bg-white"
        :style="{'direction': isRtl ? 'rtl' : 'ltr'}"
      />
      <Check class="absolute top-[50%] translate-y-[-50%] ltr:right-1 rtl:left-1"/>
    </div>
  </div>
</template>

<script setup>
import Check from '@/assets/images/icons/check.svg'
import { useLocale } from '~/composables/useLocale'

defineProps({
  modelValue: String,
  hint: String,
  placeholder: String
})

const { isRtl } = useLocale()
</script>
