import { observer } from "mobx-react-lite";
import React from "react";
import { View, Text, StyleSheet, TextInput, Alert, Share } from "react-native";
import { ButtonType, CustomButton } from "../Buttons";
import { useSession } from "../../mst/SessionStore";
import CommonStyles from "../../assets/CommonStyles";
import { COLORS } from "../../Styles/TextStyles";
import Slider from "@react-native-community/slider";

const SessionSettings = observer(() => {
  const sessionStore = useSession();

  function getPriceString(): string {
    let string = "";
    for (let i = 0; i < sessionStore.price; i++) {
      string = string.concat("$");
    }
    return string;
  }

  return (
    <View style={[CommonStyles.card, styles.mainCard]}>
      <View style={styles.settingsSection}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Distance</Text>
          <Text style={styles.sectionTitle}>
            <Text style={[styles.value]}>{sessionStore.distance}</Text> mi
          </Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          minimumTrackTintColor={COLORS.orange}
          thumbTintColor={COLORS.orange}
          maximumTrackTintColor="#000000"
          onValueChange={sessionStore.setDistance}
        />
      </View>
      <View style={styles.settingsSection}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <Text style={[styles.sectionTitle, styles.value]}>
            {getPriceString()}
          </Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={5}
          step={1}
          minimumTrackTintColor={COLORS.orange}
          thumbTintColor={COLORS.orange}
          maximumTrackTintColor="#000000"
          onValueChange={sessionStore.setPrice}
        />
      </View>
      <View style={styles.settingsSection}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Time Limit </Text>
          <Text style={styles.sectionTitle}>
            <Text style={styles.value}>{sessionStore.timeLimit}</Text> min
          </Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          minimumTrackTintColor={COLORS.orange}
          thumbTintColor={COLORS.orange}
          maximumTrackTintColor="#000000"
          onValueChange={sessionStore.setTimeLimit}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  settingsSection: {
    width: "100%",
  },
  sectionHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontFamily: "rubikRegular",
    fontSize: 20,
  },
  value: {
    color: COLORS.orange,
  },
  slider: {
    marginTop: 20,
    width: "110%",
    marginLeft: -15,
  },
  mainCard: {
    height: "50%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});

export default SessionSettings;
