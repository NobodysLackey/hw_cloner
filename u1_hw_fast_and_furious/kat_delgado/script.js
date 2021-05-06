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
  let newTitle = (document.getElementById('main-title').innerHTML =
    'Too Fast, Too Furious')
  // Part 2
  let newBackground = (document.body.style.backgroundColor = 'pink')
  // Part 3
  const removeItem = document.querySelector('li:last-child')
  removeItem.parentElement.removeChild(removeItem)
  // Part 4
  const arr = document.querySelectorAll('.special-title')
  console.log(arr)
  for (let i = 0; i < arr.length; i++) {
    arr[i].style.fontSize = '2rem'
  }

  // Part 5 // I was stuck on this one
  const pastRaces = document.querySelectorAll('#past-races li')
  console.log(pastRaces)
  pastRaces.forEach((li) => {
    if (li.innerText == 'Chicago') {
      li.innerHTML = ''
    }
  })
  // Part 6
  const races = document.createElement('li')
  let textnode = document.createTextNode('San Francisco')
  races.appendChild(textnode)
  document.getElementById('past-races').appendChild(races)

  // Part 7
  let divPost = document.createElement('div')
  divPost.className = 'blog-post purple'

  const hElement = document.createElement('h1')
  let cityName = document.createTextNode('San Francisco')
  hElement.appendChild(cityName)
  divPost.appendChild(hElement)
  const pElement = document.createElement('p')
  blogPost = document.createTextNode('I raced across the Golden Gate Bridge.')
  pElement.appendChild(blogPost)
  divPost.appendChild(pElement)
  document.getElementsByClassName('main')[0].appendChild(divPost)
}
