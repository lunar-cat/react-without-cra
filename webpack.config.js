const path = require('path');
const webpack = require('webpack');
// When changing the config, webpack has to be restarted
// argv has the --mode
const config = (env, argv) => {
  console.log('argv', argv.mode);
  const backend_url = argv.mode === 'production'
    ? 'https://obscure-harbor-49797.herokuapp.com/api/notes'
    : 'http://localhost:3001/notes';

  return {
    entry: './src/index.js',
    output: {
      /* output-path MUST BE AN ABSOLUTE PATH */
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000
    },
    devtool: 'source-map',
    module: {
      rules: [
        { // definition for a loader
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', // transpile to ES5 standard
              '@babel/preset-react' // transpile jsx to react createEle.
            ]
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
          // css-loader load CSS files and style-loader generate 
          // and inject a style element with all the style of the app.
          // Includes the css in the main.js file
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  };
};

module.exports = config;