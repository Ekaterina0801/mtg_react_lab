import './App.css'
import React, { useEffect, useState } from "react";
import { CardSelector } from "./components/CardSelector";
import { CardContainer } from "./components/CardContainer";
import ManaCostStats from './components/ManaStats';
import { ColorStats } from "./components/ColorStats";
import { Deck } from "./model/Deck";
import { Card } from "./model/Card";
import { Mtg } from './api/mtg';

const SEARCH_DELAY = 1000;
const EMPTY_DECK_PLACEHOLDER_TEXT = "Ваша колода пустая";


function App() {

  const [deck, setDeck] = useState(new Deck());
  const [cardName, setCardName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [stats, setStats] = useState({ manaStats: [], colorStats: [] });
  const mtg = new Mtg();


  useEffect(() => {
    const timer = setTimeout(() => {
      searchCards(cardName);
    }, SEARCH_DELAY);
    return () => clearTimeout(timer);
  }, [cardName]);


  const searchCards = async (name) => {
    try {
      console.log(`Searching for cards with name: ${name}`);
      const results = await mtg.loadCards(name);
      console.log("Search results:", results);
      setSearchResults(results.map((result) => new Card(result)));
    } catch (error) {
      console.error("Error loading cards:", error);
    }
  };

  const addCardToDeck = (card) => {
    const newDeck = new Deck(deck);
    newDeck.addCard(card);
    setDeck(newDeck);
    updateStats(newDeck);
    console.log(card);
  };

  const removeCardFromDeck = (card) => {
    console.log(card.name);
    const newDeck = new Deck(deck);
    newDeck.removeCard(card.name);

    setDeck(newDeck);
    updateStats(newDeck);
  };

  const updateStats = (updatedDeck) => {
    setStats({
      manaStats: updatedDeck.manaCostStats(),
      colorStats: updatedDeck.colorStats(),
    });
  };

  return (
    <div className="app">
      <header>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@709&family=Geologica:wght@100..900&family=Ledger&family=Marmelad&family=Rubik:ital,wght@0,300..900;1,300..900&family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet"/>
        <h1>MTG Deck Builder</h1>
      </header>
      <main className="main">
        <div id="menu">
          <h2>Карты</h2>
          <input
            id="cardNameInput"
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Введите название карты"
          />
          <div id="listContainer">
            {searchResults.length === 0 ? (
              <p>Ничего не найдено</p>
            ) : (
              <ul>
                {searchResults.map((card) => (
                  <li key={card.id}>
                    <button onClick={() => setSelectedCard(card)} className="large-button">
                    {card.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="content">
          {selectedCard && (
            <CardSelector
              card={selectedCard}
              deck={deck}
              addCard={addCardToDeck}
              removeCard={removeCardFromDeck}
            />
          )}
          <hr />
          <div id="deckContainer">
            {deck.size === 0 ? (
              <h1 style={{ textAlign: "center" }}>{EMPTY_DECK_PLACEHOLDER_TEXT}</h1>
            ) : (
              [...deck.deck1.values()].map(({ card }) => (
                <CardSelector
                  key={card.id}
                  deck={deck}
                  card={card}
                  addCard={addCardToDeck}
                  removeCard={removeCardFromDeck}
                />
              ))
            )}
          </div>
        </div>

        <div id="stats">
          <h2>Статистика</h2>
          <ManaCostStats data={stats.manaStats} />
          <ColorStats data={stats.colorStats} />
        </div>
      </main>
    </div>
  );
}

export default App;
