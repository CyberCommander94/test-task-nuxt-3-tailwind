<template>
  <div class="relative flex flex-col items-start gap-1 w-full text-[14px]">
    <label v-if="hint" class="w-full ltr:text-left rtl:text-right text-[12px] font-semibold uppercase">
      {{ hint }}
    </label>
    <div class="relative w-full">
      <input
        ref="inputRef"
        v-model="displayValue"
        @input="handleInput"
        @keydown="handleKeyDown"
        @paste="handlePaste"
        @blur="handleBlur"
        :placeholder="placeholder || 'X-X-X-X-X-X'"
        class="w-full h-[40px] py-1 ltr:pl-3 ltr:pr-[32px] rtl:pr-3 rtl:pl-[32px] border-black border-[1px] rounded-[12px] focus:outline-none bg-white"
        :style="{ direction: isRtl ? 'rtl' : 'ltr' }"
        :maxlength="maxLength"
        type="tel"
      />
      <Check v-if="isValid" class="absolute top-[50%] translate-y-[-50%] ltr:right-1 rtl:left-1 text-green-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import Check from '@/assets/images/icons/check.svg'
import { useLocale } from '~/composables/useLocale'

interface Props {
  modelValue?: string
  hint?: string
  placeholder?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { isRtl } = useLocale()
const inputRef = ref<HTMLInputElement | null>(null)
const displayValue = ref('')

const segmentLength = 1
const segmentCount = 6
const maxLength = computed(() => segmentLength * segmentCount + (segmentCount - 1)) // 11

const formatWithDashes = (digits: string): string => {
  const clean = digits.replace(/\D/g, '').slice(0, segmentCount)
  return clean.split('').join('-')
}

watch(() => props.modelValue, (newVal) => {
  if (newVal !== displayValue.value.replace(/-/g, '')) {
    displayValue.value = formatWithDashes(newVal || '')
  }
}, { immediate: true })

const isValid = computed(() => {
  return displayValue.value.replace(/-/g, '').length === segmentCount
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const raw = target.value
  const digits = raw.replace(/\D/g, '').slice(0, segmentCount)
  const formatted = formatWithDashes(digits)

  const cursorStart = target.selectionStart ?? formatted.length
  const prevValue = displayValue.value

  displayValue.value = formatted
  emit('update:modelValue', digits)

  nextTick(() => {
    if (!inputRef.value) return
    let pos = computeCursorPosition(prevValue, formatted, cursorStart)
    inputRef.value.setSelectionRange(pos, pos)
  })
}

const computeCursorPosition = (oldVal: string, newVal: string, cursor: number): number => {
  const oldBefore = (oldVal.slice(0, cursor).match(/-/g) || []).length
  const newBefore = (newVal.slice(0, cursor).match(/-/g) || []).length
  const offset = newBefore - oldBefore
  return cursor + offset
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Escape'].includes(event.key)) return
  if (!/^\d$/.test(event.key)) {
    event.preventDefault()
  }
}

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pasteData = event.clipboardData?.getData('text/plain') || ''
  const cleaned = pasteData.replace(/\D/g, '').slice(0, segmentCount)
  displayValue.value = formatWithDashes(cleaned)
  emit('update:modelValue', cleaned)
}

const handleBlur = () => {
  displayValue.value = formatWithDashes(displayValue.value.replace(/-/g, ''))
}
</script>
