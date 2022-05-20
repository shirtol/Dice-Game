import React, { Component } from "react";
import GamePanel from "../GamePanel/GamePanel";
import Player from "../Player/Player";
import "./Game.css";

export default class Game extends Component {
    state = {
        totalScores: [0, 0],
        activePlayer: 0,
        currScore: 0,
        scoreToWin: 100,
        isEndGame: false,
        winningPlayer: null,
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

    onInputChange = (scoreEntered) => {
        this.setState((_) => ({ scoreToWin: scoreEntered }));
    };

    hasScoreToWin = () => this.state.totalScores.indexOf(this.state.scoreToWin);

    hasMoreThanScoreToWin = () =>
        this.state.totalScores.findIndex((num) => num > this.state.scoreToWin);

    componentDidUpdate = () => {
        const idxOfWinner = this.hasScoreToWin();
        const idxOfLoser = this.hasMoreThanScoreToWin();
        if (!this.state.isEndGame && idxOfWinner !== -1) {
            this.setState(
                (_) => ({
                    isEndGame: true,
                    winningPlayer: idxOfWinner,
                }),
                console.log(this.state.winningPlayer, this.state.isEndGame)
            );
        } else if (!this.state.isEndGame && idxOfLoser !== -1) {
            this.setState(
                (_) => ({
                    isEndGame: true,
                    winningPlayer: 1 - idxOfLoser,
                }),
                console.log(this.state.winningPlayer, this.state.isEndGame)
            );
        }
        console.log(this.state.winningPlayer, this.state.isEndGame);
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
                    onInputChange={this.onInputChange}
                    scoreToWin={this.state.scoreToWin}
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
