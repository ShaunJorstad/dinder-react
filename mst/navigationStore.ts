import { types } from "mobx-state-tree";
import { createContext, useContext } from "react";

const getNavbarVisibility = (view: string): boolean => {
  switch (view) {
    case "Onboard":
      return false;
    case "Login":
      return false;
    case "search":
    case "settings":
    case "pay":
      return true;
    default:
      return false;
  }
};

export const navigationModel = types
  .model({
    currentView: types.string,
    navbarVisibility: types.boolean,
    authEmail: types.string,
  })
  .actions((store) => ({
    setView(nextScreen: string) {
      store.currentView = nextScreen;
      store.navbarVisibility = getNavbarVisibility(nextScreen);
    },
    setEmail(email: string) {
      store.authEmail = email;
      if (email === "") {
        store.currentView = "Login";
        store.navbarVisibility = getNavbarVisibility("Login");
      } else {
        store.currentView = "search";
        store.navbarVisibility = getNavbarVisibility("search");
      }
    },
  }));

let _navigation: any;
export const useNavigation = () => {
  if (!_navigation) {
    _navigation = navigationModel.create({
      currentView: "Login",
      navbarVisibility: getNavbarVisibility("Login"),
      authEmail: "",
    });
  }
  return _navigation;
};
