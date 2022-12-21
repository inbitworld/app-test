import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { Component, useState } from 'react'
import down from "../assets/down2.png"
import { useFonts } from 'expo-font';
import AntDesign from 'react-native-vector-icons/AntDesign'; 


export default function UnitDropdown(props) {
  const [showdata, setShowdata] = useState(false)
  const [selectdata, setSelectdata] = useState(['Select..'])
  const [selectid, setSelectid] = useState('')
  const [Icon,setIcon]=useState(true)

  const [fontsLoaded] = useFonts({
    'Monsterat': require('../assets/Monts.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  const showData = () => {
    props.onSelect()
    setShowdata(!showdata)
  }

  const dropdownData = (data) => {

    console.log('dropvalue', data)
    const unitData = {
      id: data.id,
      " ":" ",
      customer: data.customer_name
    }
    setSelectdata(Object.values(unitData))

    // setSelectid("data.id")
    // console.log('id....', selectid, 'and', data.id)
    props.sendId(data.id)
    setShowdata(false)
    setIcon(false)
  }

  return (

    <View>
      <TouchableOpacity style={styles.dropdown} onPress={showData}>
        <Text style={styles.text}>{props.data ? selectdata : "Select.."}</Text>
        <Image style={Icon? styles.beforeSelecticon:styles.afterSelecticon} source={down} />
      </TouchableOpacity>
      <View style={!showdata ? styles.afterSelect : styles.beforeSelect}>
        <ScrollView style={{width:"100%",borderColor:"white"}}>
          {showdata ?
            props.data.map((data, id) => {
              return (
                <TouchableOpacity key={id} onPress={() => dropdownData(data)} >
                <View  style={{borderBottomWidth:1,width:"100%",borderRadius:7}}>
                <Text style={{ backgroundColor: "#b0b0b0", marginRight: "15%", width: "100%", fontFamily: "Monsterat"}}>
                    {data.id}
                    
                  </Text>
                  <Text style={{ backgroundColor: "#b0b0b0", marginRight: "15%", width: "100%", fontFamily: "Monsterat" }}>
                    {data.customer_name}
                    
                  </Text>
                  <Text style={{ backgroundColor: "#b0b0b0", marginRight: "15%", width: "100%", fontFamily: "Monsterat" }}>
                    {data.floor_plan}
                  
                  </Text>
                  <Text style={{ backgroundColor: "#b0b0b0", marginRight: "15%", width: "100%", fontFamily: "Monsterat"}}>
                    {data.project_name}
                    
                  </Text>
                </View>
                </TouchableOpacity>
              )
            })
            : null}
        </ScrollView>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    // backgroundColor: "white",
     // justifyContent:"center",
     borderRadius: 4,
   borderWidth:2,
     height: 37,
 
     flexDirection: 'row',
     // justifyContent:"space-evenly",
     alignItems: 'center',
     borderColor:"#ebeded",
     width:"80%",
     marginLeft:"10%",
     // position:"relative",
     //backgroundColor:"pink",
     display:"flex",
     maxWidth:"80%",
     minWidth:"80%"

     
 
 
   },
   text: {
     fontSize: 16,
     marginTop: 5,
    // alignItems: 'center',
     justifyContent:"flex-start",
     color:"#a6adb4",
     marginLeft:"5%"
   },
   beforeSelecticon: {
 
  marginLeft:"60%",
  
 
 
 
   },
   scroll: {
     padding: 10,
     maxHeight: 70,
     marginLeft:"12%"
   },
   beforeSelect: {
    zIndex:1,
    borderWidth:2,
    //padding: 10,
    maxHeight: 140,
    marginLeft: "10%",
    marginRight:"10%"
  },
  afterSelect: {
    padding: 10,
    height: 0,
    marginLeft: "12%",
  },
  afterSelecticon:{
    marginLeft:"30%"
  }
 

})


