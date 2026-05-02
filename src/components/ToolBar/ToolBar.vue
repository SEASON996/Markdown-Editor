<script setup lang="ts">
import IconSplit from '../icons/IconSplit.vue'
import IconEdit from '../icons/IconEdit.vue'
import IconRead from '../icons/IconRead.vue'
import type { PreviewMode } from '@/types'

defineProps<{ previewMode: PreviewMode }>()
const emit = defineEmits<{
  (e: 'update:previewMode', mode: PreviewMode): void
  (e: 'on-action', type: string): void
}>()

const setMode = (mode: PreviewMode) => {
  emit('update:previewMode', mode)
}
const onClick = (type: string) => {
  emit('on-action', type)
}
</script>

<template>
  <div class="tool-bar">
    <div class="left">
      <button class="btn" @click="onClick('bold')">B</button>
      <button class="btn" @click="onClick('italic')">I</button>
      <button class="btn" @click="onClick('strike')">D</button>
      <button class="btn" @click="onClick('code')">C</button>
      <button class="btn" @click="onClick('quote')">quote</button>
      <button class="btn" @click="onClick('unorderedList')">list</button>
      <button class="btn" @click="onClick('orderedList')">list</button>
      <button class="btn" @click="onClick('undo')">undo</button>
      <button class="btn" @click="onClick('redo')">redo</button>
    </div>
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

<style lang="css" scoped>
.tool-bar {
  width: 100%;
  background-color: var(--bg-statusbar);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.left {
  display: flex;
  gap: 8px;
}
.right {
  justify-self: flex-end;
  display: flex;
  gap: 8px;
  justify-content: space-evenly;
}
.btn {
  color: var(--text-statusbar);
}
.btn svg {
  width: 1em;
  height: 1em;
}
</style>
