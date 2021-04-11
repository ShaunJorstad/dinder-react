import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Pay = observer(() => {
  return (
    <View>
      <Text>
        This app is currently free to use while it is in beta. Upon a stable
        release every new session will cose a few pennies
      </Text>
    </View>
  );
});

export default Pay;
