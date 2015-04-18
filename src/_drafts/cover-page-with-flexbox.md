---
layout: post
category: design
published: false
---

Flexbox is awesome. It can be used to vertically center a cover page that fills
the browser viewport, without needing fixed dimensions or positioning. A couple
of friends make it incredibly simple

outline:

- width 100%
- height 100vh (link to caniuse)
- display: flex
  	- flex-flow: row wrap
	- align-items: center (vertical align)
	- justify-content: center (horizontal align)
- jump to content caret
	- align-self: flex-end (vertical align bottom)
	- flex: 1 100% (fill entire row)
- autoprefixer (link)
	- handles vendor prefixes for different browsers / flex standards