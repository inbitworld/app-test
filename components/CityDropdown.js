import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView , TextInput} from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import down from "../assets/down2.png"
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import DropDownPicker from 'react-native-dropdown-picker';



export default function CityDropdown(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(props.data);
  console.log('props...',props.data,open)


  // const showData = () => {
  //   props.onSelect()
  //   setShowdata(!showdata)
  // }
  useEffect(()=>{
     if(open==true){
      props.onSelect()
      
     }else{
      setItems([])
     }
    
  },[open])
  
  const dropdownData=()=>{
console.log(value)
// props.sentCityID(data)


  }
  console.log('item',items)

  return (

    
    <DropDownPicker
     schema={{
      label: 'location_name',
      value: 'location_id'
    }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
     // onChangeValue={dropdownData}
      theme="LIGHT"
      zIndex={2000}
      zIndexInverse={1000}
      
     
    />

   
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
   icon: {
 
  marginLeft:"60%",
 
 
 
   },
   scroll: {
     padding: 10,
     maxHeight: 70,
     marginLeft:"12%"
   },
   beforeSelect: {
    //padding: 10,
    maxHeight: 120,
   // marginLeft: "12%",
  },
  afterSelect: {
    padding: 10,
    height: 0,
    marginLeft: "12%",
  }
 

})