let wordsArea = document.querySelector(".words-area");
let buttons = document.querySelectorAll(".keyboard button");
let hintArea = document.querySelector("#hint");
let guesess = document.querySelector("#guesess");
let resetBtn = document.querySelector("#reset-btn");
let image = document.querySelector(".image-portion img");
let message = document.querySelector("#message");

const totalGuesess = 6;
let remGuesses = totalGuesess;
let count = 0;

const resetGame = () =>  {
    image.src = "hangman-0.svg";
    remGuesses = totalGuesess;
    guesess.innerText = `${remGuesses} / 6`;
    count = 0;
    hintArea.innerText = "";
    wordsArea.innerText = "";
    buttons.forEach((button) => {
        button.disabled = false;
    });
    getWordList();
    message.style.display = "none";

}

guesess.innerText = `${remGuesses} / 6`;


const getWordList = () => {
    const { word, hint } = WordList[Math.floor(Math.random() * WordList.length)];
    currentWord = word;
    console.log(currentWord);
    hintArea.innerText = `Hint: ${hint}`;

    let characters = currentWord.split('');

    characters.forEach((char) => {
        let letters = document.createElement("p");
        letters.innerText = char;
        wordsArea.appendChild(letters);
    })
}
const playGame = (buttonClicked) => {
    let alpha = document.querySelectorAll(".words-area p");
    let found = false;
    

    alpha.forEach((alphabets) => {
        if(alphabets.innerText === buttonClicked){
            alphabets.style.color = "black";
            count++;
            found = true;
        }
    })

    if(!found){
        remGuesses--;
        guesess.innerText = `${remGuesses} / 6`;
        image.src = `hangman-${totalGuesess - remGuesses}.svg`;
    }

    if(remGuesses < 1){
        message.style.display = "flex";
        buttons.forEach((button) => {
            button.disabled = true;
        })
    }
    if(count === alpha.length){
        message.innerText = 'Congratulations, You Won!';
        message.style.color = "green";
        message.style.display = "flex";
        buttons.forEach((button) => {
            button.disabled = true;
        })
    }

}

resetBtn.addEventListener("click", () => {
    resetGame();
})


getWordList();


buttons.forEach((button) => {

    button.addEventListener("click", () => {
        let buttonClicked = button.getAttribute("id");
        playGame(buttonClicked);
    })
})
