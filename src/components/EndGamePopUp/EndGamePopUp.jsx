import React, { Component } from "react";
import Button from "../Button/Button";
import PopUp from "../PopUp/PopUp";
import "./EndGamePopUp.css";

export default class EndGamePopUp extends Component {
    render() {
        return (
            this.props.isShown && (
                <PopUp>
                    <h1 className="winning-msg">
                        {`Player ${this.props.winner + 1} Won!`}{" "}
                    </h1>
                    <Button
                        handleClick={this.props.handleReset}
                        buttonText="NEW GAME"
                        iconClass="fa-solid fa-rotate fa-2x"
                    ></Button>
                </PopUp>
            )
        );
    }
}
