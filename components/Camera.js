import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import gallery from "../assets/gallery.png";
import camera from "../assets/cam.png";
import vicon from "../assets/vicon.png";
import Cam from "./Cam";

const CameraScreen = ({ navigation, route }) => {
  const [id, setId] = useState(route.params)

  console.log('params', route.params)
  const navigateToCamera = () => {

    navigation.push("Cam", { id: route.params.id })
  }

  const navigateToGallery = () => {
    navigation.push("Gallery", { id: route.params.id })
  }

  const navigateToUnitPhoto=()=>{
    navigation.push('UnitGallery',{ id: route.params.id })
  }
  const navigateToCustomerVideo=()=>{
    navigation.push('CustomerHouseGallery',{ id: route.params.id })
  }

  return (
    <View>
      <View style={{ marginLeft: 160, marginTop: 150 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select</Text>
      </View>
      <View style={{ marginTop: 60, marginLeft: 100 }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#e72a5d",
              justifyContent: "center",
              borderRadius: 6,
              marginRight: 60,
              marginLeft: -30,
            }}
          >
            <TouchableOpacity onPress={navigateToGallery}>
              <Image
                style={{ backgroundColor: "#e72a5d", marginLeft: 18 }}
                source={gallery}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#c037ce",
              justifyContent: "center",
              borderRadius: 6,
              marginLeft: 20,
            }}
          >
            <TouchableOpacity onPress={navigateToCamera}>
              <Image
                style={{ backgroundColor: "#ae2ae7", marginLeft: 18 }}
                source={camera}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: 90,
              marginRight: 72,
              marginLeft: -35,
              textAlign: "center",
            }}
          >
            Choose from Gallery
          </Text>
          <TouchableOpacity onPress={navigateToCamera}>
            <Text>Camera Open</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginTop: 80 }}>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#2acee7",
              justifyContent: "center",
              borderRadius: 6,
              marginRight: 60,
              marginLeft: -30,
            }}
          >
            <TouchableOpacity onPress={navigateToUnitPhoto}>
            <Image
              style={{
                backgroundColor: "#30c4e4",
                borderRadius: 6,
                marginLeft: 18,
                marginTop: 15,
              }}
              source={gallery}
            />
            <Image
              style={{
                backgroundColor: "#30c4e4",
                marginLeft: 50,
                bottom: 10,
                right: 2,
              }}
              source={vicon}
            />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#b1b1b1",
              justifyContent: "center",
              borderRadius: 6,
              marginLeft: 20,
            }}
          >
           <TouchableOpacity onPress={navigateToCustomerVideo}>
           <Image
              style={{
                backgroundColor: "rgba(185, 185, 185, 0.95)",
                borderRadius: 4,
                marginLeft: 18,
                marginTop: 15,
              }}
              source={camera}
            />
            <Image
              style={{
                backgroundColor: "rgba(185, 185, 185, 0.95)",
                marginLeft: 50,
                bottom: 10,
                right: 2,
              }}
              source={vicon}
            />
           </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            width: 90,
            marginLeft: 65,
            marginRight: 70,
            textAlign: "center",
          }}
        >
          Unit Videos & Photos
        </Text>
        <Text style={{ width: 90, textAlign: "center" }}>
          Customer House Video
        </Text>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({});
