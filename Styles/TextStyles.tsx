import { StyleSheet } from "react-native";

export const COLORS = {
  darkBlue: "#2F4858",
  darkBlueRipple: "#3D6985",
  orange: "#ED7460",
};

export const TextStyles = StyleSheet.create({
  largeHeader: {
    fontFamily: "rubikMedium",
    fontSize: 50,
    color: COLORS.darkBlue,
  },
  tabHeader: {
    fontFamily: "rubikMedium",
    fontSize: 30,
    color: COLORS.darkBlue,
  },
});
