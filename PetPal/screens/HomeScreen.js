import { StyleSheet, Text, View } from "react-native";

import CategoriesList from "../components/CategoriesList";
import {
  PetCategories,
  ProductCategories,
  ServiceCategories,
} from "../Categories";

function HomeScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.header}>Adopt</Text>
      <CategoriesList data={PetCategories} />
      <Text style={styles.header}>Supplies</Text>
      <CategoriesList data={ProductCategories} />
      <Text style={styles.header}>Services</Text>
      <CategoriesList data={ServiceCategories} />
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
  },
});
