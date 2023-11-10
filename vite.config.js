import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), WindiCSS()],
    build: {
        outDir: 'dist', // 设置输出目录
        assetsDir: 'assets', // 设置静态资源目录
        minify: 'terser' // 设置代码压缩方式
    },
    sourcemap: true,
    // 配置文件引用别名 alias
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://ceshi13.dishait.cn',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },

    // 全局配置  样式变量
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/style/main.scss";'
            }
        }
    }
})
