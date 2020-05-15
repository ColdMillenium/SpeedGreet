import React, { Component } from 'react';
import './CalcInput.css';
export default class CalcInput extends Component {
    render() {
        return (
            <div className="input">
                {this.props.children}
            </div>
        )
    }
}
