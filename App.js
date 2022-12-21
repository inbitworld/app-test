/*import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import logo from "./assets/logo.png";

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.imgur.com/TkIrScD.png" }}
        style={styles.logo}
      />

      <Text style={styles.text}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>
      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={{ backgroundColor: '#888' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Pick a photo</Text>
      </TouchableOpacity>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffg",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 30,
  },
  text: {
    color: "blue",
    fontSize: 18,
    marginHorizontal: 15,
  },
});*/
import * as React from "react";
import { Button,View, Text } from "react-native";
import { NavigationContainer, } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/Home";
import DetailsScreen from "./components/Detail";
import CameraScreen from "./components/Camera";
import Splash from "./components/Splash";
import Cam from "./components/Cam";
import Gallery from "./components/Gallery";
import Photo from "./components/Photo";
import UnitGallery from "./components/UnitGallery";
import UnitPhoto from "./components/UnitPhoto";
import CustomerHouseGallery from "./components/CustomerHouseGallery";
import Final from "./components/Final";
import DropdownComponent from "./components/DropdownComponent";
import CustomerVideo from "./components/CustomerVideo";
import FinalVideo from "./components/FinalVideo";



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      
      >
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Cam" component={Cam}  options={{ headerShown: false }} />
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="Photo" component={Photo}  />
        <Stack.Screen name="UnitGallery" component={UnitGallery}  />
        <Stack.Screen name="UnitPhoto" component={UnitPhoto}  />
        <Stack.Screen name="CustomerHouseGallery" component={CustomerHouseGallery}  />
        <Stack.Screen name="CustomerVideo" component={CustomerVideo}  />
        <Stack.Screen name="FinalVideo" component={FinalVideo}  />
        <Stack.Screen name="Final" component={Final}  />
        <Stack.Screen name="DropdownComponent" component={DropdownComponent}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
