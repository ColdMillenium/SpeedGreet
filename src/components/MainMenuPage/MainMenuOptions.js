import React from 'react'
import "./MainMenuOptions.css"

export default function MainMenuOptions() {
    function menuButton(option){
        return(
            <div className="menu-button-wrapper">
                <h1 className='menu-button'>{option}</h1>
            </div>
        );
    }
    return (
        <div className="whole-menu-wrapper">
            {menuButton("Train")}
            {menuButton("Hangout")}
            {menuButton("Date")}
            {menuButton("Customize Profile")}
            {menuButton("Settings")}
        </div>
    )
}
