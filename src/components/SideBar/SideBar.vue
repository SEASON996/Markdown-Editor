<script setup lang="ts">
import IconFolder from '../icons/IconFolder.vue'
import IconRecent from '../icons/IconRecent.vue'
import IconPlus from '../icons/IconPlus.vue'
// import IconExpandRight from '../icons/IconExpandRight.vue'
import IconSettings from '../icons/IconSettings.vue'
import IconTheme from '../icons/IconTheme.vue'
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
const isVisible = ref(true)
</script>
<template>
  <div class="side-bar">
    <div class="left">
      <!-- <div class="top">
        <Button class="icon-btn expand" @click="isVisible = !isVisible" data-tooltip="展开">
          <IconExpandRight></IconExpandRight>
        </Button>
      </div> -->
      <div class="middle">
        <button class="icon-btn active" @click="isVisible = !isVisible" data-tooltip="编辑文档">
          <IconFolder></IconFolder>
        </button>
        <button class="icon-btn" data-tooltip="最近文档">
          <IconRecent></IconRecent>
        </button>
      </div>

      <div class="bottom">
        <button class="icon-btn" data-tooltip="切换主题" @click="themeStore.toggleTheme()">
          <IconTheme></IconTheme>
        </button>

        <button class="icon-btn" data-tooltip="设置">
          <IconSettings></IconSettings>
        </button>
      </div>
    </div>

    <div class="right" v-show="isVisible">
      <!-- <div class="file-info">
      <div class="file-name">The Studio</div>
    </div> -->
      <button class="new-doc-btn">
        <span class="btn-icon">
          <IconPlus></IconPlus>
        </span>
        <span class="btn-text">新建文档</span>
      </button>

      <!-- <div class="menu-items">
        <div class="menu-item active">
          <IconFolder></IconFolder>
          <span>编辑文档</span>
        </div>
        <div class="menu-item">
          <IconRecent></IconRecent>
          <span>最近文档</span>
        </div>
      </div> -->
    </div>
  </div>
</template>
<style scoped>
.side-bar {
  display: flex;
  height: 100%;
  border-right: 1px solid var(--border-color);
  background-color: var(--bg-sidebar);
}
.left {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px;
  border-right: 1px solid var(--border-color);
}
.top,
.middle,
.bottom {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.icon-btn {
  padding: 4px 8px;
  color: var(--text-sidebar);
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}
.icon-btn:hover {
  background-color: var(--icon-hover);
  transform: translateX(2px);
}
.icon-btn.active {
  background-color: var(--icon-active);
  color: rgb(77, 124, 15);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.icon-btn:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
}

.right {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: clamp(160px, 24vw, 320px);
  padding: 12px 12px 0;
}
.file-info {
  height: 60px;
  align-self: flex-start;
}
.file-name {
  color: rgb(26, 28, 29);
  font-size: 18px;
  font-weight: 700;
}

.new-doc-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  background-color: rgb(46, 105, 3);
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-bottom: 12px;
}
.new-doc-btn:hover {
  opacity: 0.9;
}
.menu-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: left;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 40px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-sidebar);
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.2s ease;
}
.menu-item:hover {
  background-color: #e9eef4;
  transform: translateX(2px);
}
.menu-item.active {
  background-color: #fff;
  color: rgb(77, 124, 15);
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.footer {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto;
  border-top: 1px solid rgb(226, 232, 240);
}

.btn-icon svg,
.menu-item svg,
.icon-btn svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6em; /* 使用 em 可以随字号自动缩放 */
  height: 1.6em;
}
</style>
