const cards = document.querySelectorAll(".card"),
  timeTag = document.querySelector(".time b"),
  flipsTag = document.querySelector(".flips b"),
  refreshBtn = document.querySelector(".details button");

let maxTime = 30;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;
const popup = document.querySelector(".popup");
const popupMessage = document.querySelector(".popup-message");
const popupBtn = document.querySelector(".popup-btn");

function initTimer() {
  if (timeLeft <= 0) {
    clearInterval(timer);
    if (matchedCard === 6) {
      showPopup("You Win!");
    } else {
      cards.forEach((card) => card.removeEventListener("click", flipCard));
      setTimeout(() => {
        showPopup("You Lose!");
      }, 500);
    }
    return;
  }
  timeLeft--;
  timeTag.innerText = timeLeft;
}

function flipCard({ target: clickedCard }) {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initTimer, 1000);
  }
  if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
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
      clearInterval(timer);
      setTimeout(() => {
        showPopup("You Win!");
      }, 500);
    }
  }
  if (timeLeft <= 0 && matchedCard !== 6) {
    clearInterval(timer);
    setTimeout(() => {
      showPopup("You Lose!");
    }, 500);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == 6 && timeLeft > 0) {
      return clearInterval(timer);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
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
  timeLeft = maxTime;
  flips = matchedCard = 0;
  cardOne = cardTwo = "";
  clearInterval(timer);
  timeTag.innerText = timeLeft;
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
  popupMessage.innerText = message; // ตั้งข้อความใน popup
  popup.style.display = "flex"; // แสดง popup
  disableDeck = true; // ปิดการคลิกการ์ดเมื่อเกมจบ
}

popupBtn.addEventListener("click", () => {
  popup.style.display = "none";
  shuffleCard(); // เริ่มเกมใหม่
});

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
