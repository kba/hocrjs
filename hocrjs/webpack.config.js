const UglifyJS = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    'fullscreen': "./src/fullscreen.js",
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      vue: 'vue/dist/vue.esm.js',
    },
  },
  output: {
    path: __dirname + "/dist",
    filename: `hocr.[name].js`,
  },
  module: {
    loaders: [
      {
        test: /.*\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.s?[ac]ss$/,
        loader: "style-loader!css-loader?sourcemap=true!sass-loader?sourcemap-=true"
      },
    ]
  },
  plugins: [
    new UglifyJS({}),
  ]
}
