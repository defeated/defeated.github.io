---
layout: post
category: ops
published: false
---

Sometimes you need to establish a permanent SSH tunnel; autossh can
be used to monitor a connection and restart it in the event of
an unexpected disconnect. But who watches autossh? If you're using
Ubuntu prior to 15.04/Vivid, you can use the built-in Upstart daemon.

outline:

- autossh (link)
- upstart (link)
	- conf file (naming convention)
		- set user (otherwise tries to ssh as root)
	    - respawn (needs two lines: first enables, second configures)
	    - expect daemon (because autossh daemonizes)
	    - autossh -f to daemonize)
	- usage
    	- sudo start conf-filename (no extention)
    	
