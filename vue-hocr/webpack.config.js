const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const srcPath = path.join(__dirname, "src")

module.exports = {
  entry: `${srcPath}/components/index.js`,
  resolve: {
    alias: {
      "@": srcPath,
      vue: 'vue/dist/vue.esm.js',
    },
  },
  output: {
    path: __dirname + "/dist",
    filename: `vue-hocr.js`,
    libraryTarget: 'umd',
    library: 'VueHocr',
  },
  module: {
    rules: [
      {test: /.*\.js$/,   exclude: /node_modules/, loader: 'babel-loader', options:      {cacheDirectory: true}},
      {test: /.*\.scss$/, exclude: /node_modules/, loader: ['vue-style-loader', 'css-loader', 'sass-loader']},
      //{test: /\.html$/, loader: "html-loader"},
      {test: /\.vue/, loader: "vue-loader"},
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}
