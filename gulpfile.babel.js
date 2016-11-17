const gulp = require('gulp-help')(require('gulp'));
import babel       from 'gulp-babel';
import tape        from 'gulp-tape';
import replace     from 'gulp-replace';
import sass        from 'gulp-sass';
import sourcemaps  from 'gulp-sourcemaps';
import del         from 'del';
import webpack     from 'webpack-stream';
import tapColorize from 'tap-colorize';
import express     from 'express';
import path        from 'path';

function getconfig() {
    const $ = Object.assign({
        srcTest: 'src/test/*.js',
        srcLib: 'src/lib/**/*.js',
        srcSass: 'sass/**/*.scss',
        userjs: 'src/userjs/hocr-viewer.user.js',
        distDir: 'dist',
        testDir: 'test',
        libDir: 'lib',
        assetServer: 'https://kba.github.io/hocrjs/dist',
        port: 3001,
    }, require('yargs').argv);
    $.updateServer = ($.updateServer || $.assetServer);
    return $;
}
const $ = getconfig()

gulp.task('default', ['lib', 'sass', 'webpack', 'userjs']);

gulp.task('clean', "Delete lib dir", () => {
    del($.libDir);
});

gulp.task('watch', () => {
    gulp.watch($.srcLib, ['lib']);
});

gulp.task('lib', "Build shared files in lib", ['clean'], () => {
  gulp.src($.srcLib)
    .pipe(babel())
    .pipe(gulp.dest($.libDir));
});

gulp.task('sass', "Build CSS from SCSS files to dist", () => {
    gulp.src($.srcSass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest($.distDir));
});

gulp.task('test', (cb) => {
    gulp.src($.srcTest)
        .pipe(tape({ reporter: tapColorize()}));
});

gulp.task('userjs', "Build the UserScript", () => {
  gulp.src($.userjs)
    .pipe(replace('__UPDATE_SERVER__', $.updateServer))
    .pipe(replace('__ASSET_SERVER__', $.assetServer))
    .pipe(replace('__DATE__', $.date))
    .pipe(babel())
    .pipe(replace(/^.use strict.;\n\n/, ''))
    .pipe(gulp.dest($.distDir));
}, {
    options: {
        "update-server": `The server to ping for updates. Default: ${$.updateServer}`,
        'asset-server': `The server holding 'dist'. Default: ${$.assetServer}`,
        'date': `The version/timestamp for the userscript. Default: ${$.date}`,
    }
});

gulp.task('serve', "Start a local server for testing UserJS", () => {
    const app = new express();
    app.use('/', express.static(path.join(__dirname)))
    console.log(`Starting server on http://localhost:${$.port}`);
    app.listen($.port)
}, {
    options: {
        'port': `Port to start on. Default ${$.port}`,
    }
});

gulp.task('webpack', ['lib'], (callback) => {
    gulp.src("./src/browser/fullscreen-init.js")
        .pipe(babel())
        .pipe(webpack({
            entry: {
                "hocr-fullscreen": "./src/browser/fullscreen-init.js",
            },
            output: { filename: '[name].webpack.js' },
            devtool: 'source-map',
            module: {
                loaders: [{
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
                        exclude: [/node_modules/],
                }],
            },
            resolve: { extensions: ['', '.js', '.jsx'] },
        }))
        .pipe(gulp.dest($.distDir));
});
