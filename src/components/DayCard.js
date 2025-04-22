import React, { useState } from 'react';
import ActivityCarousel from './activityCarousel';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Collapse,
    Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DayCard = ({ dayNumber, date, description, activities = [], onActivityReplace }) => {
    const [expanded, setExpanded] = useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ marginBottom: 2, width: '97%', borderRadius: '12px', }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h6">Day {dayNumber}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {date}
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={handleExpandClick}
                        sx={{
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease-in-out',
                        }}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Box>
                <Typography paragraph sx={{ marginTop: 1 }}>
                    {description}
                </Typography>
                <Collapse in={expanded}>
                    <CardContent>
                        <ActivityCarousel
                            activities={activities}
                            onActivityReplace={onActivityReplace}
                        />
                    </CardContent>
                </Collapse>
            </CardContent>
        </Card>
    );
};

export default DayCard;
