import { observer } from "mobx-react-lite";
import React from "react";
import { View, Text, StyleSheet, TextInput, Alert, Share } from "react-native";
import { ButtonType, CustomButton } from "../Buttons";
import CommonStyles from "../../assets/CommonStyles";
import Slider from "@react-native-community/slider";
import { COLORS } from "../../Styles/TextStyles";
import { useSession } from "../../mst/SessionStore";
import QRCode from "react-native-qrcode-svg";
import ExpoStyle from "../ExpoStyle";

const SessionQRCode = observer((props: any) => {
  const sessionStore = useSession();
  return (
    <ExpoStyle>
      <View style={styles.container}>
        <View style={[CommonStyles.card, styles.mainCard, { height: "55%" }]}>
          <View style={{ display: "flex", alignItems: "center" }}>
            <Text style={styles.sectionTitle}>
              Scan this code to join my session!
            </Text>
            <Text
              style={[
                styles.sectionTitle,
                { fontSize: 30, fontFamily: "rubikMedium", paddingTop: 15 },
              ]}
            >
              #{sessionStore.code}
            </Text>
          </View>
          <View style={{ transform: [{ scale: 1.6 }] }}>
            <QRCode value={sessionStore.code} />
          </View>
          <CustomButton
            text="close"
            type={ButtonType.largeLink}
            onClick={() => {
              props.navigation.goBack();
            }}
          />
        </View>
      </View>
    </ExpoStyle>
  );
});

const styles = StyleSheet.create({
  shareCard: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  code: {
    fontFamily: "rubikRegular",
    color: COLORS.darkBlue,
    fontSize: 20,
  },
  sectionTitle: {
    fontFamily: "rubikRegular",
    fontSize: 20,
  },
  container: {
    display: "flex",
    justifyContent: "space-around",
    height: "100%",
    width: "90%",
  },
  mainCard: {
    height: "50%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});

export default SessionQRCode;
