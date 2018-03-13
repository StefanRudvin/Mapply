import React, { Component } from 'react';

import { View, AppRegistry, Text, StyleSheet} from 'react-native'
import Login from './Components/Login'
import { EventRegister } from 'react-native-event-listeners'
import MapLayOut from './Components/MapLayOut'

export default class App extends Component {

    constructor (props) {
        super(props)

        this.state = {
            loggedIn: false
        }
    }

    componentWillMount () {
        this.userLoginListener = EventRegister.addEventListener('onUserLogin', () => {
            this.setState({loggedIn: true})
        })
    }

    componentWillUnmount () {
        EventRegister.removeEventListener(this.userLoginListener)
    }

    render() {
        return (
            <View style={styles.container}>
                { this.state.loggedIn
                    ?
                    <MapLayOut/>
                    :
                    <Login/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
})

AppRegistry.registerComponent('App', () => App)