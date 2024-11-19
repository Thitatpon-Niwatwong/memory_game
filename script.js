const cards = document.querySelectorAll(".card"),
  flipsTag = document.querySelector(".flips b"),
  refreshBtn = document.querySelector(".details button");

let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo;
const popup = document.querySelector(".popup");
const popupMessage = document.querySelector(".popup-message");
const popupBtn = document.querySelector(".popup-btn");
const switchSetBtn = document.getElementById("switch-set-btn");
const titleElement = document.querySelector(".title"); 
let isSetOne = true;

function flipCard({ target: clickedCard }) {
  if (!isPlaying) {
    isPlaying = true;
  }
  if (clickedCard !== cardOne && !disableDeck) {
    flips++;
    flipsTag.innerText = flips;
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);

    if (matchedCard === 6) {
      setTimeout(() => {
        showPopup("You Win!");
      }, 500);
    }
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
    return;
  }

  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function shuffleCard() {
  flips = matchedCard = 0;
  cardOne = cardTwo = "";
  flipsTag.innerText = flips;
  disableDeck = isPlaying = false;

  let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    setTimeout(() => {
      imgTag.src = `Pictures/img-${arr[index]}.png`;
    }, 500);
    card.addEventListener("click", flipCard);
  });
}

function showPopup(message) {
  popupMessage.innerText = message;
  popup.style.display = "flex"; 
  disableDeck = true; 
}

function switchCardSet() {
  isSetOne = !isSetOne;
  const currentSet = isSetOne ? 1 : 2; 
  
  titleElement.innerText = isSetOne ? "เสียง กอไก่" : "เสียง งองู";

  const queIconSrc = isSetOne
    ? "Pictures/set-1/que_icon.png" 
    : "Pictures/set-2/que_icon.png"; 

  const queIcons = document.querySelectorAll(".front-view img");
  queIcons.forEach((icon) => {
    icon.src = queIconSrc;
  });

  let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    setTimeout(() => {
      imgTag.src = `Pictures/set-${currentSet}/img-${arr[index]}.png`; 
    }, 500);
    card.addEventListener("click", flipCard);
  });

  flips = matchedCard = 0;
  flipsTag.innerText = flips;
  disableDeck = isPlaying = false;
}

popupBtn.addEventListener("click", () => {
  popup.style.display = "none";
  shuffleCard(); 
});

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

switchSetBtn.addEventListener("click", switchCardSet);
