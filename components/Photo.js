import React, { Component, createRef } from 'react'
import { Text, StyleSheet, View, Dimensions, ToastAndroid,TouchableOpacity, ImageBackground } from 'react-native'
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';
import { Video } from 'expo-av';
import MyButton from './MyButton'



const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default class Photo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            frame1ON: false,
            frame2ON: false,
            frame3ON: false,
            frame4ON: false,
            heigth: this.props.route.params.data.height,
            width: this.props.route.params.data.width,
            data: this.props.route.params.data,
            window: Dimensions.get("window"),
            screen: Dimensions.get("screen"),
            screenheight: null,
            screenwidth: null,
            displayheight: null,
            displaywidth: null,
            user_unit_id: this.props.route.params.user_unit_id


        }
    }



    framea = () => {
        console.log('displayheight: ', this.state.displayheight)
        console.log('displaywidth: ', this.state.displaywidth)
        this.setState({ frame1ON: true })
        this.setState({ frame2ON: false })
        this.setState({ frame3ON: false })
        this.setState({ frame4ON: false })
        //  this.setState({imgHeigth:data.height})
        //  this.setState({imgWidth:data.width})
    }

    frameb = () => {
        this.setState({ frame2ON: true })
        this.setState({ frame1ON: false })
        this.setState({ frame3ON: false })
        this.setState({ frame4ON: false })
        //  this.setState({imgHeigth:data.height})
        //  this.setState({imgWidth:data.width})
    }
    framec = () => {
        this.setState({ frame3ON: true })
        this.setState({ frame1ON: false })
        this.setState({ frame2ON: false })
        this.setState({ frame4ON: false })
        //  this.setState({imgHeigth:data.height})
        //  this.setState({imgWidth:data.width})
    }
    framed = () => {
        this.setState({ frame4ON: true })
        this.setState({ frame1ON: false })
        this.setState({ frame2ON: false })
        this.setState({ frame3ON: false })
        //  this.setState({imgHeigth:data.height})
        //  this.setState({imgWidth:data.width})

    }

    share = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "multipart/form-data");
        let uri = this.state.data.uri
        let myAssetId = uri.slice(5);
        console.log('assetid',myAssetId);
        let returnedAssetInfo = await MediaLibrary.getAssetInfoAsync(myAssetId);
        console.log('loacal uri........', returnedAssetInfo)
        let localUri = returnedAssetInfo.localUri;
        let filename = localUri.split('/').pop();
        if (Platform.OS === 'ios' && (filename.endsWith('.heic') || filename.endsWith('.HEIC'))) {
            filename = `${filename.split(".")[0]}.JPG`;
        }
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        var formdata = new FormData()
        formdata.append('user_unit_id', this.state.user_unit_id);
        formdata.append('file', { uri: localUri, name: filename, type })
        // formdata.append('file',this.state.data.mediaType)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://uat-ecom.siloho.com/api/RealEstateManagement/post_user_unit_media/", requestOptions)
            .then(response => response.text())
            .then(result => console.log("result", result))
            .catch(error => console.log('error', error));


    }




    frameRatio = () => {
        console.log('data....image', this.state.heigth, 'and', this.state.width, 'and', this.state.window, 'and', this.state.screen)
        if (this.state.frame1ON === true) {
            return styles.frame1
        }
        else if (this.state.frame2ON === true) {
            return styles.frame2
        }

        else if (this.state.frame3ON === true) {
            return styles.frame3
        }

        else if (this.state.frame4ON === true) {
            return styles.frame4
        }


    }
    measureView(event) {
        //console.log('event properties: ', event);

        console.log('unit_data', this.state.data)
        let ih = this.state.heigth
        let iw = this.state.width
        let screenheight = event.nativeEvent.layout.height
        let screenwidth = event.nativeEvent.layout.width
        console.log('layoutheight: ', screenheight)
        console.log('layoutwidth: ', screenwidth)

        const widthratio = screenheight / ih
        const heightratio = screenwidth / iw
        let bestratio = Math.min(widthratio, heightratio)
        console.log('bestratio', bestratio);

        let displayheight = ih * bestratio
        let displaywidth = iw * bestratio
        this.setState({ displayheight: displayheight })
        this.setState({ displaywidth: displaywidth })
        // console.log('displayheight: ', this.state.displayheight)
        // console.log('displaywidth: ', this.state.displaywidth)
    }







    render() {
        const { data, user_unit_id } = this.props.route.params
        return (

            <View style={styles.container} >
                <View style={styles.row}>
                    <MyButton
                        title='1/1'
                        onPress={this.framea}
                    />
                    <MyButton
                        title='4/5'
                        onPress={this.frameb}
                    />
                    <MyButton
                        title='4/3'
                        onPress={this.framec}
                    />
                    <MyButton
                        title='9/16'
                        onPress={this.framed}
                    />

                </View>
                {this.state.data.mediaType == "photo" ?

                    <ImageBackground
                        onLayout={(event) => this.measureView(event)}

                        style={[styles.image]}
                        source={{ uri: data.uri }}
                        resizeMode='contain'
                        ref={this.imageRef}>



                        <View style={[this.frameRatio(), { width: this.state.displaywidth }, { maxHeight: this.state.displayheight }]}>

                        </View>


                    </ImageBackground>

                    :

                    <Video
                        style={styles.video}
                        source={{ uri: data.uri }}
                        useNativeControls
                        resizeMode='contain'
                        isLooping
                    >
                        <View style={[this.frameRatio(), { width: this.state.displaywidth }, { maxHeight: this.state.displayheight }]}>

                        </View>
                    </Video>
                }
                <View style={{ width: '50%',marginBottom:'1%' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#f0977b",
                            padding: 9,
                            width: '100%',
                            borderRadius: 4,

                        }}
                        onPress={this.share}
                    >
                        <Text style={{ color: 'white', fontFamily: "Monsterat", alignSelf: "center" }}>Share</Text>
                    </TouchableOpacity>

                </View>

            </View>

        )
    }
}

const dimensions = Dimensions.get('window')

// const data=this.props.route.params.data

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#e0e5e5'

    },
    image: {
        alignSelf: 'stretch',
        flex: 1,

        // resizeMode: 'conatin',
        position: 'relative',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',

        //width:Dimensions.get('window').width,
        //height:Dimensions.get('window').height

    },
    row: {
        flexDirection: 'row',
        marginTop: 15,
        width: '100%',
        justifyContent: 'space-around',
        zIndex: 1
    },
    video: {
        alignSelf: 'stretch',
        flex: 1,

    },
    frame2: {
        opacity: 1,
        borderWidth: 4,
        // borderStyle: 'line',
        borderColor: "black",
        aspectRatio: 4 / 5,
        // width:data.width, 
        // height:data.height

        maxWidth: "100%",


    },
    frame4: {
        opacity: 1,
        borderWidth: 4,
        // borderStyle: 'line',
        borderColor: "black",
        aspectRatio: 9 / 16,

        maxWidth: "100%",

    }
    ,
    frame3: {
        opacity: 1,
        borderWidth: 4,
        // borderStyle: 'line',
        borderColor: "black",
        aspectRatio: 4 / 3,
        // width:data.width,
        // height:data.height


        maxWidth: "100%",

    },
    frame1: {
        opacity: 1,
        borderWidth: 4,
        // borderStyle: 'line',
        borderColor: "black",
        aspectRatio: 1 / 1,


        maxWidth: "100%",




    },
    row: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'grey',
        backgroundColor:'#8D8B8B'

    }

})
