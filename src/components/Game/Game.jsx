import React, { Component } from "react";
import Button from "../Button/Button";
import Dice from "../Dice/Dice";
import Player from "../Player/Player";
import "./Game.css";

export default class Game extends Component {
    render() {
        return (
            <div className="game-container">
                <Player name="player 1" totalScore="0" currScore="0"></Player>
                <div className="game-panel">
                    <Button
                        buttonText="NEW GAME"
                        iconClass="fa-solid fa-rotate fa-2x"
                    ></Button>
                    <div className="dice-container">
                        <Dice></Dice>
                        <Dice></Dice>
                    </div>
                    <div className="game-options">
                        <Button
                            buttonText="ROLL DICE"
                            iconClass="fa-solid fa-dice fa-2x"
                        ></Button>
                        <Button
                            buttonText="END TURN"
                            iconClass="fa-solid fa-check fa-2x"
                        ></Button>
                        <input type="text" placeholder="FINAL SCORE"></input>
                    </div>
                </div>
                <Player name="player 2" totalScore="0" currScore="0"></Player>
            </div>
        );
    }
}
