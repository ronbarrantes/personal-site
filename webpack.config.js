/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PATHS = {
  public: path.join(__dirname, 'public'),
  dist: path.join(__dirname, 'dist'),
}

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: `Ron's site 😊`,
    meta: {
      viewport: `width=device-width, initial-scale=1, shrink-to-fit=no`,
    },
    favicon: './public/assets/favicon.png',
  }),
  new CopyPlugin({ patterns:[{ from: 'public', to: 'public' }] }),
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
    filename: '[name].[fullhash].js',
    path: PATHS.dist,
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
        // test: /\.svg$/,
        test: /\.(svg|jpe?g|gif)$/i, // may need to change
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
    extensions: ['.ts', '.tsx', '.js', '.css', '.sass'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
}

module.exports = config