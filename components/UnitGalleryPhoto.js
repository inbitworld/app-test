import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import * as VideoThumbnails from 'expo-video-thumbnails';

const dimensions = Dimensions.get('window')

export default class UnitGalleryPhoto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_unit_id: this.props.user_unit_id,
            isVideo: false,
            videoUri: null
        }


    }

   async componentDidMount() {
        const { data } = this.props

        let localUri = data.file_url;
        let filename = localUri.split('/').pop();
        if (filename.endsWith('.mov') || filename.endsWith('.mp4')) {
            try {
                const { uri } = await VideoThumbnails.getThumbnailAsync(
                    localUri,
                    {
                        time: 2000,
                    }
                    
                );
                this.setState({ videoUri: uri });
                this.setState({ isVideo: true })
            } catch (e) {
                console.warn(e);
            }
        };

        
    }


    navigateToPhoto = (data, user_unit_id) => {
        //  console.log('userunitdta....',this.props);
        const { refresh } = this.props
        this.props.navigation.navigate('UnitPhoto', { data })
    }

    render() {
        const { data, isGridOn, onLongPress, isSelected, image, user_unit_id } = this.props
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => { this.navigateToPhoto(data) }}
                onLongPress={() => { onLongPress(data) }}
            >
                <View style={isSelected ? styles.imageContainer : false}>
                    {
                        isSelected
                            ?
                            <Image
                                style={styles.checkMark}
                                source={require('../assets/check-mark.png')}
                            />
                            : false
                    }
                    <Image
                        style={isGridOn ? styles.previewGrid : styles.previewList}
                        source={!this.state.isVideo? { uri: data.file_url } : {uri:this.state.videoUri}}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    previewGrid: {
        width: dimensions.width / 3,
        height: dimensions.width / 3,
    },
    previewList: {
        borderRadius: 10,
        margin: 2,
        marginHorizontal: 4,
        width: dimensions.width - 8,
        height: dimensions.width / 3,
    },
    imageContainer: {
        opacity: 0.7,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkMark: {
        zIndex: 1,
        position: 'absolute',
        width: dimensions.width /10,
        height: dimensions.width / 10,
        alignSelf:'center',
        
    },
})
