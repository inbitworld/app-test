import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  Image, 
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import loginback from "../assets/loginback.png";
import SilohoLogo from "../assets/SilohoLogo.png";
import { useFonts } from 'expo-font';
function HomeScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const width= Dimensions.get(window).width
  //const height=Dimensions.get(window).height
  const [fontsLoaded] = useFonts({
    'Monsterat': require('../assets/Monts.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly" }}>
      <KeyboardAvoidingView behavior="position">
        <ImageBackground resizeMode="cover" source={loginback} style={styles.background}>
          <Text> </Text>
        </ImageBackground>
        <View style={styles.subview}>
          {/* <Text style={styles.heading}>Siloho</Text>
          <Text style={styles.subheading}>simply loveable home</Text> */}
          <Image
          style={{width:"40%",resizeMode:"contain",marginLeft:"28%",marginBottom:-30,marginTop:-30}}
          source={SilohoLogo}
          ></Image>

          <Text style={{ marginLeft: "15%" ,fontFamily:"Monsterat",fontSize:14,color:"#202124"}}>Email</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Type Here"
              placeholderTextColor="#888"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <Text style={{ marginLeft: '15%',fontFamily:"Monsterat",fontSize:14,color:"#202124" }}>Password</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Type Here"
              placeholderTextColor="#888"
              //secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#f0977b",
              marginTop: 15,
              borderRadius: 5,
              padding: 9,
              marginLeft: "15%",
              marginRight: "15%",
              marginBottom:"5%"
              
            }}
            onPress={() => navigation.push("Details")}
          >
            <Text style={styles.button}>Continue</Text>
          </TouchableOpacity>
          <View style={{}}>
            <Text style={styles.vice}>
              By creating an account, I agree with RIFT’s
            </Text>
            <Text style={styles.vice}>
              <Text
                style={{
                  color: "#f0977b", fontFamily:"Monsterat"
                }}
              >
                {" "}
                Privacy Policy
              </Text>{" "}
              and <Text style={{
                color: "#f0977b", fontFamily:"Monsterat"
              }}>Terms of Service.</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    width: Dimensions.get('window').width * 0.7,
    height: 43,
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#707070",
    marginLeft: "15%",
    marginRight: "10%",
    marginBottom: 6
  },

  TextInput: {
    height: 40,
    fontSize: 14,
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#888",
    padding: 6,


  },

  heading: {
    fontSize: 50,
    letterSpacing: 3.3,
    paddingLeft: "28%",
    fontFamily:"Monsterat",
    color:"#202124"
  },
  subheading: {
    fontSize: 18,
    paddingLeft: "28%",
    letterSpacing:-1.4,
    fontFamily:"Monsterat",
    marginBottom:13,
    color:"#202124"
    

  },
  background: {
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('window').height * .4,
    marginTop: 1,
    marginBottom: 25,
  },
  button: {
    fontSize: 15,
    paddingLeft: 85,
    fontFamily:"Monsterat",
    color:'white'
  },
  subview: {
    paddingBottom: 100,
  },
  vice: {
    textAlign: "center",
    fontSize: 12,
    fontFamily:"Monsterat"
    ,color:"#202124"
  },
});

export default HomeScreen;
