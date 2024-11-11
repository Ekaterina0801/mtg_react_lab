import React from "react";

export function CardCounter({ deck, card }) {
  const actualNumberInDeck = deck.getCard(card.name)?.count ?? 0;
  return (
    <div className="cardText">
      Карт в колоде: {actualNumberInDeck} / {card.limit}
    </div>
  );
}
