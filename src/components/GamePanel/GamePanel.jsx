import React, { Component } from "react";
import Button from "../Button/Button";
import Dice from "../Dice/Dice";
import { roll } from "../Game/GameLogic";

export default class GamePanel extends Component {
    state = { currDice: [0, 0] };

    changeCurrVal = () => {
        this.setState(
            (prevState) => {
                prevState.currDice[0] = roll(this.props.range);
                prevState.currDice[1] = roll(this.props.range);
                return { currDice: prevState.currDice };
            },
            () => this.props.onRollDice(this.sumOfDice())
        );
    };

    refreshGame = () => {};

    sumOfDice = () => this.state.currDice.reduce((acc, curr) => acc + curr);

    rollDice = () => {
        console.log(this.state.currDice);
        this.changeCurrVal();
    };

    endTurn = () => {
        this.props.onEndTurn();
    };

    changeScoreToWin = (e) => {
        this.props.onInputChange(e.target.value);
        console.log(e.target.value);
    };

    render() {
        return (
            <div className="game-panel">
                <Button
                    handleClick={this.refreshGame}
                    buttonText="NEW GAME"
                    iconClass="fa-solid fa-rotate fa-2x"
                ></Button>
                <div className="dice-container">
                    <Dice diceVal={this.state.currDice[0]}></Dice>
                    <Dice diceVal={this.state.currDice[1]}></Dice>
                </div>
                <div className="game-options">
                    <Button
                        handleClick={this.rollDice}
                        buttonText="ROLL DICE"
                        iconClass="fa-solid fa-dice fa-2x"
                    ></Button>
                    <Button
                        handleClick={this.endTurn}
                        buttonText="END TURN"
                        iconClass="fa-solid fa-check fa-2x"
                    ></Button>
                    <div className="input-container">
                        <input
                            type="text"
                            value={this.props.scoreToWin}
                            onChange={this.changeScoreToWin}
                        ></input>
                        <label className={this.props.scoreToWin && "filled"}>
                            SCORE TO WIN
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}
