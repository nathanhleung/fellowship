const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const jade = require('gulp-jade');
const plumber = require('gulp-plumber');
const path = require('path');

const paths = {
  babel: ['./src/js/**/*.js'],
  stylus: ['./src/styl/**/*.styl'],
  jade: ['./src/**/*.jade', '!./src/_layout.jade', '!./src/_partials/**/*.jade'],
};

gulp.task('default', ['babel', 'stylus', 'jade']);

gulp.task('watch', () => {
  gulp.watch(paths.babel, ['babel']);
  gulp.watch(paths.stylus, ['stylus']);
  gulp.watch(paths.jade, ['jade']);
});

gulp.task('babel', () => {
  return gulp.src(paths.babel)
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('stylus', () => {
  return gulp.src(paths.stylus)
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('jade', () => {
  return gulp.src(paths.jade)
    .pipe(plumber())
    .pipe(jade({
      basedir: path.join(__dirname, 'src'),
    }))
    .pipe(gulp.dest('./build'));
});