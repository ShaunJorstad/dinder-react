import { types } from "mobx-state-tree";
import { createContext, useContext } from "react";

const getNavbarVisibility = (view: string): boolean => {
  switch (view) {
    case "Onboard":
      return false;
    case "Login":
      return false;
    case "search":
      return true;
    default:
      return false;
  }
};

export const navigationModel = types
  .model({
    currentView: types.string,
    navbarVisibility: types.boolean,
  })
  .actions((store) => ({
    setView(nextScreen: string) {
      store.currentView = nextScreen;
      store.navbarVisibility = getNavbarVisibility(nextScreen);
    },
  }));

let _navigation: any;
export const useNavigation = () => {
  if (!_navigation) {
    _navigation = navigationModel.create({
      currentView: "Login",
      navbarVisibility: getNavbarVisibility("Login"),
    });
  }
  return _navigation;
};
