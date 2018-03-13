import mongoose, { Schema } from 'mongoose'

// Define movie schema
var markerSchema = new Schema({
    title: {
        type: String,
    },
    description: String,
    coordinates: {
        latitude: Number,
        longitude: Number,
    },
})


// Export Mongoose model
export default mongoose.model('marker', markerSchema)