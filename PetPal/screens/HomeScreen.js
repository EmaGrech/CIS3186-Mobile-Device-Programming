import { StyleSheet, Text, View } from "react-native";

import CategoriesList from "../components/CategoriesList";
import {
  PetCategories,
  ProductCategories,
  ServiceCategories,
} from "../Categories";
import { Divider } from "react-native-paper";

function HomeScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.header}>Looking for a Home</Text>
      <Divider bold="true" style={styles.divider} />
      <CategoriesList data={PetCategories} />
      <Text style={styles.header}>Supplies</Text>
      <Divider bold="true" style={styles.divider} />
      <CategoriesList data={ProductCategories} />
      <Text style={styles.header}>Services</Text>
      <Divider bold="true" style={styles.divider} />
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
    marginTop: 16,
  },
  divider: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
