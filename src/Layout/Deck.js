import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index"

function Deck(){
  const [deck, setDeck] = useState();
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    getDeck();
  }, [deckId]);

  if (!deck) {
    return <h1>Loading...</h1>;
  }

  //Option to delete deck with warning message, then send user to home page
  const handleDeleteDeck = (deckId) => {
    const deleted = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (deleted) {
      deleteDeck(deckId);
      history.push("/");
    }
  };

  //Option to delete a card, with warning message, from list of cards in specific deck
  const handleDeleteCard = (cardId) => {
    const deleted = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (deleted) {
      deleteCard(cardId);
      window.location.reload(false);
    }
  };

  const list = deck.cards && deck.cards.map((card) => {
    return (
      <div className="card w-50" key={card.id}>
        <div className="row">
          <div className="col" >
            <div className="float-left">
              <p className="card-body m-1">{card.front}</p>
            </div>
          </div>
          <div className="col">
            <p className="card-body m-1">{card.back}</p>
            <div className="buttons float-right">
              <Link to={`${deckId}/cards/${card.id}/edit`}>
                <button className="btn btn-secondary m-1" type="button">
                  Edit
                </button>
              </Link>
              <button className="btn btn-danger mx-1" type="button" onClick={() => handleDeleteCard(card.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
      </div>
        <div className="w-50">
          <div className="card-body">
            <h5 className="deck-view-name">{deck.name}</h5>
            <p className="deck-view-description">{deck.description}</p>
            <span className="d-flex">
              <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary" type="button">
                Edit
              </Link>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mx-2" type="button">
                Study
              </Link>
              <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary" type="button">
                Add Cards
              </Link>
              <button className="btn btn-danger ml-auto" type="button" onClick={() => handleDeleteDeck(deck.id)}>
                Delete
              </button>
            </span>
          </div>
        </div>
      </div>
      <div>
        <h3>Cards</h3>
        <div>{list}</div>
      </div>
    </div>
  );
}

export default Deck;