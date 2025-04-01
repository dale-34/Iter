import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const ActivityCard = ({ title, description, image, cost }) => {
    const [favorited, setFavorite] = React.useState(false);

    const handleFavorite = () => {
        setFavorite(!favorited);
    }

    const handleReplace = () => {
        
    }

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
                {/* Favorite Button */}
                <IconButton 
                    size="small" 
                    onClick={handleFavorite}
                    color={favorited ? 'primary' : 'default'}>
                    <FavoriteIcon />
                </IconButton>
                {/* Replace Button */}
                <IconButton 
                    size="small" 
                    onClick={handleReplace}
                    color="secondary">
                    <SwapHorizIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default ActivityCard;
