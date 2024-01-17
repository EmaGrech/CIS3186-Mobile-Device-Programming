import { dbChat } from "./Chats";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import { collection, doc, getDoc, onSnapshot, query, orderBy, addDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Button, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { Keyboard } from "react-native";
import { formatTimestamp } from "../components/formatTimestamp";

export default function IndividualChat({route, navigation}){
    const {chatId, userId, interlocutorId} = route.params;
    const [messages, setMessages] = useState([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [AreUsersLoading, setAreUsersLoading] = useState(true);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [interlocutor, setInterlocutor] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [isMessageSending, setIsMessageSending] = useState(false)

    const accountImage = require("../assets/Person.jpg")

    mesgColl = collection(dbChat, "Messages");
    userColl = collection(dbChat, "Users");

    const GetUsersDocs = async() =>{
      const docInterRef = doc(userColl, interlocutorId)
      const docCurrentRef = doc(userColl, userId)

      const docInterSnap = await getDoc(docInterRef)
      const docCurrentSnap = await getDoc(docCurrentRef)

      setInterlocutor(docInterSnap.data())
      setCurrentUser(docCurrentSnap.data())
      setAreUsersLoading(false)
    }

    /*useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => setIsKeyboardVisible(true)
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => setIsKeyboardVisible(false)
      );
    
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);*/

    useEffect(() => {
        GetUsersDocs();
         console.log("use effetc")
          const docRef = doc(mesgColl, chatId);
          const messageColl = collection(docRef, "mesgArchive");
          const q = query(messageColl, orderBy("timestamp", "asc"));
        
          const unsubscribeMessages = onSnapshot(q, (snapshot) => {
            let Mesg = [];
            snapshot.docs.forEach((doc) => {
              Mesg.push({ ...doc.data(), id: doc.id });
            });
            setMessages(Mesg);
            console.log("messages")
            console.log(isLoadingMessages)
            setIsLoadingMessages(false);
            console.log(isLoadingMessages)
          });
      
          return () => {
            unsubscribeMessages();
          }

        },[]);

      const SendMessage = async (data) => {
        console.log("entrance")
        setIsMessageSending(true)
        console.log(isMessageSending)
        const docChatRef = doc(mesgColl, chatId);
        const messageColl = collection(docChatRef, "mesgArchive")
        console.log("rerefences")

        const newMessage={
          mesg: data.Mesg,
          timestamp: serverTimestamp(),
          userId: userId
        }
        console.log("new message")

        const updatedChat={
          last_mesg: data.Mesg,
          last_time: serverTimestamp(),
          to_uid: interlocutor.id,
          to_name: interlocutor.name,
          from_uid: currentUser.id,
          from_name: currentUser.name
        }
        console.log("updated chat")

        await addDoc(messageColl, newMessage); 
        await setDoc(docChatRef, updatedChat, {merge:true})
        console.log(documents)
        setIsMessageSending(false)
    console.log(isMessageSending)
        setValue('Mesg', '');
      };        
        
      const ConversationHeader = () => {
        return (
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image 
                source={require('../assets/backArrow.png')} 
                style={styles.backArrow}
              />
            </TouchableOpacity>
            <Image 
              source={accountImage} 
              style={styles.personImage}
            />
            <Text style={styles.personName}>
            {interlocutor.name}
            </Text>
          </View>
        );
      }
      
      const MessageList = () => {
        return (
          <ScrollView>
            {messages.length === 0 ? (
              <View style={styles.noMessagesContainer}>
                <Text style={styles.noMessagesText}>There are no messages yet :/</Text>
              </View>
            ) : (
              messages.map((message) => (
                <View 
                  key={message.id} 
                  style={[
                    styles.messageContainer, 
                    message.userId === currentUser.id ? styles.rightAlign : styles.leftAlign
                  ]}
                >
                  <Text style={styles.messageText}>{message.mesg}</Text>
                  <Text style={styles.timestamp}>{formatTimestamp(message.timestamp)}</Text>
                </View>
              ))
            )}
          </ScrollView>
        )
      };

      const { control, handleSubmit, setValue } = useForm();

      const InputContainer = () => {
        return (
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onBlur, value } }) => (
                <TextInput
                  style={styles.inputText}
                  onBlur={onBlur}
                  onChangeText={(mesg) => setValue('Mesg', mesg)}
                  value={value}
                  placeholder="Start typing..."
                  multiline={true}
                  onFocus={(event) => {
                    scrollToInput(event.target);
                  }}
                />
              )}
              name="Mesg"
              defaultValue=""
            />
            <View style={styles.sendButton}>
            <Button title="send" onPress={handleSubmit(SendMessage)}/>
            </View>
          </View>
        );
      };

      const scrollViewRef = useRef(null);
      const scrollRef = useRef(null);
      const scrollToInput = (node) => {
        scrollRef.current?.scrollToFocusedInput(node);
      };
        
      return (
        isLoadingMessages || AreUsersLoading || isMessageSending ?(
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="auto" color="#89CFF0" />
          </View>
        ) : (
          <SafeAreaView style={styles.container}>
          <ConversationHeader />
          <KeyboardAwareScrollView
            ref={scrollViewRef}
            //scrollEnabled={isKeyboardVisible}
            onLayout={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            keyboardShouldPersistTaps={'always'}
            enableOnAndroid={true}
            extraScrollHeight={100}
            contentContainerStyle={{
              flexGrow: 1 
            }}>
              <View style={styles.messagesContainer}>
                <MessageList />
              </View>
            <InputContainer />
          </KeyboardAwareScrollView>
        </SafeAreaView>
        )
      );
}
const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    sendButton:{
        color:"black"
    },
    backArrow: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    personImage: {
      width: 40,
      height: 40,
      borderRadius: 20, 
    },
    personName: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      timestamp: {
        fontSize: 12,
        color: 'grey',
        marginTop: 5,
      },
      messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 20,
        maxWidth: '70%',
      },
      rightAlign: {
        alignSelf: 'flex-end',
        backgroundColor: '#DFECFF',
        marginRight:10 
      },
      leftAlign: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
        marginLeft:10
      },  
     messageText: {
        fontSize: 16,
      },
      container: {
        flex:1
      },
      messagesContainer: {
       flex:1
      },
      inputContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between', 
      },
      inputText: {
        flex: 1,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight:10,
        height: 50,
        maxHeight:200,
      },
      scrollViewStyle: {
        flex:1
      },
      noMessagesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:"50%"
      },
      noMessagesText:{
        fontSize:20,
        color:"grey"
      },
      inputLayout:{
        position:"absolute",
        width:"100%",
        bottom:0
      },
  });
  