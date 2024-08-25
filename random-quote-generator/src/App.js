import React, {useState, useEffect} from 'react';
import './App.css';
import COLORS_ARRAY from './colorsArray';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';

const quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";


function App() {
  const [quote, setQuote] = useState ("I didn’t fail the test. I just found 100 ways to do it wrong.")
  const [author, setAuthor] = useState ("Benjamin Franklin")
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setQuotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#6d366b9e')
  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setRandomNumber(randomInteger)
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }

  // const OURquotesArray = [{quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein"},
  //   {quote:"The most difficult thing is the decision to act, the rest is merely tenacity.", author: "Amelia Earhart"},
  //   {quote:"Nothing is impossible, the word itself says, “I’m possible!”", author:"Audrey Hepburn"},
  //   {quote: "Dreaming, after all, is a form of planning.",author:"Gloria Steinem"}
  // ]

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
      <div id="quote-box" style={{color: accentColor}}>
        {/* <h1>Random Number: {randomNumber}</h1> */}
        <i class="fa fa-quote-left"> </i><p id="text">
          "{quote}""
        </p>
        <p id="author">
          - {author}
        </p>
        <div className="button">
        <a id="tweet-quote" href={encodeURI('http://www.twitter.com/intent/tweet?text=${quote} -${author}')} style={{backgroundColor: accentColor}}><FontAwesomeIcon icon={faTwitter}/></a>
        <button id="new-quote" onClick={()=> getRandomQuote()} style={{backgroundColor: accentColor}}>New Quotes</button>
        </div>
      </div>
      </header>
    </div>
  );
}

export default App;
