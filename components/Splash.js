import { View, Text ,ImageBackground, Image} from 'react-native'
import React from 'react'
import silohogif from "../assets/silohogif.gif"


const Splash = ({ navigation }) => {
    setTimeout(()=>{
   navigation.replace("Home")
    },8000)

  return (
    <Image style={{justifyContent:"center"}} source={silohogif}>

    </Image>
  )
};





export default Splash;