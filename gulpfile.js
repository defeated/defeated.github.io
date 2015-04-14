// load .env early
require('dotenv').load();

// load dependencies
var gulp        = require('gulp'),
    postcss     = require('gulp-postcss'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    minifycss   = require('gulp-minify-css'),
    babel       = require('gulp-babel'),
    uglify      = require('gulp-uglify'),
    autoprefix  = require('autoprefixer-core'),
    browserSync = require('browser-sync'),
    awspublish  = require('gulp-awspublish'),
    exec        = require('child_process').execSync;

// run external jekyll process. must be sync because of a race condition where
// jekyll deletes the destination directory contents before building.
gulp.task('jekyll', function(callback) {
  exec('bin/jekyll build');
  callback();
});

// process stylesheets and inject into browser.
gulp.task('stylesheets', function() {
  return gulp.src('src/css/site.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefix() ]))
    .pipe(gulp.dest('dist/css'))
    .pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true }));
});

// process stylesheets and inject into browser.
gulp.task('javascripts', function() {
  return gulp.src('src/js/site.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
});

// watch for source file changes and run related tasks.
gulp.task('watch', [ 'build' ], function() {
  gulp.watch('src/**/*.scss', [ 'stylesheets' ]);
  gulp.watch('src/**/*.js',   [ 'javascripts' ]);
  gulp.watch('src/**/*.html', [ 'build' ]);
  gulp.watch('src/**/*.md',   [ 'build' ]);
});

// launch local server and listen for changes.
gulp.task('serve', [ 'watch' ], function() {
  browserSync({
    files: [ 'dist/**/*.html', 'dist/js/*.js' ],
    server: {
      baseDir: 'dist'
    }
  });
});

// deployment task (using s3)
gulp.task('deploy', function() {
  var publisher = awspublish.create({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: 'eddiema.de'
  });

  return gulp.src('dist/**/*')
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});

// meta task to run all build-related tasks.
gulp.task('build', [ 'jekyll', 'javascripts', 'stylesheets' ]);

// do the damn thing
gulp.task('default', [ 'serve' ]);
