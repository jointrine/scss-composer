var gulp = require("gulp");
var ts = require("gulp-typescript");
var paths = require("../paths");
var del = require("del");
var vinyl = require("vinyl-paths");

var tsProject = ts.createProject("tsconfig.json");

gulp.task("clean", () => {
  return gulp.src(paths.dist)
    .pipe(vinyl(del))
})

gulp.task("build", ["clean"], () => {
  return tsProject.src()
    .pipe(ts(tsProject))
    .pipe(gulp.dest(paths.dist));
});