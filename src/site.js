let taglines = [
  "is having a good hair day",
  "is a humble ruby typist",
  "loves plaid",
  "talks with his hands",
  "doesn't hate javascript",
  "trims his beard like a bonsai",
]

class Rotator {
  constructor(items, selector) {
    this.items    = items
    this.max      = items.length - 1
    this.index    = 0
    this.$element = $(selector)
  }

  start(duration = 5000) {
    this.timer = setInterval(this.rotate.bind(this), duration)
  }

  stop() {
    clearInterval(this.timer)
  }

  next() {
    if(this.index == this.max) {
      return this.stop()
    }
    this.index++
  }

  rotate() {
    this.$element.fadeOut(() => {
      this.$element.text(this.tagline).fadeIn()
    })
    this.next()
  }

  get tagline() {
    return this.items[this.index]
  }
}

jQuery(function(){
  let rotator = new Rotator(taglines, '.tagline')
  rotator.start()
})
