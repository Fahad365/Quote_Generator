let apiQuotes = [];
const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const twitterBtn = document.querySelector(".twitter-button");
const newQuote = document.querySelector(".new-quote");
const loader = document.querySelector(".loader");

// New Quotes Function
function newQuotes() {
  showLoadingSpinner();
  const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quotes.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quotes.author;
  }
  // If quotes is too long
  if (quotes.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //   set Quote hide loader
  quoteText.textContent = quotes.text;
  removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuotes();
  } catch (error) {
    // Catch error here
  }
}

// Tweet Quotes
function tweeteQuotes() {
  const tweeterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(tweeterUrl, "_blank");
}
newQuote.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweeteQuotes);

// Loading spinner Function
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hiding loading spinner function
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
getQuotes();
