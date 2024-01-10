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
  
  return (
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
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
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
