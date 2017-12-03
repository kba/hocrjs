const UglifyJS = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
      'fullscreen': "./src/browser/fullscreen.js",
      'viewer': "./src/browser/viewer.js",
    },
    devtool: 'source-map',
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
