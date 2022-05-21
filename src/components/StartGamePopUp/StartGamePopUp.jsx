import React, { Component } from "react";
import Button from "../Button/Button";
import LabeledInput from "../LabeledInput/LabeledInput";
import PopUp from "../PopUp/PopUp";

export default class StartGamePopUp extends Component {
    render() {
        return (
            <PopUp isShown={this.props.isShown}>
                <h2 className="new-game-title">{this.props.startGameMsg}</h2>
                <h3 className="pick-name-title">{this.props.pickNameMsg}</h3>
                <div className="name-input-container">
                    <LabeledInput
                        inputType="text"
                        value={this.props.playerOneName}
                        onInputChange={this.props.whenPlayer1EnteredName}
                        inputLabel="Player 1 name"
                    ></LabeledInput>
                    <LabeledInput
                        inputType="text"
                        value={this.props.playerTwoName}
                        onInputChange={this.props.whenPlayer2EnteredName}
                        inputLabel="Player 2 name"
                    ></LabeledInput>
                </div>
                <div className="score-to-win-container">
                    <h3 className="score-to-win-title">Enter Score To Win</h3>
                    <LabeledInput
                        inputType="number"
                        value={this.props.scoreToWin}
                        onInputChange={this.props.onInputChange}
                        inputLabel="SCORE TO WIN"
                    ></LabeledInput>
                </div>
                <Button
                    handleClick={this.props.startGame}
                    buttonText="START"
                    iconClass="fa-solid fa-play fa-2x"
                    disabled={this.props.disableStartGame}
                ></Button>
            </PopUp>
        );
    }
}
