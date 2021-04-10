import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import {
  authorizeWithGoogle,
  emailIsRegistered,
  signIn,
  signUp,
} from "../mst/FireScripts";
import { useNavigation } from "../mst/navigationStore";
import { TextStyles } from "../Styles/TextStyles";
import { ButtonType, CustomButton } from "./Buttons";

export const Login = observer(() => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userStatus, setUserStatus] = useState("unknown");

  const createAlert = (message: string, title: string) => {
    Alert.alert(title, message, [{ text: "OK" }]);
  };

  const nextButtonHandler = () => {
    switch (userStatus) {
      case "unknown": {
        emailIsRegistered(email).then(
          () => {
            setUserStatus("registered");
          },
          () => {
            setUserStatus("unregistered");
          }
        );
        break;
      }
      case "registered": {
        console.log("user is registered");
        // log in
        signIn(email, password);
        break;
      }
      case "unregistered": {
        console.log("user is not registered");
        // join
        if (password === confirmPassword) {
          signUp(email, password);
        } else {
          // display error
          createAlert("passwords must match", "We couldn't sign you up");
        }
        break;
      }
      default: {
      }
    }
  };

  const renderPasswordFields = () => {
    const passwordField = (
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        placeholder={"password"}
        autoCompleteType={"password"}
        autoCapitalize="none"
        secureTextEntry={true}
      />
    );
    const confirmPassowrdField = (
      <TextInput
        style={styles.textInput}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder={"confirm password"}
        autoCompleteType={"password"}
        autoCapitalize="none"
        secureTextEntry={true}
      />
    );

    switch (userStatus) {
      case "unknown":
        return <></>;
      case "registered":
        return passwordField;
      case "unregistered":
        return (
          <>
            {passwordField}
            {confirmPassowrdField}
          </>
        );
    }
  };

  const disableButton = (): boolean => {
    switch (userStatus) {
      case "unknown":
        return false;
      case "registered":
        return false;
      case "unregistered":
        let text = "";
        if (password.length < 6) {
          return true;
        } else if (password !== confirmPassword) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  };

  const renderButtonText = () => {
    switch (userStatus) {
      case "unknown":
        return "next";
      case "registered":
        return "log in";
      case "unregistered":
        let text = "";
        if (password.length < 6) {
          text = "too short";
        } else if (password !== confirmPassword) {
          text = "passwords don't match";
        } else {
          text = "join";
        }
        return text;
      default:
        return "error";
    }
  };

  return (
    <View style={styles.container}>
      <View>{/* spacer view */}</View>
      <View>{/* spacer view */}</View>
      <Text style={TextStyles.largeHeader}>Login</Text>
      <View>{/* spacer view */}</View>
      <View style={styles.fieldsContainer}>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder={"email"}
        />
        {renderPasswordFields()}
      </View>
      <CustomButton
        onClick={() => {
          nextButtonHandler();
        }}
        disable={disableButton()}
        type={ButtonType.largePrimary}
        text={renderButtonText()}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  textInput: {
    width: "85%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ECF2F6",
    marginBottom: 10,
  },
  fieldsContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
});
