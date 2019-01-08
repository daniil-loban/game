const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const webpackBundleAnalyzer = require('webpack-bundle-analyzer'); // .BundleAnalyzerPlugin;
// const { BundleAnalyzerPlugin } = webpackBundleAnalyzer;

const { VueLoaderPlugin } = require('vue-loader');

const conf = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
    /* vendors: './vue_module.js', */
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    library: 'app',
  },
  devServer: {
    contentBase: 'dist',
    overlay: true,
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        options: {
          presets: ['@babel/env'],
          name: '../[path]/[name].[ext]',
          outputPath: '/',
        },

        include: [path.resolve(__dirname, './screens/login')],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          name: '../[path]/[name].[ext]',
          outputPath: '/',
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '../[path]/[name].[ext]',
              outputPath: '/',
            },
          },
        ],
      },
      {
        test: /\.(png|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
          },
        }],
      },
      {
        test: /\.mp3$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'sounds/',
          },
        }],
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.min.js',
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
    }),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      /*
      template: path.resolve(__dirname, 'src/', 'index.html'),
      filename: './index.html',
      */
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'src/**/*.png'), to: 'images', flatten: true },
      { from: path.join(__dirname, 'src/**/*.jpg'), to: 'images', flatten: true },
      { from: path.join(__dirname, 'src/**/*.svg'), to: 'images', flatten: true },
      { from: path.join(__dirname, 'src/**/*.mp3'), to: 'sounds', flatten: true },
      { from: path.join(__dirname, 'src/**/*.wav'), to: 'audio', flatten: true },
      { from: path.join(__dirname, 'src/**/*.ttf'), to: 'fonts', flatten: true },
      { from: path.join(__dirname, 'src/**/*.otf'), to: 'fonts', flatten: true },
      { from: path.join(__dirname, 'src/**/*.json'), to: 'jsons', flatten: true },
    ], {}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  devtool: 'inline-source-map',
/*
  optimization: {
    splitChunks: {
      // chunks: 'all',
      minSize: 12000,
      maxSize: 30000,
      minChunks: 4,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
*/
};

module.exports = (env, options) => {
  const mode = options.mode === 'productions';
  conf.devtool = mode ? 'nosources-source-map ' : 'source-map';
  return conf;
};
