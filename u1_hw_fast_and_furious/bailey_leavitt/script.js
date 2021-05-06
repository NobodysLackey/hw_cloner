let quotes = [
  `I live my life a quarter mile at a time`,
  `I said a ten-second car, not a ten-minute car`,
  `You can have any brew you want... as long as it's a Corona.`,
  `You almost had me? You never had me - you never had your car!`,
  `I don't have friends. I have family.`,
  `It don't matter if you win by an inch or a mile. Winning's winning.`,
];

window.onload =  function(event) {
  
  // Random quote of the day generator
  const randomQuote = function() {
    document.querySelector('#quote-of-the-day').textContent = `"${
      quotes[Math.floor(Math.random() * quotes.length)]
    }"`;
  };
  randomQuote();

  // Do all of your work inside the window.onload function (in other words, here!)

  // Part 1
  const titleChange = () => {
    const mainTitle = document.querySelector(`#main-title`)
    mainTitle.innerHTML = `Dom's Terrible Site`
  }
  titleChange();

  // Part 2
  const backgroundColoring = () => {
    document.body.style.backgroundColor = `white`
  }

  backgroundColoring();

  // Part 3
  const modifyFavThings = () => {
    const favThings = document.getElementById(`favorite-things`)
    favThings.removeChild(favThings.lastElementChild)
  }
  modifyFavThings();

  // Part 4
  
  const fontChanger = () => {
    const mainList = document.querySelectorAll(`.special-title`)
    for(i = 0; i < mainList.length; i++) {
      mainList[i].style.fontSize = '2rem'
    }
  }
  fontChanger();

  // Part 5
  const removeChicago = () => {
    document.getElementById(`past-races`).childNodes[7].remove()
  }
  removeChicago();

  // Part 6
  const addRaces = () => {
    const addCity = document.createElement(`li`)
    addCity.innerHTML = `Sydney`
    document.getElementById(`past-races`).appendChild(addCity)
  }
  addRaces();

  // Part 7
  const newPost = () => {
    // Wanted to do this using an array with the tags... but couldn't get it to work. #WettestCodeEver
    // create new <div> with class .blog-post
    const newDiv = document.createElement(`div`)
    newDiv.classList.add(`blog-post`, `purple`)
    // create new <h1> with City text
    const newH1 = document.createElement(`h1`)
    newH1.innerHTML = `Sydney`
    // create new <p> with ridiculous one-liner
    const newP = document.createElement(`p`)
    newP.innerHTML = `OMG I DROVE INTO THE OCEAN AND RACED MY CAR ON THE GREAT BARRIER REEF BECAUSE THERE MOVIES GET MORE RIDICULOUS WITH EACH ITERATION!`
    // add these elements to the new <div>
    newDiv.appendChild(newH1)
    newDiv.appendChild(newP)
    // add the new <div> to existing posts
    document.querySelector(`.main`).appendChild(newDiv)
  }
  newPost();
}
