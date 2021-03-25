/* eslint-disable @typescript-eslint/no-var-requires */
// const webpack = require('webpack');
// const CopyPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const ChromeExtensionReloader = require('webpack-extension-reloader');

const config = {
  entry: {
    app: './src/app/index.tsx',
    background: './src/extension/background.ts',
    content: './src/extension/content-script.ts',
    backend: './src/backend/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'src/extension/build/bundles'),
    filename: '[name].bundle.js',
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
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    fallback: {
      buffer: false,
    },
  },
  devtool: 'eval-source-map',

  // devServer: {
  //   contentBase: './dist',
  // },
  plugins: [
    // new CopyPlugin({
    //   patterns: [{ from: 'src/index.html' }],
    // }),
    // new HtmlWebpackPlugin({
    //   appMountId: 'app',
    //   filename: 'index.html',
    // }),
    // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    // new CleanWebpackPlugin(),
  ],
};

module.exports = (env, argv) => {
  // if (argv.mode === 'development') {
  //   config.plugins.push(
  //     new ChromeExtensionReloader({
  //       port: 9090,
  //       reloadPage: true,
  //       entries: {
  //         contentScript: ['app', 'content'],
  //         background: ['background'],
  //       },
  //     })
  //   );
  // }
  return config;
};
