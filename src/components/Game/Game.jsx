import React, { Component } from "react";
import GamePanel from "../GamePanel/GamePanel";
import Player from "../Player/Player";
import "./Game.css";

export default class Game extends Component {
    state = {
        totalScores: [0, 0],
        currTurnScore: 0,
        activePlayer: 0,
        currScore: 0,
    };

    onRollDice = (sumOfDice) => {
        this.setState((prevState) => ({
            currScore: prevState.currScore + sumOfDice,
        }));
    };

    render() {
        return (
            <div className="game-container">
                <Player
                    name="player 1"
                    totalScore="0"
                    currScore={this.state.currScore}
                ></Player>
                <GamePanel
                    range={[1, 6]}
                    onRollDice={this.onRollDice}
                ></GamePanel>
                <Player name="player 2" totalScore="0" currScore="0"></Player>
            </div>
        );
    }
}
