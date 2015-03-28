let taglines = [
  "is a humble ruby typist",
  "loves plaid",
  "talks with his hands",
  "doesn't hate javascript",
  "trims his beard like a bonsai",
  "is having a good hair day",
]

let timer, t = 0;

let rotator = () => {
  let text = taglines[t]
  let max = taglines.length

  if(t == max) {
    t = 0
    clearInterval(timer)
  }
  else {
    t++
  }

  $('.tagline').fadeOut(function(){
    $(this).text(text).fadeIn()
  })
}

jQuery(() => {
  setInterval(rotator, 7500)
})
