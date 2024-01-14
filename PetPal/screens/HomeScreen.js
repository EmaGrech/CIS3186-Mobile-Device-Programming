import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import CategoriesList from "../components/CategoriesList";
import {
  PetCategories,
  ProductCategories,
  ServiceCategories,
} from "../Categories";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation();

  const handleCategorySelect = (category) => {
    navigation.navigate('List', { category });
  };
  
  const handleSell = () => {
    navigation.navigate("Form", {collName: 'Product_Details', editMode: false})
  };
  
  return (
    <View>
      <View style={styles.root}>
        <Text style={styles.header}>Looking for a Home</Text>
        <Divider bold="true" style={styles.divider} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {PetCategories.map((category, index) => (
            <TouchableOpacity key={index} onPress={() => handleCategorySelect(category)} style={styles.category}>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <Text style={styles.header}>Supplies</Text>
        <Divider bold="true" style={styles.divider} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {ProductCategories.map((category, index) => (
            <TouchableOpacity key={index} onPress={() => handleCategorySelect(category)} style={styles.category}>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.header}>Services</Text>
        <Divider bold="true" style={styles.divider} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {ServiceCategories.map((category, index) => (
            <TouchableOpacity key={index} onPress={() => handleCategorySelect(category)} style={styles.category}>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={handleSell} style={styles.button}>
        <Text style={styles.buttonText}>Sell</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#A9D3FF",
    padding: 10,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    width: 300,
    alignSelf: "center",
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  root: {
    margin: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 4,
    marginBottom: 8,
    marginTop: 16,
  },
  divider: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  category: {
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 10, 
    elevation: 2,
    shadowColor: 'gray',
    backgroundColor: '#fff',
    padding: 20,
  },

  categoryText: {
    fontSize: 16,
  }
});
