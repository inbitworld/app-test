import React, { useEffect, useState } from "react";
import { Button, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CityDropdown from "./CityDropdown";
import UnitDropdown from "./UnitDropdown";
import DropDownPicker from 'react-native-dropdown-picker'
import sofa from "../assets/sofaicon.png"
import { useFonts } from 'expo-font';

let dropdata = [{ id: 1, name: "Data1" }, { id: 2, name: "Data2" }, { id: 3, name: "Data3" }, { id: 4, name: "Data4" }, { id: 5, name: "Data5" }]

function DetailsScreen({ navigation }) {
  const [city, setCity] = useState([]);
  const [unit, setUnit] = useState([]);
  const [id, setId] = useState(null);
  const [cityId, setCityID] = useState(null)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [openuser, setOpenuser] = useState(false);
  const [valueuser, setValueuser] = useState(null);
  const [itemsuser, setItemsuser] = useState([]);


  useEffect(() => {

    if (open == true) {
      const getCity = async () => {
        try {
          const response = await fetch('https://uat-ecom.siloho.com/api/RealEstateManagement/get_project_location')
          const json = await response.json()
          const cityData = json.payload
          // setCity(json.payload)
          setItems(json.payload)
          console.log('city', city, json.payload)
        }
        catch (error) {
          console.log('err', error)
        }
      }
      getCity()
      console.log(items);
    }
    if(openuser==true){
    const getUnitdata = async () => {
      try {
        const response = await fetch(`https://uat-ecom.siloho.com/api/RealEstateManagement/get_user_unit_for_location?location_id=${cityId}`)
        const json = await response.json()
        const unitData = json.payload
        setItemsuser(unitData)
        console.log('unit', unitData)
  
      } catch (error) {
  
      }
    }
    getUnitdata()
  }


  }, [open,openuser])

  const [fontsLoaded] = useFonts({
    'Monsterat': require('../assets/Monts.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  const sentCityID = () => {
    setCityID(value)
  }



//  useEffect(()=>{
//   if(openuser==true){
//     const getUnitdata = async () => {
//       try {
//         const response = await fetch(`https://uat-ecom.siloho.com/api/RealEstateManagement/get_user_unit_for_location?location_id=${cityId}`)
//         const json = await response.json()
//         const unitData = json.payload
//         setItemsuser(unitData)
//         console.log('unit', unitData)
  
//       } catch (error) {
  
//       }
//     }
//     getUnitdata()

//   }
  
//  },[openuser])

  const unitId = () => {
    setId(valueuser)
    console.log('detailId....', id)
  }

  const navitgate = () => {
    navigation.push("Camera", { id: id })
  }
  const onPress = () => {
   // unitId();
    navitgate()
  }
  const newdrop = () => {
    navigation.push("DropdownComponent")
  }






  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={newdrop}>
        <Text>Test Drop</Text>
      </TouchableOpacity>
      <Image style={{ marginBottom: 70 }} source={sofa} />

      <View style={styles.city}>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontFamily: "Monsterat" }}> Select City</Text>
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
          onChangeValue={sentCityID}


        />
      </View>

      <View style={styles.unit}>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontFamily: "Monsterat" }}> Select Customer</Text>
        <DropDownPicker
          schema={{
            label: 'customer_name',
            value: 'id'
          }}
          open={openuser}
          value={valueuser}
          items={itemsuser}
          setOpen={setOpenuser}
          setValue={setValueuser}
          setItems={setItemsuser}
          onChangeValue={unitId}
          theme="LIGHT"
          zIndex={1000}
          zIndexInverse={2000}
          


        />
      </View>
      {/* <View style={styles.unit}>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontFamily: "Monsterat" }}> Select Customer</Text>
        <DropDownPicker
          schema={{
            label: 'project_name',
            value: 'id'
          }}
          open={openuser}
          value={valueuser}
          items={itemsuser}
          setOpen={setOpenuser}
          setValue={setValueuser}
          setItems={setItemsuser}
          // onChangeValue={dropdownData}
          theme="LIGHT"
          zIndex={1000}
          zIndexInverse={2000}
          


        />
      </View> */}

      <TouchableOpacity
        style={{
          backgroundColor: "#f0977b",
          marginTop: "50%",
          borderRadius: 4,
          padding: 9,
          paddingLeft: 110,
          paddingRight: 110,

        }}
        onPress={onPress}
      >
        <Text style={{ color: 'white', fontFamily: "Monsterat" }}>NEXT</Text>
      </TouchableOpacity>


    </View>
  );
}


const styles = StyleSheet.create({
  unit: {
    paddingHorizontal: 40,
    zIndex:0
  },
  city:{
    paddingHorizontal: 40,
    zIndex:1
  }

})

export default DetailsScreen;
