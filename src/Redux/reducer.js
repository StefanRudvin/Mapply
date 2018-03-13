export const reducer = (state = { markers: [], loading: true }, action) => {
    switch (action.type) {
        case 'GET_MARKER_DATA_LOADING':
            return {
                ...state,                   // keep the existing state,
                loading: true,              // but change loading to true
            };
        case 'GET_MARKER_DATA_RECEIVED':
            return {
                loading: false,             // set loading to false
                markers: action.data.markers, // update movies array with reponse data
            };
        case 'GET_MARKER_DATA_ERROR':
            return state;
        default:
            return state;
    }
};