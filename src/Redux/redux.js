import { Platform } from 'react-native'
import axios from 'axios'

const API = Platform.OS === 'android'
    ? 'http://10.0.3.2:3000/v1' // works for Genymotion
    : 'http://localhost:3000/v1'

export const apiMiddleware = store => next => action => {
    // Pass all actions through by default
    next(action)
    switch (action.type) {
        case 'CREATE_NEW_MARKER':
            store.dispatch({type: 'ADD_MARKER_LOADING'})

            let data = new FormData;
            data.marker = action.data
            data.latitude = action.data.coordinates.latitude
            data.longitude = action.data.coordinates.longitude

            // Make API call and dispatch appropriate actions when done
            axios.post(`${API}/markers`, {
                data: data,
            })
                /*.then(function(response) {
                    console.log(response)
                    return response.json()
                })*/
                .then(function(data) {
                    return next({
                        type: 'MARKER_ADDED',
                        data
                    })
                })
                .catch(function(error) {
                    console.log(error)
                    return next({
                        type: 'ADD_MARKER_ERROR',
                        error
                    })
                })
            break

        // In case we receive an action to send an API request
        case 'GET_MARKER_DATA':
            // Dispatch GET_MOVIE_DATA_LOADING to update loading state
            store.dispatch({type: 'GET_MARKER_DATA_LOADING'})
            // Make API call and dispatch appropriate actions when done
            axios.get(`${API}/markers.json`)
                /*.then(response => response.json())*/
                .then(function(data){
                    return next({
                        type: 'GET_MARKER_DATA_RECEIVED',
                        data
                    })
                })
                .catch(function(error) {
                    return next({
                        type: 'GET_MARKER_DATA_ERROR',
                        error
                    })
                })
            break
        // Do nothing if the action does not interest us
        default:
            break
    }
}