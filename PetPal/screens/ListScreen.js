import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getCollFromFirestore } from "../db";
import RNPickerSelect from 'react-native-picker-select';

const ListScreen = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  const [filter, setFilter] = useState(null);
  const [filterProducts, setFilterProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCollFromFirestore("Product_Details");
      setProducts(data);
      setFilterProducts(data);
    };

    const focusHandler = navigation.addListener("focus", fetchData);

    return() => {
      focusHandler();
    } ;
  }, [navigation]);

  const handleSelect = (itemID, itemName) => {
    navigation.navigate('Info', { itemID, itemName });
  };

  const handleFilter = (value) => {
    setFilter(value);
    if (value === null) {
      setFilterProducts(products);
    } else {
      const filtered = products.filter(item => item["Category"] === value);
      setFilterProducts(filtered);
    }
  };

  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => handleFilter(value)}
        items={[
          { label: 'Accessories', value: 'Accessories' },
          { label: 'Supplies', value: 'Supplies' },
          { label: 'Food', value: 'Food' },
          { label: 'Toys', value: 'Toys' },
        ]}
        placeholder={{ label: 'All', value: null }}
        value={filter}
      />

      <FlatList
        data={filterProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item.id)}>
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