---
layout: post
published: false
---

Ruby and JavaScript, Jekyll and Gulp; two great tastes that taste great together. Jekyll has a bunch of handy conventions for publishing blog posts, rendering templates and generating permalinks. Gulp has a great asset pipeline and it's fast as hell.

outline:

- jekyll (gemfile)
	- install prelease 3.0 for its incremental build improvements (link)
- gulp asset pipeline (package.json)
	- stylesheets: sass, autoprefixer, minifycss
	- javascript: babel (es6), uglifier
	- browser-sync is awesome (local server)
- configuration
	- exclude .scss, .js so jekyll doesn't copy them to destination folder
	- run jekyll build as sync child process (needs node 0.12.0 or newer)
- continuous integration
	- love ci - commit to master, automatically build & deploy
	- use travis - supports ruby and node
		- by default it supports ruby 1.9.3 and node 0.10.3 (uh oh)
    	- leverage travis lifecycle to install updated versions
       	- encrypt your secrets
	- deploy
    	- excercise left to you
        - this site is hosted on s3 (awspublish pkg)

    
