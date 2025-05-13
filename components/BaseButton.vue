<template>
  <button
    class="block p-3 items-center rounded-[24px] text-center cursor-pointer focus:outline-none bg-primary text-white w-full text-[16px]"
    @click="handleClick"
  >
    <div>
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits()

const handleClick = (event: Event) => {
  emit('click', event)
}
</script>
