import React, { Component } from "react";
import EndGamePopUp from "../EndGamePopUp/EndGamePopUp";
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
        hasRollDice: false,
        numOfDice: 2,
    };

    gotDoubleSix = (sumOfDice) => sumOfDice === this.state.numOfDice * 6;

    updatePlayerScore = (sumOfDice) => {
        this.setState((prevState) => ({
            currScore: prevState.currScore + sumOfDice,
            hasRollDice: true,
        }));
    };

    resetPlayerScore = () => {
        const newScoresArr = [...this.state.totalScores];
        newScoresArr[this.state.activePlayer] = 0;
        this.setState(
            (_) => ({
                currScore: 0,
                totalScore: newScoresArr,
            }),
            this.onEndTurn
        );
    };

    onRollDice = (sumOfDice) => {
        if (!this.gotDoubleSix(sumOfDice)) {
            this.updatePlayerScore(sumOfDice);
        } else {
            this.resetPlayerScore();
        }
    };

    onEndTurn = () => {
        const newScoresArr = [...this.state.totalScores];
        newScoresArr[this.state.activePlayer] += this.state.currScore;
        this.setState((prevState) => ({
            totalScores: newScoresArr,
            currScore: 0,
            activePlayer:
                (prevState.activePlayer + 1) % prevState.totalScores.length,
            hasRollDice: false,
        }));
    };

    onInputChange = (scoreEntered) => {
        this.setState((_) => ({ scoreToWin: scoreEntered }));
    };

    onResetGame = () =>
        this.setState(
            {
                totalScores: [0, 0],
                activePlayer: 0,
                currScore: 0,
                scoreToWin: 100,
                isEndGame: false,
                winningPlayer: null,
                hasRollDice: false,
            },
            console.log(this.state.isEndGame)
        );

    hasScoreToWin = () => this.state.totalScores.indexOf(this.state.scoreToWin);

    hasMoreThanScoreToWin = () =>
        this.state.totalScores[this.state.activePlayer] + this.state.currScore >
        this.state.scoreToWin
            ? this.state.activePlayer
            : -1;

    foundWinner = (idxOfWinner) => !this.state.isEndGame && idxOfWinner !== -1;

    updateStateAfterWin = (idxOfWinner) => {
        this.setState((_) => ({
            isEndGame: true,
            winningPlayer: idxOfWinner,
        }));
    };

    foundLoser = (idxOfLoser) => !this.state.isEndGame && idxOfLoser !== -1;

    updateStateAfterLoss = (idxOfLoser) => {
        this.setState((_) => ({
            isEndGame: true,
            winningPlayer: 1 - idxOfLoser,
        }));
    };

    componentDidUpdate = () => {
        const idxOfWinner = this.hasScoreToWin();
        const idxOfLoser = this.hasMoreThanScoreToWin();
        if (this.foundWinner(idxOfWinner)) {
            this.updateStateAfterWin(idxOfWinner);
        } else if (this.foundLoser(idxOfLoser)) {
            this.updateStateAfterLoss(idxOfLoser);
        }
    };

    render() {
        return (
            <>
                <EndGamePopUp
                    isShown={this.state.isEndGame}
                    handleReset={this.onResetGame}
                    winner={this.state.winningPlayer}
                ></EndGamePopUp>
                <div className="bg-container"></div>
                <div className="game-container">
                    <Player
                        name="player 1"
                        totalScore={this.state.totalScores[0]}
                        currScore={
                            this.state.activePlayer === 0
                                ? this.state.currScore
                                : 0
                        }
                    ></Player>
                    <GamePanel
                        range={[1, 6]}
                        onRollDice={this.onRollDice}
                        onEndTurn={this.onEndTurn}
                        onResetGame={this.onResetGame}
                        onInputChange={this.onInputChange}
                        scoreToWin={this.state.scoreToWin}
                        isGameEnded={this.state.isEndGame}
                        hasRollDice={this.state.hasRollDice}
                    ></GamePanel>
                    <Player
                        name="player 2"
                        totalScore={this.state.totalScores[1]}
                        currScore={
                            this.state.activePlayer === 1
                                ? this.state.currScore
                                : 0
                        }
                    ></Player>
                </div>
            </>
        );
    }
}
