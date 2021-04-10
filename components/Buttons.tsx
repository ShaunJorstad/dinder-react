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
}

interface ButtonProps {
  type: ButtonType;
  text: string;
  disable?: boolean;
  onClick?: any;
  icon?: any;
}

const CustomButton = (props: ButtonProps) => {
  switch (props.type) {
    case ButtonType.largePrimary:
      return <LargePrimaryButton {...props} />;
    default:
      return <></>;
  }
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
  disable: {
    backgroundColor: "#96A3AB",
  },
  enable: {},
});

export { ButtonType, ButtonProps, CustomButton };
