const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); //Webpack包文件分析器
const VConsolePlugin = require('vconsole-webpack-plugin'); // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）
const BrotliPlugin = require('brotli-webpack-plugin');//brotli压缩

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  /**
   * “publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
   *  path：用来存放打包后文件的输出目录
   *  publicPath：指定资源文件引用的目录
   */
  publicPath: process.env.VUE_APP_CDN,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'));

    return config;
  },
  devServer: {
    open: true,
    /**
     * 在浏览器上全屏显示编译的errors或warnings。
     * 默认是关闭的。如果只想显示编译错误。则如下配置
     */
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  configureWebpack: (config) => {
    //生产and测试环境
    const pluginsPro = [
      // Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      new BundleAnalyzerPlugin(),
      new BrotliPlugin({
        test: productionGzipExtensions,
        minRatio: 0.8,
      }),
    ];
    //开发环境
    const pluginsDev = [
      //移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
      new VConsolePlugin({
        filter: [], // 需要过滤的入口文件
        enable: true, // 发布代码前记得改回 false
      }),
    ];
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...pluginsPro];
    } else { // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev];
    }
  },
};
