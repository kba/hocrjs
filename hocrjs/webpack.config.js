//const UglifyJS = require('uglifyjs-webpack-plugin')
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
    rules: [
      {
        test: /.*\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {cacheDirectory: true},
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}}
        ],
      },
      {test: /\.vue/, loader: "vue-loader"},
    ]
  },
  //plugins: [
  //  new UglifyJS({}),
  //]
}
