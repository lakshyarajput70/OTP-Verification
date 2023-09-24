import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,SafeAreaView , TouchableWithoutFeedback, Keyboard, Alert
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

export default function Screen1() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef();
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (phoneNumber.length !== 10) {
      // Alert.alert("Enter a valid phone number")
      return ;
    } else {
      fetch("http://192.168.8.72:2000/sendOtp", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // phoneNumber
            phoneNumber:formattedValue
        })
    })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                navigation.navigate("Screen2", {phoneNumber:formattedValue})
            }
            else {
                Alert.alert("Error", "Could not Sent OTP");
            }
         })
        .catch(e => {
            Alert.alert("Error", "Could not sign up");
        })

    }
  };



  return (
    // <View style={styles.container}>
    <SafeAreaView style={styles.container}>
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
              height: 100,
              resizeMode: "cover",
            }}
            source={require("./AdmitKard.png")}
          />
        </View>
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <Text style={{ fontSize: 27 }}>Welcome Back</Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 20,
              fontWeight: "500",
              color: "gray",
              letterSpacing: 2,
            }}
          >
            Please sign in to you account
          </Text>
        </View>

        <View
          style={{
            borderRadius: 4,
            borderColor: "black",
            marginHorizontal: 32,
            marginVertical: 2,
            marginTop: 80,
            padding: 8,
          }}
        >
          <View>
            <Text style={{ fontSize: 14, color: "gray" }}>
              Enter Contact Number{" "}
            </Text>
          </View>
          <View>
            <PhoneInput
              maxLength={10} //setting limit of input
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="IN"
              layout="first"
              onChangeText={(text) => {
                setPhoneNumber(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
          </View>
        </View>

        <View style={{ alignItems: "center", marginTop: 30, color: "gray" }}>
          <Text>We will send you a one time SMS message.</Text>
          <Text>Charges may apply</Text>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          // onPress={()=>navigation.navigate("Screen2",{phoneNumber:phoneNumber})}
          style={{
            width: 250,
            backgroundColor: "orange",
            padding: 15,
            marginTop: 100,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 29,
          }}
        >
          <Text style={{ color: "white", fontSize: 17, textAlign: "center" }}>
            Sign in with OTP
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </SafeAreaView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    margin: "auto",
  },
});
