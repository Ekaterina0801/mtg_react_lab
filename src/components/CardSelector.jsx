import React from "react";
import { CardCounter } from "./CardCounter";

export function CardSelector({ card, deck, addCard, removeCard }) {
    // Check if the card is in the deck
    const isCardInDeck = deck.hasCard(card.name);
  
    return (
      <div id="card">
        {/* Conditionally render the image */}
        {!isCardInDeck && (
          <img className="center cardImage" src={card.imageUrl} alt={card.name} />
        )}
  
        <div className="center">
          {card.rules.map((rule, index) => (
            <div key={index} className="cardText">
              {rule}
            </div>
          ))}
        </div>
  
        <CardCounter deck={deck} card={card} />
  
        <button onClick={() => addCard(card)} disabled={!deck.canAddCard(card.name)}>
          Добавить в колоду
        </button>
        <button onClick={() => removeCard(card)} disabled={!isCardInDeck}>
          Убрать карту
        </button>
      </div>
    );
  }
  
