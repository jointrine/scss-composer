# SCSS Composer
Dynamically composes a root SCSS file based on glob patterns in a configuration file.

Only works with Gulp for now, but commandline support is planned as well.

## Installation

`npm install --save-dev scss-compose`

## Usage

Start by creating a config file where you can define your SCSS modules. The format is JSON.

``` json
// scss-config.json
{
  "modules": {
    "common": [
      "css/config/**/*.scss",
      "css/common/**/*.scss"
    ],
    "main": [
      "css/config/**/*.scss",
      "css/components/**/*.scss",
      "css/pages/**/*.scss"
    ]
  }
}
```

As you can see, the config file can declare multiple modules (here `common` and `main`) that will be created as separate root files.

When you have the config file, use it in your gulp task for SCSS.

``` javascript
// gulpfile.js
var gulp = require("gulp");
var sass = require("gulp-sass");
var composer = require("scss-composer");

gulp.task("build:css", () => {
  return gulp.src("scss-config.json")
    .pipe(composer())
    .pipe(sass())
    .pipe(gulp.dest("dist"));
});
```

This will result in two files, `dist/common.css` and `dist/main.css`, that has included all files that matched the respective file globs. 

# License
MIT