const fiveLetterWords = [
  "apple",
  "grape",
  "melon",
  "peach",
  "lemon",
  "kiwi",
  "mango",
  "plum",
  "berry",
  "cherry",
  "bread",
  "brush",
  "chair",
  "chest",
  "chord",
  "click",
  "clock",
  "cloud",
  "dance",
  "diary",
  "drink",
  "earth",
  "flute",
  "fruit",
  "ghost",
  "green",
  "happy",
  "heart",
  "house",
  "juice",
  "light",
  "money",
  "music",
  "party",
  "pizza",
  "plant",
  "radio",
  "river",
  "salad",
  "sheep",
  "shoes",
  "smile",
  "snack",
  "snake",
  "spice",
  "spoon",
  "storm",
  "table",
  "toast",
  "tiger",
  "train",
  "water",
  "whale",
  "wheel",
  "woman",
  "world",
  "write",
  "youth"
];

const wordDefinitions = {
  apple: "A fruit with a red or green skin and crisp flesh.",
  grape: "A small, sweet fruit growing in bunches on a vine.",
  melon: "A large, juicy fruit with a thick rind and sweet flesh.",
  peach: "A round fruit with a soft, fuzzy skin and a large pit.",
  lemon: "A citrus fruit with a sour taste and a bright yellow rind.",
  kiwi: "A small fruit with a brown, fuzzy skin and green flesh.",
  mango: "A tropical fruit with a sweet, juicy orange-yellow flesh.",
  plum: "A small, sweet fruit with a smooth skin and a hard pit.",
  berry: "A small, juicy fruit, often used in desserts and jams.",
  cherry: "A small, round fruit with a bright red or black skin.",
  bread: "A staple food made from dough, usually baked in an oven.",
  brush: "A tool with bristles used for cleaning or painting.",
  chair: "A piece of furniture designed for sitting on.",
  chest: "A large box, often used for storing belongings.",
  chord: "A group of musical notes played together.",
  click: "To make a light, sharp sound by pressing a button or switch.",
  clock: "A device that tells time, often with hands and numbers.",
  cloud: "A visible mass of water droplets or ice crystals in the sky.",
  dance: "A sequence of movements performed to music.",
  diary: "A book in which one keeps a daily record of events and thoughts.",
  drink: "To consume liquids, usually through the mouth.",
  earth: "The third planet from the sun, known for its habitability.",
  flute: "A musical instrument played by blowing across a hole.",
  fruit: "The mature ovary of a flowering plant, often eaten for its sweetness.",
  ghost: "The spirit of a dead person, often associated with haunting.",
  green: "The color between blue and yellow, often associated with nature.",
  happy: "Feeling or showing joy and contentment.",
  heart: "An organ that pumps blood throughout the body.",
  house: "A building where people live, often a place of residence.",
  juice: "The liquid extracted from fruits or vegetables.",
  light: "The natural agent that stimulates sight and makes things visible.",
  money: "A medium of exchange used for transactions and trade.",
  music: "An art form that uses sound and rhythm to express emotions.",
  party: "A social gathering of people for celebration or entertainment.",
  pizza: "A round, flat Italian dish with a savory topping.",
  plant: "A living organism that grows in soil and typically has leaves and roots.",
  radio: "A device that receives and plays broadcasts of sound or music.",
  river: "A large natural flowing watercourse.",
  salad: "A dish made of mixed vegetables, often served cold.",
  sheep: "A domesticated ruminant animal, often raised for wool and meat.",
  shoes: "Footwear designed to protect and comfort the feet.",
  smile: "An expression of happiness or amusement shown on the face.",
  snack: "A small portion of food, often eaten between meals.",
  snake: "A long, legless reptile often recognized by its scaled skin.",
  spice: "An aromatic or pungent substance used to flavor food.",
  spoon: "A utensil with a small bowl and a handle, used for eating and serving.",
  storm: "A violent disturbance of the atmosphere, often with strong winds and rain.",
  table: "A piece of furniture with a flat top and legs, used for eating or working.",
  toast: "Bread that has been heated until its surface turns brown and crispy.",
  tiger: "A large, carnivorous cat with distinctive orange and black stripes.",
  train: "A series of connected railroad cars pulled by a locomotive.",
  water: "A transparent, odorless, tasteless liquid essential for life.",
  whale: "A large marine mammal with a streamlined body and blowhole.",
  wheel: "A circular object that rotates on an axle to facilitate movement.",
  woman: "An adult female human being.",
  world: "The earth, together with all of its countries and peoples.",
  write: "To mark symbols or letters on a surface to represent words or ideas.",
  youth: "The time of being young, especially the period before adulthood."
};


let secretWord = getRandomWord();
let attemptsRemaining = 10;
let currentHintIndex = 0;

const hints = [
  `The word starts with "${secretWord.charAt(0)}".`,
  `The third letter of the word is "${secretWord.charAt(2)}".`,
  `Hint: ${wordDefinitions[secretWord]}`
];

const hintElement = document.getElementById("hint");
const resultElement = document.getElementById("result");
const guessInput = document.getElementById("guessInput");

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
  return fiveLetterWords[randomIndex];
}

function checkGuess() {
  const userGuess = guessInput.value.toLowerCase().trim();

  if (userGuess === secretWord) {
    showCongratulations();
  } else {
    attemptsRemaining--;
    if (attemptsRemaining > 0) {
      resultElement.textContent = `Wrong guess! ${attemptsRemaining} attempts remaining.`;
      provideHint();
    } else {
      resultElement.textContent = `You have used all your attempts. The secret word was "${secretWord}". Game over.`;
      guessInput.disabled = true;
    }
  }
}

function provideHint() {
  hintElement.textContent = hints[currentHintIndex];
  currentHintIndex = (currentHintIndex + 1) % hints.length;
}

function showCongratulations() {
  const container = document.querySelector(".container");
  container.innerHTML = `
    <div class="congrats-container">
      <h1>Congratulations!</h1>
      <p id="congratsText">Congratulations</p>
    </div>
  `;

  const congratsText = document.getElementById("congratsText");

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  let counter = 0;
  setInterval(() => {
    const letters = congratsText.textContent.split("");
    const coloredLetters = letters.map(letter => `<span style="color: ${getRandomColor()}">${letter}</span>`);
    congratsText.innerHTML = coloredLetters.join("");
    counter++;
    if (counter >= 10) {
      clearInterval(this);
    }
  }, 1000);
}

// Call provideHint initially when the page loads to give the first hint.
provideHint();