import React from 'react'
import MapStyle from '../MapStyles/Desert.json'

import {
    StyleSheet,
    View,
    Text,
    Dimensions, Button,
} from 'react-native'

import { EventRegister } from 'react-native-event-listeners'

import MapView, { ProviderPropType } from 'react-native-maps'
import { connect } from 'react-redux';

const {width, height} = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE = 57.149651
const LONGITUDE = -2.099075
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e))
    })
}

@connect(
    state => ({
        markers: state.markers,
        loading: state.loading,
    }),
    dispatch => ({
        refresh: () => dispatch({type: 'GET_MARKER_DATA'}),
        addNewMarker: (data) => dispatch({type: 'CREATE_NEW_MARKER', data: data})
    }),
)

class Map extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [],
            loading: true,
        }
    }

    onRegionChange (region) {
        this.setState({region})
    }

    componentWillMount () {
        this.addMarkerListener = EventRegister.addEventListener('onMarkerAdd', (marker) => {
            this.addMarker(marker)
        })
        this.showModalListener = EventRegister.addEventListener('onShowMarkerModal', () => {
            this.centerOnLocation()
        })
    }

    componentWillUnmount () {
        EventRegister.removeEventListener(this.addMarkerListener)
        EventRegister.removeEventListener(this.showModalListener)
    }

    centerOnLocation () {
        return getCurrentLocation().then(position => {
            if (position) {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003,
                    },
                })
            }
        })
    }

    addMarker (data) {
        let marker = {
            coordinates: this.state.region,
            title: data.title,
            description: data.description,
        }
        this.props.addNewMarker(marker)
    }

    render () {
        const { markers, loading, refresh } = this.props;
        return (
            <View style={styles.container}>
                <MapView
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    provider="google"
                    ref={ref => { this.map = ref }}
                    style={styles.map}
                    customMapStyle={MapStyle}
                    onRegionChange={region => this.onRegionChange(region)}
                    followsUserLocation={true}
                >
                    {
                        markers ? <View>
                            <MapView.Marker
                                coordinate={this.state.region}
                                title="I AM HERE"
                                description="EI VITTU"/>
                        </View> : <Button title="NO MARKERS" onPress={console.log(markers)}>

                        </Button>
                    }

                    {markers
                        ? <View>
                            {markers.map(marker => (
                                <MapView.Marker
                                    coordinate={marker.coordinates}
                                    title={marker.title}
                                    description={marker.description}
                                />
                            ))}
                        </View>
                        : <View/>
                    }
                </MapView>

                {markers
                    ? <View>
                        <Text>{markers[0].title}</Text>
                        <Text>{markers[0].description}</Text>
                        <Text>{markers[0].coordinates.latitude}</Text>
                        <Text>{markers[0].coordinates.longitude}</Text>
                    </View>
                    : <View><Text>Loading...</Text></View>
                }
                <View style={[styles.bubble, styles.latlng]}>
                    <Text style={{textAlign: 'center'}}>
                        {this.state.region.latitude.toPrecision(7)},
                        {this.state.region.longitude.toPrecision(7)}
                    </Text>
                </View>

            </View>
        )
    }
}

Map.propTypes = {
    provider: ProviderPropType,
}

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
        marginBottom: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
})

export default Map
