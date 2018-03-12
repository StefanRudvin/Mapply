import React, { Component } from 'react'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import { EventRegister } from 'react-native-event-listeners'

import { AppRegistry, StyleSheet, View, Dimensions, Text } from 'react-native'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import MapStyle from './../MapStyles/Desert.json'

let {width, height} = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE = 57.149651
const LONGITUDE = -2.099075
const LATITUDE_DELTA = 0.0922
//const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const LONGITUDE_DELTA = 0.0421

export default class Map extends Component {
    constructor () {
        super()
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            currentRegion : {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: []
        }
    }

    componentWillMount () {
        this.listener = EventRegister.addEventListener('onMarkerAdd', (marker) => {
            this.addMarker(marker)
        })
    }

    componentWillUnmount () {
        navigator.geolocation.clearWatch(this.watchID)
        EventRegister.removeEventListener(this.listener)
    }

    addMarker(data) {
        let markers = this.state.markers

        let marker = {
            coordinates: this.state.currentRegion,
            title: data.title,
            description: data.description,
        }

        markers.push(marker)
        this.setState({markers: markers})
        console.log('Marker added!')
    }

    componentDidMount () {
        this.createSampleMarker()
        /*this.gpsShit()*/
    }

    createSampleMarker () {
        let markers = this.state.markers

        let marker = {
            coordinates: {
                latitude: LATITUDE,
                longitude: LONGITUDE
            },
            title: 'WOWW',
            description: 'MY MAN',
        }

        let marker2 = {
            coordinates: {
                latitude: LATITUDE + 0.01,
                longitude: LONGITUDE + 0.01
            },
            title: 'EI TERVE',
            description: 'MY MAN',
        }

        markers.push(marker)
        markers.push(marker2)
        this.setState({markers: markers})
    }

    gpsShit () {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                })
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        )
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                })
            }
        )
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render () {
        return (
            <MapView
                style={styles.map}
                customMapStyle={MapStyle}
                region={this.state.region}
                showsMyLocationButton={true}
                showsCompass={true}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                //onRegionChange={this.onRegionChange.bind(this)}
                /*onRegionChange={ region => this.setState({region}) }*/
                /*onRegionChangeComplete={ currentRegion => this.setState({currentRegion : currentRegion}) }*/
            >
                {this.state.markers.map(marker => (
                    <MapView.Marker
                        coordinate={marker.coordinates}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
            </MapView>
        )
    }
}
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1
    },
})
AppRegistry.registerComponent('Map', () => Map)