import React from "react";

export function CardContainer({ card, addCard, removeCard }) {
  return (
    <div className="cardContainer" id={`deck_cardContainer_${card.name}`}>
      <img className="cardImage" src={card.imageUrl} alt={card.name} />
      <div>{card.name}</div>
      <button onClick={() => addCard(card)}>Добавить</button>
      <button onClick={() => removeCard(card)}>Удалить</button>
    </div>
  );
}
