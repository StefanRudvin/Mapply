import React, { Component } from 'react'

import { AppRegistry, StyleSheet, View } from 'react-native'
import Map from './Map'
import NewMarkerModal from './NewMarkerModal'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { apiMiddleware } from '../Redux/redux'
import { reducer } from '../Redux/reducer'
import NewMarkerButton from './NewMarkerButton'

// Create Redux store
const store = createStore(reducer, {}, applyMiddleware(apiMiddleware))

// Fetch movie data
store.dispatch({type: 'GET_MARKER_DATA'})

export default class MapLayOut extends Component {

    render () {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Map/>
                    <NewMarkerButton/>
                    <NewMarkerModal/>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
})

AppRegistry.registerComponent('MapLayOut', () => MapLayOut)