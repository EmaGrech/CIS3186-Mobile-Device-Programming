import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadScreen = ({ destination: Destination }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          source={require('../assets/Error Light.json')}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }

  return (
    <View>
        <Destination/>
    </View>
  );
};

export default LoadScreen;