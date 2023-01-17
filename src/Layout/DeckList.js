import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index"

function DeckList(){
    const [decks, setDecks] = useState([]);
  
    //Retrieve and list existing decks that have been created
    useEffect(() => {
      async function loadData() {
        const loadDeck = await listDecks();
        setDecks(loadDeck);
    }
    loadData();
    }, []);

    //Option to delete deck, with warning message, on home page
    const handleDelete = async ({ target }) => {
      const value=target.value;
      const deleted = window.confirm(
        "Delete this deck? You will not be able to recover it."
      );
      if (deleted) {
        async function deleteData() {
          await deleteDeck(value);
          const result = await listDecks();
          setDecks(result);
        }
        deleteData();
      }
    };

      return (
        <div>
          {decks.map((deck) =>(
            <div className="card">
              <div className="container">
                <div className="row card-header">
                  <div className="col-10">
                  <h4>{deck.name}</h4>
                  </div>
                <div className="col-2">
                <p>{deck.cards.length} cards</p>
              </div>
            </div>
          </div>
          <div className="card-body">
            <p className="card-text">{deck.description}</p>
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-4">
                  <Link to={`decks/${deck.id}`} className="btn btn-secondary mr-2">View</Link>
                  <Link to={`decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                </div>
                <div className="col-1">
                  <button className="btn btn-danger" value={deck.id} onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        ))}
        </div>
      );
}

export default DeckList;