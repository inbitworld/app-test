import React, { Component } from 'react'
import { Text, StyleSheet, View, ToastAndroid, ActivityIndicator, FlatList } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from "expo-media-library";
import GalleryPhoto from './GalleryPhoto';
import MyButton from './MyButton'


export default class Gallery extends Component {

   constructor(props){
    super(props);
        this.state = {
            loading: false,
            photos: { assets: false },
            isGridOn: true,
            selected: [],
            image:null,
            user_unit_id:this.props.route.params.id
        }
    
   }

   

    pickImage = async () => {
        // No permissions request is necessary for launching the image library
        console.log('props.....',this.state.user_unit_id);
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
         // allowsMultipleSelection:true,
          aspect: [9,16],
          quality: 1,

        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({image:result.uri})
        }
      };

    

    refreshPhotos = async () => {
        const photos = await MediaLibrary.getAssetsAsync({
            first: 50,
            sortBy: MediaLibrary.SortBy.modificationTime,
            mediaType: ['photo', 'video']
        })

        this.setState({
            photos: photos.assets,
        })
    }

    // toggleView = () => {
    //     this.setState(prevState => ({
    //         isGridOn: !prevState.isGridOn
    //     }))
    // }
   

    navigateToCamera = () => {
        this.props.navigation.navigate('Camera', { refresh: this.refreshPhotos })
    }

    removeSelected = async () => {
        console.log('props.....',this.props.route.params.id)
        await MediaLibrary.deleteAssetsAsync(this.state.selected);
        await this.refreshPhotos()
        const message = this.state.selected[0] ? 'Removed selected photos.' : 'No photos selected'
        this.setState({ selected: [] })
        if (Platform.OS == 'android') {
            ToastAndroid.showWithGravity(
                message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }

    }

    select = (id) => {
        const selected = [...this.state.selected]
        if (selected.includes(id)) {
            const index = selected.indexOf(id)
            selected.splice(index, 1)
        }
        else {
            selected.push(id)
        }
        this.setState({ selected })
        // console.log(selected)
    }

    async componentDidMount() {
        this.setState({ loading: true })
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            ToastAndroid.showWithGravity(
                'Access to saved photos denied.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        } else {
            await this.refreshPhotos()
            this.setState({ loading: false })
        }


    }

    sendData=()=>{
        console.log('totaldata',this.state.selected)
    }



    render() {
        const { photos, loading, isGridOn, selected ,image, user_unit_id} = this.state

        return (

            <View>
                

                <View>
                    {
                        loading
                            ?
                            <ActivityIndicator size="large" color="#000000" />
                            :
                            <FlatList
                                style={styles.photos}
                                data={photos}
                                keyExtractor={photo => photo.id}
                                numColumns={isGridOn ? 3 : 1}
                                renderItem={photo => (
                                    <GalleryPhoto
                                        data={photo.item}
                                        isGridOn={isGridOn}
                                        navigation={this.props.navigation}
                                        isSelected={selected.includes(photo.item.id)}
                                        onLongPress={this.select}
                                        refresh={this.refreshPhotos}
                                        totalData={selected}
                                        image={image}
                                        user_unit_id={user_unit_id
                                        
                                        }
                                    />
                                )}
                                key={isGridOn ? 1 : 0}
                            />
                    }
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    },
    buttons: {

    },
    photos: {
        marginBottom: 0
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }

})


// import React, { useState, useEffect } from 'react';
// import { Button, Image, View, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as MediaLibrary from "expo-media-library";

// export default function Gallery() {
//   const [image, setImage] = useState(null);

//   const getImage=()=>{
//     const photos = await MediaLibrary.getAssetsAsync({
//         first: 50,
//         sortBy: MediaLibrary.SortBy.modificationTime,
//         mediaType: ['photo', 'video']
//     })
//   }

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//     </View>
//   );
// }