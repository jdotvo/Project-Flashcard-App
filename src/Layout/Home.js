import React from "react";
import DeckList from "./DeckList.js";
import { Link } from "react-router-dom";

function Home(){
    return (
        <div>
            <div>
                <Link to="/decks/new" className="btn btn-secondary">Create Deck</Link>
            </div>
            <br />
            <DeckList />
        </div>
    );
}
export default Home;