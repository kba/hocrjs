const path = require('path')
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
    loaders: [
      {test: /.*\.js$/, exclude: /node_modules/, loader: 'babel-loader?cacheDirectory'},
      {test: /\.vue/, loader: "vue-loader"},
    ]
  }
}
