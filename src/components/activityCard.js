import React from 'react';import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ActivityCard = () => {
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="Activity"
                height="220"
                image="/images/download.jpeg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Rainforest Ziplining
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Have the one in a lifetime chance to zip through the rainforest at 35 mph in this rainforest ziplining excursion!
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Favorite</Button>
                <Button size="small">Remove</Button>
            </CardActions>
        </Card>
        </div>
    );
};

export default ActivityCard;
