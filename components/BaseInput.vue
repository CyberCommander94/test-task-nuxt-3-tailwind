<template>
  <div class="relative flex flex-col items-start gap-1 w-full text-[14px]">
    <label
      v-if="hint"
      class="w-full ltr:text-left rtl:text-right text-[12px] font-semibold uppercase"
    >
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
      <Check
        v-if="isValid"
        class="absolute top-[50%] translate-y-[-50%] ltr:right-3 rtl:left-3 text-green-500"
      />
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

const reverseString = (str: string) => str.split('').reverse().join('')

const getFormattedDisplay = (digits: string): string => {
  const clean = digits.replace(/\D/g, '').slice(0, segmentCount)
  const value = isRtl.value ? reverseString(clean) : clean
  return formatWithDashes(value)
}

watch(() => props.modelValue, (newVal) => {
  const raw = newVal ?? ''
  displayValue.value = getFormattedDisplay(raw)
}, { immediate: true })

watch(isRtl, () => {
  const raw = props.modelValue ?? displayValue.value.replace(/-/g, '')
  displayValue.value = getFormattedDisplay(raw)
})

const isValid = computed(() => {
  return displayValue.value.replace(/-/g, '').length === segmentCount
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const raw = target.value
  const digits = raw.replace(/\D/g, '').slice(0, segmentCount)

  const logicalValue = isRtl.value ? reverseString(digits) : digits
  const formatted = getFormattedDisplay(logicalValue)

  const cursorStart = target.selectionStart ?? formatted.length
  const prevValue = displayValue.value

  displayValue.value = formatted
  emit('update:modelValue', logicalValue)

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
  const logical = isRtl.value ? reverseString(cleaned) : cleaned
  displayValue.value = getFormattedDisplay(logical)
  emit('update:modelValue', logical)
}

const handleBlur = () => {
  const raw = displayValue.value.replace(/-/g, '')
  const logical = isRtl.value ? reverseString(raw) : raw
  displayValue.value = getFormattedDisplay(logical)
}
</script>
