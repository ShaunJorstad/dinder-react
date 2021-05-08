import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Login } from "./components/Login";
import { useNavigation } from "./mst/navigationStore";
import { Navbar } from "./components/Navbar";
import { LogBox } from "react-native";
import { signOut, watchAuthentication } from "./mst/FireScripts";
import { CustomButton } from "./components/Buttons";
import Search from "./components/Search";
import Pay from "./components/Pay";
import Settings from "./components/Settings";
import CreateSession from "./components/CreateSession/CreateSession";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabView from "./components/MainTabView";
import SessionQRCode from "./components/CreateSession/SessionQRCode";

const Stack = createStackNavigator();

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

  return <Navigation />;
}

const Navigation = observer(() => {
  const navigation = useNavigation();
  console.log(
    `Current navigation: ${navigation.authEmail} & ${navigation.currentView}`
  );

  const isSignedIn = () => {
    return navigation.authEmail !== "";
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn() ? (
          <>
            <Stack.Screen name="main-tabs" component={MainTabView} />
            <Stack.Screen name="create-session" component={CreateSession} />
            <Stack.Screen name="qr-code" component={SessionQRCode} />
          </>
        ) : (
          <>
            <Stack.Screen name="login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "center",
  },
});
