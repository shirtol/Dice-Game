import React, { Component } from "react";
import "./Dice.css";

export default class Dice extends Component {
    render() {
        return (
            <div className="dice-img-container">
                <img
                    alt=""
                    src={require(`../../assets/dice/dice-${this.props.diceVal}.png`)}
                />
            </div>
        );
    }
}
