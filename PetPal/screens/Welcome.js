import { View, Text, Image } from 'react-native'
import React from 'react'
import Button from '../components/Button';

const Welcome = ({ navigation }) => {

    return (
            <View style={{ flex: 1 }}>
                <View style={{alignItems: "center"}}>
                    <Image
                        source={require("../assets/PetPalLogo.png")}
                        style={{
                            height: 200,
                            width: 100,
                            position: "absolute",
                            top: 100,
                            resizeMode:"contain"
                        }}/>
                </View>
                <View style={{
                    alignItems:"center",
                    position: "absolute",
                    top: 300,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 38,
                        fontWeight: 400,
                        color: "black"
                    }}>PetPal</Text>

                    <View style={{ alignItems:'center', marginTop:5 }}>
                        <Text style={{
                            fontSize: 22,
                            color: "black",
                            marginVertical: 4
                        }}>Your One Stop Pet Shop</Text>
                    </View>
                                        
                    <View style={{marginTop:250, width:"80%", justifyContent:"center"}}>
                    <Button
                        title="Sign Up"
                        onPress={() => navigation.navigate("Register")}
                    />

                    <View style={{marginTop:20}}>
                    <Button
                        title="Login"
                        onPress={() => navigation.navigate("Login")}
                    />
                    </View>
                    </View>
                </View>
            </View>
    )
}

export default Welcome