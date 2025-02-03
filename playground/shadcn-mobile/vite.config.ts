import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'node:path'

// Get the absolute path to the project root (two levels up from vite.config.ts)
const projectRoot = path.resolve(__dirname, '../..')

export default defineConfig({
  server: {
    port: 5174,
  },
  plugins: [
    VueRouter({
      routesFolder: 'src/pages',
      dts: 'src/typed-router.d.ts',
    }),
    vue(),
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: [
      {
        find: '@/packages',
        replacement: path.resolve(projectRoot, 'packages')
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src')
      },
    ]
  },
})
