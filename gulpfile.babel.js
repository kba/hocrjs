import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';
import {exec} from 'child_process';
import tape from 'gulp-tape';
import tapColorize from 'tap-colorize';
import replace from 'gulp-replace';

const paths = {
    allSrcJs: 'js/**/*.jsx?',
    testSrcJs: 'src/test/*.js',
    sharedSrcJs: 'src/shared/**/*.js',
    clientEntryPoint: 'src/browser/viewer.js',
    gulpFile: 'gulpfile.babel.js',
    webpackFile: 'webpack.config.babel.js',
    userjs: 'src/userjs/hocr-viewer.user.js',
    distDir: 'dist',
    testDir: 'test',
    libDir: 'lib',
};

gulp.task('clean', () => {
  return del(paths.libDir);
});

gulp.task('build-test', () => {
    gulp.src(paths.testSrcJs)
        .pipe(babel())
        .pipe(gulp.dest(paths.testDir));
});

gulp.task('test', ['build-test'], (cb) => {
    gulp.src(paths.testSrcJs)
        .pipe(tape({
            reporter: tapColorize(),
        }));
});

gulp.task('build', ['clean'], () => {
  gulp.src(paths.sharedSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir));
});

gulp.task('userjs', [], () => {
  var ASSET_SERVER = (process.env.ASSET_SERVER || 'https://kba.github.io/hocrjs/dist');
  var UPDATE_SERVER = (process.env.UPDATE_SERVER || ASSET_SERVER);
  gulp.src(paths.userjs)
    .pipe(babel())
    .pipe(replace('__UPDATE_SERVER__', UPDATE_SERVER))
    .pipe(replace('__ASSET_SERVER__', ASSET_SERVER))
    .pipe(replace('__DATE__', new Date().getTime() / 1000))
    .pipe(replace(/^.use strict.;\n\n/, ''))
    .pipe(gulp.dest(paths.distDir));
});

gulp.task('browser', ['build'], (callback) => {
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir));
});

gulp.task('watch', () => {
  gulp.watch(paths.sharedSrcJs, ['build']);
});

gulp.task('default', ['watch', 'browser']);
