const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const externalDependencies = require('./externals');

module.exports = {
  mode: 'production',
  entry: './src/entry.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/index.js',
    libraryTarget: 'commonjs2',
    library: 'UmisFactory',
  },
  externals: externalDependencies,
  module: {
    rules: [
      {
        test: /\.(vue)$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
            scss: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins: loader => [require('postcss-preset-env')()],
                },
              },
              'sass-loader',
            ],
          },
        },
      },
      {
        test: /\.(jsx|js)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|ttf|woff|woff2|eot|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets',
          limit: 6000,
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '@utils': path.join(__dirname, 'src/utils'),
      '@assets': path.join(__dirname, 'src/assets'),
      '@components': path.join(__dirname, 'src/components'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),
    new VueLoaderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'app.report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      logLevel: 'info',
    }),
  ],
};
