import Marker from '../Models/Marker'

export const index = (req, res, next) => {
    console.log('Getting markers...')
    // Find all movies and return json response
    Marker.find().lean().exec((err, markers) => res.json(
        // Iterate through each movie
        { markers: markers.map(marker => ({
            ...marker,
        }))}
    ));
};

export const create = (req, res, next) => {
    const marker = new Marker({
        title: req.body.data.marker.title,
        description: req.body.data.marker.description,
        coordinates: {
            latitude: req.body.data.latitude,
            longitude: req.body.data.longitude,
        }
    });
    // and save it into the database
    marker.save().then(()=>console.log('Saved new marker'));

    Marker.find().lean().exec((err, markers) => res.json(
        // Iterate through each movie
        { markers: markers.map(marker => ({
            ...marker,
        }))}
    ));
};