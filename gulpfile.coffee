# constants
DIR_SRC     = 'src/'
DIR_DEST    = 'dist/'
FILES_SASS  = DIR_SRC   + '**/*.scss'
FILES_JADE  = DIR_SRC   + '**/*.jade'

# dependencies
fs            = require 'fs-extra'
gulp          = require 'gulp'
sass          = require 'gulp-sass'
autoprefixer  = require 'gulp-autoprefixer'
minifyCSS     = require 'gulp-minify-css'
jade          = require 'gulp-jade'
rename        = require 'gulp-rename'

# tasks
gulp.task 'clean', (done) ->
  fs.removeSync DIR_DEST
  done()

gulp.task 'sass', ->
  gulp.src [ FILES_SASS, '!**/_*' ]
    .pipe sass()
    .pipe gulp.dest DIR_DEST

gulp.task 'stylesheets', [ 'sass' ], ->
  gulp.src [ FILES_CSS, '!**/*.min.css' ]
    .pipe autoprefixer()
    .pipe gulp.dest DIR_DEST
    .pipe minifyCSS()
    .pipe rename suffix: '.min'
    .pipe gulp.dest DIR_DEST
    .pipe reload stream: true

gulp.task 'pages', ->
  gulp.src [ FILES_JADE, '!**/_*' ]
    .pipe jade pretty: true
    .pipe gulp.dest DIR_DEST

