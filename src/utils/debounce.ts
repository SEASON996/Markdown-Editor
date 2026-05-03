/**
 * 防抖函数返回的类型（包含 cancel 方法）
 */
export type DebouncedFunction<Args extends unknown[]> = {
  (...args: Args): void
  cancel: () => void
}

/**
 * 创建一个防抖函数
 * @param fn 需要防抖执行的原始函数
 * @param delay 延迟时间（毫秒）
 * @param immediate 是否在第一次调用时立即执行
 * @returns 防抖后的函数（附带 cancel 方法）
 */
export function debounce<Args extends unknown[], R>(
  fn: (...args: Args) => void,
  delay: number,
  immediate: boolean = false,
): DebouncedFunction<Args> {
  let timer: ReturnType<typeof setTimeout> | null = null
  let isInvoked = false

  const debounced = function (this: unknown, ...args: Args) {
    const context = this

    if (timer) clearTimeout(timer)

    if (immediate && !isInvoked) {
      fn.apply(context, args)
      isInvoked = true
      timer = setTimeout(() => {
        isInvoked = false
        timer = null
      }, delay)
      return
    }

    timer = setTimeout(() => {
      fn.apply(context, args)
      timer = null
      isInvoked = false
    }, delay)
  } as DebouncedFunction<Args>

  debounced.cancel = () => {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoked = false
  }

  return debounced
}
