import React, { Component } from 'react'
import "./Card.css"

export default class Card extends Component {
  constructor(props) {
    super(props)
    let angle = Math.random() * 90 - 45;
    let x = Math.random() * 40 - 20;
    let y = Math.random() * 40 - 20;
    this._transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
  }
  
  
  render() {
    const {image, alt} = this.props;
    return (
        <img className="Card" style={{transform: this._transform}} src={image} alt={alt}/>
    )
  }
}
