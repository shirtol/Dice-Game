import React, { Component } from "react";
import "./PopUp.css";

export default class PopUp extends Component {
    render() {
        return (
            <div className="pop-up-container">
                <div>{this.props.children}</div>
            </div>
        );
    }
}
