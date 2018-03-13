import React, { Component } from 'react'

import { AppRegistry, StyleSheet, View, Dimensions, Text } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import ActionButton from 'react-native-action-button'

let {width, height} = Dimensions.get('window')

export default class NewMarkerButton extends Component {

    static addMarker () {
        EventRegister.emit('onShowMarkerModal')
    }

    render () {
        return (
            <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={() => NewMarkerButton.addMarker()}
                style={styles.actionButton}>
            </ActionButton>
        )
    }
}

const styles = StyleSheet.create({
    actionButton: {
        position: 'absolute',
        width: 20,
        height: 20,
        left: 20,
        top: height - 95,
    },
})

AppRegistry.registerComponent('NewMarkerButton', () => NewMarkerButton)