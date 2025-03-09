import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ActivityCard = ({ title, description, image }) => {
    return (
        <Card sx={{
            maxWidth: 345,
            transition: 'transform 0.3s ease-in-out', // Add smooth transition for scaling
            '&:hover': {
                transform: 'scale(1.1)', // Scale the card up on hover
                zIndex: 1, // Ensure the card stays above other cards
            },
            overflow: 'visible'
        }}>
            <CardMedia
                component="img"
                alt={title}
                height="220"
                image={image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Favorite</Button>
                <Button size="small">Replace</Button>
            </CardActions>
        </Card>
    );
};

export default ActivityCard;
