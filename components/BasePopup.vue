<template>
  <teleport to="#teleports">
    <div v-if="isVisible" class="w-screen h-screen fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-2000 px-4">
      <div class="bg-white rounded-[24px] w-full md:w-max h-max max-h-[80%] md:max-h-[70%] md:h-max overflow-y-auto overflow-x-hidden">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isVisible = ref(false)

const open = () => {
  isVisible.value = true
}

const close = () => {
  isVisible.value = false
}

defineExpose({ open, close })
</script>
