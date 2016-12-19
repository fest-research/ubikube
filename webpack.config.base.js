import path from 'path';
import validate from 'webpack-validator';

export default validate({
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".ts", ".tsx", ".js", ".jsx", ".json"],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },

  plugins: [],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
});