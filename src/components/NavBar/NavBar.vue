<script setup lang="ts">
import IconExport from '../icons/IconExport.vue'
import IconShare from '../icons/IconShare.vue'
</script>

<template>
  <div class="nav-bar">
    <span class="nav-title">Markdown Editor</span>

    <div class="nav-right">
      <button class="export-btn">
        <IconExport></IconExport>
        <span> 导出</span>
      </button>
      <button class="share-btn">
        <IconShare></IconShare>
        <span>分享</span>
      </button>
    </div>
  </div>
</template>
<style scoped>
.nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-navbar);
  padding: 16px 24px;
}
.nav-title {
  color: rgb(55, 84, 21);
  font-size: 20px;
  font-weight: 900;
}

.nav-right {
  display: flex;
  justify-content: space-evenly;
  gap: 16px;
}
.export-btn,
.share-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  background-color: rgb(46, 105, 3);
  padding: 10px 16px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}
button:hover {
  opacity: 0.9;
}
button svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
}
</style>
