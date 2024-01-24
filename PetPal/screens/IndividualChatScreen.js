import { db } from '../FirebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import { collection, doc, getDoc, onSnapshot, query, orderBy, addDoc, setDoc, serverTimestamp, getDocs, where } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Button, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { formatTimestamp } from "../components/formatTimestamp";

export default function IndividualChat({route, navigation}){
    const { userId, interlocutorId } = route.params;
    const [chatId, setChatId] = useState(route.params.chatId);
    const [messages, setMessages] = useState([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [AreUsersLoading, setAreUsersLoading] = useState(true);
    const [interlocutor, setInterlocutor] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    console.log(userId, interlocutorId, chatId)

    mesgColl = collection(db, "Messages");
    userColl = collection(db, "Users");

    const GetUsersDocs = async() =>{
      const docInterRef = doc(userColl, interlocutorId)
      const docCurrentRef = doc(userColl, userId)
      
      try{
      const docInterSnap = await getDoc(docInterRef)
      const docCurrentSnap = await getDoc(docCurrentRef)

      setInterlocutor({...docInterSnap.data(), id: docInterSnap.id})
      setCurrentUser({...docCurrentSnap.data(), id: docCurrentSnap.id})
      console.log("interlocutor"+interlocutor)
      console.log("user"+currentUser)
      
      }
      catch (e){
           console.log("Error", e)}
    setAreUsersLoading(false)
    }

    useEffect(() => {
      GetUsersDocs()
    }, []);
  
    useEffect(() => {

      async function checkAndCreateDocument() {

        if (!AreUsersLoading) {
          checkAndCreateDocument();
        }

        let unsubscribeMessages;
        let docRef;
    
        try {
          if (!chatId) {
            const query1 = query(
              mesgColl, 
              where('to_uid', '==', userId), 
              where('from_uid', '==', interlocutorId)
            );
    
            const query2 = query(
              mesgColl, 
              where('to_uid', '==', interlocutorId), 
              where('from_uid', '==', userId)
            );
    
            const querySnapshot1 = await getDocs(query1);
            const querySnapshot2 = await getDocs(query2);
    
            const existingDoc = (!querySnapshot1.empty) 
              ? querySnapshot1.docs[0]
              : (!querySnapshot2.empty)
                ? querySnapshot2.docs[0]
                : null;
    
            if (existingDoc) {
              setChatId(existingDoc.id);
              docRef = doc(mesgColl, existingDoc.id);
            } else {
              if (AreUsersLoading === false) {
                const newDocumentRef = await addDoc(mesgColl, { 
                  last_mesg: "",
                  last_time: "",
                  to_uid: interlocutor.id,
                  to_name: interlocutor.Username,
                  from_uid: currentUser.id,
                  from_name: currentUser.Username
                });
                setChatId(newDocumentRef.id);
                docRef = doc(mesgColl, newDocumentRef.id);
              }
            }
          } else {
            docRef = doc(mesgColl, chatId);
          }
    
         
            const messageColl = collection(docRef, "mesgArchive");
            const q = query(messageColl, orderBy("timestamp", "asc"));
    
            unsubscribeMessages = onSnapshot(q, (snapshot) => {
              let Mesg = [];
              snapshot.docs.forEach((doc) => {
                Mesg.push({ ...doc.data(), id: doc.id });
              });
              setMessages(Mesg);
            });
          
        } catch (error) {
          console.error("Error in document creation or fetching messages: ", error);
        } finally {
          setIsLoadingMessages(false);
        }
    
        return () => {
          if (unsubscribeMessages) {
            unsubscribeMessages();
          }
        };
      }
    
      if (!AreUsersLoading) {
        checkAndCreateDocument();
      }
    }, [AreUsersLoading]);

      const SendMessage = async (data) => {
        setValue('Mesg', '')

        const docChatRef = doc(mesgColl, chatId);
        const messageColl = collection(docChatRef, "mesgArchive")

        const newMessage={
          mesg: data.Mesg,
          timestamp: serverTimestamp(),
          userId: userId
        }

        const updatedChat={
          last_mesg: data.Mesg,
          last_time: serverTimestamp(),
          to_uid: interlocutor.id,
          to_name: interlocutor.Username,
          from_uid: currentUser.id,
          from_name: currentUser.Username
        }

        try{

        await addDoc(messageColl, newMessage); 
        await setDoc(docChatRef, updatedChat)
         
        }

        catch(e){ 
            console.log("error", e)}
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
            {interlocutor.Profile_Picture && interlocutor.Profile_Picture.uri ? (
              <Image style={styles.personImage} source={{ uri: interlocutor.Profile_Picture.uri }} />
            ) : (
              <Image
                style={styles.personImage}
                source={{
                  uri: interlocutor.Profile_Picture != ""
                    ? interlocutor.Profile_Picture
                    : "https://firebasestorage.googleapis.com/v0/b/petpal-3f19d.appspot.com/o/user-icon.jpg?alt=media&token=63fd6f06-6177-4178-8307-f356f6c68a2e",
                }}
              />
            )}
            <Text style={styles.personName}>
            {interlocutor.Username}
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
                    message.userId === currentUser.id ? styles.rightAlign : styles.leftAlign,
                  ]}
                >
                  {message.timestamp ? (
                    <>
                      <Text style={styles.messageText}>{message.mesg}</Text>
                      <Text style={styles.timestamp}>{formatTimestamp(message.timestamp)}</Text>
                    </>
                  ) : (
                    <View style={styles.loaderContainer}>
                    <ActivityIndicator size="auto" color="#89CFF0" />
                    </View>
                  )}
                </View>
              ))
            )}
          </ScrollView>
        );
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
        isLoadingMessages || AreUsersLoading  ?(
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
            enableOnAndroid={false}
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
      width: 25,
      height: 25,
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
  