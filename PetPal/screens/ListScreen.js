import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getDocsFromFirestore } from "./db";

//rn only fetches EVERY PRODUCT (need to filter according to product type)
const ListScreen = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getDocsFromFirestore("Product Details");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleItemClick = (itemID, itemName) => {
    navigation.navigate('InfoScreen', { itemID, itemName });
  };

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemClick(item.id, item['Product Name'])}>
            <View>
              <Image source={{ uri: item.Image }} style={{ width: 100, height: 100 }} />
              <Text>{item["Product Name"]}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default ListScreen;