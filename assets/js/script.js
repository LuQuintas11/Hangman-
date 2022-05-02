
/*returns the elements within the document that matches the below classes*/
let modalOver = document.querySelector(".modal-over");
let modalClose = document.querySelector(".modal-close");

let modalIn = document.querySelector(".modal-Initiator");
let square = document.querySelector(".square");

let winModal = document.querySelector(".winner");
let img = document.querySelector(".img");
/*cateogories of words*/
let wordCinema = ["STAR WARS", "BATMAN", "THE KING LION", "JUMANJI", "SPIDERMAN", "VENOM", "FROZEN", "HARRY POTTER"];
let wordAnimal = ["CAT", "RABBIT", "LION", "ZEBRA", "HORSE", "TIGER", "BEAR", "FROG", "FROG", "MONKEY", "SNAKE"];
let word = ["FOOTBALL", "BOXING", "CYCLING", "SWIMMING", "TENNIS", "CLIMBING", "BASKETBALL", "ATHLETICS", "BADMINTON"];


let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ];


// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
   console.log("DOM is loaded");
   initGame();

});


/**
 * Shows initial modal to allow player choose the category
 * Create a random word from the different words categories
 * Get the button elements and add event listeners to them
 */
 function initGame() {
   createAlphabet();
   modalIn.classList.add("modalInt");
   square.classList.add("squareInactive");

   let buttons = document.getElementsByClassName("buttonCategory");
   for (let button of buttons) {
      button.addEventListener("click", function () {
         if (this.getAttribute("data-type") === "animals") {

            addClass = "imgAnimal";

            randomCategoryWord = wordAnimal[Math.floor(Math.random() * wordAnimal.length)];

         } else if (this.getAttribute("data-type") === "sports") {

            randomCategoryWord = word[Math.floor(Math.random() * word.length)];

            addClass = "imgSport";


         } else if (this.getAttribute("data-type") === "cinema") {

            addClass = "imgCinema";

            randomCategoryWord = wordCinema[Math.floor(Math.random() * wordCinema.length)];

            console.log(randomCategoryWord);
         }


         img.classList.add(addClass);
         wordGuessed(randomCategoryWord);
         square.classList.remove("squareInactive");
         modalIn.classList.remove("modalInt");
      });

   }

}


/**
 * The function create the alphabet buttons
 */

function createAlphabet() {
    for (let i = 0; i < alphabet.length; i++) {
       let createButton = document.createElement("button");
       let div = document.getElementById("button");
       div.appendChild(createButton)
       createButton.className = "alphabet";
       createButton.innerHTML = alphabet[i];   
 
       createButton.addEventListener("click", onAlphabetClicked);
 
    }
 }

/**
 *Function creates letter spaces and check if the letter guessed by the player is include in the random word
 */

 function wordGuessed(randomCategoryWord) {

   for (let i = 0; i < randomCategoryWord.length; i++) {
      let board = document.createElement('span');
      board.className = "span";
      document.getElementById('main-div').appendChild(board);
      if (randomCategoryWord.includes(' ')) {
         if (randomCategoryWord[i] == " ") {
            board.textContent = "-";
         } else {
            board.textContent = "_";
         }


      } else {
         board.textContent = "_";
      }

   }

   for (let i = 0; i < alphabet.length; i++) {
      let alpha = document.getElementsByClassName("alphabet")[i];
      alpha.addEventListener("click", function e(event) {
         let letter = event.target;
         let alphabetValue = alphabet[i];
         if (randomCategoryWord.includes(alphabetValue)) {
            for (let i = 0; i < randomCategoryWord.length; i++) {
               if (randomCategoryWord[i] === alphabetValue) {
                  document.getElementById("main-div").childNodes[i].textContent = alphabetValue;
                  pushAlphabet.push("alphabetValue");
                  letterGuessed(randomCategoryWord, pushAlphabet);
                  letter.removeEventListener("click", e);
               }
            }
         } else {
            letter.removeEventListener("click", e);
            decreaseLifes();
         }

      });
   }
}

/**
 * Function that compares the length of the word guessed by the player with the random one to know once the word is complete
 */


 function letterGuessed(randomCategoryWord, pushAlphabet) {
   console.log(randomCategoryWord.split(' ').join(''));
   console.log(pushAlphabet);
   if (randomCategoryWord.length === pushAlphabet.length) {
      winModal.classList.add("win-active");

   }
}
 

/**
 * This function print the modal that say to the player once it loose
 */
function gameOver() {
    modalBg.classList.add("bg-active");
 
    modalClose.addEventListener("click", function () {
       modalBg.classList.remove("bg-active")
       window.location.reload();
    })
 
 }

