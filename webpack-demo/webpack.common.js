const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    output: {
      // hash文件
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      splitChunks: {
        // 所有第三方的提取出来，依赖不发生变化则使用缓存 ！！！！
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      // 运行时代码单独提取
      runtimeChunk: 'single'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'development'
      }),
      new WorkboxPlugin.GenerateSW({
        // these options encourage the ServiceWorkers to get in there fast
        // and not allow any straggling "old" SWs to hang around
        clientsClaim: true,
        skipWaiting: true
      })
    ]
  };
