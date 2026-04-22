import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { renderToSimpleStream } from 'vue/server-renderer'
export const useFileStore = defineStore('file', () => {
  // 编辑器中的文本内容
  const content = ref(localStorage.getItem('content') || '')

  // 保存状态提示：'已同步' 或 '保存中'
  const saveStatus = ref<string>('已同步')

  // 防抖定时器，用于延迟保存到 localStorage
  let timer: number | null = null

  // 统计实际字符数，去掉空格和换行符
  const wordsCount = computed(() => {
    // 过滤掉空格和换行符，只算实际字符长度
    return content.value?.replace(/\s/g, '')?.length
  })

  // 统计文本行数，以换行符分隔
  const linesCount = computed(() => {
    return content.value?.split('\n')?.length
  })

  /**
   * 更新编辑器内容
   * - 更新 content 状态
   * - 将保存状态设为“保存中”
   * - 使用防抖延迟 1 秒后将内容保存到 localStorage，并恢复保存状态为“已同步”
   * @param newContent - 新的文本内容
   */
  const updateContent = (newContent: string) => {
    content.value = newContent
    saveStatus.value = '保存中'
    // 清除之前的定时器
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      localStorage.setItem('content', content.value)
      saveStatus.value = '已同步'
    }, 1000)
  }
  return {
    content,
    saveStatus,
    wordsCount,
    linesCount,
    updateContent,
  }
})
