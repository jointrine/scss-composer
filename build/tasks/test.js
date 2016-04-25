var gulp = require("gulp");
var paths = require("../paths");
var mocha = require("gulp-mocha");

gulp.task("test", ["build"], () => {
  return gulp.src(paths.tests)
    .pipe(mocha());
})

gulp.task("tdd", ["test"], () => {
  gulp.watch([].concat(paths.specs).concat(paths.src), ["test"])
})