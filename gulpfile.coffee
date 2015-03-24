# constants
DIR_SRC     = 'src/'
DIR_DEST    = 'dist/'
FILES_SASS  = DIR_SRC   + '**/*.scss'
FILES_JADE  = DIR_SRC   + '**/*.jade'

# dependencies
gulp          = require 'gulp'
sass          = require 'gulp-sass'
jade          = require 'gulp-jade'

# tasks

gulp.task 'sass', ->
  gulp.src [ FILES_SASS, '!**/_*' ]
    .pipe sass()
    .pipe gulp.dest DIR_DEST

gulp.task 'pages', ->
  gulp.src [ FILES_JADE, '!**/_*' ]
    .pipe jade pretty: true
    .pipe gulp.dest DIR_DEST

