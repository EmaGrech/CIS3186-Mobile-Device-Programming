import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

// added this from A
import HorizontalLineWithText from "../components/HorizontalLine";
import Button from "../components/Button";

/*
const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
//Activate the i for password. I CAN ADD THIS LATER*/

const RegisterScreen = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  //const [phone,setPhone] = useState("");
  const navigation = useNavigation();

  const register = () => {
    if (Email === "" || Password === "") {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    createUserWithEmailAndPassword(auth, Email, Password).then(
      (userCredential) => {
        console.log("user credential", userCredential);
        const user = userCredential._tokenResponse.Email;
        const myUserUid = auth.currentUser.uid;

        setDoc(doc(db, "Users", `${myUserUid}`), {
          //changing from users to User
          Email: user,
        });
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/PetPalLogo.png")}
          style={{
            height: 120,
            width: 210,
            resizeMode: "contain",
          }}
        />
        <View style={styles.petPalTextContainer}>
          <Text style={{ fontSize: 15 }}>PetPal</Text>
        </View>
      </View>

      <View style={styles.CreateYourAccountTextContainer}>
        <Text style={{ fontSize: 30 }}>Create Your Account</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputTextContainer}>
          <TextInput
            placeholder="Enter your email"
            //adding these from my logic
            value={Email}
            onChangeText={(text) => setEmail(text)}
            //end

            placeholderTextColor="black"
            style={{
              width: "100%",
            }}
          />
        </View>

        <View style={styles.inputTextContainer}>
          <TextInput
            //adding these from my logic
            value={Password}
            onChangeText={(text) => setPassword(text)}
            //end
            placeholder="Enter your password"
            placeholderTextColor="black"
            secureTextEntry={isPasswordShown}
            style={{
              width: "100%",
            }}
          />

          <TouchableOpacity
            onPress={() => setIsPasswordShown(!isPasswordShown)} /*boolean */
            style={{
              position: "absolute",
              right: 12,
            }}
          >
            {isPasswordShown ? (
              <Ionicons name="eye-off" size={24} color="black" />
            ) : (
              <Ionicons name="eye" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={register} />
      </View>
      <View style={styles.loginContainer}>
        <Text style={{ fontSize: 16 }}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginTextContainer}>Login</Text>
        </Pressable>
      </View>
      <View style={{ top: 60 }}>
        <HorizontalLineWithText text="or" />
      </View>
      <View style={styles.singleSignOnButton}>
        <Button title="Use Single Sign On"></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 100,
    left: 240,
    marginBottom: 60,
  },
  petPalTextContainer: {
    top: -70,
    left: 40,
  },
  CreateYourAccountTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  inputContainer: {
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 50,
    width: "80%",
  },
  inputTextContainer: {
    width: "100%",
    height: 48,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 22,
    marginBottom: 10,
  },
  buttonContainer: {
    width: "40%",
    justifyContent: "center",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "center",
  },
  loginTextContainer: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
  singleSignOnButton: {
    top: 130,
    width: "80%",
    justifyContent: "center",
  },
});

export default RegisterScreen;
