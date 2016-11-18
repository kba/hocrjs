const gulp = require('gulp-help')(require('gulp'), {hideEmpty: true});
import babel       from 'gulp-babel';
import tape        from 'gulp-tape';
import rename      from 'gulp-rename';
import replace     from 'gulp-replace';
import chmod       from 'gulp-chmod';
import sass        from 'gulp-sass';
import sourcemaps  from 'gulp-sourcemaps';
import del         from 'del';
import webpack     from 'webpack-stream';
import tapColorize from 'tap-colorize';
import express     from 'express';
import path        from 'path';

const $ = Object.assign({
    srcTest: './src/test/*.js',
    srcBin: './src/bin/*.js',
    srcLib: './src/lib/*.js',
    srcSass: './src/sass/**/*.scss',
    srcUserjs: './src/userjs/hocr-viewer.user.js',
    srcEntryFullscreen: './src/browser/fullscreen-init.js',
    dist: 'dist',
    test: 'test',
    lib: 'lib',
    bin: 'bin',
    date: new Date().getTime() / 1000,
    port: 3001,
}, require('yargs').argv);
$.assetServer = ($.assetServer ||  `http://localhost:${$.port}/dist`);
$.updateServer = ($.updateServer || $.assetServer);

gulp.task('default', ['lib', 'sass', 'webpack', 'userjs']);

gulp.task('clean:test', (cb) => { return del($.test, cb) });
gulp.task('clean:dist', (cb) => { return del($.dist, cb) });
gulp.task('clean:lib',  (cb) => { return del($.lib, cb) });
gulp.task('clean', "Clean all generated", ['clean:dist', 'clean:lib']);

gulp.task('watch', "Incrementally build", ['watch:sass', 'watch:userjs']);
gulp.task('watch:sass', () => { return gulp.watch($.srcSass, ['sass']) });
gulp.task('watch:userjs', () => {
    return gulp.watch('src/**/*.js', ['userjs'])
});

gulp.task('lib', "Build shared files in lib", () => {
    return gulp.src($.srcLib)
        .pipe(babel())
        .pipe(gulp.dest($.lib));
});

gulp.task('sass', "Build CSS from SCSS files to dist", () => {
    return gulp.src($.srcSass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest($.dist));
});

gulp.task('bin', "Build the bin scripts", (cb) => {
    return gulp.src($.srcBin)
        .pipe(babel())
        .pipe(rename((path) => {
            path.extname = ""
        }))
        .pipe(chmod(0o755))
        .pipe(gulp.dest($.bin))
});

gulp.task('test', "Run the tape unit tests in src/test", ['lib'], (cb) => {
    return gulp.src($.srcTest)
        .pipe(babel())
        .pipe(gulp.dest($.test))
        .pipe(tape({ reporter: tapColorize()}));
});

gulp.task('userjs:dist', "Build the Github-hosted userscript", ['webpack'], () => {
    $.assetServer = $.updateServer = 'https://kba.github.io/hocrjs/dist';
    return gulp.start('userjs');
});

gulp.task('userjs', "Build the UserScript", ['webpack'], () => {
    return gulp.src($.srcUserjs)
        .pipe(replace('__UPDATE_SERVER__', $.updateServer))
        .pipe(replace('__ASSET_SERVER__', $.assetServer))
        .pipe(replace('__DATE__', $.date))
        .pipe(babel())
        .pipe(replace(/^.use strict.;\n\n/, ''))
        .pipe(gulp.dest($.dist));
}, {
    options: {
        "update-server": `The server to ping for updates. Default: ${$.updateServer}`,
        'asset-server': `The server holding 'dist'. Default: ${$.assetServer}`,
        'date': `The version/timestamp for the userscript. Default: ${$.date}`,
    }
});

gulp.task('serve', "Start a local server", ['watch'], (cb) => {
    const app = new express();
    app.use('/', express.static(path.join(__dirname)))
    console.log(`Starting server on http://localhost:${$.port}`);
    return app.listen($.port, cb)
}, {
    options: {
        'port': `Port to start on. Default ${$.port}`,
    }
});

gulp.task('webpack', 'Bundle JS for browsers', (callback) => {
    return gulp.src("")
        .pipe(babel())
        .pipe(webpack({
            entry: {
                "hocr-fullscreen": $.srcEntryFullscreen,
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
        .pipe(gulp.dest($.dist));
});
