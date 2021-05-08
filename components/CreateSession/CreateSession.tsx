import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, Share } from "react-native";
import MembersIcon from "../../icons/MembersIcon";
import { createSessionDoc, deleteSessionDoc } from "../../mst/FireScripts";
import { COLORS } from "../../Styles/TextStyles";
import { ButtonType, CustomButton } from "../Buttons";
import ExpoStyle from "../ExpoStyle";
import { useSession } from "../../mst/SessionStore";
import SessionStart from "./SessionStart";
import SessionShare from "./SessionShare";
import SessionSettings from "./SessionSettings";

const CreateSession = observer((props: any) => {
  const sessionStore = useSession();

  useEffect(() => {
    createSessionDoc().then((docID: string) => {
      sessionStore.setCode(docID);
    });
  }, []);

  useEffect(() => {
    return () => {
      deleteSessionDoc(sessionStore.code);
    };
  });

  return (
    <ExpoStyle>
      <View style={styles.container}>
        <View>{/* spacer */}</View>
        <View style={styles.exitLink}>
          <CustomButton
            type={ButtonType.link}
            text={"exit session"}
            onClick={() => {
              // deleteSessionDoc(sessionStore.code);
              props.navigation.goBack();
            }}
          />
        </View>
        <SessionStart />
        <SessionShare navigation={props.navigation} />
        <SessionSettings />
        <View>{/* spacer */}</View>
      </View>
    </ExpoStyle>
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
  exitLink: {
    alignSelf: "flex-start",
  },
});

export default CreateSession;
