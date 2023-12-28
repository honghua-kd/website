import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import jsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import px2rem from 'postcss-plugin-px2rem'
// import viteImagemin from 'vite-plugin-imagemin'

import ElementPlus from 'unplugin-element-plus/vite'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

import compileConfig from './src/config/compile.config'

import path from 'path'

const {
  base,
  publicDir,
  outDir,
  assetsDir,
  sourcemap,
  cssCodeSplit,
  host,
  port,
  strictPort,
  open,
  cors,
  brotliSize,
  logLevel,
  clearScreen,
  dropConsole,
  dropDebugger,
  chunkSizeWarningLimit,
  proxy,
  useMock
} = compileConfig

const mockPath = './mock'

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  base,
  publicDir,
  logLevel,
  clearScreen,
  plugins: [
    vue(),
    jsx(),
    legacy({
      polyfills: ['es.promise.finally', 'es/map', 'es/set'],
      modernPolyfills: ['es.promise.finally']
    }),
    AutoImport({
      dts: 'src/types/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    ElementPlus({}),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: 'src/types/components.d.ts'
    }),
    viteMockServe({
      mockPath,
      supportTs: false,
      localEnabled: useMock
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
    // viteImagemin({
    //   gifsicle: {
    //     optimizationLevel: 7,
    //     interlaced: false
    //   },
    //   optipng: {
    //     optimizationLevel: 7
    //   },
    //   mozjpeg: {
    //     quality: 20
    //   },
    //   pngquant: {
    //     quality: [0.8, 0.9],
    //     speed: 4
    //   },
    //   svgo: {
    //     plugins: [
    //       {
    //         name: 'removeViewBox'
    //       },
    //       {
    //         name: 'removeEmptyAttrs',
    //         active: false
    //       }
    //     ]
    //   }
    // })
  ],

  server: {
    host,
    port: Number(port),
    cors,
    strictPort,
    open,
    fs: {
      strict: false
    },
    proxy
  },

  resolve: {
    // 设置别名
    alias: {
      views: path.resolve(__dirname, 'src/views'),
      styles: path.resolve(__dirname, 'src/styles'),
      '@': path.resolve(__dirname, 'src'),
      '~pkg': path.resolve(__dirname, 'packages')
    },
    dedupe: ['vue'],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },

  css: {
    preprocessorOptions: {
      // 引入公用的样式
      scss: {
        additionalData: '@use "@/styles/index.scss" as *;'
      }
    },
    postcss: {
      plugins: [
        px2rem({
          rootValue: 19.2, // 换算基数， 默认100 ,也就是1440px ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多少px了
          unitPrecision: 5, // 允许REM单位增长到的十进制数字，其实就是精度控制
          // propWhiteList: [], // 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
          // propBlackList: [], // 黑名单
          // exclude:false,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
          // selectorBlackList: [], //要忽略并保留为px的选择器
          // ignoreIdentifier: false, //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
          // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
          mediaQuery: false, // （布尔值）允许在媒体查询中转换px
          minPixelValue: 0 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
        })
      ]
    }
  },

  build: {
    target: 'es2015',
    outDir: outDir,
    assetsDir,
    sourcemap,
    cssCodeSplit,
    brotliSize,
    // rollupOptions: {
    //   output: {
    //     // chunkFileNames: 'static/js/[name]-[hash].js',
    //     // entryFileNames: 'static/js/[name]-[hash].js',
    //     // assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
    //   },
    // },
    minify: 'terser',
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: dropConsole,
        drop_debugger: dropDebugger
      }
    },
    chunkSizeWarningLimit
  },

  optimizeDeps: {
    // 检测需要预构建的依赖项
    entries: []
  },

  define: {
    __VUE_PROD_DEVTOOLS__: true
  }
})
