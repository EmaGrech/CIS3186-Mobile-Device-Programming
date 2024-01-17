import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

/*function CategoriesList({ data }) {
  const navigation = useNavigation();

  function renderCategoryItem(itemData) {
    function onCategorySelected() {
      console.log("Load " + itemData.item + " screen");
      navigation.navigate("List", itemData.item);
    }

    return (
      <Card onPress={onCategorySelected} style={styles.card}>
        <Card.Title title={itemData.item} />
      </Card>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index}
      renderItem={renderCategoryItem}
      horizontal={true}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 5,
    margin: 5,
    backgroundColor: "white",
  },
});

export default CategoriesList;*/
function CategoriesList({ data }) {
  const navigation = useNavigation();

  function renderCategoryItem({ item }) {
    function onCategorySelected() {
      console.log("Load " + item.name + " screen");
      navigation.navigate("List", { category: item.name });
    }

    return (
      <TouchableOpacity onPress={onCategorySelected} style={styles.categoryItem}>
        <Image source={item.image} style={styles.categoryImage} />
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderCategoryItem}
      horizontal={true}
    />
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    margin: 5,
  },
  categoryImage: {
    width: 110, 
    height: 110, 
    borderRadius: 75, 
    marginRight:6

  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CategoriesList;
