import React, { Component } from "react";
import { MediaPlayer } from "../../Music/Sounds";
import EndGamePopUp from "../EndGamePopUp/EndGamePopUp";
import GamePanel from "../GamePanel/GamePanel";
import Player from "../Player/Player";
import StartGamePopUp from "../StartGamePopUp/StartGamePopUp";
import { getRandomNumInRange } from "../Game/GameLogic";
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
        isStartGame: true,
        playerOneName: "",
        playerTwoName: "",
        musicPlaying: false,
    };

    mediaPlayer = new MediaPlayer(() =>
        this.setState((_) => ({ musicPlaying: false }))
    );

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

            this.mediaPlayer.playSound("roll");
        } else {
            const randomNumFromFailSounds = getRandomNumInRange([1, 2]);
            this.setState(
                (_) => ({ musicPlaying: true }),
                () =>
                    this.mediaPlayer.playSound(`fail${randomNumFromFailSounds}`)
            );

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
        const limit = 4;
        this.setState((_) => ({
            scoreToWin: parseInt(scoreEntered.slice(0, limit)),
        }));
    };

    onResetGame = () =>
        this.setState({
            totalScores: [0, 0],
            activePlayer: 0,
            currScore: 0,
            isEndGame: false,
            winningPlayer: null,
            hasRollDice: false,
            numOfDice: 2,
            isStartGame: true,
            musicPlaying: false,
        });

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
        console.log(typeof this.state.scoreToWin);
        const idxOfWinner = this.hasScoreToWin();
        console.log(idxOfWinner);
        const idxOfLoser = this.hasMoreThanScoreToWin();
        if (this.foundWinner(idxOfWinner)) {
            this.updateStateAfterWin(idxOfWinner);
        } else if (this.foundLoser(idxOfLoser)) {
            this.updateStateAfterLoss(idxOfLoser);
        }
    };

    onPlayer1NameEntered = (nameEntered) =>
        this.setState(
            (_) => ({ playerOneName: nameEntered }),
            () => console.log(this.state.playerOneName)
        );

    onPlayer2NameEntered = (nameEntered) =>
        this.setState(
            (_) => ({ playerTwoName: nameEntered }),
            () => console.log(this.state.playerTwoName)
        );

    startGame = () => {
        this.setState((_) => ({ isStartGame: false }));
    };

    // disableStartGame = () =>
    //     this.state.playerOneName.length === 0 ||
    //     this.state.playerTwoName.length === 0 ||
    //     isNaN(this.state.scoreToWin);

    render() {
        return (
            <>
                <StartGamePopUp
                    isShown={this.state.isStartGame}
                    startGameMsg="WELCOME"
                    pickNameMsg="Enter Your Nicknames"
                    playerOneName={this.state.playerOneName}
                    playerTwoName={this.state.playerTwoName}
                    whenPlayer1EnteredName={this.onPlayer1NameEntered}
                    whenPlayer2EnteredName={this.onPlayer2NameEntered}
                    scoreToWinChange={this.onInputChange}
                    scoreToWin={this.state.scoreToWin}
                    startGame={this.startGame}
                ></StartGamePopUp>
                <EndGamePopUp
                    isShown={this.state.isEndGame}
                    handleReset={this.onResetGame}
                    winner={this.state.winningPlayer}
                ></EndGamePopUp>
                <div className="bg-container"></div>
                <div className="game-container">
                    <Player
                        name={this.state.playerOneName}
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
                        isGameEnded={this.state.isEndGame}
                        hasRollDice={this.state.hasRollDice}
                        scoreToWinTitle={this.state.scoreToWin}
                        disableButtons={this.state.musicPlaying}
                    ></GamePanel>
                    <Player
                        name={this.state.playerTwoName}
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
