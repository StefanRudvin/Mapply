export const reducer = (state = { markers: [], loading: true }, action) => {
    switch (action.type) {
        case 'MARKER_ADDED':
            return {
                loading: false,
                markers: action.data.data.markers,
            };
        case 'GET_MARKER_DATA_LOADING':
            return {
                ...state,                   // keep the existing state,
                loading: true,              // but change loading to true
            };
        case 'ADD_MARKER_LOADING':
            return {
                ...state,                   // keep the existing state,
                loading: true,              // but change loading to true
            };
        case 'GET_MARKER_DATA_RECEIVED':
            return {
                loading: false,             // set loading to false
                markers: action.data.data.markers, // update movies array with reponse data
            };
        case 'ADD_MARKER_ERROR':
            console.log('Add marker error :(')
            return state;
        case 'GET_MARKER_DATA_ERROR':
            console.log('get markers error :(')
            return state;
        default:
            return state;
    }
};

export default reducer