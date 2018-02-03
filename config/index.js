// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
module.exports = {
  build: {
    env: require('./prod.env'),
    port: 9000,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8090,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/zsy': {
          // target:'http://192.168.18.170:8061',// 义良
          // target:'http://192.168.18.218:8061',// 张胜
          // target: 'http://192.168.18.220:8061',// 修庆
          // target: 'http://192.168.18.177:8030', // 子涵
          // target:'http://121.199.33.100:8030',// 线上
          // target:'http://192.168.20.12:8080',// 石智颖本地
          target:'http://192.168.20.175:8080',// 松林本地
          // target:'http://pay.zsbigdata.com.cn/zcash/',// 松林本地
          // target: 'http://pay.zsbigdata.com.cn:8001/zcash',
          changeOrigin: true,
          pathRewrite: {
              '^/zsy': ''
          }
      }
  },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
