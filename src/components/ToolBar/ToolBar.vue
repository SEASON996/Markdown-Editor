<script setup lang="ts">
import IconBold from '../icons/ToolBar/IconBold.vue'
import IconItalic from '../icons/ToolBar/IconItalic.vue'
import IconStrikethrough from '../icons/ToolBar/IconStrikethrough.vue'
import IconEncoding from '../icons/StatusBar/IconEncoding.vue'
import IconQuote from '../icons/ToolBar/IconQuote.vue'
import IconUnorderedList from '../icons/ToolBar/IconUnorderedList.vue'
import IconOrderedList from '../icons/ToolBar/IconOrderedList.vue'

import IconUndo from '../icons/ToolBar/IconUndo.vue'
import IconRedo from '../icons/ToolBar/IconRedo.vue'
import IconSplit from '../icons/ToolBar/IconSplit.vue'
import IconEdit from '../icons/ToolBar/IconEdit.vue'
import IconRead from '../icons/ToolBar/IconRead.vue'

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
      <button class="btn" @click="onClick('undo')">
        <IconUndo></IconUndo>
      </button>
      <button class="btn" @click="onClick('redo')">
        <IconRedo></IconRedo>
      </button>
      <div class="divider"></div>
      <button class="btn" @click="onClick('bold')">
        <IconBold></IconBold>
      </button>
      <button class="btn" @click="onClick('italic')">
        <IconItalic></IconItalic>
      </button>
      <button class="btn" @click="onClick('strike')">
        <IconStrikethrough></IconStrikethrough>
      </button>
      <button class="btn" @click="onClick('code')">
        <IconEncoding></IconEncoding>
      </button>
      <button class="btn" @click="onClick('quote')">
        <IconQuote></IconQuote>
      </button>
      <button class="btn" @click="onClick('unorderedList')">
        <IconUnorderedList></IconUnorderedList>
      </button>
      <button class="btn" @click="onClick('orderedList')">
        <IconOrderedList></IconOrderedList>
      </button>
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
  background-color: var(--bg-navbar);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.left {
  display: flex;
  gap: 14px;
}
.divider {
  border: 1px solid var(--border-color);
}
.right {
  justify-self: flex-end;
  display: flex;
  gap: 10px;
  justify-content: space-evenly;
}
.btn {
  color: var(--text-toolbar);
}
.btn svg {
  width: 1.1rem;
  height: 1.1rem;
}
</style>
