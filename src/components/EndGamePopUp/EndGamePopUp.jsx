import React, { Component } from "react";
import Button from "../Button/Button";
import PopUp from "../PopUp/PopUp";
import "./EndGamePopUp.css";

export default class EndGamePopUp extends Component {
    render() {
        return (
            <PopUp
                isShown={this.props.isShown}
                popupClass="end-game-popup-container"
            >
                <h1 className="winning-msg">{`${this.props.winner} Won!`}</h1>
                <Button
                    handleClick={this.props.handleReset}
                    buttonText="NEW GAME"
                    iconClass="fa-solid fa-rotate fa-2x"
                ></Button>
            </PopUp>
        );
    }
}
