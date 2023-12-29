import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { getDocsFromFirestore } from "./db";

//rn only fetches EVERY PRODUCT (need to filter according to product type)
const ListScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getDocsFromFirestore("Product Details");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.Image }} style={{ width: 100, height: 100 }} />
            <Text>{item["Product Name"]}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default ListScreen;