import React from 'react';
import MapStyle from '../MapStyles/Desert.json'

import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import { EventRegister } from 'react-native-event-listeners'

import MapView, { ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 57.149651
const LONGITUDE = -2.099075
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: []
        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    jumpRandom() {
        this.setState({ region: this.randomRegion() });
    }

    animateRandom() {
        this.map.animateToRegion(this.randomRegion());
    }

    animateRandomCoordinate() {
        this.map.animateToCoordinate(this.randomCoordinate());
    }

    animateToRandomBearing() {
        this.map.animateToBearing(this.getRandomFloat(-360, 360));
    }

    animateToRandomViewingAngle() {
        this.map.animateToViewingAngle(this.getRandomFloat(0, 90));
    }

    getRandomFloat(min, max) {
        return (Math.random() * (max - min)) + min;
    }

    randomCoordinate() {
        const region = this.state.region;
        return {
            latitude: region.latitude + ((Math.random() - 0.5) * (region.latitudeDelta / 2)),
            longitude: region.longitude + ((Math.random() - 0.5) * (region.longitudeDelta / 2)),
        };
    }

    randomRegion() {
        return {
            ...this.state.region,
            ...this.randomCoordinate(),
        };
    }

    componentWillMount () {
        this.listener = EventRegister.addEventListener('onMarkerAdd', (marker) => {
            this.addMarker(marker)
        })
    }

    componentWillUnmount () {
        EventRegister.removeEventListener(this.listener)
    }

    addMarker(data) {
        let markers = this.state.markers

        let marker = {
            coordinates: this.state.region,
            title: data.title,
            description: data.description,
        }

        markers.push(marker)
        this.setState({markers: markers})
        console.log('Marker added!')
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    ref={ref => { this.map = ref; }}
                    style={styles.map}
                    customMapStyle={MapStyle}
                    initialRegion={this.state.region}
                    onRegionChange={region => this.onRegionChange(region)}
                >
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinates}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}
                </MapView>
                <View style={[styles.bubble, styles.latlng]}>
                    <Text style={{ textAlign: 'center' }}>
                        {this.state.region.latitude.toPrecision(7)},
                        {this.state.region.longitude.toPrecision(7)}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => this.jumpRandom()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text style={styles.buttonText}>Jump</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.animateRandom()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text style={styles.buttonText}>Animate (Region)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.animateRandomCoordinate()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text style={styles.buttonText}>Animate (Coordinate)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.animateToRandomBearing()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text style={styles.buttonText}>Animate (Bearing)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.animateToRandomViewingAngle()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text style={styles.buttonText}>Animate (View Angle)</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

Map.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 100,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
    buttonText: {
        textAlign: 'center',
    },
});

export default Map;
