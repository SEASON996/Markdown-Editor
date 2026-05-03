<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFileStore } from '@/stores/file'
import { minimalSetup, EditorView } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { undo, redo } from '@codemirror/commands'
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language'

import { tags as t } from '@lezer/highlight'

const fileStore = useFileStore()
const editorRef = ref<HTMLElement | null>(null)
let editorView: EditorView | null = null
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

/**
 * 语法高亮样式
 * - 标题和加粗显示为绿色粗体
 */
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
    editorView = new EditorView({
      doc: fileStore.content,
      extensions: [
        minimalSetup,
        myTheme, // 自定义主题
        markdown(), // Markdown 语法支持
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
  }
})

/**
 * 通用文本包裹函数（底层实现）
 * @param from 起始字符位置
 * @param to   结束字符位置
 * @param text 要包裹的文本（可能为空）
 * @param left 左侧包裹符（如 '**'、'*'）
 * @param right 右侧包裹符（通常与 left 相同）
 */
const wrapWithMarker = (from: number, to: number, text: string, left: string, right: string) => {
  editorView!.dispatch({
    changes: { from, to, insert: `${left}${text}${right}` },
    // 光标定位到包裹后文本的末尾（右符号之后）
    selection: { anchor: from + text.length + left.length * 2 },
  })
  editorView!.focus()
}

/**
 * 插入一个空的包裹符对（如 **** 或  ``）
 * @param from 插入位置（光标当前位置）
 * @param left 左符号
 * @param right 右符号
 */
const insertEmptyMarkers = (from: number, left: string, right: string) => {
  editorView!.dispatch({
    changes: { from: from, insert: `${left}${right}` },
    selection: { anchor: from + left.length },
  })
  editorView!.focus()
}

/**
 * 判断字符是否为单词字符（字母、数字、下划线、中文）
 */
const isWordChar = (char: string) => {
  // 字母数字下划线 + 中文
  return /[\w\u4e00-\u9fa5]/.test(char)
}

/**
 * 获取光标所在位置的单词边界
 * @param pos 光标位置（字符索引）
 * @returns 单词的起始和结束位置，若光标不在单词上则返回 null
 */

const getWordRangeAtCursor = (pos: number) => {
  const line = editorView!.state.doc.lineAt(pos)
  const lineText = line.text
  const lineStart = line.from
  const offset = pos - lineStart

  let start = offset
  let end = offset
  while (start > 0 && isWordChar(lineText[start - 1]!)) start--
  while (end < lineText.length && isWordChar(lineText[end]!)) end++

  if (start === end) return null
  console.log(start, end)
  return { from: lineStart + start, to: lineStart + end }
}

/**
 * 通用格式切换（加粗、斜体、删除线、行内代码等）
 * 行为：若有选中文本则直接包裹；若无选中则尝试智能选词；若仍失败则插入空包裹符
 * @param left 左包裹符
 * @param right 右包裹符
 */
const toggleFormat = (left: string, right: string) => {
  if (!editorView) return
  const { state } = editorView
  const range = state.selection.main

  // 获得选中的文本
  const selectedText = state.sliceDoc(range?.from, range?.to)
  // 有选中非空白字符
  if (range.from !== range.to) {
    wrapWithMarker(range.from, range.to, selectedText, left, right)
    return
  }
  // 无选中字符，根据当前光标位置自动选词
  const wordRange = getWordRangeAtCursor(range.from)
  if (wordRange && wordRange.from !== wordRange.to) {
    const word = state.sliceDoc(wordRange.from, wordRange.to)
    wrapWithMarker(wordRange.from, wordRange.to, word, left, right)
    return
  }
  // 选中空白字符或当前光标位置无词
  insertEmptyMarkers(range.from, left, right)
}

// 具体格式按钮的封装
const toggleBold = () => toggleFormat('**', '**') // 加粗
const toggleItalic = () => toggleFormat('*', '*') // 斜体
const toggleStrikethrough = () => toggleFormat('~~', '~~') // 删除线
const toggleCode = () => toggleFormat('```', '```') // 代码块

/**
 * 在选中行的行首插入前缀，支持多行
 * @param prefix 前缀字符串（如 '>'、'-'、'1.'），函数会自动追加一个空格
 */
const toggleLinePrefix = (prefix: string) => {
  if (!editorView) return
  const state = editorView!.state
  const range = state.selection.main
  const startLine = state.doc.lineAt(range.from)
  const endLine = state.doc.lineAt(range.to)
  const changes = []
  for (let i = startLine.number; i <= endLine.number; i++) {
    const line = state.doc.line(i)
    changes.push({ from: line.from, insert: `${prefix} ` })
  }
  editorView!.dispatch({
    changes,
  })
  editorView?.focus()
}
// 便捷封装
const toggleQuote = () => toggleLinePrefix('>') // 引用块
const toggleUnorderedList = () => toggleLinePrefix('-') // 无序列表
const toggleOrderedList = () => toggleLinePrefix('1.') // 有序列表

// 撤销
const undoContent = () => {
  if (!editorView) return
  undo(editorView)
}
// 重做
const redoContent = () => {
  if (!editorView) return
  redo(editorView)
}

defineExpose({
  toggleBold,
  toggleItalic,
  toggleStrikethrough,
  toggleCode,
  toggleQuote,
  toggleUnorderedList,
  toggleOrderedList,
  undoContent,
  redoContent,
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
  scrollbar-width: thin;
  scrollbar-color: var(--scroll-thumb) var(--bg-editor);
}
/* .editor-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.editor-container::-webkit-scrollbar-thumb {
  background: var(--scroll-thumb);
  border-radius: 8px;
}
.editor-container::-webkit-scrollbar-thumb:hover {
  background: var(--scroll-thumb-hover);
} */
.editor-content {
  min-height: 0;
  padding: 40px;
}
</style>
