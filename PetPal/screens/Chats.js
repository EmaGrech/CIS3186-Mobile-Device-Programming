import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {collection,or, where, query, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";
import { ActivityIndicator } from 'react-native';
import { formatTimestamp } from "../components/formatTimestamp";
import { db } from '../FirebaseConfig';

export default function Chats({navigation, route}){

const [conversations, setConversations] = useState([])
const [isLoadingChats, setIsLoadingChats] = useState(true)
//const [userId, setUserId] = useState(route.params.userId);
const {userId} = route.params;

mesgColl = collection(db, "Messages");
userColl = collection(db, "Users");

useEffect(() => {
  const q = query(
    mesgColl,
    or(where('to_uid', '==', userId), where('from_uid', '==', userId)),
    orderBy("last_time", "desc")
  );

  const unsubscribeChats = onSnapshot(q, async (snapshot) => {
    let Convs = [];
    try {
      for (const docum of snapshot.docs) {
        const convData = docum.data();
        let imageUrl;

        const otherUserId = convData.to_uid === userId ? convData.from_uid : convData.to_uid;
        if (otherUserId !== userId) {
          const userDocRef = doc(db, "Users", otherUserId);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            imageUrl = userData.Profile_Picture && userData.Profile_Picture !== ""
              ? userData.Profile_Picture
              : "https://firebasestorage.googleapis.com/v0/b/petpal-3f19d.appspot.com/o/user-icon.jpg?alt=media&token=63fd6f06-6177-4178-8307-f356f6c68a2e";
          }
        }
        Convs.push({ ...convData, id: docum.id, imageUrl });
      }
      setConversations(Convs);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
    setIsLoadingChats(false);
  });

  return () => {
    unsubscribeChats();
  };
}, [userId]);

    const renderNoChats = () => (
        <View style={styles.noChatsContainer}>
          <Image source={require("../assets/noChatsYet.png")} style={styles.imageContainer} />
        </View>
      );
    
      const renderChats = () => (
        conversations.map((conv) => {
          if (!conv.last_time) {
            return (
              <View style={styles.loaderContainer} key={conv.id}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            );
          } else {
            return (
              <TouchableOpacity 
                key={conv.id}
                style={styles.convContainer}
                onPress={() => navigation.navigate('IndividualChatScreen', {
                  chatId: conv.id,
                  userId: userId,
                  interlocutorId: conv.to_uid === userId ? conv.from_uid : conv.to_uid
                })}
              >
                <Image source={{uri: conv.imageUrl.uri}} style={styles.avatar} />
                <View style={styles.chatDetailsContainer}>
                  <Text style={styles.usernameContainer}>
                    {conv.to_uid === userId ? conv.from_name : conv.to_name}
                  </Text>
                  <Text style={styles.mesgTextContainer}>
                    {conv.from_uid === userId ? "You: " : ""}
                    {conv.last_mesg.length > 30
                    ? conv.last_mesg.substring(0, 30) + '...'
                    : conv.last_mesg}
                  </Text>
                </View>
                <Text style={styles.timeText}>
                  {formatTimestamp(conv.last_time)}
                </Text>
              </TouchableOpacity>
            );
          }
        })
      );
    
      return(
      isLoadingChats ? (
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
        padding: 60,
      },
      loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      convContainer: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between', 
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
      chatDetailsContainer: {
        flex: 1,
      },
      timeText: {
        color: 'grey',
        fontSize: 12,
      },
      imageContainer:{
        width:350,
        height:350,
      }
})