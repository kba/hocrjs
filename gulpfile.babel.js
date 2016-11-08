import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';
import {exec} from 'child_process';
import tape from 'gulp-tape';
import tapColorize from 'tap-colorize';

const paths = {
  allSrcJs: 'js/**/*.jsx?',
  testSrcJs: 'src/test/*.js',
  sharedSrcJs: 'src/shared/**/*.js',
  clientEntryPoint: 'src/shared/parser.js',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
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

gulp.task('main', ['build'], (callback) => {
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir));
});

gulp.task('watch', () => {
  gulp.watch(paths.sharedSrcJs, ['build']);
});

gulp.task('default', ['watch', 'main']);
