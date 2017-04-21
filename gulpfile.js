const gulp = require('gulp')
const less = require('gulp-less')
const watch = require('gulp-watch')

gulp.task('css', () => {
  return gulp.src([
    'server/templates/less/*.less',
    '!server/templates/less/_*.less'
  ])
    .pipe(less())
    .pipe(gulp.dest('server/public/css'))
})

gulp.task('watch', () => {
  gulp.watch(['server/templates/less/*'], ['css'])
})

gulp.task('default', ['css', 'watch'])