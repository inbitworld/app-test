import React, { Component } from 'react'
import { Text, StyleSheet, View, ToastAndroid, ActivityIndicator, FlatList, TouchableOpacity, Image, Share } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from "expo-media-library";
import GalleryPhoto from './GalleryPhoto';
import MyButton from './MyButton'
import CustomerVideo from './CustomerVideo';
import * as Sharing from 'expo-sharing';
import ShareService from './ShareService';


export default class CustomerHouseGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            unitData: [],
            isGridOn: true,
            selected: [],
            image: null,
            user_unit_id: this.props.route.params.id,
            final_url: []
        }


    }






    async componentDidMount() {
        // const response = await fetch(`https://uat-ecom.siloho.com/api/RealEstateManagement/get_final_media?user_unit_id=${this.state.user_unit_id}`)
        // const json = await response.json()
        // const unitData = json.payload
        // console.log('unitdata', unitData);

        this.setState({
            unitData: [
                {
                    id: 1,
                    file_url: 'https://rift-uat.s3.amazonaws.com/photos/2021/05/15/apt1_wDSr7Tx.jpg'
                },
                {
                    id: 2,
                    file_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                },
                {
                    id: 3,
                    file_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                }
            ]
        })


    }

    navigateToCustomerVideo(url) {
        this.props.navigation.navigate('CustomerVideo', { url })
    }

   


    select = (item) => {
        const selected = [...this.state.selected]
        if (selected.includes(item.id)) {
            const index = selected.indexOf(item.id)
            selected.splice(index, 1)
        }
        else {
            selected.push(item.id)
        }
        this.setState({ selected })

        this.setState({ isSelected: true })
        console.log('id', this.state.selected);
        const final_url = [...this.state.final_url]
        if (final_url.includes(item.file_url)) {
            const index = final_url.indexOf(item.file_url)
            final_url.splice(index, 1)
        }
        else {
            final_url.push(item.file_url)
        }
        this.setState({ final_url })
        console.log('url', this.state.final_url);
    }



    share = () => {
        const url = this.state.final_url[0]
        console.log(url);
        ShareService.onShare("Final Video", "Home", url)

    };



    renderItem(item) {
        const { photos, loading, isGridOn, selected, image, user_unit_id } = this.state
        return (
            <CustomerVideo
                data={item}
                isGridOn={isGridOn}
                isSelected={selected.includes(item.id)}
                onLongPress={this.select}
                navigation={this.props.navigation}
            />
        )
    }









    render() {
        const { photos, loading, isGridOn, selected, image, user_unit_id } = this.state

        return (
            <View>
                {
                    this.state.selected.length > 0 ?
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#f0977b",
                                padding: 9,
                                marginLeft: "15%",
                                marginRight: "15%",
                                borderRadius: 4,





                            }}
                            onPress={this.share}
                        >
                            <Text style={{ color: 'white', fontFamily: "Monsterat", alignSelf: "center" }}>Share</Text>
                        </TouchableOpacity>
                        : null
                }
                <FlatList
                    numColumns={1}
                    data={this.state.unitData}
                    renderItem={({ item }) => this.renderItem(item)}

                />

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
    },
    unitData: {
        flex: 1,
    },
    selectedUnitData: {
        flex: 1,
        opacity: 0.6
    }

})

