import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    visualizer({ open: true, filename: 'stats.html' }), // 构建后自动打开分析图
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          minSize: 20000, // 小于 20kB 的模块不单独拆分
          groups: [
            {
              name: 'markdown-renderer',
              test: /node_modules[\\/](marked|highlight\.js|dompurify)[\\/]/,
              priority: 25,
            },
            {
              name: 'codemirror-core',
              test: /node_modules[\\/](codemirror|@codemirror[\\/]commands|@codemirror[\\/]language)[\\/]/,
              priority: 20,
            },
            {
              name: 'codemirror-markdown',
              test: /node_modules[\\/](@codemirror[\\/]lang-markdown|@lezer[\\/]highlight)[\\/]/,
              priority: 20,
            },
            {
              name: 'vendor-common',
              test: /node_modules[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
})
