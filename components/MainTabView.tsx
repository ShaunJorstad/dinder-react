import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { useNavigation } from "../mst/navigationStore";
import ExpoStyle from "./ExpoStyle";
import { Navbar } from "./Navbar";
import Search from "./Search";
import Pay from "./Pay";
import Settings from "./Settings";

const MainTabView = observer((props: any) => {
  const mstNavigation = useNavigation();

  const GetCurrentTab = () => {
    switch (mstNavigation.currentView) {
      case "search":
        return <Search navigation={props.navigation} />;
      case "pay":
        return <Pay />;
      case "settings":
        return <Settings />;
      default:
        return <Search />;
    }
  };

  return (
    <ExpoStyle>
      {GetCurrentTab()}
      <Navbar />
    </ExpoStyle>
  );
});

export default MainTabView;
