import React from 'react'

import {
    Button,
    StyleSheet,
    View,
} from 'react-native'

import MapView, { ProviderPropType } from 'react-native-maps'
import { connect } from 'react-redux'

function mapDispatchToProps(dispatch) {
    return {
        refresh: () => dispatch({type: 'GET_MARKER_DATA'}),
        addNewMarker: (data) => dispatch({type: 'CREATE_NEW_MARKER', data: data})
    }
}

function mapStateToProps(state) {
    return {
        markers: state.markers
    }
}

class MyMarkers extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            region: {
                latitude: 57.149651,
                longitude: -2.099075
            }
        }
    }

    render () {
        const {
            markers, loading, refresh, addNewMarker
        } = this.props

        return (
            <View>
                {
                    this.props.markers ? <View>
                        {this.props.markers.map(marker => (
                            <MapView.Marker
                                coordinate={marker.coordinates}
                                title={marker.title}
                                description={marker.description}
                            />
                        ))}
                    </View> : null
                }
            </View>
        )
    }
}

MyMarkers.propTypes = {
    provider: ProviderPropType,
}

const styles = StyleSheet.create({})

export default connect(mapStateToProps, mapDispatchToProps)(MyMarkers)
