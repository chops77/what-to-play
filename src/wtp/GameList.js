import React, { Component } from 'react'
import { CssBaseline, Backdrop, Fade, Container, Card, CardHeader, CardMedia, CardContent, CardActions, CardActionArea, Button, Modal, Grid, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Box, IconButton } from '@material-ui/core';
import { SkipNext, SkipPrevious } from '@material-ui/icons';

export class GameList extends Component {

    state = {
        isLoading: true,
        next: null,
        previous: null,
        results: [],
        modalOpen: false,
        error: ''
    }

    componentDidMount() {
        this.loadList(this.props.url);
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

    modalOpen = () => {
        this.setState({ modalOpen: true })
    }

    modalClose = () => {
        this.setState({ modalOpen: false })
    }

    render() {
        const {isLoading, next, previous, results, error} = this.state;

        return (
            <Container maxWidth="lg" style={{backgroundColor: 'black'}}>
                <CssBaseline />
                {isLoading && <Typography variant="h4">Loading...</Typography>}
                {error && <Typography variant="h4">{error}</Typography>}
                
                <Grid container spacing={1}>
                    {results.map((game, idx) => {
                        const platforms = game.platforms.map((platform) => {
                            return platform.platform.name;
                        })
                        const genres = game.genres.map((genre) => {
                            return genre.name;
                        })
                        return (
                            <Grid item style={{backgroundColor: 'gray'}}>
                                <Card variant="outlined" style={{maxWidth: 300}}>
                                    <CardActionArea onClick={this.modalOpen}>
                                        <CardMedia style={{width: 300, height: 300}} image={game.background_image}/>
                                        <CardHeader title={game.name}/>
                                        <CardContent style={{backgroundColor: '#cccccc'}}>
                                            <Typography variant="subtitle1"> <b>Platforms: </b>{platforms.join(", ")} </Typography>
                                            <Typography variant="subtitle1"> <b>Metascore:</b> {game.metacritic}</Typography>
                                            <Typography variant="subtitle1"> <b>Genres: </b>{genres.join(", ")} </Typography>
                                            <Typography variant="subtitle1"> <b>Average Beat Time:</b> {game.playtime} hours</Typography>
                                            <Typography variant="subtitle1"> <b>Release Date:</b> {game.released}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        Add to:
                                        <Button size="small" color="primary">
                                        Bucket
                                        </Button>
                                        <Button size="small" color="primary">
                                        Played
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
                {previous && <IconButton onClick={() => this.listHandler(previous)}><SkipPrevious /> Previous List</IconButton>}
                {next && <IconButton onClick={() => this.listHandler(next)}> Next List<SkipNext /></IconButton>}
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.modalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 500 }}
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                >
                    <Fade in={this.state.modalOpen}>
                        <div style={{ border: '2px solid white' }}>
                            <img src="https://media.rawg.io/media/games/84d/84da2ac3fdfc6507807a1808595afb12.jpg" alt="GTA" width="500" />
                        </div>
                    </Fade>
                </Modal>
            </Container>
        )
    }
}

export default GameList
