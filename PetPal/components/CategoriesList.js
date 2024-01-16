import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

function CategoriesList({ data }) {
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

export default CategoriesList;
