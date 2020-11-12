const path = require('path')
const webpack = require('webpack')
const {	VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')

const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

const resolveApp = relativePath => path.resolve(__dirname, relativePath)

const getPublicPath = () => {
  const homePage = require(resolveApp('package.json')).homepage

  if (process.env.NODE_ENV === 'development') {
    return ''
  }
  else if (process.env.PUBLIC_URL) {
    return process.env.PUBLIC_URL
  }
  else if (homePage) {
    return homePage
  }
  return '/'
}

const getEnvVariables = () => ({ PUBLIC_URL: getPublicPath(), VERSION: require(resolveApp('package.json')).version })


module.exports = function () {
  const isEnvProduction = process.env.NODE_ENV === 'production'

  const commonConfig = {
    entry: './src/main.ts',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            globOptions: {
              ignore: [
                '**/index.html'
              ]
            }
          },
        ],
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: resolveApp('public/index.html'),
        ...getEnvVariables()
      }),
      new MiniCssExtractPlugin({ filename: '[name].bundle.css' }),
    ],

    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
          include: [resolveApp('src')],
          exclude: [/node_modules/]
        },
        {
          test: /.(scss|css)$/,

          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",

              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",

              options: {
                sourceMap: true
              }
            }]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ],
        },]
    },

    resolve: {
      alias: {
        // this isn't technically needed, since the default `vue` entry for bundlers
        // is a simple `export * from '@vue/runtime-dom`. However having this
        // extra re-export somehow causes webpack to always invalidate the module
        // on the first HMR update and causes the page to reload.
        'vue': '@vue/runtime-dom'
      },
      extensions: ['.tsx', '.ts', '.js']
    },

    optimization: {
      minimizer: [new TerserPlugin()],

      splitChunks: {
        cacheGroups: {
          vendors: {
            priority: -10,
            test: /[\\/]node_modules[\\/]/
          }
        },

        chunks: 'async',
        minChunks: 1,
        minSize: 30000,
        name: false
      }
    }
  }

  if (isEnvProduction) return merge(commonConfig, prodConfig)
  else return merge(commonConfig, devConfig)
}
