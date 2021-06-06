import React, { Component } from 'react';
import GameList from './GameList';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

export class WhatToPlay extends Component {
    state = {
        isLoading: true,
        url: 'https://api.rawg.io/api/games?key=460197e0758e44d889129066624b90d6&metacritic=90,100',
        parent_platforms: '1,2,3',
        error: ''
    }

    handlePlatform(platform) {
        this.setState({ parent_platforms: platform });
    }

    handleButtonColor(platform) {
        const color = (this.state.parent_platforms === platform) ? 'secondary' : 'default';
        return color;
    }

    render() {
        const url = `${this.state.url}&parent_platforms=${this.state.parent_platforms}`;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        WHAT TO PLAY
                    </Typography>
                    <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Box display="flex" justifyContent="center" style={{margin: '10px'}} >
                    <Typography style={{color: 'white', margin: '10px'}} variant="h6">Platforms: </Typography>
                    <Button variant="contained" color={this.handleButtonColor('1,2,3')} style={{margin: '10px'}} onClick={() => this.handlePlatform('1,2,3')}>ALL</Button>
                    <Button variant="contained" color={this.handleButtonColor('1')} style={{margin: '10px'}} onClick={() => this.handlePlatform('1')}>PC</Button>
                    <Button variant="contained" color={this.handleButtonColor('3')} style={{margin: '10px'}} onClick={() => this.handlePlatform('3')}>XBOX</Button>
                    <Button variant="contained" color={this.handleButtonColor('2')} style={{margin: '10px'}} onClick={() => this.handlePlatform('2')}>PlayStation</Button>
                </Box>
                <GameList url={url}/>
            </div>
        )
    }
}

export default WhatToPlay
