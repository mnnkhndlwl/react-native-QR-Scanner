import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Scanner from "./Scanner";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [code, setCode] = React.useState("");
  const [confirm, setConfirm] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const navigation = useNavigation();

  const signInWithPhonenumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log("Error sending code : ", error);
    }
  };

  const confirmCode = async () => {
    try {
      const userCredential = await confirm.confirm(code);
      setUser(userCredential.user);
    } catch (error) {
      console.log("Error sending code : ", error);
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: "#FF407D",
        }}
      >
        { user ? (
          <Scanner />
        ) : (
          <>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                marginBottom: 40,
                marginTop: 150,
                color: "white",
                alignSelf: "center",
              }}
            >
              QR Scanner
            </Text>
            {!confirm ? (
              <>
                <Text
                  style={{
                    marginBottom: 20,
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  Enter your phone number
                </Text>
                <TextInput
                  style={{
                    height: 50,
                    width: "100%",
                    borderColor: "white",
                    borderWidth: 2,
                    marginBottom: 30,
                    paddingHorizontal: 10,
                    color: "white",
                  }}
                  placeholder="eg., +1 650-555-1234"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                ></TextInput>
                <TouchableOpacity
                  onPress={signInWithPhonenumber}
                  style={{
                    backgroundColor: "#1B3C73",
                    color: "white",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 20,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    Send Code
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text
                  style={{
                    marginBottom: 20,
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  Enter the code sent to your phone number
                </Text>
                <TextInput
                  style={{
                    height: 50,
                    width: "100%",
                    borderColor: "white",
                    borderWidth: 2,
                    color: "white",
                    marginBottom: 30,
                    paddingHorizontal: 10,
                  }}
                  placeholder="Enter code"
                  value={code}
                  onChangeText={setCode}
                ></TextInput>
                <TouchableOpacity
                  onPress={confirmCode}
                  style={{
                    backgroundColor: "#1B3C73",
                    color: "white",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 20,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    confirm code
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </View>
    </>
  );
};

export default Login;
