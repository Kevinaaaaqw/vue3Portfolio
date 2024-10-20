import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/myFront',
  plugins: [
    vue(),
    vueJsx(),
    Unocss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
