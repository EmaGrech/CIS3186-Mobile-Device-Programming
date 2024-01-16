import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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

  const handleSell = () => {
    navigation.navigate("Form", {
      collName: "Product_Details",
      editMode: false,
    });
  };

  return (
    <View>
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    shadowColor: "gray",
    backgroundColor: "#fff",
    padding: 20,
  },

  categoryText: {
    fontSize: 16,
  },
});
