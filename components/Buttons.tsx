import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../Styles/TextStyles";

enum ButtonType {
  largePrimary,
  link,
  largeLink,
  wrap,
}

interface ButtonProps {
  type: ButtonType;
  text?: string;
  disable?: boolean;
  onClick?: any;
  icon?: any;
}

const CustomButton = (props: ButtonProps) => {
  switch (props.type) {
    case ButtonType.largePrimary:
      return <LargePrimaryButton {...props} />;
    case ButtonType.link:
      return <Link {...props} />;
    case ButtonType.largeLink:
      return <LargeLink {...props} />;
    case ButtonType.wrap:
      return <Wrap {...props} />;
    default:
      return <></>;
  }
};

const Wrap = (props: ButtonProps) => {
  return (
    <TouchableOpacity style={{ padding: 15 }} onPress={props.onClick}>
      {props.icon}
    </TouchableOpacity>
  );
};

const Link = (props: ButtonProps) => {
  return (
    <View style={{ width: "85%" }}>
      <TouchableOpacity
        style={{ padding: 15, marginRight: -15 }}
        onPress={props.onClick}
      >
        <Text style={styles.Link}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const LargeLink = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{ padding: 15, marginRight: -15 }}
      onPress={props.onClick}
    >
      <Text style={styles.LargeLink}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const LargePrimaryButton = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPressOut={() => {
        props.onClick();
      }}
    >
      <View
        style={[
          styles.LargePrimary,
          props.disable ? styles.disable : styles.enable,
        ]}
      >
        <Text style={[styles.Label]}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  LargePrimary: {
    backgroundColor: COLORS.darkBlue,
    width: "60%",
    height: 60,
    borderRadius: 17,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Label: {
    color: "white",
    fontFamily: "rubikRegular",
    fontSize: 17,
    letterSpacing: 1,
  },
  Link: {
    fontFamily: "rubikRegular",
    fontSize: 14,
    color: COLORS.orange,
    textAlign: "right",
    width: "100%",
  },
  LargeLink: {
    fontFamily: "rubikRegular",
    fontSize: 16,
    color: COLORS.orange,
  },
  disable: {
    backgroundColor: "#96A3AB",
  },
  enable: {},
});

export { ButtonType, ButtonProps, CustomButton };
