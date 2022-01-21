/* eslint-disable @typescript-eslint/no-var-requires */
// const webpack = require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: `Ron's site 😊`,
    meta: {
      viewport: `width=device-width, initial-scale=1, shrink-to-fit=no`,
    },
    // favicon: './public/assets/favicon.png',
  }),
  new CopyPlugin({ patterns:[{ from: 'public', to: 'public' }] }),

  // new CopyPlugin({
  //   patterns: [{ from: 'src/index.html' }],
  // }),
  // new HtmlWebpackPlugin({
  //   templateContent: ({ htmlWebpackPlugin }) => '<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>' +
  //     htmlWebpackPlugin.options.title +
  //     '</title></head><body><div id=\"app\"></div></body></html>',
  //   filename: 'index.html',
  // }),
  new MiniCssExtractPlugin(),
]

const config = {
  plugins,
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './src/main.tsx',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  devServer: {
    'static': {
      directory: './dist',
    },
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
}

module.exports = config