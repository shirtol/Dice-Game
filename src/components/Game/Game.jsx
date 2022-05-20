import React, { Component } from "react";
import GamePanel from "../GamePanel/GamePanel";
import Player from "../Player/Player";
import "./Game.css";

export default class Game extends Component {
    state = {
        totalScores: [0, 0],
        activePlayer: 0,
        currScore: 0,
    };

    onRollDice = (sumOfDice) => {
        this.setState((prevState) => ({
            currScore: prevState.currScore + sumOfDice,
        }));
    };

    onEndTurn = () => {
        const newScoresArr = [...this.state.totalScores];
        newScoresArr[this.state.activePlayer] += this.state.currScore;
        this.setState((prevState) => ({
            totalScores: newScoresArr,
            currScore: 0,
            activePlayer:
                (prevState.activePlayer + 1) % prevState.totalScores.length,
        }));
    };

    render() {
        return (
            <div className="game-container">
                <Player
                    name="player 1"
                    totalScore={this.state.totalScores[0]}
                    currScore={
                        this.state.activePlayer === 0 ? this.state.currScore : 0
                    }
                ></Player>
                <GamePanel
                    range={[1, 6]}
                    onRollDice={this.onRollDice}
                    onEndTurn={this.onEndTurn}
                ></GamePanel>
                <Player
                    name="player 2"
                    totalScore={this.state.totalScores[1]}
                    currScore={
                        this.state.activePlayer === 1 ? this.state.currScore : 0
                    }
                ></Player>
            </div>
        );
    }
}
