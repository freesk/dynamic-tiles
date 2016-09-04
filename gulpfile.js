var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var watch = require('gulp-watch');

gulp.task("default", function () {
  watch(['./src/*.js'], function () {
    return gulp.src("src/**/*.js")
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat("bundle.js"))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("./"));
  });
});
