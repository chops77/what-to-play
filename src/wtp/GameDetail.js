import React, { Component } from 'react'
import { CssBaseline, Button, Typography, Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';

export class GameDetail extends Component {

    render() {
        const { detail } = this.props;
        let content;
        let description;

        if (detail) {
            description = detail.description;
            console.log(description);
            content = (
                <Card variant="outlined" style={{maxWidth: 500}}>
                    <CardMedia style={{height: 475}} image={detail.background_image} title={detail.name}/>
                    <CardHeader title={detail.name} />
                    <CardContent>
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
