import React, {Component} from 'react';
import {Modal, Button, Text, TouchableHighlight, View, StyleSheet, Dimensions, TextInput} from 'react-native';
import { EventRegister } from 'react-native-event-listeners'

const { width, height } = Dimensions.get('window');

class NewMarkerModal extends Component {
    state = {
        modalVisible: false,
        description: '',
        title: '',
    };

    componentWillMount () {
        this.openListener = EventRegister.addEventListener('onShowMarkerModal', () => {
            this.setModalVisible(true)
        })
        this.closeListener = EventRegister.addEventListener('onCloseMarkerModal', () => {
            this.setModalVisible(false)
        })
    }

    addMarker() {
        let data = {
            title : this.state.title,
            description : this.state.description
        }
        EventRegister.emit('onMarkerAdd', data)
        this.setState({title: ''})
        this.setState({description: ''})
        this.setModalVisible(false)
    }

    componentWillUnmount () {
        EventRegister.removeEventListener(this.closeListener)
        EventRegister.removeEventListener(this.openListener)
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    style={styles.modal}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.contents}>
                        <View style={styles.innercontents}>

                            <View style={styles.title}>
                                <TextInput
                                    style={styles.innertitle}
                                    onChangeText={(title) => this.setState({title})}
                                    value={this.state.title}
                                />
                            </View>


                            <View style={styles.description}>
                                <TextInput
                                    style={styles.innerdescription}
                                    onChangeText={(description) => this.setState({description})}
                                    value={this.state.description}
                                />
                            </View>

                            <Button
                                title="Add Marker"
                                onPress={() => this.addMarker()}>
                            </Button>
                            <Button
                                color="#FF0400"
                                title="Cancel"
                                onPress={() => this.setModalVisible(false)}>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '50%',
        width: '50%',

        marginTop: 22,
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,
        marginTop: 22,
        height: '50%',
        width: '50%',
    },

    title : {
        height: 40,
        borderColor: '#bdb8bf',
        borderWidth: 1,
        borderRadius: 20,
        margin: 5,
        marginTop: 10,
    },

    innertitle : {
        margin: 10,
    },

    innerdescription: {
        height: 120,
        margin: 5,
    },

    description: {
        height: 120,
        borderColor: '#bdb8bf',
        borderWidth: 1,
        borderRadius: 20,
        margin: 5,
    },

    contents: {
        height: 300,
        marginTop: height-270,
        marginBottom: 0,
        backgroundColor: '#fcf6ff',
    },
});
export default NewMarkerModal