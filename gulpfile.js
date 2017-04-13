const gulp = require('gulp')
const pug = require('gulp-pug')
const less = require('gulp-less')
const watch = require('gulp-watch')

gulp.task('html', () => {
  return gulp.src(['server/templates/pug/*.pug', '!server/templates/pug/_*.pug'])
    .pipe(pug())
    .pipe(gulp.dest('server/views'))
})

gulp.task('css', () => {
  return gulp.src(['server/templates/less/*.less', '!server/templates/less/_*.less'])
    .pipe(less())
    .pipe(gulp.dest('server/public/css'))
})

gulp.task('watch', () => {
  gulp.watch(['server/templates/pug/*.pug'], ['html'])
  gulp.watch(['server/templates/less/*'], ['css'])
})

gulp.task('default', ['html', 'css', 'watch'])