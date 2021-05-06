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
  const mainTitle = document.querySelector('#main-title')
  mainTitle.innerText = 'Dominic Toretto'
  // Part 2
  const body = document.querySelector('body')
  body.style.backgroundColor = 'rgba(235, 48, 1, 0.699)'
  // Part 3
  const domsFavoriteThings = document.querySelector('#favorite-things')
  domsFavoriteThings.removeChild(domsFavoriteThings.lastElementChild)
  // Part 4
  const specialTitle = document.querySelectorAll('.special-title')
  specialTitle.forEach((element) => {
    element.style.fontSize = '2rem'
  })
  // Part 5
  const pastRaces = document.querySelectorAll('#past-races li')
  console.log(pastRaces)
  pastRaces.forEach((li) => {
    if (li.innerText === 'Chicago') {
      li.innerHTML = ''
    }
  })
  // Part 6
  const pastRacesUL = document.querySelector('#past-races')
  newCity = document.createElement('li')
  newCity.innerText = 'Boston'
  pastRacesUL.appendChild(newCity)

  // Part 7
  const titles = document.querySelector('.main')
  console.log(titles)
  newDiv = document.createElement('div')
  newDiv.className = 'blog-post purple'
  console.log(newDiv)
  newH1 = document.createElement('h1')
  newP = document.createElement('p')
  newH1.innerText = 'Boston'
  newP.innerText = 'I DROVE MY CAR INTO A DUNKIN DONUTS'
  titles.append(newDiv)
  newDiv.appendChild(newH1)
  newDiv.appendChild(newP)
}
