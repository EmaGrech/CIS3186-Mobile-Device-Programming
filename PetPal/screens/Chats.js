import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const [conversations, setConversations] = useState([])
const [isLoadingChats, setIsLoadingChats] = useState(true)

const app = initializeApp(firebaseConfig, "chat");
const db = getFirestore(app);

export { db};

const firebaseConfig = {
    apiKey: "AIzaSyDrvXycbaOQE8i5oLDaGDSYfABnpjsQ1II",
    authDomain: "chatapp-e00b1.firebaseapp.com",
    projectId: "chatapp-e00b1",
    storageBucket: "chatapp-e00b1.appspot.com",
    messagingSenderId: "1071173191697",
    appId: "1:1071173191697:web:bfe7c84a6c234f54fe89b0"
  };

export default function Chats({navigation, route}){

 const accountImage = require("../assets/Person.jpg")
 const userId = "BZNIE9P380QSIJ4D1pPF"
 //userId = "GuPJWnzJyjH2CjkzgZQR" //no chats user

   useEffect(() => {
    const q = query(
        mesgColl,
            or(where('to_uid', '==', userId),
            where('from_uid', '==', userId)),
            orderBy("last_time", "desc")
      );

      const unsubscribeChats = onSnapshot(q, (snapshot) => {
        let Convs = [];
        snapshot.docs.forEach((doc) => {
          Convs.push({ ...doc.data(), id: doc.id });
        });
        setConversations(Convs);
        setIsLoadingChats(false);
      });

      return () => {
        unsubscribeChats();
      };
    },[])

    const renderNoChats = () => (
        <View style={styles.noChatsContainer}>
          <Image source={require("../assets/noChatsYet.png")} />
        </View>
      );
    
      const renderChats = () => (
        conversations.map((conv) => (
          <TouchableOpacity 
            key={conv.id}
            style={styles.convContainer}
            onPress={() => navigation.navigate('IndividualChatScreen', {
                chatId: conv.id,
                UserId: userId,
                interlocutorId: conv.to_uid === userId ? conv.from_uid : conv.to_uid
                })}
          >
            <Image source={accountImage} style={styles.avatar} />
            <View>
              <Text style={styles.usernameContainer}>
                {conv.to_uid === userId ? conv.from_name : conv.to_name}
              </Text>
              <Text style={styles.mesgTextContainer}>
                {conv.last_mesg.length > 30
                  ? conv.last_mesg.substring(0, 30) + '...'
                  : conv.last_mesg}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      );
    
      return(
      isLoadingChats? (
        <View style={styles.loaderContainer}>
           <ActivityIndicator size="auto" color="#89CFF0" />
        </View>
        ):( 
        <View style={{ maxHeight: "90%" }}>
          <ScrollView>
            {conversations.length === 0 ? renderNoChats() : renderChats()}
          </ScrollView>
        </View>
      ))
}

const styles = StyleSheet.create({
    noChatsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      convContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
      },
      usernameContainer: {
        fontWeight: 'bold',
        fontSize: 16,
      },
      mesgTextContainer: {
        color: 'grey',
        marginTop: 5,
      },
})