import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { OTPInput, OtpInput } from "react-native-otp-entry";

const Screen2 = () => {
  const route = useRoute();
  const {phoneNumber} =route.params;
  const [code, setCode] = useState("");
  const navigation = useNavigation();
  const handleVerify = () => {
    fetch("http://192.168.8.72:2000/verification", {
    // fetch("http://192.168.43.4:2000/verification", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        code: code,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          navigation.navigate("Screen3");
        } else {
          Alert.alert("Error", "Could not sign up");
        }
      })
      .catch((e) => {
        Alert.alert("Error", "Could not sign up");
      });
  };

  const handleResend = () => {
      // fetch("http://192.168.43.4:2000/sendOTP", {
      fetch("http://192.168.8.72:2000/sendOTP", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            navigation.navigate("Screen2", { phoneNumber: formattedValue });
          } else {
            Alert.alert("Error", "Could not Sent OTP");
          }
        })
        .catch((e) => {
          Alert.alert("Error", "Could not sign up");
        });
    
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop:100,
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Image
          style={{
            width: 150,
            height: 150,
            resizeMode: "cover",
          }}
          source={require("./Mobile-Verification.png")}
        />
      </View>
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Text style={{ fontSize: 23, color: "gray" }}>
          Please verify Mobile number
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 20,
            fontWeight: "500",
            color: "gray",
          }}
        >
          An OTP is sent to {phoneNumber}
        </Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: "orange",
              fontSize: 12,
              textDecorationLine: "underline",
              marginVertical: 2,
            }}
          >
            Change Phone Number
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          width: 300,
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 70,
        }}
      >
        <OtpInput
          numberOfDigits={6}
          focusColor="orange"
          onTextChange={(text) => setCode(text)}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          marginTop: 100,
          color: "gray",
        }}
      >
        <Text>Didn't receive the code?</Text>
        <Pressable onPress={handleResend} >
          <Text style={{ color: "orange", fontSize: 18, marginHorizontal: 5 }}>
            Resend
          </Text>
        </Pressable>
      </View>
      <TouchableOpacity
        onPress={handleVerify}
        // onPress={()=>navigation.navigate("Screen3")}
        style={{
          width: 250,
          backgroundColor: "orange",
          padding: 15,
          marginTop: 20,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 29,
        }}
      >
        <Text style={{ color: "white", fontSize: 17, textAlign: "center" }}>
          Verify
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    margin: "auto",
  },
});
