import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, Share } from "react-native";
import MembersIcon from "../icons/MembersIcon";
import QRCodeIcon from "../icons/QRCodeIcon";
import ShareIcon from "../icons/ShareIcon";
import { createSessionDoc, deleteSessionDoc } from "../mst/FireScripts";
import { useNavigation } from "../mst/navigationStore";
import { COLORS } from "../Styles/TextStyles";
import { ButtonType, CustomButton } from "./Buttons";
import Slider from "@react-native-community/slider";
import QRCode from "react-native-qrcode-svg";

const CreateSession = observer(() => {
  const [distance, setDistance] = useState(1);
  const [price, setPrice] = useState(1);
  const [timeLimit, setTimeLimit] = useState(1);
  const [code, setCode] = useState("00000");
  const [displayQRCode, setDisplayQRCode] = useState(false);
  const navigationStore = useNavigation();

  useEffect(() => {
    createSessionDoc().then((docID: string) => {
      setCode(docID);
    });
  }, []);

  function getPriceString(): string {
    let string = "";
    for (let i = 0; i < price; i++) {
      string = string.concat("$");
    }
    return string;
  }

  if (displayQRCode) {
    return (
      <View style={styles.container}>
        <View style={[styles.card, styles.mainCard, { height: "55%" }]}>
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
              #{code}
            </Text>
          </View>
          <View style={{ transform: [{ scale: 1.6 }] }}>
            <QRCode value={code} />
          </View>
          <CustomButton
            text="close"
            type={ButtonType.largeLink}
            onClick={() => {
              setDisplayQRCode(false);
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>{/* spacer */}</View>
      <View style={styles.exitLink}>
        <CustomButton
          type={ButtonType.link}
          text={"exit session"}
          onClick={() => {
            navigationStore.setView("search");
            deleteSessionDoc(code);
          }}
        />
      </View>
      <View style={[styles.topCard, styles.card]}>
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
      <View style={[styles.shareCard, styles.card]}>
        <Text style={styles.code}>#{code}</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ marginRight: 25 }}>
            <CustomButton type={ButtonType.wrap} icon={<ShareIcon />} />
          </View>
          <CustomButton
            type={ButtonType.wrap}
            icon={<QRCodeIcon />}
            onClick={() => {
              setDisplayQRCode(true);
            }}
          />
        </View>
      </View>
      <View style={[styles.card, styles.mainCard]}>
        <View style={styles.settingsSection}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Distance</Text>
            <Text style={styles.sectionTitle}>
              <Text style={[styles.value]}>{distance}</Text> mi
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
            onValueChange={setDistance}
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
            onValueChange={setPrice}
          />
        </View>
        <View style={styles.settingsSection}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Time Limit </Text>
            <Text style={styles.sectionTitle}>
              <Text style={styles.value}>{timeLimit}</Text> min
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
            onValueChange={setTimeLimit}
          />
        </View>
      </View>
      <View>{/* spacer */}</View>
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
  container: {
    display: "flex",
    justifyContent: "space-around",
    height: "100%",
    width: "90%",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 17,
    padding: 10,
    paddingRight: 25,
    paddingLeft: 25,
    justifyContent: "space-between",
  },
  topCard: {
    marginBottom: -15,
    marginTop: -15,
  },
  shareCard: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  mainCard: {
    height: "50%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  numberMembers: {
    fontFamily: "rubikRegular",
    color: COLORS.darkBlue,
    fontSize: 20,
    paddingRight: 5,
  },
  code: {
    fontFamily: "rubikRegular",
    color: COLORS.darkBlue,
    fontSize: 20,
  },
  exitLink: {
    alignSelf: "flex-start",
  },
});

export default CreateSession;
