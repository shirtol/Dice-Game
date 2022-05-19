import React, { Component } from "react";
import "./Button.css";

export default class Button extends Component {
    render() {
        return (
            <div className="btn-container" onClick={this.props.handleClick}>
                <i className={this.props.iconClass}></i>
                <h3>{this.props.buttonText}</h3>
            </div>
        );
    }
}
