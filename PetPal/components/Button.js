import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Button = (props) => {

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 20, color: "white"}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 15,
        paddingTop:15,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#89CFF0"
    }
})
export default Button