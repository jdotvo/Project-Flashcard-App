import React, {useState, useEffect} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import NotEnoughCards from "./NotEnoughCards";

function Study() {
    const [deck, setDeck] = useState();
    const [cards, setCards] = useState();
    const [cardNumber, setCardNumber] = useState(0);
    const [cardFront, setCardFront] = useState(true);
    const { deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const loadData = async () => {
          const newDeck = await readDeck(deckId);
          setDeck(newDeck);
          setCards(newDeck.cards)
        };
        loadData();
    }, [deckId]);

    //Flip card to other side
    function flipCard(){
        setCardFront(!cardFront);
    }    

    if(!deck){
        return <h1>Loading... </h1>
    }

    if(!cards){
        return <h1>Loading... </h1>
    }

    /*
    Cards are shown front facing first
    Next button will allow next card to be shown
    On final card, user given option to return to home page or restart cards to study
    */
    function nextCard(){
        if (cardNumber + 1 < cards.length){
            setCardNumber(cardNumber + 1);
            setCardFront(true);
        } else {
            const result = window.confirm(`Restart cards?
            
            Click 'cancel' to return to the home page.`);
            if (result) {
                setCardNumber(0);
                setCardFront(true);
                } else {
                    history.push("/");
                }
        }
    }

    if (cards.length > 2){
        return (
            <div>
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item" key="0">
                                <Link to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item" key="1">
                                <Link to={`/decks/${deckId}`}>
                                    {deck.name}
                                </Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page" key="2">
                                Study
                            </li>
                        </ol>
                    </nav>
                </div>
                <h2>Study: {deck.name}</h2>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Card {cardNumber + 1} of {cards.length}</h5>
                        <p className="card-text">{(cardFront) ? `${cards[cardNumber].front}` : `${cards[cardNumber].back}`}</p>
                        <button className="btn btn-secondary mr-2" onClick={flipCard}>
                            Flip
                        </button>
                        {(cardFront) ? " " : <button className="btn btn-primary" onClick={nextCard}>
                            Next
                        </button>}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item" key="0">
                                <Link to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item" key="1">
                                <Link to={`/decks/${deckId}`}>
                                    {deck.name}
                                </Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page" key="2">
                                Study
                            </li>
                        </ol>
                    </nav>
                </div>
                <h2>Study: {deck.name}</h2>
                <div className="card">
                    <div className="card-body">
                        <NotEnoughCards deck={deck} cards={cards} />
                    </div>
                </div>
            </div>
        );
    }

    
}

export default Study;