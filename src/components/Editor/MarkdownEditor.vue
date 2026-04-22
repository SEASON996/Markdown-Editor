<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFileStore } from '@/stores/file'
import { minimalSetup, EditorView } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

const fileStore = useFileStore()
const editorRef = ref<HTMLElement | null>(null)
// 优化默认样式
const myTheme = EditorView.theme({
  '&': {
    color: 'var(--text-editor)',
    backgroundColor: 'transparent',
  },
  '.cm-content': {
    fontSize: '16px',
    caretColor: '#fff',
    lineHeight: '1.8',
    fontFamily: 'Source Sans Pro,  sans-serif',
  },
  '&.cm-focused': {
    outline: 'none',
  },
  '.cm-selectionBackground, ::selection': {
    backgroundColor: 'var(--bg-selection)' + '!important',
  },
  '.cm-cursor': { borderLeftColor: 'var(--caret-color)' },
})
const myHighlightStyle = HighlightStyle.define([
  {
    tag: [t.heading1, t.heading2, t.heading3, t.heading4, t.heading5, t.heading6, t.strong],
    color: 'rgb(77, 124, 15)',
    fontWeight: 'bold',
  },
])
onMounted(() => {
  // 检查 ref 是否已经绑定到了 DOM
  if (editorRef.value) {
    const editorView = new EditorView({
      doc: fileStore.content,
      extensions: [
        minimalSetup,
        myTheme,
        markdown(),
        syntaxHighlighting(myHighlightStyle),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            fileStore.updateContent(update.state.doc.toString())
          }
        }),
      ],
      parent: editorRef.value,
    })
    console.log(editorView)
  }
})
</script>
<template>
  <div class="editor-container">
    <div ref="editorRef" class="editor-content"></div>
  </div>
</template>
<style scoped>
.editor-container {
  flex: 1;
  height: 100%;
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
}
.editor-content {
  min-height: 0;
  padding: 40px;
}
</style>
