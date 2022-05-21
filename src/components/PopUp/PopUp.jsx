import React, { Component } from "react";
import "./PopUp.css";

export default class PopUp extends Component {
    render() {
        return (
            this.props.isShown && (
                <div className={`pop-up-container ${this.props.popupClass}`}>
                    <div>{this.props.children}</div>
                </div>
            )
        );
    }
}
