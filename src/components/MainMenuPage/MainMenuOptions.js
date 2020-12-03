import React  from 'react'
import {useHistory} from "react-router-dom"
import "./MainMenuOptions.css"

export default function MainMenuOptions() {
    const history = useHistory();
    function menuButton(option, link){
        return(
            <div className="menu-button-wrapper" onClick={(e)=>{history.push('/'+ link)}}>
                <h1 className='menu-button'>{option}</h1>
            </div>
        );
    }
    
    return (
        <div className="whole-menu-wrapper">
            {menuButton("Train", "Train")}
            {menuButton("Hangout", "Hangout")}
            {menuButton("Date", "Date")}
            {menuButton("Customize Profile", "Profile")}
            {menuButton("Settings", "Settings")}
        </div>
    )
}
