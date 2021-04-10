import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { signOut } from "../mst/FireScripts";
import { useNavigation } from "../mst/navigationStore";
const Settings = observer(() => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Logged in as {navigation.authEmail}</Text>
      <Text>Current view: {navigation.currentView}</Text>
      <Button onPress={signOut} title="log out" />
    </View>
  );
});

export default Settings;
