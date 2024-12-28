let quoteText = document.querySelector(".quote");
let authorName = document.querySelector("#authorName");

let quoteSound = document.querySelector(".sound");
let quoteCopy = document.querySelector(".copy");
let quoteTwitter = document.querySelector(".twitter");

let quotesBtn = document.querySelector("#quotesBtn");

let alertMessage = document.querySelector('#alertMessage');
let isSpeaking = false;

quotesBtn.addEventListener("click", randomQuotes);

// Fetch and Display Data
async function randomQuotes() {
    try {
        if (isSpeaking) {
            speechSynthesis.cancel();
            isSpeaking = false;
        }

        // Fetch quotes from local JSON
        let response = await fetch('./quotes.json');
        let quotesData = await response.json();

        // Pick a random quote
        let randomIndex = Math.floor(Math.random() * quotesData.length);
        let randomQuote = quotesData[randomIndex];

        // Display the quote and author
        quoteText.innerHTML = randomQuote.content;
        authorName.innerHTML = randomQuote.author;

    } catch (error) {
        console.error("Error fetching quotes:", error);
        quoteText.innerHTML = "Unable to fetch quotes. Please try again later.";
        authorName.innerHTML = "";
    }
}

// Quotes Sounds
quoteSound.addEventListener("click", () => {
    if (isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
    }
    let readSound = new SpeechSynthesisUtterance(`${quoteText.innerHTML} by ${authorName.innerHTML}`);
    speechSynthesis.speak(readSound);
    isSpeaking = true;
});

// Quotes Copy
quoteCopy.addEventListener("click", () => {
    alertMessage.classList.remove('d-none');
    alertMessage.classList.remove('fade-out');
    alertMessage.classList.add('fade-in');
    navigator.clipboard.writeText(quoteText.innerHTML);
    setTimeout(() => {
        alertMessage.classList.remove('fade-in');
        alertMessage.classList.add('fade-out');
        setTimeout(() => {
            alertMessage.classList.add('d-none');
        }, 500);
    }, 500);
});

// Quotes Twitter
quoteTwitter.addEventListener("click", () => {
    let twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerHTML} -- ${authorName.innerHTML}`;
    window.open(twitterUrl, "_blank");
});
