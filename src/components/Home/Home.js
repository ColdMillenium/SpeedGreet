import React, { Component } from 'react'
import './Home.css'

export default class Home extends Component {
    render() {
        return (
            <div>
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    <title>Meetup</title>
                    <link
                        href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700&display=swap"
                        rel="stylesheet"
                    />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
                </head>
                <body>
                <div class="container">
                    <header class="header">
                    <div class="logo-container">
                        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fb9cc1fd-4970-4659-b67c-e1628299afb8/dax8ad0-f7c9770d-d388-4d0f-85e9-19d48666749b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZmI5Y2MxZmQtNDk3MC00NjU5LWI2N2MtZTE2MjgyOTlhZmI4XC9kYXg4YWQwLWY3Yzk3NzBkLWQzODgtNGQwZi04NWU5LTE5ZDQ4NjY2NzQ5Yi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.OC10dwE38B2UzZ42-53dMcFbe21_iHAhyaDH3rmh9zE" alt="doge logo" class="logo-img" />
                        <h1 class="logo-text">
                        Meet<span class="logo-highlight">&</span>Greet 
                        </h1>
                        <img src="https://www.freepnglogos.com/uploads/anime-face-png/bloodnhonor-photos-tumview-19.png" alt="doge logo" class="logo-img" />
                    </div>
                    </header>
                    <div class="content-container">
                    <div class="active-users-panel" id="active-user-container">
                        <h3 class="panel-title">Active Users:</h3>
                    </div>
                    <div class="video-chat-container">
                        <h2 class="talk-info" id="talking-with-info"> 
                        Select active user on the left menu.
                        </h2>
                        <div class="video-container">
                        <video autoplay class="remote-video" id="remote-video"></video>
                        <video autoplay muted class="local-video" id="local-video"></video>
                        </div>
                    </div>
                    </div>
                </div>
                <script src="./scripts/index.js"></script>
                </body>
            </div>
        )
    }
}
