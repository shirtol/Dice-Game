import React, { Component } from "react";
import Button from "../Button/Button";
import Dice from "../Dice/Dice";
import { getRandomNumInRange } from "../Game/GameLogic";
import "./GamePanel.css";

export default class GamePanel extends Component {
    state = { currDice: [1, 1] };

    changeCurrVal = () => {
        this.setState(
            (prevState) => {
                prevState.currDice[0] = getRandomNumInRange(this.props.range);
                prevState.currDice[1] = getRandomNumInRange(this.props.range);
                return { currDice: prevState.currDice };
            },
            () => this.props.onRollDice(this.sumOfDice())
        );
    };

    refreshGame = () => {
        this.setState({ currDice: [1, 1] });
        this.props.onResetGame();
    };

    sumOfDice = () => this.state.currDice.reduce((acc, curr) => acc + curr);

    rollDice = () => {
        this.changeCurrVal();
    };

    endTurn = () => {
        this.props.onEndTurn();
    };

    render() {
        return (
            <div className="game-panel">
                <Button
                    handleClick={this.refreshGame}
                    buttonText="NEW GAME"
                    iconClass="fa-solid fa-rotate fa-2x"
                ></Button>
                <h2 className="score-to-win-title">
                    <span>Score To Win:</span>
                    <br></br>
                    <span>{this.props.scoreToWinTitle}</span>
                </h2>
                <div className="dice-container">
                    <Dice diceVal={this.state.currDice[0]}></Dice>
                    <Dice diceVal={this.state.currDice[1]}></Dice>
                </div>
                <div className="game-options">
                    <Button
                        handleClick={this.rollDice}
                        buttonText="ROLL DICE"
                        iconClass="fa-solid fa-dice fa-2x"
                        disabled={
                            this.props.isGameEnded || this.props.disableButtons
                        }
                    ></Button>
                    <Button
                        handleClick={this.endTurn}
                        buttonText="END TURN"
                        iconClass="fa-solid fa-check fa-2x"
                        disabled={
                            this.props.isGameEnded || !this.props.hasRollDice
                        }
                    ></Button>
                </div>
            </div>
        );
    }
}
