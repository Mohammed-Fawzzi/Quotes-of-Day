let quoteText = document.querySelector(".quote");
let authorName = document.querySelector("#authorName");

let quoteSound = document.querySelector(".sound");
let quoteCopy = document.querySelector(".copy");
let quoteTwitter = document.querySelector(".twitter");

let quotesBtn = document.querySelector("#quotesBtn");
let isSpeaking = false;
let alertMessage = document.querySelector('#alertMessage');

quotesBtn.addEventListener("click",randomQuotes)

// Fetch and Display Data
async function randomQuotes() {
    if (isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
    }
    let quotesUrl = await fetch(`https://api.quotable.io/random`);
    let quotesData = await quotesUrl.json();
    quoteText.innerHTML = quotesData.content;
    authorName.innerHTML = quotesData.author;
}

// Quotes Sounds 
quoteSound.addEventListener("click",()=> {
    if (isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
    }
    let readSound = new SpeechSynthesisUtterance(`${quoteText.innerHTML} by ${authorName.innerHTML}`);
    speechSynthesis.speak(readSound);
    isSpeaking = true;
})

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
