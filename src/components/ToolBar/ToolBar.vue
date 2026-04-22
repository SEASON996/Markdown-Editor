<script setup lang="ts">
import IconSplit from '../icons/IconSplit.vue'
import IconEdit from '../icons/IconEdit.vue'
import IconRead from '../icons/IconRead.vue'
import type { PreviewMode } from '@/types'

defineProps<{ previewMode: PreviewMode }>()
const emit = defineEmits<{ (e: 'update:previewMode', mode: PreviewMode): void }>()

const setMode = (mode: PreviewMode) => {
  emit('update:previewMode', mode)
}
</script>

<template>
  <div class="tool-bar">
    <div class="right">
      <button @click="setMode('split')" class="btn">
        <IconSplit></IconSplit>
      </button>
      <button @click="setMode('edit')" class="btn">
        <IconEdit></IconEdit>
      </button>
      <button @click="setMode('read')" class="btn">
        <IconRead></IconRead>
      </button>
    </div>
  </div>
</template>

<style scoped>
.tool-bar {
  width: 100%;
  background-color: var(--bg-statusbar);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  padding: 10px 20px;
}
.right {
  justify-self: flex-end;
  display: flex;
  gap: 8px;
  justify-content: space-evenly;
}
.btn svg {
  width: 1em;
  height: 1em;
}
</style>
