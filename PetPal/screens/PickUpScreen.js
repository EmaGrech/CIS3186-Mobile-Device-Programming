import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const currentDate = new Date();
  const nextDay = new Date(currentDate);
  nextDay.setDate(nextDay.getDate()+1);
  const endDate = new Date(currentDate);
  endDate.setDate(nextDay.getDate()+7);
  const startDate = nextDay;
  const initialSelectedDate = nextDay;
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.Quantity * item.Price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedTime, setSelectedTime] = useState([]);

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "3",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];
  const navigation = useNavigation();
  const proceedToCart = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert(
        "Empty or invalid",
        "Please select all the fields",
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
    if (selectedDate && selectedTime) {
      navigation.replace("Receipt", {
        pickUpDate: selectedDate,
        selectedTime: selectedTime,
      });
    }
  };

  return (
    <>
      <SafeAreaView>
        <Text style={styles.textStyle}>
          Enter Address
        </Text>

        <TextInput style={styles.inputTxt}/>

        <Text style={styles.textStyle}>
          Pick Up Date
        </Text>
        {/* selection of 7 days ahead from the current day */}
        <HorizontalDatepicker
          mode="gregorian"
          startDate={startDate}
          endDate={endDate}
          initialSelectedDate={initialSelectedDate}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#6c756b"
          unselectedItemBackgroundColor="#93acb5"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text style={styles.textStyle}>
          Select Time
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTime(item.time)}
              style={
                selectedTime === item.time
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "#96c5f7",
                      borderWidth: 2,
                      backgroundColor: "#ecf0f1"
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "#6c756b",
                      borderWidth: 1,
                      backgroundColor: "#ecf0f1"
                    }
              }
            >
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>

      {total === 0 ? null : (
        <View style={styles.paymentCon}>
          <View>
            <Text style={styles.paymentTxt}>
              {cart.length} items | € {total}
            </Text>
            <Text style={styles.paymentChargesTxt}>
              extra charges might apply
            </Text>
          </View>

          
            <View style={styles.container}>
              <View style={styles.btnCon}>
                <Pressable style={styles.btn} onPress={proceedToCart}>
                <Text style={styles.btnTxt}>
                  Proceed to Cart
                </Text>
                </Pressable>
              </View>
            </View>

        </View>
      )}  
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({
textStyle: { 
  fontSize: 18, 
  fontWeight: "500", 
  marginLeft: 16,
  marginTop: 16, 
},
inputTxt: {
  padding: 16,
  borderColor: "gray",
  borderWidth: 1,
  paddingVertical: 24,
  borderRadius: 9,
  margin: 10,
  fontSize: 16,
  fontWeight: "500",
  backgroundColor: "#ecf0f1",
},
paymentCon: {
  backgroundColor: "#96c5f7",
  marginTop: "auto",
  padding: 10,
  marginBottom: 40,
  margin: 15,
  borderRadius: 7,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},
paymentTxt: { 
  fontSize: 17, 
  fontWeight: "600", 
  color: "white" 
},
paymentChargesTxt: {
  fontSize: 15,
  fontWeight: "400",
  color: "white",
  marginVertical: 6,
},
container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
},
btnCon: {
  height: 50,
  width: "80%",
  elevation: 1,
  backgroundColor: "#f2f4ff",
  borderRadius: 5,
  marginLeft: 10
},
btn: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
},
btnTxt: {
  color: "black",
  fontSize: 18,
},
});
