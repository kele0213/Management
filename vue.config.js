const { defineConfig } = require('@vue/cli-service')
// const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const ElementPlus = require('unplugin-element-plus/webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  // configureWebpack: {} webpack配置
  configureWebpack: {
    devServer: {
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://codercba.com:5000',
          pathRewrite: {
            '^/api': ''
          },
          changeOrigin: true
        }
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      ElementPlus()
    ]
  }
})
