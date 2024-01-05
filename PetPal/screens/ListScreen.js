import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getCollFromFirestore } from "../db";

//rn only fetches EVERY PRODUCT (need to filter according to product type)
const ListScreen = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  
  useEffect(() => {
    const fetchData = async () => {
      try
      {
        const data = await getCollFromFirestore("Product_Details");
        setProducts(data);
        setError(null);
      }
      catch (error)
      {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    const focusHandler = navigation.addListener("focus", fetchData);

    return() => {
      focusHandler();
    } ;
  }, [navigation]);

  const handleItemClick = (itemID, itemName) => {
    navigation.navigate('Info', { itemID, itemName });
  };

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemClick(item.id)}>
            <View>
              <Image source={{ uri: item.Image }} style={{ width: 100, height: 100 }} />
              <Text>{item["Product_Name"]}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default ListScreen;