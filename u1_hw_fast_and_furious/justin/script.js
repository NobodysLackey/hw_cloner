let quotes = [
  `I live my life a quarter mile at a time`,
  `I said a ten-second car, not a ten-minute car`,
  `You can have any brew you want... as long as it's a Corona.`,
  `You almost had me? You never had me - you never had your car!`,
  `I don't have friends. I have family.`,
  `It don't matter if you win by an inch or a mile. Winning's winning.`,
];

window.onload = function(event) {
  
  // Random quote of the day generator
  const randomQuote = function() {
    document.querySelector('#quote-of-the-day').textContent = `"${
      quotes[Math.floor(Math.random() * quotes.length)]
    }"`;
  };
  randomQuote();

  // Do all of your work inside the window.onload function (in other words, here!)
//create variables store them with a name semanticaly
  
  
  let mainTitle = document.getElementById("main-title")
  mainTitle.innerHTML = "Dom Toretto"
  
  let body = document.querySelector('body')
  body.style.background = 'white';
  
  let favoriteThings = document.querySelectorAll('#favorite-things li')
  favoriteThings[5].remove()

  let newFont = []
  let speacialTitles = document.querySelectorAll('special-title')
  for(i = 0; i < speacialTitles.length;i++) {
    speacialTitles[i].style.newFont = '2rem'
  }
 
  let citiesRaced = document.querySelector("#past-races")
  citiesRaced.childNodes[7].remove()
  console.log(citiesRaced)

  let newCityList = document.createElement('li')
  newCityList.innerHTML ='Milan'
  let cityRaced = document.querySelector('#past-races')
  cityRaced.appendChild(newCityList)
  
  //This function will create a new blog post element
  let milanBlog = document.createElement('div')
  milanBlog.className = '.blog-post purple'
  let milanHeader = document.createElement('h1')
  milanHeader.innerHTML = ('Racing in Milan')
  milanBlog.appendChild(milanHeader)
  let milanDetails = document.createElement('p')
  milanDetails.innerHTML = "Drove a Ferrari in Milan"
  milanHeader.appendChild(milanDetails)
  
}

  

