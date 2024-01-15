import { View } from "react-native";
import { Menu, PaperProvider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

function ProfileOptions() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <MaterialCommunityIcons
                name="dots-vertical"
                color={"black"}
                size={18}
              />
            </TouchableOpacity>
          }
          anchorPosition="bottom"
        >
          <Menu.Item
            onPress={() => {
              console.log("Go to EditProfile screen");
            }}
            title="Edit Details"
          />
          <Menu.Item
            onPress={() => {
              console.log("Go to purchase history");
            }}
            title="Purchase History"
          />
        </Menu>
      </View>
    </PaperProvider>
  );
}

export default ProfileOptions;
