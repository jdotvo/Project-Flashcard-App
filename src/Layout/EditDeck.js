import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck(){
    const initialFormState = {
      name: "",
      description: "",
    };
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState(initialFormState)
  
    useEffect(() => {
      async function getDeck() {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      }
      getDeck();
    }, [deckId]);

    const handleChange = ({ target }) => {
      setDeck({
        ...deck,
        [target.name]: target.value,
      });
    }
        
    const handleSubmit = async (event) => {
      event.preventDefault();
      const deckEdit = await updateDeck({...deck, id: deckId});
      history.push(`/decks/${deckEdit.id}`);
    }

    if(!deck){
        return <h1>Loading... </h1>
    }

    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
        <h1>Edit Deck</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Deck Name"
              onChange={handleChange}
              value={deck.name}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label>
              Description
            </label>
            <textarea
              id="description"
              type="textarea"
              name="description"
              rows="4"
              placeholder="Brief description of the deck"
              onChange={handleChange}
              value={deck.description}
              style={{ width: "100%" }}
            />
          </div>
          <div className="mb-3">
            <Link to={`/decks/${deckId}`}>
              <button className="btn btn-secondary mr-2">
                Cancel
              </button>
            </Link>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
        </form>
      </div>
    )
}

export default EditDeck;