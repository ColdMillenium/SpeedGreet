import React, { Component } from 'react'
import './Home.css'
import Button from '@material-ui/core/Button';
export default class Home extends Component {
    constructor(props){
        super(props);
        this.localVideoRef = React.createRef();
        this.state = {
            mediaState: "OFF",
            medaiConstraints: {video: true, audio: false},
            errorMsg: "",
            localstream: null
        }
      }
    errorMsg(msg){
        let newState = {...this.state};
        newState.errorMsg = msg;
        this.setState(newState);
        return newState;
    }
    stream(){
        let newState = {...this.state};
        var video = this.localVideoRef.current;
        if(newState.mediaState === "ON"){
            newState.mediaState = "OFF";
            const stream = video.srcObject;
            const tracks = stream.getTracks();

            tracks.forEach(function(track) {
                track.stop();
            });
            video.srcObject = null;
        }else{
            var constraints = newState.medaiConstraints;
            newState.mediaState = "ON";
            
            navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream){
                var videoTracks = stream.getVideoTracks();
                console.log('Got stream with constraints:', constraints);
                console.log('Using video device: ' + videoTracks[0].label);
                stream.onremovetrack = function() {
                  console.log('Stream ended');
                };
                //window.stream = stream; // make variable available to browser console
                video.srcObject = stream;
            }).catch(function(error){
                if (error.name === 'ConstraintNotSatisfiedError') {
                    this.errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
                        constraints.video.height.exact + ' px is not supported by your device.');
                  } else if (error.name === 'PermissionDeniedError') {
                    this.errorMsg('Permissions have not been granted to use your camera and ' +
                      'microphone, you need to allow the page access to your devices in ' +
                      'order for the demo to work.');
                  }
                  this.errorMsg('getUserMedia error: ' + error.name, error);
            });
        }
            
        
        this.setState(newState);
        return newState;
    }
    render() {
        return (
            <div>
              
                <div>
                <div className="container">
                    <header className="header">
                    <div className="logo-container">
                        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fb9cc1fd-4970-4659-b67c-e1628299afb8/dax8ad0-f7c9770d-d388-4d0f-85e9-19d48666749b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZmI5Y2MxZmQtNDk3MC00NjU5LWI2N2MtZTE2MjgyOTlhZmI4XC9kYXg4YWQwLWY3Yzk3NzBkLWQzODgtNGQwZi04NWU5LTE5ZDQ4NjY2NzQ5Yi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.OC10dwE38B2UzZ42-53dMcFbe21_iHAhyaDH3rmh9zE" alt="doge logo" className="logo-img" />
                        <h1 className="logo-text">
                        Meet<span className="logo-highlight">&</span>Greet 
                        </h1>
                        <img src="https://www.freepnglogos.com/uploads/anime-face-png/bloodnhonor-photos-tumview-19.png" alt="doge logo" className="logo-img" />
                    </div>
                    </header>
                    <div className="content-container">
                    <div className="active-users-panel" id="active-user-container">
                        <h3 className="panel-title">Active Users:</h3>
                        <Button onClick={() => this.stream()} variant="contained" color="secondary">
                            Stream of DOOM
                        </Button>
                    </div>
                    <div className="video-chat-container">
                        <h2 className="talk-info" id="talking-with-info"> 
                        Select active user on the left menu.
                        </h2>
                        <div className="video-container">
                        <video autoPlay className="remote-video" id="remote-video"></video>
                        <video ref={this.localVideoRef} autoPlay muted className="local-video" id="local-video"></video>
                        </div>
                    </div>
                    </div>
                </div>
                <script src="./scripts/index.js"></script>
                </div>
            </div>
        )
    }
}
