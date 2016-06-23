var gulp = require('gulp'); //main gulp file
var uglify = require('gulp-uglify'); //compresses javascript files
var sass = require('gulp-sass'); // compiles sass (compress' with option but better to use gulp-uncss and then gulp-cssnano)
var plumber = require('gulp-plumber'); //autoreloads gulp on error
var livereload = require('gulp-livereload'); //livereloads page with gulp-connect
var connect = require('gulp-connect'); //livereloads page with livereload
var imagemin = require('gulp-imagemin'); //compresses images
var htmlmin = require('gulp-htmlmin'); //minifies html
var uncss = require('gulp-uncss'); //removes unsed css styles from css
var cssnano = require('gulp-cssnano'); //minifies css after conversion and removal of styles

/*simplier method to load all the plugins above is use gulp-load-plugins
this makes all plugins in devDepencies package.json file available
npm i --save-dev gulp-load-plugins
var plugins = require('gulp-load-plugins')
all plugins will need plugins prefix to use. ex. plugins.gulp-uglify*/

//sets up server for use with livereload
gulp.task('connect', function () {
  connect.server({
    root: './dist', //(needed if in a different folder then gulpfile.js)
    livereload: true
  });
})

//Html  minify and saves to new file
gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
})

//Scripts Task
//Uglifies JS and saves to new file
gulp.task('scripts', function () {
  gulp.src('js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'))
    .pipe(connect.reload());
})

//Bootstrap 
//remove unused styles
gulp.task('bootstrap', function() {
  gulp.src('bower_components/bootstrap/dist/css/*.css')
    .pipe(plumber())
    .pipe(uncss({
      html: ['./dist/*.html']
    }))
  .pipe(cssnano())
  .pipe(gulp.dest('./dist/styles/'))
  .pipe(connect.reload());
})


//Styles Task
//compiles sass, removes unused styles, minifies css and saves to new file
gulp.task('styles', function () {
  gulp.src('sass/*.scss') //set source folder
    .pipe(plumber())
    .pipe(sass())
    .pipe(uncss({
      html: ['./dist/*.html']
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/styles/')) //set and save to destination folder
    .pipe(connect.reload());
})

//Image Task
//compress images and saves to new files
gulp.task('image', function () {
  gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images/'));
})

//Watch task
//Watches html, JS, sass for changes and runs on save
gulp.task('watch', function () {
  gulp.watch('*.html', ['html']);
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('sass/**/*.scss', ['styles']);

});

//name in brackets is the name to call.
//If set to 'defualt' then will run with just gulp command
gulp.task('default', ['html', 'styles', 'scripts', 'watch', 'connect']);

//final run for uploading - no watchers - compresses images
gulp.task('final', ['html', 'styles', 'scripts', 'image', 'connect'])
