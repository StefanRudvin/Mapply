import React, { Component } from 'react'

import { AppRegistry, StyleSheet, View } from 'react-native'
import Map from './Components/Map'
import NewMarkerModal from './Components/NewMarkerModal'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { apiMiddleware } from './Redux/redux'
import { reducer } from './Redux/reducer'
import NewMarkerButton from './Components/NewMarkerButton'

// Create Redux store
const store = createStore(reducer, {}, applyMiddleware(apiMiddleware))

// Fetch movie data
store.dispatch({type: 'GET_MARKER_DATA'})

export default class App extends Component {

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

AppRegistry.registerComponent('App', () => App)