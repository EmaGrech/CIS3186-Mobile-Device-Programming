import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ScrollView } from 'react-native';
import { getDocument, toDelete } from '../db';

const InfoScreen = ({ route, navigation }) => {
  const { itemID } = route.params;
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const details = await getDocument( 'Product_Details', itemID);
        setProductDetails(details);
        console.log('Fetched Product Details:', details);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [itemID]);
  
  const { Product_Name: productName, Description, Image: image, Price, Stock } = productDetails || {};

  const handleDelete = () => {
    toDelete('Product_Details', itemID);
    navigation.goBack(); 
  };

  return (
    <ScrollView>
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      <Text>{productName}</Text>
      <Text>{`Description: ${Description}`}</Text>
      <Text>{`Price: €${Price}`}</Text>
      <Text>{`Stock: ${Stock}`}</Text>
      <Button title="Delete" onPress={handleDelete} />
    </ScrollView>
  );
};

export default InfoScreen;