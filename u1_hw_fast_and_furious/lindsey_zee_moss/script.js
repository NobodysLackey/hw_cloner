let quotes = [
  `I live my life a quarter mile at a time`,
  `I said a ten-second car, not a ten-minute car`,
  `You can have any brew you want... as long as it's a Corona.`,
  `You almost had me? You never had me - you never had your car!`,
  `I don't have friends. I have family.`,
  `It don't matter if you win by an inch or a mile. Winning's winning.`,
];

window.onload = function (event) {

  // Random quote of the day generator
  const randomQuote = function () {
    document.querySelector('#quote-of-the-day').textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]
      }"`;
  };
  randomQuote();

  // Do all of your work inside the window.onload function (in other words, here!)

  // Part 1
  const mainTitle = document.querySelector('#main-title')

  mainTitle.innerHTML = 'Something Shorter'


  // Part 2

  const body = document.querySelector('body')

  body.style.backgroundColor = 'dodgerblue'

  // Part 3

  const list = document.querySelector('#favorite-things')
  list.removeChild(list.lastElementChild)

  // Part 4

  const special = document.querySelectorAll('.special-title')
  special.forEach((element) => {
    element.style.fontSize = '2rem';
  })

  // Part 5

  const races = document.querySelector('#past-races')
  const racesli = races.children
  racesli[3].parentNode.removeChild(racesli[3])


  // Part 6

  let newRace = document.createElement('li')
  newRace.innerHTML = 'Saigon'
  races.appendChild(newRace);

  // Part 7

  const newBlog = document.createElement('div')
  newBlog.setAttribute('class', 'blog-post purple')
  newBlog.innerHTML = `<h1>Saigon</h1><p>WORDS WORDS WORDS!</p>`
  const main = document.querySelector('.main')
  main.appendChild(newBlog);
}
