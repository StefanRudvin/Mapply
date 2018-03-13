import Marker from '../Models/Marker'

export const index = (req, res, next) => {
    // Find all movies and return json response
    Marker.find().lean().exec((err, markers) => res.json(
        // Iterate through each movie
        { markers: markers.map(movie => ({
            ...movie,
        }))}
    ));
};