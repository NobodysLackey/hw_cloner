let quotes = [
  `I live my life a quarter mile at a time`,
  `I said a ten-second car, not a ten-minute car`,
  `You can have any brew you want... as long as it's a Corona.`,
  `You almost had me? You never had me - you never had your car!`,
  `I don't have friends. I have family.`,
  `It don't matter if you win by an inch or a mile. Winning's winning.`
]

window.onload = function (event) {
  // Random quote of the day generator
  const randomQuote = function () {
    document.querySelector('#quote-of-the-day').textContent = `"${
      quotes[Math.floor(Math.random() * quotes.length)]
    }"`
  }
  randomQuote()

  // Do all of your work inside the window.onload function (in other words, here!)

  // Part 1
  document.querySelector(
    '#main-title'
  ).innerHTML = `Welcome to Dom Toretto's Homepage`

  // Part 2
  document.querySelector('body').style.backgroundColor = `red`

  // Part 3
  document
    .querySelector(`#favorite-things`)
    .removeChild(document.querySelector(`#favorite-things`).lastElementChild)

  // Part 4
  let specialTitles = document.querySelectorAll(`.special-title`)
  for (let i = 0; i < specialTitles.length; i++) {
    specialTitles[i].style.fontSize = `2rem`
  }

  // Part 5
  let races = document.querySelector('#past-races').children
  for (let i = 0; i < races.length; i++) {
    if (races[i].innerHTML === 'Chicago') {
      races.item(i).remove()
    }
  }

  // Part 6
  let newLi = document.createElement('li')
  newLi.innerHTML = 'Ann Arbor'
  let raceList = document.querySelector('#past-races')
  raceList.appendChild(newLi)

  // Part 7
  let newBlog = document.createElement('div')
  newBlog.className = 'blog-post purple'
  newBlog.innerHTML = `<h1>Ann Arbor</h1> <p>I CRASHED INTO THE BIG HOUSE!</p>`
  document.querySelector('.main').append(newBlog)
}
