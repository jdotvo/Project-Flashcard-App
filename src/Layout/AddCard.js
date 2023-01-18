import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

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
        <CardForm formData={formData} handleChange={handleChange}/>
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
