import React, { Component } from 'react';
import GameList from './GameList';

export class WhatToPlay extends Component {
    state = {
        isLoading: true,
        url: 'https://api.rawg.io/api/games?key=460197e0758e44d889129066624b90d6&metacritic=90,100',
        error: ''
    }

    render() {
        return (
            <div>
                <GameList url={this.state.url}/>
            </div>
        )
    }
}

export default WhatToPlay
