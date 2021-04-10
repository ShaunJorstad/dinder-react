import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CreateGroupIcon from "../icons/CreateGroupIcon";
import JoinIcon from "../icons/JoinIcon";
import { COLORS, TextStyles } from "../Styles/TextStyles";
const Search = observer(() => {
  return (
    <View style={styles.container}>
      <View>{/* spacer view */}</View>
      <Text style={TextStyles.tabHeader}>Find a Restaurant</Text>
      <View>
        <Card
          label="Create"
          icon={<CreateGroupIcon />}
          onClick={() => {
            console.log("creating group");
          }}
        />
        <Card
          label="Join"
          icon={<JoinIcon />}
          onClick={() => {
            console.log("joining group");
          }}
        />
      </View>
      <View>{/* spacer view */}</View>
    </View>
  );
});

interface cardProps {
  label: string;
  icon: any;
  onClick: any;
}

const Card = (props: cardProps) => {
  return (
    <TouchableOpacity onPressOut={props.onClick}>
      <View style={styles.card}>
        <Text style={styles.label}>{props.label}</Text>
        {props.icon}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    width: "85%",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 26,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 36,
    marginBottom: 20,
  },
  label: {
    fontFamily: "rubikRegular",
    fontSize: 25,
    color: COLORS.darkBlue,
  },
});

export default Search;
