import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../utils/api/index";


function EditCard(){
    const initialFormState = { 
        front: "", 
        back: "" ,
    };
    const [formData, setFormData] = useState(initialFormState);
    const [deck, setDeck] = useState();
    const [card, setCard] = useState();
    const { deckId, cardId } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function getDeck() {
          const loadedDeck = await readDeck(deckId);
          setDeck(loadedDeck);
        }
        getDeck();
    }, [deckId]);
    
    useEffect(() => {
        async function getCard() {
          const loadedCard = await readCard(cardId);
          setCard(loadedCard);
          setFormData({
            front: loadedCard.front,
            back: loadedCard.back
          })
        }
        getCard();
    }, [cardId]);
    

    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateCard({...card, ...formData});
        history.push(`/decks/${deck.id}`);
    }

    if(!deck){
        return <h1>Loading... </h1>
    }

    if(!card){
        return <h1>Loading... </h1>
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to ="/">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to ={`/decks/${deck.id}`}>
                            {deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                        Edit Card {card.id}
                    </li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
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
                            Cancel
                        </button>
                    </Link>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditCard;