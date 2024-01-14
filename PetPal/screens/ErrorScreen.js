import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';

const ErrorScreen = () => {
    const [hasWiFiConnection, setHasWiFiConnection] = useState(true);

    useEffect(() => {
      const checkWiFiConnection = async () => {
        const { isConnected } = await NetInfo.fetch();
        setHasWiFiConnection(isConnected);
      };
  
      checkWiFiConnection();
    }, []);
  
    if (!hasWiFiConnection) {
      return (
        <View style={styles.container}>
            <Text style={styles.text}>Ruh-Oh!</Text>
            <LottieView
                source={require('../assets/Error Light.json')}
                autoPlay
                loop
            />
            <Text style={styles.text}>There seems to have been an error...</Text>
            <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
        </View>
      );
    }
  
    return null;
};
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#088F8F',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ErrorScreen;