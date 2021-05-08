import { observer } from "mobx-react-lite";
import React from "react";
import { View, Text, StyleSheet, TextInput, Alert, Share } from "react-native";
import { ButtonType, CustomButton } from "../Buttons";
import { useSession } from "../../mst/SessionStore";
import QRCodeIcon from "../../icons/QRCodeIcon";
import ShareIcon from "../../icons/ShareIcon";
import CommonStyles from "../../assets/CommonStyles";
import { COLORS } from "../../Styles/TextStyles";

const SessionShare = observer((props: any) => {
  const sessionStore = useSession();
  return (
    <View style={[styles.shareCard, CommonStyles.card]}>
      <Text style={styles.code}>#{sessionStore.code}</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ marginRight: 25 }}>
          <CustomButton type={ButtonType.wrap} icon={<ShareIcon />} />
        </View>
        <CustomButton
          type={ButtonType.wrap}
          icon={<QRCodeIcon />}
          onClick={() => {
            //   navigate to the QR code
            props.navigation.push("qr-code");
          }}
        />
      </View>
    </View>
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
});

export default SessionShare;
