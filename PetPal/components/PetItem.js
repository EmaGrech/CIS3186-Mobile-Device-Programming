import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

const PetItem = ({ item }) => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.product.product);

  const navigation = useNavigation();

  const addItemToCart = () => {
    console.log("Before dispatching addToCart. Cart state:", cart);
    dispatch(addToCart(item)); // cart
    console.log("After dispatching addToCart. Cart state:", cart);
    console.log("Before dispatching incrementQty. Product state:", product);
    dispatch(incrementQty(item)); // product
    console.log("After dispatching incrementQty. Product state:", product);
  };

  const handleSelect = (itemID, itemName) => {
    navigation.navigate("Info", { itemID, itemName });
  };

  const contactOwner = async() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      navigation.navigate("IndividualChatScreen", {userId:user.uid, interlocutorId: item.Seller_ID})
    } else {
      console.log("User not logged in");
      navigation.navigate("LoginScreen")
    }
  }

  const isSpecialCategory = ['Cats', 'Dogs', 'Birds', 'Exotic'].includes(item?.Category);

  return (
    <View>
      <Pressable
        onPress={() => handleSelect(item.id)}
        style={styles.searchBg}
      >
        <Image
          style={styles.itemImage}
          source={{ uri: item.Image }}
        />

        <View>
          <Text style={styles.prodName}>
            {item.Product_Name}
          </Text>
          <Text style={styles.priceText}>
            € {item.Price}
          </Text>
        </View>

        {isSpecialCategory ? (
          <Pressable onPress={contactOwner} style={styles.addBtn}>
            <Text style={styles.addBtnText}>Contact</Text>
          </Pressable>
        ) : cart.some((c) => c.id === item.id) ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(item));
                dispatch(decrementQty(item));
              }}
              style={styles.quantityCircle}
            >
              <Text style={styles.quantitySign}>-</Text>
            </Pressable>

            <Text style={styles.quantityTxt}>
              {console.log("item"+item.Quantity)}
              {item.Quantity}
            </Text>

            <Pressable
              onPress={() => {
                dispatch(incrementQuantity(item));
                dispatch(incrementQty(item));
              }}
              style={styles.quantityCircle}
            >
              <Text style={styles.quantitySign}>+</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={addItemToCart} style={styles.addBtn}>
            <Text style={styles.addBtnText}>Add</Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#A9D3FF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  quantityTxt: {
    fontSize: 17,
    color: "#333333",
    paddingHorizontal: 8,
    fontWeight: "bold",
  },
  quantitySign: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  searchBg: {
    backgroundColor: "#EBEBEB", 
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  prodName: {
    width: 120,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#333333",
  },
  priceText: {
    color: "#C4C7CB", 
    fontSize: 15,
    
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  addBtn: {
    backgroundColor: "#7EACCE", 
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  }, 
  addBtnText:{
    color:'white'
  }
});
export default PetItem;