'use strict';

// constants
var DIR_SRC     = 'src/';
var DIR_DEST    = 'dist/';
var FILES_IMG   = DIR_SRC   + 'images/**/*.{jpg,gif,png}';
var FILES_ES6   = DIR_SRC   + '**/*.js';
var FILES_SASS  = DIR_SRC   + '**/*.scss';
var FILES_JADE  = DIR_SRC   + '**/*.jade';
var FILES_CSS   = DIR_DEST  + '*.css';
var FILES_JS    = DIR_DEST  + '*.js';

// dependencies
var fs            = require('fs-extra');
var gulp          = require('gulp');
var rename        = require('gulp-rename');
var babel         = require('gulp-babel');
var uglify        = require('gulp-uglify');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var minifyCSS     = require('gulp-minify-css');
var jade          = require('gulp-jade');
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;

// tasks
gulp.task('clean', function(done){
  fs.removeSync(DIR_DEST);
  done();
});

gulp.task('es6', function(){
  return gulp.src([ FILES_ES6, '!**/_*' ])
    .pipe(babel())
    .pipe(gulp.dest(DIR_DEST));
});

gulp.task('javascripts', [ 'es6' ], function(){
  return gulp.src([ FILES_JS, '!**/*.min.js' ])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(DIR_DEST))
    .pipe(reload({ stream: true }));
});

gulp.task('sass', function(){
  return gulp.src([ FILES_SASS, '!**/_*' ])
    .pipe(sass())
    .pipe(gulp.dest(DIR_DEST));
});

gulp.task('stylesheets', [ 'sass' ], function(){
  return gulp.src([ FILES_CSS, '!**/*.min.css' ])
    .pipe(autoprefixer())
    .pipe(gulp.dest(DIR_DEST))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(DIR_DEST))
    .pipe(reload({ stream: true }));
});

gulp.task('pages', function(){
  return gulp.src([ FILES_JADE, '!**/_*' ])
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(DIR_DEST));
});

gulp.task('images', function(){
  return gulp.src(FILES_IMG)
    .pipe(gulp.dest(DIR_DEST + 'images/'));
});

gulp.task('watch', function(){
  gulp.watch(FILES_ES6,   [ 'javascripts' ]);
  gulp.watch(FILES_SASS,  [ 'stylesheets' ]);
  gulp.watch(FILES_JADE,  [ 'pages', reload ]);
});

gulp.task('serve', [ 'build', 'watch' ], function(){
  browserSync({
    server: { baseDir: DIR_DEST }
  });
});

gulp.task('build', [ 'clean', 'javascripts', 'stylesheets', 'pages', 'images' ]);
gulp.task('default', [ 'build', 'serve' ]);
