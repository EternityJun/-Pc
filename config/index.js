'use strict'
// Template version: 1.3.1

const path = require('path')

module.exports = {
    dev: {
        assetsSubDirectory: 'static', //静态资源文件夹
        assetsPublicPath: '/', //发布路径
        proxyTable: { //代理api
            '/api': {
                target: 'http://127.0.0.1:666',
                changeOrigin: true,
                // pathRewrite: {   //替代‘/api’
                //     '^/api':"" //需要rewrite的
                //   }
            },
        },
        host: 'localhost', 
        port: 8080,
        autoOpenBrowser: false, //是否自动打开浏览器
        errorOverlay: true,//查阅错误
        notifyOnErrors: true,//通知错误
        poll: false,//跟devserver相关的一个配置，webpack为我们提供的devserver是可以监控文件改动的，
        //但在有些情况下却不能工作，我们可以设置一个轮询（poll）来解决

        useEslint: false, //是否使用esLint
        showEslintErrorsInOverlay: false,//是否展示eslint的错误提示

        //提供的用来方便调试的配置，它有四种模式
        devtool: 'cheap-module-eval-source-map',

        //一个配合devtool的配置，当给文件名插入新的hash导致清楚缓存时是否生成souce maps，
        //默认在开发环境下为true
        cacheBusting: true,

        //是否开启cssSourceMap
        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

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
    }
}