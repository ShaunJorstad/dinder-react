import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Login } from "./components/Login";
import { useNavigation } from "./mst/navigationStore";
import { Navbar } from "./Navbar";

export default function App() {
  const [loaded] = useFonts({
    rubikLight: require("./assets/Rubik/static/Rubik-Light.ttf"),
    rubikRegular: require("./assets/Rubik/static/Rubik-Regular.ttf"),
    rubikMedium: require("./assets/Rubik/static/Rubik-Medium.ttf"),
    rubikBold: require("./assets/Rubik/static/Rubik-Bold.ttf"),
    rubikBlack: require("./assets/Rubik/static/Rubik-Black.ttf"),
  });
  return (
    <View style={styles.container}>
      <Navigation />
      <Navbar />
      <StatusBar style="auto" />
    </View>
  );
}

const Navigation = observer(() => {
  const navigation = useNavigation();
  switch (navigation.currentView) {
    case "Login":
      return <Login />;
    default:
      return (
        <View>
          <Text>Error: 404</Text>
        </View>
      );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "center",
  },
});
