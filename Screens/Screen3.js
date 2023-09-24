import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const Screen3 = () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Image
          style={{
            width: 300,
            height: 400,
            resizeMode: "cover",
          }}
          source={require("./tech.png")}
        />
      </View>
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Text style={{ fontSize: 23 }}>Welcome to AdmitKard</Text>
      </View>

      <View style={{alignItems:'center'}}>
        <Text
          style={{

            fontSize: 14,
            marginTop: 20,
            fontWeight: "500",
            color: "gray",
          }}
        >
          In order to provide you with
        </Text>
        <Text>a custom experience,</Text>
        <Text color={{color:'black'}}>we need to as you a few question.</Text>
      </View>

      <TouchableOpacity
        style={{
          width: 200,
          backgroundColor: "orange",
          padding: 15,
          marginTop: 90,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 29,
        }}
      >
        <Text style={{ color: "white", fontSize: 17, textAlign: "center" }}>
          Get Started
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          textAlign: "center",
          marginTop: 4,
          color: "gray",
          letterSpacing: 2,
          fontSize: 10,
        }}
      >
        *This will only take 5 min
      </Text>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Screen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    margin: "auto",
  },
});
