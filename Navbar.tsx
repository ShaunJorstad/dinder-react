import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FoodIcon from "./icons/FoodIcon";
import { useNavigation } from "./mst/navigationStore";

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
  },
  visible: {
    bottom: 10,
  },
  invisible: {
    bottom: -100,
  },
});
