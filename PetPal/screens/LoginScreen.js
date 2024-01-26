import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from '../db';
import { createUserWithEmailAndPassword } from "firebase/auth";
import HorizontalLineWithText from "../components/HorizontalLine";
import { Alert, ActivityIndicator } from "react-native";


const LoginScreen = () => {
  const [Email, setEmail] = useState("");
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [Password, setPassword] = useState("");
  //password shown added by A
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        console.log("User not logged in");
      }
      if (authUser) {
        console.log("User logged in:", authUser);
        navigation.replace("Discover", { userID: authUser.uid });
      }
    });

    return unsubscribe;
  }, []);

  const login = () => {
    const emailRegex = /.+@gmail\.com$/;
    const passwordRegex = /^.{6,}$/;
 

    if (Email === "" || Password === "") {
      Alert.alert(
        "Invalid Data",
        "Please fill in all the fields",
        [
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
        "It must be with at least 6 characters", 
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
      return; 
    }

    setIsLoadingLogin(true); 

    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        setIsLoadingLogin(false); 
        const user = userCredential.user;
        const uID = user.uid;
        AsyncStorage.setItem("userID", uID);
        navigation.replace("Discover");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            alert("Invalid Email");
            break;
          case "auth/invalid-password":
            alert("Invalid password");
            break;
          case "auth/too-many-requests":
            alert("Too many failed login attempts.");
            break;
          default:
            alert("Opps","Invalid credencial, try again");
        }
      });
  };

  return (
    isLoadingLogin? (
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
        <Text style={{ fontSize: 30 }}>Welcome Back!</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputTextContainer}>
          <TextInput
            placeholder="Enter your email"
            // adding my logic
            value={Email}
            onChangeText={(text) => setEmail(text)}
            // end
            placeholderTextColor="black"
            style={{
              width: "100%",
            }}
          />
        </View>

        <View style={styles.inputTextContainer}>
          <TextInput
            // adding my logic
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
            onPress={() => setIsPasswordShown(!isPasswordShown)}
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
        <Button title="Continue" onPress={login} />
      </View>
      <View style={styles.loginContainer}>
        <Text style={{ fontSize: 16 }}>Aren't registered yet?</Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.loginTextContainer}>Sign Up</Text>
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

export default LoginScreen;

//creates a new user id for authentication
export const createNewUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    const uid = user.uid;
    return { user, uid };
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("Email is already in use.");
    } else {
      alert("Something went wrong. Please try again.");
    }
    throw error;
  }
}