import React, { Component } from 'react'
import { CssBaseline, Typography, Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';

export class GameDetail extends Component {

    static propTypes = {
        detail: PropTypes.object
    }

    render() {
        const { detail } = this.props;
        let content;
        let description;

        if (detail) {
            description = detail.description;
            const platforms = detail.platforms.map((platform) => {
                return platform.platform.name;
            })
            const genres = detail.genres.map((genre) => {
                return genre.name;
            })
            content = (
                <Card variant="outlined" style={{maxWidth: 500}}>
                    <CardMedia style={{height: 475}} image={detail.background_image} title={detail.name}/>
                    <CardHeader title={detail.name} />
                    <CardContent>
                        <Typography variant="subtitle1"> <b>Platforms: </b>{platforms.join(", ")} </Typography>
                        <Typography variant="subtitle1"> <b>Metascore:</b> {detail.metacritic}</Typography>
                        <Typography variant="subtitle1"> <b>Genres: </b>{genres.join(", ")} </Typography>
                        <Typography variant="subtitle1"> <b>Average Beat Time: </b> {detail.playtime} Hours</Typography>
                        <Typography variant="subtitle1"> <b>Release Date: </b> {detail.released}</Typography>
                        <div dangerouslySetInnerHTML={{__html: description}} />
                    </CardContent>
                </Card>
            );
        }

        return (
            <div style={{ border: '2px solid white' }}>
                <CssBaseline />
                {content}
            </div>
        )
    }
}

export default GameDetail
