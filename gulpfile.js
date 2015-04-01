'use strict';

// constants
var DIR_SRC     = 'src/';
var DIR_DEST    = 'dist/';
var DIR_CSS     = DIR_DEST  + 'css/';
var DIR_JS      = DIR_DEST  + 'js/';
var DIR_IMG     = DIR_DEST  + 'images/';
var FILES_IMG   = DIR_SRC   + 'images/**/*.{jpg,gif,png}';
var FILES_ES6   = DIR_SRC   + 'js/**/*.js';
var FILES_SASS  = DIR_SRC   + 'sass/**/*.scss';
var FILES_JADE  = DIR_SRC   + '**/*.jade';
var FILES_CSS   = DIR_CSS   + '*.css';
var FILES_JS    = DIR_JS    + '*.js';
var FILES_HTML  = DIR_DEST  + '*.html';

// dependencies
var del           = require('del');
var browserSync   = require('browser-sync');
var gulp          = require('gulp');
var rename        = require('gulp-rename');
var babel         = require('gulp-babel');
var uglify        = require('gulp-uglify');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var minifyCSS     = require('gulp-minify-css');
var jade          = require('gulp-jade');

// tasks
gulp.task('clean', function(done){
  del.sync([ DIR_DEST ], { force: true });
  done();
});

gulp.task('es6', function(){
  return gulp.src([ FILES_ES6, '!**/_*' ])
    .pipe(babel())
    .pipe(gulp.dest(DIR_JS));
});

gulp.task('javascripts', [ 'es6' ], function(){
  return gulp.src([ FILES_JS, '!**/*.min.js' ])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(DIR_JS));
});

gulp.task('sass', function(){
  return gulp.src([ FILES_SASS, '!**/_*' ])
    .pipe(sass())
    .pipe(gulp.dest(DIR_CSS));
});

gulp.task('stylesheets', [ 'sass' ], function(){
  return gulp.src([ FILES_CSS, '!**/*.min.css' ])
    .pipe(autoprefixer())
    .pipe(gulp.dest(DIR_CSS))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(DIR_CSS));
});

gulp.task('pages', function(){
  return gulp.src([ FILES_JADE, '!**/_*' ])
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(DIR_DEST));
});

gulp.task('images', function(){
  return gulp.src(FILES_IMG)
    .pipe(gulp.dest(DIR_IMG));
});

gulp.task('watch', function(){
  gulp.watch(FILES_ES6,   [ 'javascripts' ]);
  gulp.watch(FILES_JADE,  [ 'pages' ]);
  gulp.watch(FILES_SASS,  [ 'stylesheets' ]);
});

gulp.task('serve', [ 'build', 'watch' ], function(){
  browserSync({
    files:  [ FILES_CSS, FILES_JS, FILES_HTML ],
    server: DIR_DEST
  });
});

gulp.task('build', [ 'clean', 'javascripts', 'stylesheets', 'images', 'pages' ]);
gulp.task('default', [ 'build', 'serve' ]);
