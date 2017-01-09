import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import baseConfig from './webpack.config.base';

export default {
  ...baseConfig,
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, process.env.NODE_ENV === 'production' ? 'src/app' : 'src/app/index.dev'),
    ],
  },
  devServer: {
    contentBase: baseConfig.output.path,
    publicPath: baseConfig.output.publicPath,
    historyApiFallback: true,
    hotOnly: true,
  },
  ...(process.env.NODE_ENV === 'production' ? {
    plugins: [
      new ExtractTextPlugin({filename: 'style.css', disable: false, allChunks: true})
    ]} : {
    plugins: [
      // new webpack.IgnorePlugin(/diskpart|macmount$/),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
  }),
  target: 'electron-renderer',
};
