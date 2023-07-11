const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

//link text
playerLivesCount.textContent = playerLives;

//Generate Memory game data - create object

const getData = () => [
  { imgSrc: "./images/current-tech-stack.png", name: "current tech stack" },
  { imgSrc: "./images/Future-Tech-Stack.png", name: "future tech stack" },
  { imgSrc: "./images/Jetlag-Mug.jpg", name: "jetlag mug" },
  { imgSrc: "./images/Kaffeekirsche.jpg", name: "kaffeekirsche" },
  { imgSrc: "./images/Mate-petrol.jpg", name: "mate" },
  { imgSrc: "./images/waffle.jpg", name: "waffle" },
  { imgSrc: "./images/current-tech-stack.png", name: "current tech stack" },
  { imgSrc: "./images/Future-Tech-Stack.png", name: "future tech stack" },
  { imgSrc: "./images/Jetlag-Mug.jpg", name: "jetlag mug" },
  { imgSrc: "./images/Kaffeekirsche.jpg", name: "kaffeekirsche" },
  { imgSrc: "./images/Mate-petrol.jpg", name: "mate" },
  { imgSrc: "./images/waffle.jpg", name: "waffle" },
];

//randomize cards

const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//Card Generator Function

const cardGenerator = () => {
  const cardData = randomize();
  //Generate the HTML
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attach the info to the cards(image to the card, so it can be seen)
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    //Attach cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (event) => {
      card.classList.toggle("toggleCard");
      checkCards(event);
    });
  });
};
//check cards
const checkCards = (event) => {
  const clickedCard = event.target;
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  clickedCard.classList.add("flipped");
  //logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("😵‍💫 📢try again");
      }
    }
  }
  //run a check to see if we won the game
  if (toggleCard.length === 12) {
    restart("🙌🐧 everything matched");
  }
};

//Restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    //Randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 6;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 100);
};

cardGenerator();
