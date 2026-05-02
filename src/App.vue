<script setup lang="ts">
import NavBar from './components/NavBar/NavBar.vue'
import SideBar from './components/SideBar/SideBar.vue'
import ToolBar from './components/ToolBar/ToolBar.vue'
import MarkdownEditor from './components/Editor/MarkdownEditor.vue'
import MarkdownPreview from './components/Preview/MarkdownPreview.vue'
import StatusBar from './components/StatusBar/StatusBar.vue'

import { useThemeStore } from './stores/theme'
import { ref, onBeforeMount } from 'vue'
import type { PreviewMode } from '@/types'
const themeStore = useThemeStore()
onBeforeMount(() => {
  themeStore.initTheme()
})
// 预览模式
const previewMode = ref<PreviewMode>('split')
const setPreviewMode = (mode: PreviewMode) => {
  previewMode.value = mode
}

const editorRef = ref<InstanceType<typeof MarkdownEditor> | null>(null)
const handleToolBarAction = (type: string) => {
  switch (type) {
    case 'bold':
      editorRef.value?.toggleBold()
      break
    case 'italic': {
      editorRef.value?.toggleItalic()
      break
    }
    case 'strike': {
      editorRef.value?.toggleStrikethrough()
      break
    }
    case 'code': {
      editorRef.value?.toggleCode()
      break
    }
    case 'quote': {
      editorRef.value?.toggleQuote()
      break
    }
    case 'unorderedList': {
      editorRef.value?.toggleUnorderedList()
      break
    }
    case 'orderedList': {
      editorRef.value?.toggleOrderedList()
      break
    }
    case 'undo': {
      editorRef.value?.undoContent()
      break
    }
    case 'redo': {
      editorRef.value?.redoContent()
    }
  }
}
</script>

<template>
  <div class="app-container">
    <NavBar></NavBar>
    <div class="main">
      <div class="main-left">
        <SideBar></SideBar>
      </div>
      <div class="main-right">
        <ToolBar
          :previewMode="previewMode"
          @update:previewMode="setPreviewMode"
          @on-action="handleToolBarAction"
        ></ToolBar>
        <div class="editor-preview">
          <MarkdownEditor ref="editorRef" v-show="previewMode !== 'read'"></MarkdownEditor>
          <MarkdownPreview v-show="previewMode !== 'edit'"></MarkdownPreview>
        </div>
        <StatusBar></StatusBar>
      </div>
    </div>
  </div>
</template>

<style>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  display: flex;
  min-height: 0;
}
.main-left {
  flex-shrink: 0;
}
.main-right {
  flex-grow: 1;
  background-color: var(--bg-editor);
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.editor-preview {
  flex: 1;
  min-height: 0;
  display: flex;
}
</style>
