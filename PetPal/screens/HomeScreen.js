import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import CategoriesList from "../components/CategoriesList";
import {
  PetCategories,
  ProductCategories,
  ServiceCategories,
} from "../Categories";
import { PetCategoriesImage, ProductCategoriesImage, ServiceCategoriesImage } from "../HomeScreenCategories";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation();

  /*const handleSell = () => {
    navigation.navigate("Form", {
      collName: "Product_Details",
      editMode: false,
    });
  };*/


  /*return (
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
  );*/

  const renderHeaderWithLine = (title) => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.line} />
    </View>
  );

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.root}>
        {renderHeaderWithLine('Looking For A Home')}
        <CategoriesList data={PetCategoriesImage} />
  
        {renderHeaderWithLine('Supplies')}
        <CategoriesList data={ProductCategoriesImage} />
  
        {renderHeaderWithLine('Services')}
        <CategoriesList data={ServiceCategoriesImage} />
      </View>
  
    </ScrollView>
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
    width: "30%",
    alignSelf: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,

  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 8,
  },
  header: {
    fontSize: 25,
    padding: 4,
    marginLeft:7
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginLeft:3
  },
  divider: {
    marginBottom: 5,
    marginHorizontal: 20,
  },
  category: {
    marginBottom: 15,
    marginHorizontal: 5,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "gray",
    backgroundColor: "#fff",
    padding: 20,
  },

  categoryText: {
    fontSize: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  scrollView: {
    flex: 1,
  },
});
