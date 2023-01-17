import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";

function AddCard(){
  const initialFormState = { 
    front: "", 
    back: "" ,
  };
  const [formData, setFormData] = useState(initialFormState);
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

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, formData);
    setFormData(initialFormState);
    history.push(`/decks/${deckId}`);
  };

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
          <li className="breadcrumb-item" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">
            <h4>Front</h4>
          </label>
          <textarea
            id="front"
            type="textarea"
            name="front"
            rows="4"
            value={formData.front}
            placeholder="Front side of card"
            required
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">
            <h4>Back</h4>
          </label>
          <textarea
            id="back"
            type="textarea"
            name="back"
            rows="4"
            value={formData.back}
            placeholder="Back side of card"
            required
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
        <div className="mb-3">
          <Link to={`/decks/${deckId}`}>
            <button className="btn btn-secondary mr-2">
                Done
            </button>
          </Link>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCard;