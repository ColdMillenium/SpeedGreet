import React ,{useContext, createRef, useEffect} from 'react'
import { ClientContext } from '../../contexts/ClientContext'
import '../../../node_modules/video-react/dist/video-react'
import './MainMenuPage.css';
import MainMenuOptions from './MainMenuOptions';
import UserHeader from './UserHeader';

export default function MainMenuPage() {
    const {userName, hasUserName} = useContext(ClientContext);
    const backgroundVideo = "assets/people-talking-table.mp4"
    const vidConfig = {file:{attributes:{}}};
    function display(){
        if(hasUserName){
            return (
            <div className="player-wrapper">
                
                <video muted className="myVideo" autoPlay loop id="myVideo">
                    <source src={backgroundVideo} type="video/mp4"></source>
                </video>
                <MainMenuOptions></MainMenuOptions>
                <UserHeader></UserHeader>
                
                {/* <ReactPlayer playing={true} config={vidConfig} url='assets/DonaldTrumpJapaneseCommercial.mp4'></ReactPlayer> */}
            </div>
            
            );
            
        }
    }
    return (
            <div>{display()}</div>
        );
}
