import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import dts from "vite-plugin-dts"
import path from 'path'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({ include: ["./packages/types"] }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "packages/static/icons")],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  build: {
    outDir: "qsz-ui",//输出文件名称
    lib: {
      entry: path.resolve(__dirname, "./packages/index.ts"),//指定组件编译入口文件
      name: "qsz-ui",
      fileName: "qsz-ui",
    },
    //库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        }
      }
    }
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "./packages/css/variables.scss" as *;`
  //     }
  //   }
  // }
})
