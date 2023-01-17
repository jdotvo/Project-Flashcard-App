import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck(){
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = await createDeck(formData);
    history.push(`/decks/${newDeck.id}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              Home
            </Link></li>
          <li className="breadcrumb-item">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
          </label> 
          <br />
            <input
            id="name"
            type="text"
            name="name"
            placeholder="Deck Name"
            required
            onChange={handleChange}
            value={formData.name}
            style={{ width: "100%" }}
            />
            <br />
            <br />
          <label>
            Description
          </label>
          <br />
            <textarea
            id="description"
            type="textarea"
            name="description"
            rows="4"
            placeholder="Brief description of the deck"
            required
            onChange={handleChange}
            value={formData.description}
            style={{ width: "100%" }}
            />
          <br />
          <br />
        </div>
          <Link to="/" className="btn btn-secondary mr-2">
            Cancel
          </Link> 
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
    </div>
  )
};

export default CreateDeck;