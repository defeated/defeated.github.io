let taglines = [
  "is having a good hair day in this photo",
  "is a humble ruby typist",
  "prefers lowercase letters",
  "loves plaid",
  "talks with his hands",
  "doesn't hate javascript",
  "trims his beard like a bonsai",
  "is not a ninja",
];

class Rotator {
  constructor(items, selector) {
    this.items    = items;
    this.max      = items.length - 1;
    this.index    = 1;
    this.$element = $(selector);
  }

  start(duration = 6500) {
    this.timer = setInterval(() => this.rotate(), duration);
  }

  stop() {
    clearInterval(this.timer);
  }

  next() {
    if(this.index == this.max) return this.stop();
    this.index++;
  }

  rotate() {
    this.$element.fadeOut(150, () => {
      this.$element.text(this.tagline).fadeIn(150, () => {
        this.next();
      });
    });
  }

  get tagline() {
    return this.items[this.index];
  }
}

class SmoothScroll {
  constructor(target, duration = 500) {
    this.$target = $(target);
    this.duration = duration;
  }

  static listen() {
    $('a[href*=#]:not([href=#])').click(function(e) {
      e.preventDefault();
      new SmoothScroll(this.hash).go();
    });
  }

  get offset() {
    return this.$target.offset();
  }

  go() {
    if (!this.$target.length) return;
    $('html, body').animate({ scrollTop: this.offset.top }, this.duration);
  }
}

jQuery(function(){
  SmoothScroll.listen();

  let rotator = new Rotator(taglines, '.tagline');
  rotator.start();
});
