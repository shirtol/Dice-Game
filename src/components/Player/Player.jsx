import React, { Component } from "react";
import "./Player.css";

export default class Player extends Component {
    render() {
        return (
            <div className="player-container">
                <h1>{this.props.name}</h1>
                <h1>{this.props.totalScore}</h1>
                <div className="curr-score-container">
                    <h1 className="curr-score-title">Current Score</h1>
                    <h2 className="curr-score">{this.props.currScore}</h2>
                </div>
            </div>
        );
    }
}
