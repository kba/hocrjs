//const UglifyJS = require('uglifyjs-webpack-plugin')
const path = require('path')
const {SourceMapDevToolPlugin} = require('webpack')

module.exports = {
  entry: {
    'fullscreen': "./src/fullscreen.js",
  },
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
  devtool: false,
  plugins: [
    new SourceMapDevToolPlugin({
      append: '\n//# sourceMappingURL=https://unpkg.com/hocrjs/[url]',
      filename: '[name].map',
    })
  ]
  //plugins: [
  //  new UglifyJS({}),
  //]
}
