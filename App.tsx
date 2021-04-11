import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Login } from "./components/Login";
import { useNavigation } from "./mst/navigationStore";
import { Navbar } from "./Navbar";
import { LogBox } from "react-native";
import { signOut, watchAuthentication } from "./mst/FireScripts";
import { CustomButton } from "./components/Buttons";
import Search from "./components/Search";
import Pay from "./components/Pay";
import Settings from "./components/Settings";
import CreateSession from "./components/CreateSession";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const [loaded] = useFonts({
    rubikLight: require("./assets/Rubik/static/Rubik-Light.ttf"),
    rubikRegular: require("./assets/Rubik/static/Rubik-Regular.ttf"),
    rubikMedium: require("./assets/Rubik/static/Rubik-Medium.ttf"),
    rubikBold: require("./assets/Rubik/static/Rubik-Bold.ttf"),
    rubikBlack: require("./assets/Rubik/static/Rubik-Black.ttf"),
  });

  useEffect(() => {
    const storeUserChange = (email: string) => {
      const navigationStore = useNavigation();
      navigationStore.setEmail(email);
    };
    watchAuthentication(storeUserChange);
  }, []);

  if (!loaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

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
  console.log(
    `Current navigation: ${navigation.authEmail} & ${navigation.currentView}`
  );
  switch (navigation.currentView) {
    case "Login":
      return <Login />;
    case "search":
      return <Search />;
    case "pay":
      return <Pay />;
    case "settings":
      return <Settings />;
    case "createSession":
      return <CreateSession />;
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
