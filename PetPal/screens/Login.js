import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from '../components/Button';
import { StyleSheet } from 'react-native';
import HorizontalLineWithText from '../components/HorizontalLine';

const Login = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);

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
                <Text style={{ fontSize: 30 }}>Welcome Back!</Text>
            </View>

            <View style={styles.inputContainer}>

            <View style={styles.inputTextContainer}>
                    <TextInput
                        placeholder='Enter your email'
                        placeholderTextColor="black"
                        style={{
                            width: "100%"
                        }}
                    /></View>

                <View style={styles.inputTextContainer}>
                    <TextInput
                        placeholder='Enter your password'
                        placeholderTextColor="black"
                        secureTextEntry={isPasswordShown}
                        style={{
                            width: "100%"
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => setIsPasswordShown(!isPasswordShown)}
                        style={{
                            position: "absolute",
                            right: 12
                        }}
                    >
                        {
                            isPasswordShown ? (
                                <Ionicons name="eye-off" size={24} color="black" />
                            ) : (
                                <Ionicons name="eye" size={24} color="black" />
                            )
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                    <Button title="Continue"
                    onPress={() => navigation.navigate("AppNavigation")}/>
            </View>
            <View style={styles.loginContainer}>

                        <Text style={{fontSize: 16}}>
                             Aren't registered yet?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Signup")}>
                            <Text style={styles.loginTextContainer}>Sign Up</Text>
                        </Pressable>
            </View>
            <View style={{top:60}}>
            <HorizontalLineWithText text="or"/>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'absolute',
        top: 100,
        left:240,
        marginBottom:60
    },
    petPalTextContainer: {
        top:-70,
        left:40
    },
    CreateYourAccountTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    inputContainer: {
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 50,
        width: '80%',
    },
    inputTextContainer: {
        width: '100%',
        height: 48,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 22,
        marginBottom:10
    },
    buttonContainer:{
        width:"40%",
        justifyContent:"center"
    },
    loginContainer:{
        flexDirection: "row",
        marginTop: 12,
        justifyContent: "center"
    },
    loginTextContainer:{
        fontSize: 16, 
        fontWeight: "bold", 
        marginLeft: 4
    },
    singleSignOnButton:{
        top:130,
        width:"80%",
        justifyContent:'center'
    }
});

export default Login
