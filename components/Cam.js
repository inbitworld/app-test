// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
// import { Camera, CameraType } from 'expo-camera';
// import { Video } from 'expo-av';
// import circle from "../assets/circle.png"

// const Cam = () => {
//   const [hasAudioPermission, setHasAudioPermission] = useState(null);
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [image, setImage] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [video, setVideo] = useState(null);
//   const [recording, setRecording] = useState(false)

//   const cameraRef = useRef()

//   useEffect(() => {
//     (async () => {
//       const cameraStatus = await Camera.requestCameraPermissionsAsync();
//       setHasCameraPermission(cameraStatus.status === 'granted');
//       const audioStatus = await Camera.requestMicrophonePermissionsAsync();
//       setHasAudioPermission(audioStatus.status === 'granted');
//     })();
//   }, [])

//   // const takePicture = async () => {
//   //     if(camera){
//   //         const data = await camera.takePictureAsync(null)
//   //         setImage(data.uri);
//   //     }
//   //   }

//   //   const takeVideo = async () => {
//   //     if(camera){
//   //         const data = await camera.recordAsync()
//   //         setVideo(data.uri);
//   //         console.log(data.uri);
//   //     }
//   //   }

//   // const onLongPressButton = () => {
//   //   setRecording(true);
//   //   startRecord();
//   // };


//   // const startRecord = async () => {
//   //   setRecording(true);
//   //   console.log("RECORDING");
//   //   if (cameraRef.current) {
//   //     setRecording(true);
//   //     const recordedVideo = await cameraRef.current.recordAsync();
//   //     setVideo(recordedVideo);
//   //   }
//   // };

//   // const stopRecord = async () => {
//   //   await cameraRef.current.stopRecording();
//   //   console.log("STOP RECORDING");
//   //   setRecording(false);
//   // };


//   const handlePhoto = async () => {
//     if (cameraRef.current) {
//       let photo = await cameraRef.current.takePictureAsync({});
//       console.log(photo.uri);
//       setImage(photo.uri)
//     }
//   };


//   return (
//     <View style={{ flex: 1}}>
//       <View style={{flex: 1}}>
//       <Camera
//         style={{  flex: 1,
//           aspectRatio: 1 }}
//         type={type}
//         ref={cameraRef}
//         ratio={'1:1'}

//       />
//       <TouchableOpacity
//       onPress={handlePhoto}

//       >
//            <Image
//            source={circle}

//            />
//       </TouchableOpacity>

//       </View>
//     </View>
//   )


// }
// export default Cam;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import circle from "../assets/circle.png";
import cross from "../assets/cross.png"
import { Video } from 'expo-av'
import MyButton
  from './MyButton';

export default function Cam({ navigation, route }) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [video, setVideo] = useState()
  const [frame1ON, setFrame1ON] = useState(false)
  const [frame2ON, setFrame2ON] = useState(false)
  const [frame3ON, setFrame3ON] = useState(false)
  const [frame4ON, setFrame4ON] = useState(false)
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)
  const [screenheight, setscreenHeight] = useState(null)
  const [screenwidth, setscreenWidth] = useState(null)
  const [displayheight, setdisplayHeight] = useState(null)
  const [displaywidth, setdisplayWidth] = useState(null)
  const [window, setWindow] = useState(Dimensions.get("window"))
  const [screen, setScreen] = useState(Dimensions.get("screen"))





  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }



  let framea = () => {
    // console.log('displayheight: ', this.state.displayheight)
    // console.log('displaywidth: ', this.state.displaywidth)
    // this.setState({ frame1ON: true })
    // this.setState({ frame2ON: false })
    // this.setState({ frame3ON: false })
    // this.setState({ frame4ON: false })
    setFrame1ON(true)
    setFrame2ON(false)
    setFrame3ON(false)
    setFrame4ON(false)
  }

  let frameb = () => {
    // this.setState({ frame2ON: true })
    // this.setState({ frame1ON: false })
    // this.setState({ frame3ON: false })
    // this.setState({ frame4ON: false })
    setFrame2ON(true)
    setFrame1ON(false)
    setFrame3ON(false)
    setFrame4ON(false)

  }
  let framec = () => {
    // this.setState({ frame3ON: true })
    // this.setState({ frame1ON: false })
    // this.setState({ frame2ON: false })
    // this.setState({ frame4ON: false })
    setFrame3ON(true)
    setFrame1ON(false)
    setFrame2ON(false)
    setFrame4ON(false)

  }
  let framed = () => {
    // this.setState({ frame4ON: true })
    // this.setState({ frame1ON: false })
    // this.setState({ frame2ON: false })
    // this.setState({ frame3ON: false })
    setFrame4ON(true)
    setFrame1ON(false)
    setFrame2ON(false)
    setFrame3ON(false)

  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);


  };


  // const takeVideo = async () => {
  //   let options = {

  //     quality:'720p',
  //     maxDuration: 30,
  //     mute: false,


  //   }
  //   cameraRef.current.recordAsync(options).then((recordedVideo) => {
  //     setVideo(recordedVideo);
  //   });
  //   console.log('vdata', newVideo);
  // }

  // const stopRecording = async () => {
  //   console.log('pressout')
  //   await cameraRef.current.stopRecording();

  // }

  // if (video) {
  //   let saveVideo = () => {
  //     MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
  //       setVideo(undefined);
  //       console.log('saved')
  //     });
  //   };
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <Video style={styles.preview} source={{ uri: video.uri }} useNativeControls
  //         resizeMode='contain'
  //         isLooping />
  //       {hasMediaLibraryPermission ? <Button title="Save" onPress={saveVideo} /> : undefined}
  //     </SafeAreaView>
  //   )
  // }
  let recordVideo = () => {

    let options = {
      quality: "720p",
      maxDuration: 600,
      mute: false,

    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
    });
  };

  let stopRecording = () => {

    cameraRef.current.stopRecording();
  };

  if (video) {
    console.log('video', video);
    let shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    let saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };
    let uploadvideo = async () => {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "multipart/form-data");

      let localUri = video.uri;
      let filename = localUri.split('/').pop();
      if (Platform.OS === 'ios' && (filename.endsWith('.heic') || filename.endsWith('.HEIC'))) {
        filename = `${filename.split(".")[0]}.JPG`;
      }
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      console.log('name', filename, 'type', type);

      var formdata = new FormData()
      formdata.append('user_unit_id', route.params.id);
      formdata.append('file', { uri: localUri, name: filename, type })
      // formdata.append('file',this.state.data.mediaType)
      console.log('formdata', formdata);
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

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.row}>
          <MyButton
            title='1/1'
            onPress={framea}
          />
          <MyButton
            title='4/5'
            onPress={frameb}
          />
          <MyButton
            title='4/3'
            onPress={framec}
          />
          <MyButton
            title='9/16'
            onPress={framed}
          />

        </View>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Video
            onLayout={videoframeview}
            style={styles.preview}
            source={{ uri: video.uri }}
            useNativeControls
            resizeMode='contain'
            isLooping
          />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ bottom: 0, position: "absolute", zIndex: 1, marginLeft: -165, marginBottom: 20 }}
            source={cross}
          />
        </TouchableOpacity>
        <View style={{ width: '50%' }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#f0977b",
              padding: 9,
              width: '100%',
              borderRadius: 4,
              borderWidth: 1


            }}
            onPress={uploadvideo}
          >
            <Text style={{ color: 'white', fontFamily: "Monsterat", alignSelf: "center" }}>Share</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }

  let videoframeview = (event) => {
    let videoframeheight = event.nativeEvent.layout.height
  }

  let measureView = (event) => {

    let ih = photo.height
    let iw = photo.width
    let screenheight = event.nativeEvent.layout.height
    let screenwidth = event.nativeEvent.layout.width
    console.log('layoutheight: ', screenheight)
    console.log('layoutwidth: ', screenwidth)

    const widthratio = screenheight / ih

    const heightratio = screenwidth / iw
    let bestratio = Math.min(widthratio, heightratio)
    console.log('bestratio', bestratio);

    let idisplayheight = ih * bestratio
    let idisplaywidth = iw * bestratio
    setdisplayHeight(idisplayheight)
    setdisplayWidth(idisplaywidth)

    console.log('displayheight: ', displayheight)
    console.log('displaywidth: ', displaywidth)
  }

  let frameRatio = () => {
    console.log('data....image', height, 'and', width, 'and', window, 'and', screen)
    if (frame1ON === true) {
      return styles.frame1
    }
    else if (frame2ON === true) {
      return styles.frame2
    }

    else if (frame3ON === true) {
      return styles.frame3
    }

    else if (frame4ON === true) {
      return styles.frame4
    }


  }



  if (photo) {


    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let uploadpic = async () => {
      console.log('photo', route.params.id);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "multipart/form-data");

      let localUri = photo.uri;
      let filename = localUri.split('/').pop();
      if (Platform.OS === 'ios' && (filename.endsWith('.heic') || filename.endsWith('.HEIC'))) {
        filename = `${filename.split(".")[0]}.JPG`;
      }
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      console.log('name', filename, 'type', type);

      var formdata = new FormData()
      formdata.append('user_unit_id', route.params.id);
      formdata.append('file', { uri: localUri, name: filename, type })
      // formdata.append('file',this.state.data.mediaType)
      console.log('formdata', formdata);
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

    let savePhoto = () => {
      // MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
      //   setPhoto(undefined);
      // });
      console.log('dimension', photo.height, photo.width);
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.row}>
          <MyButton
            title='1/1'
            onPress={framea}
          />
          <MyButton
            title='4/5'
            onPress={frameb}
          />
          <MyButton
            title='4/3'
            onPress={framec}
          />
          <MyButton
            title='9/16'
            onPress={framed}
          />

        </View>
        <ImageBackground onLayout={measureView} style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }}>
          <View style={[frameRatio(), { width: "100%" }, { maxHeight: displayheight }, { zIndex: 1 }]}>

          </View>
        </ImageBackground>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ bottom: 0, position: "absolute", zIndex: 1, marginLeft: -165, marginBottom: 20 }}
            source={cross}
          />
        </TouchableOpacity>
        <View style={{ width: '50%' }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#f0977b",
              padding: 9,
              width: '100%',
              borderRadius: 4,
              borderWidth: 1


            }}
            onPress={uploadpic}
          >
            <Text style={{ color: 'white', fontFamily: "Monsterat", alignSelf: "center" }}>Share</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View >
        <TouchableOpacity
          onPress={takePic}
          onLongPress={recordVideo}
          onPressOut={stopRecording}
        >
          <Image
            style={styles.buttonContainer}
            source={circle}
          />

        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ bottom: -240, marginLeft: -150 }}
            source={cross}
          />
        </TouchableOpacity>

      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    bottom: -305, marginBottom: 5, backgroundColor: "#ffff", borderRadius: 30, width: 60, height: 60
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    position: 'relative'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: '#8D8B8B'

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




  }

});