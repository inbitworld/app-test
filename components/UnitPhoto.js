import React, { Component, createRef } from 'react'
import { Text, StyleSheet, View, Dimensions, ToastAndroid, ImageBackground } from 'react-native'
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';
import { Video } from 'expo-av';
import MyButton from './MyButton'



const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default class UnitPhoto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.route.params,
            isVideo: false
        }
    }


    componentDidMount() {
        const { data } = this.props.route.params
        console.log('checking......', data.file_url)
        let localUri = data.file_url;
        let filename = localUri.split('/').pop();
        console.log('filename',filename);
        if (filename.endsWith('.mov') || filename.endsWith('.mp4')) {
            this.setState({ isVideo: true })
        }
        
    }



    render() {
        const { data } = this.props.route.params
        return (

            <View style={styles.container} >

                {this.state.isVideo == false ?
                    <ImageBackground
                        style={styles.image}
                        source={{ uri: data.file_url }}
                        resizeMode='contain'
                    >


                    </ImageBackground> :
                  <Video
                  style={styles.preview}
                  source={{uri:data.file_url}}
                  useNativeControls
                  resizeMode='contain'
                  isLooping
                />
                }







            </View>

        )
    }
}

const dimensions = Dimensions.get('window')


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        alignSelf: 'stretch',
        flex: 1,

        // resizeMode: 'conatin',
        position: 'relative',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',


    },
    row: {
        flexDirection: 'row',
        marginTop: 15,
        width: '100%',
        justifyContent: 'space-around',
        zIndex: 1
    },
    video: {
        borderRadius: 10,
        shadowColor: 'black',
        marginTop: 10,
        width: dimensions.width - 20,
        height: dimensions.height - 150
    },
    preview: {
      alignSelf: 'stretch',
      flex: 1
    }


})
