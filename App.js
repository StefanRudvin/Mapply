import React, { Component } from 'react';

import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapStyle from './MapStyles/Desert.json';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 57.149651;
const LONGITUDE =  -2.099075;
const LATITUDE_DELTA = 0.0922;
//const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LONGITUDE_DELTA = 0.0421;


export default class MapExample extends Component {
    constructor() {
        super();
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            marker: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: []
        };
    }
    componentDidMount() {
        let markers = this.state.markers

        let marker = {
            latlng: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            title: "WOWW",
            description: "MY MAN",
        }
        markers.push(marker)
        this.setState({markers : markers})
    }

    /*componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
            }
        );
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }*/

    render() {
        return (
            <MapView
                style={ styles.container }
                customMapStyle={ MapStyle }

                region={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                } }
                showsMyLocationButton={true}
                showsCompass={true}
                showsUserLocation={true}
                provider={ PROVIDER_GOOGLE }
                /*onRegionChange={ region => this.setState({region}) }*/
                /*onRegionChangeComplete={ region => this.setState({region}) }*/
            >
                {this.state.markers.map(marker => (
                    <MapView.Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
                {/*<MapView.Marker
                    coordinate={ this.state.marker }
                    title="HEI"
                    description="EI"
                />*/}
            </MapView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    }
});
AppRegistry.registerComponent('MapExample', () => MapExample);