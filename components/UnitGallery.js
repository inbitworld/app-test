import React, { Component } from 'react'
import { Text, StyleSheet, View, ToastAndroid, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from "expo-media-library";
import GalleryPhoto from './GalleryPhoto';
import MyButton from './MyButton'
import UnitGalleryPhoto from './UnitGalleryPhoto';
import { SafeAreaView } from 'react-native-safe-area-context';


export default class UnitGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            unitData: [],
            isGridOn: true,
            selected: [],
            image: null,
            user_unit_id: this.props.route.params.id,
            final_url:[],
            final_id:[]
        }

    }






    async componentDidMount() {
        const response = await fetch(`https://uat-ecom.siloho.com/api/RealEstateManagement/get_user_unit_media/?user_unit_id=${this.state.user_unit_id}`)
        const json = await response.json()
        const unitData = json.payload
        console.log('unitdata', unitData);

        this.setState({
            unitData: unitData,
        })

    }

    navigateToUnitPhoto(url) {
        this.props.navigation.navigate('UnitPhoto', { url })
    }

    share = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "finalized_file_id": this.state.selected
        });
        console.log('selected',this.state.selected);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://uat-ecom.siloho.com/api/RealEstateManagement/finalize_user_unit_media/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        this.setState({ selected: [] })

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
        const final_url=[...this.state.final_url]
        if (final_url.includes(item.file_url)) {
            const index = final_url.indexOf(item.file_url)
            final_url.splice(index, 1)

        }
        else {
            final_url.push(item.file_url)
        }
        this.setState({final_url})
        console.log('url', this.state.final_url);
    }







    renderItem(item) {
        const { photos, loading, isGridOn, selected, image, user_unit_id } = this.state
        return (
            <UnitGalleryPhoto
                data={item}
                isGridOn={isGridOn}
                isSelected={selected.includes(item.id)}
                onLongPress={this.select}
                navigation={this.props.navigation}
            />
        )
    }


next=()=>{
console.log('final_url',this.state.final_url,this.state.selected)
this.props.navigation.navigate("Final",{data:this.state.final_url,id:this.state.selected})
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
                            onPress={this.next}
                        >
                            <Text style={{ color: 'white', fontFamily: "Monsterat", alignSelf: "center" }}>Next</Text>
                        </TouchableOpacity>
                        : null
                }

                
                    <FlatList
                        numColumns={3}
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

