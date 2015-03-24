# constants
DIR_SRC     = 'src/'
DIR_DEST    = 'dist/'
FILES_JADE  = DIR_SRC   + '**/*.jade'

# dependencies
gulp          = require 'gulp'
jade          = require 'gulp-jade'

# tasks
gulp.task 'pages', ->
  gulp.src [ FILES_JADE, '!**/_*' ]
    .pipe jade pretty: true
    .pipe gulp.dest DIR_DEST

