import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions, ImageBackground, FlatList, ScrollView } from 'react-native'
import * as VideoThumbnails from 'expo-video-thumbnails';
import { SafeAreaView } from 'react-native-safe-area-context';

const dimensions = Dimensions.get('window')

export default class Final extends Component {
    constructor(props) {
        super(props)
        this.state = {
        currentUrl:null
        }


    }

    async componentDidMount() {
        const { data } = this.props.route.params
       
        this.setState({currentUrl:data[0]})

        // let localUri = data;
        // let filename = localUri.split('/').pop();
        // if (filename.endsWith('.MOV') || filename.endsWith('.MP4')) {
        //     try {
        //         const { uri } = await VideoThumbnails.getThumbnailAsync(
        //             localUri

        //         );
        //         this.setState({ videoUri: uri });
        //         this.setState({ isVideo: true })
        //     } catch (e) {
        //         console.warn(e);
        //     }
        // };


    }

    share = () => {
        const {id} = this.props.route.params
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "finalized_file_id": id
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

    //     renderItem(item) {
    //         // let localUri = item;
    //         // let filename = localUri.split('/').pop();
    //         // if (filename.endsWith('.MOV') || filename.endsWith('.MP4')) {
    //         //     try {
    //         //         const { uri } =  VideoThumbnails.getThumbnailAsync(
    //         //             localUri

    //         //         );
    //         //         this.setState({ videoUri: uri });
    //         //         this.setState({ isVideo: true })
    //         //     } catch (e) {
    //         //         console.warn(e);
    //         //     }
    //         // };
    // console.log('item',item);
    //         return (
    //         <SafeAreaView style={{flex:1}}>
    //               <Image
    //           style={{alignSelf:"stretch"}}
    //           source={{uri:item}}
    //           />
    //         </SafeAreaView>
    //         )
    //     }



    setbackground = (item) => {
        console.log('current',item)
       this.setState({currentUrl:item})
    }



    render() {
        const { data,id } = this.props.route.params
        return (
            <View style={styles.container}>
            <TouchableOpacity
                       style={{
                           backgroundColor: "#f0977b",
                           padding: 9,
                           width:'50%',
                           borderRadius: 4,





                       }}
                       onPress={this.share}
                   >
                       <Text style={{ color: 'white', fontFamily: "Monsterat", alignSelf: "center" }}>Share</Text>
                   </TouchableOpacity>
           
          
           <Image 
           style={{    
            alignSelf: 'stretch',
           flex: 1,
            resizeMode:'contain',
            position: 'relative',
            display: 'flex',
            alignItems: "center",
            justifyContent: 'center',
            }}
            source={{uri:this.state.currentUrl}}
           >
              
           </Image>
           <View style={styles.carasoul}>
               <FlatList
                   horizontal={true}
                   showsHorizontalScrollIndicator={false}
                   data={data}
                   renderItem={({ item, index }) => (

                       <TouchableOpacity
                           onPress={() => this.setbackground(item)}       
                       >
                           <Image source={{ uri: item }} /* Use item to set the image source */
                               key={index}
                               style={styles.imageContainer}
                           />
                       </TouchableOpacity>
                   )}
               />
           </View>
         
          

         
       </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#e0e5e5'
        
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
        width: dimensions.width / 5,
        height: dimensions.width / 5,
        borderWidth: 2,
        borderColor: "#fa6944",
        resizeMode: 'center',
        margin: 8
    },
    checkMark: {
        zIndex: 1,
        position: 'absolute',
        width: dimensions.width / 10,
        height: dimensions.width / 10,
        alignSelf: 'center',

    },
    carasoul: {
        flex: 1,
        justifyContent: 'flex-end',
        position:'absolute',
        zIndex: 0,
        bottom:0

        

    }
})

// import React, { Component } from 'react'
// import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions, ImageBackground, FlatList, ScrollView } from 'react-native'
// import * as VideoThumbnails from 'expo-video-thumbnails';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const dimensions = Dimensions.get('window')

// export default class Final extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {

//         }


//     }

   
    

 


  
    



//     render() {
//         const { data } = this.props.route.params
//         return (
//             <View style={styles.container}>
//             {
//                 data.map((item,index)=>{
//                     <Image
//                     key={index}
//                     source={{uri:item}}
//                     wid
//                     />
//                 })
//             }
               
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     previewGrid: {
//         width: dimensions.width / 3,
//         height: dimensions.width / 3,
//     },
//     previewList: {
//         borderRadius: 10,
//         margin: 2,
//         marginHorizontal: 4,
//         width: dimensions.width - 8,
//         height: dimensions.width / 3,
//     },
//     imageContainer: {
//         width: dimensions.width / 5,
//         height: dimensions.width / 5,
//         borderWidth: 2,
//         borderColor: "#fa6944",
//         resizeMode: 'center',
//         margin: 8
//     },
//     checkMark: {
//         zIndex: 1,
//         position: 'absolute',
//         width: dimensions.width / 10,
//         height: dimensions.width / 10,
//         alignSelf: 'center',

//     },
//     carasoul: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         marginTop: "100%",
//         marginLeft: "10%",
//         zIndex: 1

//     }
// })
