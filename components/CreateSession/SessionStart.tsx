import React from "react";
import { observer } from "mobx-react-lite";
import { View, Text, StyleSheet, TextInput, Alert, Share } from "react-native";
import CommonStyles from "../../assets/CommonStyles";
import { ButtonType, CustomButton } from "../Buttons";
import { useSession } from "../../mst/SessionStore";
import MembersIcon from "../../icons/MembersIcon";
import { COLORS } from "../../Styles/TextStyles";

const SessionStart = observer(() => {
  const sessionStore = useSession();
  return (
    <View style={[styles.topCard, CommonStyles.card]}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={styles.numberMembers}>0</Text>
        <View style={{ paddingTop: 4 }}>
          <MembersIcon />
        </View>
      </View>
      <CustomButton
        type={ButtonType.largeLink}
        text={"Start"}
        onClick={() => {}}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  topCard: {
    marginBottom: -15,
    marginTop: -15,
  },
  numberMembers: {
    fontFamily: "rubikRegular",
    color: COLORS.darkBlue,
    fontSize: 20,
    paddingRight: 5,
  },
});

export default SessionStart;
