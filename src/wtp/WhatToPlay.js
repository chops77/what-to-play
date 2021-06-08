import React, { Component } from 'react';
import GameList from './GameList';
import { Box, Paper, TextField, Typography, Button } from '@material-ui/core';
import GameImage from '../img/gamearts.png';
import WTPImage from '../img/wtp.png';

export class WhatToPlay extends Component {

    constructor(props) {
        super(props);
        const myday = new Date();
        const today = myday.toISOString().split("T")[0];
        const fiveYearsAgo = `${today.split("-")[0]-5}-${today.split("-")[1]}-${today.split("-")[2]}`;

        this.state = {
            isLoading: true,
            url: 'https://api.rawg.io/api/games?key=460197e0758e44d889129066624b90d6&page_size=40',
            parent_platforms: '1,2,3',
            genres: '1,2,3,4,5,6,7,11,15',
            releasedFrom: fiveYearsAgo,
            releasedTo: today,
            scoreFrom: '90',
            scoreTo: '100',
            error: ''
        };
    }

    handlePlatform = (platform) => {
        this.setState({ parent_platforms: platform });
    }

    handleGenre = (genre) => {
        this.setState({ genres: genre });
    }

    handlePlatformButtonColor = (platform) => {
        const color = (this.state.parent_platforms === platform) ? 'secondary' : 'default';
        return color;
    }

    handleGenreButtonColor = (genre) => {
        const color = (this.state.genres === genre) ? 'secondary' : 'default';
        return color;
    }

    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    
    render() {
        const url = `${this.state.url}&parent_platforms=${this.state.parent_platforms}&genres=${this.state.genres}&metacritic=${this.state.scoreFrom},${this.state.scoreTo}&dates=${this.state.releasedFrom},${this.state.releasedTo}`;
        return (
            <div>
                <Paper style={{ backgroundImage: `url(${GameImage})`, height: '300px', display: 'flex', flexDirection: "column", justifyContent: 'center' }}>
                    <img src={WTPImage} alt="What To Play"/>
                </Paper>
                <Box display="flex" justifyContent="center" style={{margin: '10px'}} >
                    <Typography style={{color: 'white', margin: '10px'}} variant="h6">Platforms: </Typography>
                    <Button variant="contained" color={this.handlePlatformButtonColor('1,2,3')} style={{margin: '10px'}} onClick={() => this.handlePlatform('1,2,3')}>ALL</Button>
                    <Button variant="contained" color={this.handlePlatformButtonColor('1')} style={{margin: '10px'}} onClick={() => this.handlePlatform('1')}>PC</Button>
                    <Button variant="contained" color={this.handlePlatformButtonColor('3')} style={{margin: '10px'}} onClick={() => this.handlePlatform('3')}>XBOX</Button>
                    <Button variant="contained" color={this.handlePlatformButtonColor('2')} style={{margin: '10px'}} onClick={() => this.handlePlatform('2')}>PlayStation</Button>
                </Box>
                <Box display="flex" justifyContent="center" style={{margin: '10px'}} >
                    <Typography style={{color: 'white', margin: '10px'}} variant="h6">Genres: </Typography>
                    <Button variant="contained" color={this.handleGenreButtonColor('1,2,3,4,5,6,7,11,15')} style={{margin: '10px'}} onClick={() => this.handleGenre('1,2,3,4,5,6,7,11,15')}>ALL</Button>
                    <Button variant="contained" color={this.handleGenreButtonColor('4')} style={{margin: '10px'}} onClick={() => this.handleGenre('4')}>Action</Button>
                    <Button variant="contained" color={this.handleGenreButtonColor('3')} style={{margin: '10px'}} onClick={() => this.handleGenre('3')}>Adventure</Button>
                    <Button variant="contained" color={this.handleGenreButtonColor('5')} style={{margin: '10px'}} onClick={() => this.handleGenre('5')}>RPG</Button>
                    <Button variant="contained" color={this.handleGenreButtonColor('2')} style={{margin: '10px'}} onClick={() => this.handleGenre('2')}>Shooter</Button>
                    <Button variant="contained" color={this.handleGenreButtonColor('7')} style={{margin: '10px'}} onClick={() => this.handleGenre('7')}>Puzzle</Button>
                    <Button variant="contained" color={this.handleGenreButtonColor('1')} style={{margin: '10px'}} onClick={() => this.handleGenre('1')}>Racing</Button>
                    <Button variant="contained" color={this.handleGenreButtonColor('15')} style={{margin: '10px'}} onClick={() => this.handleGenre('15')}>Sports</Button>
                    <Button variant="contained" color={this.handleGenreButtonColor('11')} style={{margin: '10px'}} onClick={() => this.handleGenre('11')}>Arcade</Button>
                    <Button variant="contained" color={this.handleGenreButtonColor('6')} style={{margin: '10px'}} onClick={() => this.handleGenre('6')}>Fighting</Button>
                </Box>
                <Typography style={{ backgroundColor: "grey" }} align="center" variant="h5">Game Filters</Typography>
                <Paper style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: '#cccccc' }}>
                    <form>
                        <TextField style={{margin: '10px'}} name="releasedFrom" label="Released From" type="date" value={this.state.releasedFrom} onChange={this.handleChange} variant="outlined"/>
                        <TextField style={{margin: '10px'}} name="releasedTo" label="Released To" type="date" value={this.state.releasedTo} onChange={this.handleChange} variant="outlined"/>
                        <TextField style={{margin: '10px'}} name="scoreFrom" label="Metascore From" type="number" value={this.state.scoreFrom} onChange={this.handleChange} variant="outlined"/>
                        <TextField style={{margin: '10px'}} name="scoreTo" label="Metascore To" type="number" value={this.state.scoreTo} onChange={this.handleChange} variant="outlined"/>
                    </form>
                </Paper>
                <GameList url={url}/>
            </div>
        )
    }
}

export default WhatToPlay
