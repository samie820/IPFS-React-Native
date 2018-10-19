import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import UploadScreen from "./screens/Upload.screen";
import ListScreen from "./screens/List.screen";
// import { Icon } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';

export default createBottomTabNavigator(
  {
    Upload: {
      screen: UploadScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-cloud-upload" color={tintColor} size={24} />
        )
      })
    },
    List: {
      screen: ListScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-list" color={tintColor} size={24} />
        )
      })
    }
  },
  {
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);
