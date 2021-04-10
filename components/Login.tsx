import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "../mst/navigationStore";
import { TextStyles } from "../Styles/TextStyles";

export const Login = observer(() => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Text style={TextStyles.largeHeader}>Login</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
        placeholder={"email"}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  textInput: {
    width: "85%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ECF2F6",
  },
});
