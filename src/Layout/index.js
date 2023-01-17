import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./CreateDeck"
import Deck from "./Deck"
import EditDeck from "./EditDeck";
import AddCard from "./AddCard"
import EditCard from "./EditCard";
import Study from "./Study";
import { Route, Switch } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Header />
        <div className="container">
          {/* TODO: Implement the screen starting here */}
          <Switch>
            <Route exact={true} path="/">
              <Home />
            </Route>
            <Route path ="/decks/:deckId/study">
              <Study />
            </Route>
            <Route path= "/decks/new">
              <CreateDeck />
            </Route>
            <Route exact path="/decks/:deckId">
              <Deck />
            </Route>
            <Route exact path="/decks/:deckId/edit">
              <EditDeck />
            </Route>
            <Route path="/decks/:deckId/cards/new">
              <AddCard />
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
    </div>
  );
}

export default Layout;
