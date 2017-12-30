const path = require('path')

module.exports = {
  entry: "./src/components/index.js",
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      vue: 'vue/dist/vue.esm.js',
    },
  },
  output: {
    path: __dirname + "/dist",
    filename: `vue-hocr.js`,
    libraryTarget: 'umd',
    // library: 'VueHocr',
  },
  module: {
    loaders: [
      {test: /.*\.js$/, exclude: /node_modules/, loader: 'babel-loader?cacheDirectory'},
      {test: /\.vue/, loader: "vue-loader"},
    ]
  }
}
