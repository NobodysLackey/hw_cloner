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
  document.querySelector('#main-title')
  // Part 2
  document.body.style.backgroundColor = 'orange'
  // Part 3
  const favThings = document.querySelector('#favorite-things')
  favThings.removeChild(favThings.lastElementChild)
  // Part 4
  document
    .querySelectorAll('.special-title')
    .forEach((title) => (title.style.fontSize = '2rem'))
  // Part 5
  const races = document.querySelectorAll('#past-races li')
  races.forEach((li) => {
    if (li.innerHTML === 'Chicago') {
      li.innerHTML = ''
    }
  })

  // Part 6
  const listCity = document.createElement('li')
  // const city = document.createTextNode('DC')

  // listCity.appendChild(city)
  listCity.innerText = 'DC'

  const raceCity = document.querySelector('#past-races')

  raceCity.appendChild(listCity)

  // Part 7
  const main = document.querySelector('.main')
  const dcBlog = document.createElement('div')
  const blog = document.createElement('p')
  const blogCity = document.createElement('h1')

  dcBlog.setAttribute('class', 'blog-post purple')
  blogCity.innerText = 'DC'
  blog.innerText =
    'I went VROOM and then also went fast and then I think I won.'

  dcBlog.appendChild(blogCity)
  dcBlog.appendChild(blog)
  main.appendChild(dcBlog)
}
