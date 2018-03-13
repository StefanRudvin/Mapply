import mongoose from 'mongoose'
import Marker from './Models/Marker'

const markers = [
    {
        title: 'La la land',
        description: 'Whats up in the houseee',
        coordinates: {
            latitude: 57.149651,
            longitude: -2.099075,
        },
    },

    {
        title: 'Wa wa wand',
        description: 'Whats up in the houseee',
        coordinates: {
            latitude: 57.249651,
            longitude: -2.199075,
        },
    },

    {
        title: 'Wa wa wand',
        description: 'Whats up in the houseee',
        coordinates: {
            latitude: 37.33,
            longitude: -122.02,
        },
    },
]

// Connect to MongoDB
mongoose.connect('mongodb://localhost/markers');

// Go through each movie
markers.map(data => {
    // Initialize a model with movie data
    const marker = new Marker(data);
    // and save it into the database
    marker.save();
});

