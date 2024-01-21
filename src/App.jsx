import React, { useState, useEffect } from 'react';
import './App.css';
import { FaRandom } from "react-icons/fa";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  useEffect(() => {
    fetch('https://api.quotable.io/quotes')
      .then(response => response.json())
      .then(data => setQuotes(data.results));
  }, []);

  const handleRandomClick = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setSelectedQuote(quotes[randomIndex]);
    setSelectedAuthor(null);
  };

  const handleAuthorClick = (author) => {
    setSelectedAuthor(author);
    setSelectedQuote(null);
  };

  return (
    <div class="appp">
      <button class="random-button" onClick={handleRandomClick}>
        Random <FaRandom />
      </button>
      {selectedQuote && (
        <div class="quote">
          <p class="quote-content">{selectedQuote.content}</p>
          <button
            class="author-button"
            onClick={() => handleAuthorClick(selectedQuote.author)}
          >
            {selectedQuote.author}
          </button>
          <p class="quote-tags">{selectedQuote.tags.join(",")}</p>
        </div>
      )}
      {selectedAuthor && (
        <div class="author-quotes">
          <h2>{selectedAuthor}</h2>
          {quotes
            .filter((quote) => quote.author === selectedAuthor)
            .map((quote) => (
              <div key={quote._id} class="quote">
                <p class="quote-content">{quote.content}</p>
                <p class="quote-tags">{quote.tags}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default App;