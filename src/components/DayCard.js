import React, { useState } from 'react';
import ActivityCarousel from './activityCarousel';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Collapse
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DayCard = ({ dayNumber, date, description, activities = [] }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6">Day {dayNumber}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {date}
                </Typography>
                <Typography paragraph>
                        {description}
                </Typography>
                <IconButton
                    onClick={handleExpandClick}
                    sx={{
                        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease-in-out',
                    }}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardContent>
            <Collapse in={expanded}>
                <CardContent>
                    <ActivityCarousel
                        activities={activities}
                    />
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default DayCard;
