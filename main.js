let gameName = "guess name";
document.title = gameName;
document.querySelector("h1").innerText = gameName;
document.querySelector("footer").innerText = `${gameName}-game created by mahdi`;

//setting game options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;


let wordToGuess = "";
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLocaleLowerCase();
console.log(wordToGuess)
let messageArea = document.querySelector(".message");

document.querySelector(".hint span").innerText = `(${numberOfHints})`;
const hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", getHint);



//generating inputs
function generateInput() {
    const inputContainer = document.querySelector(".inputs");


    for (let i = 1; i <= numberOfTries; i++) {
        const TryDiv = document.createElement("div");
        TryDiv.classList.add(`try-${i}`);
        TryDiv.innerHTML = `<span>try ${i}</span>`;


        if (i !== 1) TryDiv.classList.add("disabled");


        for (let j = 1; j <= numberOfLetters; j++) {
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("id", `guess-${i}-letter-${j}`);
            input.setAttribute("maxlength", "1");
            TryDiv.appendChild(input);
        }


        inputContainer.appendChild(TryDiv);
    }


    inputContainer.children[0].children[1].focus();

    const inputInDisabledDiv = document.querySelectorAll(".disabled input");

    inputInDisabledDiv.forEach((input) => { (input.disabled = true); });

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
            nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();

        });
        input.addEventListener("keydown", function (event) {
            const currentIndex = Array.from(inputs).indexOf(this);
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();

            }
            if (event.key === "ArrowLeft") {
                const previousInput = currentIndex - 1;
                if (previousInput >= 0) inputs[previousInput].focus();
            }
        });
    });
}
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuess);
function handleGuess() {
    let seccessGuess = true;
    console.log(wordToGuess);
    for (let i = 1; i <= numberOfLetters; i++) {
        const inputfield = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputfield.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1];
        if (letter === actualLetter) {
            inputfield.classList.add("yes-in-place");
        } else if (wordToGuess.includes(letter) && letter !== "") {
            inputfield.classList.add("not-in-place");
            seccessGuess = false;
        } else {
            inputfield.classList.add("no");
            seccessGuess = false;
        }
    }
    if (seccessGuess) {
        messageArea.innerHTML = `you win the word is <span>${wordToGuess}</span>`;
        if (numberOfHints === 2) {
            messageArea.innerHTML += `<p> congratz you didn't use any hint! </p>`;
        }
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => { tryDiv.classList.add("disabled"); });

        guessButton.disabled = true;
        hintButton.disabled = true;
    } else {
        document.querySelector(`.try-${currentTry}`).classList.add("disabled");
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) => { input.disabled = true; });
        currentTry++;
        const nextInputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextInputs.forEach((input) => { input.disabled = false; });

        let el = document.querySelector(`.try-${currentTry} `);
        if (el) {
            document.querySelector(`.try-${currentTry} `).classList.remove("disabled");
            el.children[1].focus();
        } else {
            messageArea.innerHTML = `you lose the word is <span>${wordToGuess}</span>`;
            guessButton.disabled = true;
            hintButton.disabled = true;
        }
    }
}

function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = `(${numberOfHints})`;
    }
    if (numberOfHints === 0) {
        hintButton.disabled = true;
    }

    const enabledInputs = document.querySelectorAll("input:not(:disabled)");

    const emptyEnabledInputs = Array.from(enabledInputs).filter(input => input.value === "");
    if (emptyEnabledInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);


        if (indexToFill !== -1) {
            randomInput.value = wordToGuess[indexToFill].toUpperCase();
        }
    }
}

function handeleBackSpace(event) {
    if (event.key === "Backspace") {
        const inputs = document.querySelectorAll("input:not(:disabled)");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);

        if (currentIndex > 0) {
            const currentInput = inputs[currentIndex];
            const previousInput = inputs[currentIndex - 1];
            currentInput.value = "";
            previousInput.value = "";
            previousInput.focus();
        }
    }
}

document.addEventListener("keydown", handeleBackSpace);
window.onload = function () {
    generateInput();
}

