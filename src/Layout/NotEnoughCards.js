import React from "react";
import { Link } from "react-router-dom"

//"Study" component require at least two cards to function, if condition is not met then NotEnoughCards component will be rendered
const NotEnoughCards = ({ deck, cards}) => {
    if (cards.length === 2){
        return (
            <div>
                <h4>Not enough cards.</h4>
                <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mx-1">
                  Add Cards
                </Link>
            </div>
        )
    } else if (cards.length === 1){
        return (
            <div>
                <h4>Not enough cards.</h4>
                <p>You need at least 3 cards to study. There is {cards.length} card in this deck.</p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mx-1">
                  Add Cards
                </Link>
            </div>
        )
    } else {
        return (
            <div>
                <h4>Not enough cards.</h4>
                <p>You need at least 3 cards to study. There are no cards in this deck.</p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mx-1">
                  Add Cards
                </Link>
            </div>
        )
    }
    
}

export default NotEnoughCards;