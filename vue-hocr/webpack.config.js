const path = require('path')
const srcPath = path.join(__dirname, "src")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {SourceMapDevToolPlugin} = require('webpack')

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
  devtool: false,
  plugins: [
    new VueLoaderPlugin(),
    new SourceMapDevToolPlugin({
      append: '\n//# sourceMappingURL=https://unpkg.com/vue-hocr/dist/[url]',
      filename: '[name].map',
    })
  ],
  module: {
    rules: [
      {test: /.*\.js$/, loader: 'babel-loader', options: {cacheDirectory: true}},
      {test: /\.scss$/, use: ['css-loader', 'sass-loader']},
      {test: /\.vue/, loader: "vue-loader"},
    ]
  }
}
