import { BlackOpsOne_400Regular } from "@expo-google-fonts/dev";
import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FoodIcon from "./icons/FoodIcon";
import PayIcon from "./icons/PayIcon";
import SettingsIcon from "./icons/SettingsIcon";
import { useNavigation } from "./mst/navigationStore";
import { COLORS } from "./Styles/TextStyles";

export const Navbar = observer(() => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        navigation.navbarVisibility ? styles.visible : styles.invisible,
      ]}
    >
      <NavItem
        route="search"
        icon={<FoodIcon active={navigation.currentView === "search"} />}
      />
      <NavItem
        route="pay"
        icon={<PayIcon active={navigation.currentView === "pay"} />}
      />
      <NavItem
        route="settings"
        icon={<SettingsIcon active={navigation.currentView === "settings"} />}
      />
    </View>
  );
});

interface NavItemProps {
  route: string;
  text?: any;
  icon: any;
}

function NavItem(props: NavItemProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.setView(props.route);
      }}
      style={styles.touchable}
    >
      {props.icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "absolute",
    width: "85%",
    height: 64,
    borderRadius: 22,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  visible: {
    bottom: 10,
  },
  invisible: {
    bottom: -100,
  },
  touchable: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
