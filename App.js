import React, { Component } from 'react'

import { AppRegistry, StyleSheet, View, Dimensions, Text } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import ActionButton from 'react-native-action-button'
import Map from './Components/Map'

let {width, height} = Dimensions.get('window')

export default class App extends Component {

    addMarker() {

        let data = {
            title : 'New marker',
            description :'New Description'
        }
        EventRegister.emit('onMarkerAdd', data)
    }

    render () {
        return (
            <View style={styles.container}>
                <Map/>
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => this.addMarker()}
                    style={styles.actionButton}>
                    {/*<ActionButton.Item buttonColor='#9b59b6' title="New Task"
                                       onPress={() => this.addMarker()}>
                        <Icon name="ios-add" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>*/}
                </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    actionButton: {
        position: 'absolute',
        width: 20,
        height: 20,
        left: 20,
        top: height - 100,
    },
    actionButtonIcon: {},
})

AppRegistry.registerComponent('App', () => App)