import React, { Component } from 'react'
import "./CardGame.css"
import axios from  "axios"
import Card from "./Card.js"
import "./CardGame.css"

export default class CardGame extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      deck: null,
      drawn: []
    }
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle");
    this.setState({deck: deck.data})
  }

  async getCard() {
    try {
      let cardRes = await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/`);
      if(!cardRes.data.success) {
        throw new Error("No card remaining!");
      }
      let card = cardRes.data.cards[0];
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} ${card.suit}`
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    let cards = this.state.drawn.map(card => 
      <Card key={card.id} image={card.image} alt={card.name}/>  
    )
    return (
      <div className="CardGame">
        <h1 className="CardGame-title">♦︎ CARD DEALER ♦︎</h1>
        <h4 className="CardGame-title subtitle">♦︎ A LITTLE DEMO MADE WITH REACT ♦︎</h4>
        <button className="CardGame-btn" onClick={this.getCard}>DEAL ME A CARD!</button>
        <div className="CardGame-cardarea">
          {cards}
        </div>
      </div>
    )
  }
}
