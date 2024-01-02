import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getProductDetails } from '../db';

const InfoScreen = ({ route }) => {
  const { itemID } = route.params;
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = await getProductDetails(itemID);
      setProductDetails(details);
    };

    fetchProductDetails();
  }, [itemID]);

  const { 'Product Name': productName, description, Image: image, price, stock } = productDetails;

  return (
    <View>
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      <Text>{productName}</Text>
      <Text>{`Description: ${description}`}</Text>
      <Text>{`Price: $${price}`}</Text>
      <Text>{`Stock: ${stock}`}</Text>
    </View>
  );
};

export default InfoScreen;