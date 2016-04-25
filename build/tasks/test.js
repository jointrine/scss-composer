var gulp = require("gulp");
var ts = require("gulp-typescript");
var paths = require("../paths");
var mocha = require("gulp-mocha");

var tsConfig = require("../../tsconfig.json").compilerOptions;

gulp.task("build:specs", ["build"], () => {
  return gulp.src(paths.specs)
    .pipe(ts(tsConfig))
    .pipe(gulp.dest(paths.testOutput))
})

gulp.task("test", ["build:specs"], () => {
  return gulp.src(paths.tests)
    .pipe(mocha());
})

gulp.task("tdd", ["test"], () => {
  gulp.watch([].concat(paths.specs).concat(paths.src), ["test"])
})