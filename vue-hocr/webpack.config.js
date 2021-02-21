const path = require('path')
const srcPath = path.join(__dirname, "src")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {test: /.*\.js$/, loader: 'babel-loader', options: {cacheDirectory: true}},
      {test: /\.scss$/, use: ['css-loader', 'sass-loader']},
      {test: /\.vue/, loader: "vue-loader"},
    ]
  }
}
