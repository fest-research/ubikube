import fs from 'fs';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const getBabelLoader = () => {
  const baseOptions = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc'), 'utf-8'));
  const options = {
    ...baseOptions,
    presets: baseOptions.presets.map(preset => (
      preset === 'es2015' ? ['es2015', { modules: false }] : preset
    )),
    babelrc: false
  };
  return {
    loader: 'babel-loader',
    options
  };
};

export default {
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/drivelist'),
        ],
        loader: getBabelLoader()
      },

      {
        test: /\.scss$/,
        loader: 'style-loader'
      }, {
        test: /\.scss$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },

      {
        test: /\.scss$/,
        loader: 'sass-loader',
        include: path.join(__dirname, 'src'),
      },

      ...(process.env.NODE_ENV === 'production' ?
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      } : {})
    ]
  },
};
