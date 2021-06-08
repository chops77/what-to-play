import React, { Component } from 'react'
import { CssBaseline, Backdrop, Button, Fade, Container, Card, CardHeader, CardMedia, CardContent, CardActionArea, Modal, Grid, Typography, Box, IconButton, Paper } from '@material-ui/core';
import { SkipNext, SkipPrevious } from '@material-ui/icons';
import PropTypes from 'prop-types';
import GameDetail from './GameDetail';
import PickImage from '../img/pick.gif';

export class GameList extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired        
    }

    state = {
        isLoading: true,
        next: null,
        previous: null,
        results: [],
        modalOpen: false,
        gameId: 3498,
        detail: null,
        error: ''
    }

    componentDidMount() {
        this.loadList(this.props.url);
    }

    componentDidUpdate(prevProps) {
        if (this.props.url !== prevProps.url) {
          this.loadList(this.props.url);
        }
      }

    loadList = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    isLoading: false,
                    next: data.next,
                    previous: data.previous,
                    results: data.results
                })
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: error.message
                })
            });
    }

    listHandler = (skip) => {
        this.loadList(skip);
    }

    modalOpen = (id) => {
        this.setState({ modalOpen: true, gameId: id });
        const url = `https://api.rawg.io/api/games/${id}?key=460197e0758e44d889129066624b90d6`
        fetch(url)
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    detail: data
                })
            })
    }

    modalClose = () => {
        this.setState({ modalOpen: false });
    }

    randomPick = (resultList) => {
        if (resultList.length > 0){
            const myPick = resultList[Math.floor(Math.random() * resultList.length)].id;
            this.modalOpen(myPick);
        }
    }

    render() {
        const {isLoading, next, previous, results, error} = this.state;
        return (
            <Container maxWidth="lg" style={{paddingTop: 5, backgroundColor: 'black'}}>
                <CssBaseline />
                {isLoading && <Typography variant="h4">Loading...</Typography>}
                {error && <Typography variant="h4">{error}</Typography>}
                <Paper style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: 'black' }}>
                    <Button onClick={() => this.randomPick(results)}>
                        <img src={PickImage} alt="Pick One For Me!"/>
                    </Button>
                </Paper>
                <Grid container spacing={1}>
                    {results.map((game, idx) => {
                        const platforms = game.platforms.map((platform) => {
                            return platform.platform.name;
                        })
                        const genres = game.genres.map((genre) => {
                            return genre.name;
                        })
                        return (
                            <Grid key={idx} item style={{backgroundColor: 'gray'}}>
                                <Card variant="outlined" style={{maxWidth: 300}}>
                                    <CardActionArea onClick={() => this.modalOpen(game.id)}>
                                        <CardMedia style={{width: 300, height: 300}} image={game.background_image}/>
                                        <CardHeader title={game.name} style={{height: 100}}/>
                                        <CardContent style={{height: 250, backgroundColor: '#cccccc'}}>
                                            <Typography variant="subtitle1"> <b>Platforms: </b>{platforms.join(", ")} </Typography>
                                            <Typography variant="subtitle1"> <b>Metascore:</b> {game.metacritic}</Typography>
                                            <Typography variant="subtitle1"> <b>Genres: </b>{genres.join(", ")} </Typography>
                                            <Typography variant="subtitle1"> <b>Release Date:</b> {game.released}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
                <Box display="flex" justifyContent="center">
                    {previous && <IconButton style={{color: 'white'}} onClick={() => this.listHandler(previous)}><SkipPrevious /> Previous Page</IconButton>}
                    {next && <IconButton style={{color: 'white'}} onClick={() => this.listHandler(next)}> Next Page<SkipNext /></IconButton>}
                </Box>
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.modalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 500 }}
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'scroll'}}
                >
                    <div>
                    <Fade in={this.state.modalOpen}>
                        <GameDetail detail={this.state.detail}/>
                    </Fade>
                    </div>
                </Modal>
            </Container>
        )
    }
}

export default GameList
