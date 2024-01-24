import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { WebView } from "react-native-webview";
import Feather from "react-native-vector-icons/Feather";

const ReceiptScreen = () => {
  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState("#000");
  const cart = useSelector((state) => state.cart.cart);
  const route = useRoute();
  const total = cart
    .map((item) => item.Quantity * item.Price)
    .reduce((curr, prev) => curr + prev, 0);
  const tax = (total * 0.18).toFixed(2);
  const totalWithTax = total + parseFloat(tax);
  const webAppUrl = "https://payment-app-16f6d.web.app";
  const numTotal = parseFloat(totalWithTax);
  const encodedAmt = encodeURIComponent(numTotal.toString());
  const url = `${webAppUrl}/?amount=${encodedAmt}`;
  const navigation = useNavigation();
  const userUid = auth.currentUser.uid;
  const dispatch = useDispatch();
  const placeOrder = async () => {
    navigation.navigate("Order");
    dispatch(cleanCart());
    await setDoc(
      doc(db, "Cart", `${userUid}`),
      {
        orders: { ...cart },
        pickUpDetails: route.params,
      },
      {
        merge: true,
      }
    );
  };

  //on payment message alert
  function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(data);
    let payment = JSON.parse(data);
    if (payment.status === "COMPLETED") {
      navigation.navigate("Order");
    } else {
      alert("PAYMENT FAILED. PLEASE TRY AGAIN.");
    }
  }

  return (
    <>
      <ScrollView style={{ backgroundColor: "white", paddingTop: 50 }}>
        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <View style={styles.itemCon}>
              {cart.map((item, index) => (
                <View style={styles.incRow} key={index}>
                  <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                    {item.Product_Name}
                  </Text>

                  {/* - + button */}
                  <Pressable style={styles.incBorder}>
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item)); // cart
                        dispatch(decrementQty(item)); // product
                      }}
                    >
                      <Text style={styles.minus}> - </Text>
                    </Pressable>

                    <Pressable>
                      <Text style={styles.itemQuant}>{item.Quantity}</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item)); // cart
                        dispatch(incrementQty(item)); //product
                      }}
                    >
                      <Text style={styles.plus}> + </Text>
                    </Pressable>
                  </Pressable>

                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    € {item.Price * item.Quantity}
                  </Text>
                </View>
              ))}
            </View>

            <View style={{ marginHorizontal: 16, marginTop: 24 }}>
              <Text style={styles.billingTitleTxt}>Billing Details</Text>
              <View style={styles.billingCon}>
                <View style={styles.billingRow}>
                  <Text style={styles.billingTxt}>Item Total</Text>
                  <Text style={styles.billingTxt}>€ {total}</Text>
                </View>

                <View style={styles.billingRowWithMargin}>
                  <Text style={styles.billingTxt}>Delivery Fee | 1.2KM</Text>
                  <Text style={styles.altTextColor}>FREE</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.billingTxt}>
                    Free Delivery on Your order
                  </Text>
                </View>

                <View style={styles.border} />

                <View style={styles.billingRowWithMargin}>
                  <Text style={styles.billingTxt}>Selected Date</Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {/* {route.params.pickUpDate} */}
                  </Text>
                </View>

                <View style={styles.billingRowWithMargin}>
                  <Text style={styles.billingTxt}>Selected Pick Up Time</Text>

                  <Text style={styles.altTextColor}>
                    {route.params.selectedTime}
                  </Text>
                </View>
                <View style={styles.border} />

                <View style={styles.billingRowWithMargin}>
                  <Text style={styles.billingTxt}>Total tax</Text>
                  <Text style={styles.billingTxt}>€ {tax}</Text>
                </View>

                <View style={styles.billingRowWithMargin}>
                  <Text style={styles.billingTotalTxt}>Total </Text>
                  <Text style={styles.billingTotalTxt}>€ {totalWithTax}</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {total === 0 ? null : (
        <View style={styles.paymentCon}>
          {/* paypal gateway */}
          {showGateway ? (
            <Modal
              visible={showGateway}
              onDismiss={() => setShowGateway(false)}
              onRequestClose={() => setShowGateway(false)}
              animationType={"fade"}
              transparent={true}
            >
              <View style={styles.webViewCon}>
                <View style={styles.wbHead}>
                  <TouchableOpacity
                    style={{ padding: 13 }}
                    onPress={() => setShowGateway(false)}
                  >
                    <Feather name={"x"} size={24} />
                  </TouchableOpacity>
                  <Text style={styles.gatewayTxt}>PayPal GateWay</Text>

                  <View style={{ padding: 13, opacity: prog ? 1 : 0 }}>
                    <ActivityIndicator size={24} color={progClr} />
                  </View>
                </View>

                <WebView
                  source={{ uri: url }}
                  onMessage={onMessage}
                  style={{
                    flex: 1,
                    top: "auto",
                  }}
                  onLoadStart={() => {
                    setProg(true);
                    setProgClr("#000");
                  }}
                  onLoadProgress={() => {
                    setProg(true);
                    setProgClr("#00457C");
                  }}
                  onLoadEnd={() => {
                    setProg(false);
                  }}
                  onLoad={() => {
                    setProg(false);
                  }}
                />
              </View>
            </Modal>
          ) : null}

          <View>
            <Text style={styles.taxAppliedTxt}>
              {cart.length} items | € {totalWithTax}
            </Text>
            <Text style={styles.taxAppliedTxt}>Tax applied</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.btnCon}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setShowGateway(true);
                  console.log("amount:", url);
                }}
              >
                <Text style={styles.btnTxt}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCon: {
    height: 50,
    width: "50%",
    elevation: 1,
    backgroundColor: "#f2f4ff",
    borderRadius: 5,
    marginLeft: 50,
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
  webViewCon: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    zIndex: 25,
    elevation: 2,
  },
  itemCon: {
    backgroundColor: "#ecf0f1",
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 14,
  },
  incBorder: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    borderColor: "#2b2118",
    borderWidth: 1.5,
    borderRadius: 10,
  },
  incRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  minus: {
    fontSize: 20,
    color: "#2b2118",
    paddingHorizontal: 6,
    fontWeight: "600",
  },
  itemQuant: {
    fontSize: 19,
    color: "#2b2118",
    paddingHorizontal: 8,
    fontWeight: "600",
  },
  plus: {
    fontSize: 20,
    color: "#2b2118",
    paddingHorizontal: 6,
    fontWeight: "600",
  },
  billingCon: {
    backgroundColor: "#ecf0f1",
    borderRadius: 7,
    padding: 10,
    marginTop: 8,
  },
  billingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  altTextColor: {
    fontSize: 18,
    fontWeight: "400",
    color: "#96c5f7",
  },
  border: {
    borderColor: "#2B2118",
    height: 1,
    borderWidth: 0.5,
    marginTop: 10,
  },
  billingRowWithMargin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    marginHorizontal: 5,
  },
  billingTotalTxt: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#96c5f7",
  },
  billingTxt: {
    fontSize: 18,
    fontWeight: "500",
    color: "grey",
  },
  billingTitleTxt: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
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
  taxAppliedTxt: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
    marginVertical: 6,
  },
  gatewayTxt: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#00457C",
  },
});

export default ReceiptScreen;
