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
import { ActivityIndicator } from "react-native-paper";

// added this from A
import HorizontalLineWithText from "../components/HorizontalLine";
import Button from "../components/Button";

const RegisterScreen = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigation = useNavigation();

  const register = () => {

    const emailRegex = /.+@gmail\.com$/; 
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; 
  
    if (Email === "" || Password === "") {
      Alert.alert(
        "Invalid Data",
        "Please fill in all the fields",
        [
          { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
      return; 
    }
  
    if (!emailRegex.test(Email)) {
      Alert.alert("Invalid Email", "Email must be a Gmail address\n (e.g., user@gmail.com)");
      return; 
    }
  
    if (!passwordRegex.test(Password)) {
      Alert.alert(
        "Invalid Password",
        "Your password must include:\n\n" + 
        "- At least 8 characters\n" +
        "- 1 Uppercase letter (A-Z)\n" +
        "- 1 Lowercase letter (a-z)\n" +
        "- 1 Number (0-9)",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
      return; 
    }

    const pasw = Password;
    setEmail("");
    setPassword("");
  
    setIsRegistering(true); 
  
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        console.log("user credential", userCredential);
        const user = userCredential.user.email;
        const myUserUid = userCredential.user.uid;
  
        setDoc(doc(db, "Users", myUserUid), {
          Email: user,
          Password:pasw
        })
        .then(() => {
          const initialData = {
            Email: user,
            Password:pasw,
            id:myUserUid
          };
          navigation.replace("Form", { collName: 'Users', editMode: true, initialData: initialData, fromLogin:true });
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          
          Alert.alert(
            "Already Registered",
            "You are already registered with us, sign in instead?",
            [
              { 
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { 
                text: "Login", 
                onPress: () => navigation.navigate("Login") 
              }
            ],
            { cancelable: false }
          );
        } else {

          Alert.alert("Registration Error", error.message);
        }
        setIsRegistering(false); 
      })
    };

  return (
    isRegistering? (
      <View style ={styles.loading}>
           <ActivityIndicator size="auto" color="#89CFF0" />
        </View>
    ):(
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
            value={Email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="black"
            style={{
              width: "100%",
            }}
          />
        </View>

        <View style={styles.inputTextContainer}>
          <TextInput
            value={Password}
            onChangeText={(text) => setPassword(text)}
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
  ));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"white"
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
  loading:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"white"
  }
});

export default RegisterScreen;
