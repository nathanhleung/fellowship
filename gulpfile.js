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
  babel: {
    watch: ['./src/js/**/*.js'],
    compile: ['./src/js/**/*.js'],
  },
  stylus: {
    watch: ['./src/styl/**/*.styl'],
    compile: ['./src/styl/**/*.styl', '!./src/style/elements.styl'],
  },
  jade: {
    watch: ['./src/**/*.jade'],
    compile: ['./src/**/*.jade', '!./src/_layout.jade', '!./src/_partials/**/*.jade']
  },
};

gulp.task('default', ['babel', 'stylus', 'jade']);

gulp.task('watch', () => {
  gulp.watch(paths.babel.watch, ['babel']);
  gulp.watch(paths.stylus.watch, ['stylus']);
  gulp.watch(paths.jade.watch, ['jade']);
});

gulp.task('babel', () => {
  return gulp.src(paths.babel.compile)
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('stylus', () => {
  return gulp.src(paths.stylus.compile)
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('jade', () => {
  return gulp.src(paths.jade.compile)
    .pipe(plumber())
    .pipe(jade({
      basedir: path.join(__dirname, 'src'),
    }))
    .pipe(gulp.dest('./build'));
});