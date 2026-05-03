<script setup lang="ts">
import { useFileStore } from '@/stores/file'
import IconEncoding from '../icons/StatusBar/IconEncoding.vue'
import IconKeyboard from '../icons/StatusBar/IconKeyboard.vue'
const fileStore = useFileStore()
</script>
<template>
  <div class="status-bar">
    <div class="left">
      <span class="status-item"> <IconEncoding></IconEncoding>UTF-8</span>
      <span class="status-item"><IconKeyboard></IconKeyboard>Markdown</span>
    </div>
    <div class="right">
      <div class="save-status">
        <div class="status-dot" :class="{ 'is-saving': fileStore.saveStatus === '保存中' }"></div>
        {{ fileStore.saveStatus }}
      </div>
      <span class="status-item">字数: {{ fileStore.wordsCount }}</span>
      <span class="status-item">行数: {{ fileStore.linesCount }}</span>
    </div>
  </div>
</template>
<style lang="css" scoped>
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-statusbar);
  color: var(--text-statusbar);
  font-size: 12px;
  border-top: 1px solid var(--border-color);
  padding: 10px 20px;
}
.left,
.right {
  display: flex;
  gap: 16px;
  align-items: center;
}
.status-item {
  display: flex;
  align-items: center;
  gap: 4px;
  letter-spacing: 0.5px;
  cursor: default;
}
.save-status {
  display: flex;
  align-items: center;
  gap: 6px;
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgb(101, 163, 13);
}
.status-dot.is-saving {
  background-color: rgb(100, 116, 139);
}
</style>
