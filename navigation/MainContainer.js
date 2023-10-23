import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dimensions, Pressable } from "react-native";
import { useState, useEffect } from "react";
//////////////////
import AsyncStorage from "@react-native-async-storage/async-storage";

// Screens
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SearchResult from "./screens/SearchResult";

import SelectedResult from "./screens/SelectedResult";

import PassengersInformation from "./screens/PassengersInformation";

import PaymentOption from "./screens/PaymentOptions";
import TicketScreen from "./screens/TicketScreen";
import BusSeat from "./screens/BusSeat";
import returnSearchResult from "./screens/returnSearchResult";
import selectedReturnSearch from "./screens/SelectedReturnSearch";
import BusSeatReturn from "./screens/BusSeatReturn";
import PaymentInformation from "./screens/PaymentInformation";
//Screen names
const homeName = "LIYU BUS";
const detailsName = "Ticket";
const settingsName = "Settings";
const splashScreen = "splash";
const { Navigator, Screen } = createStackNavigator();
const screenWidth = Dimensions.get("window").width;
const Tab = createBottomTabNavigator();

export default function MainContainer() {


  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="splash"
        headerMode="none"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === detailsName) {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === settingsName) {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#f27f22",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}
      >
        <Tab.Screen
          name={homeName}
          component={Home}
          options={() => ({
            headerShown: false,
            unmountOnBlur: true,
            tabBarStyle: {
              display: "none",
            },
          })}
          listeners={({ navigation }) => ({
            blur: () => navigation.setParams({ screen: undefined }),
          })}
        />

        <Tab.Screen
          name={detailsName}
          component={DetailsScreen}
          options={() => ({ unmountOnBlur: true })}
        />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const Home = () => {
  return (
    <Navigator>
      {/* <Screen name = 'splash' component={SplashScreen}  options={{ headerShown: false}} /> */}

      <Screen
        name="home"
        component={HomeScreen}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },

          tabBarButton: () => null,
          headerShown: false,
        })}
      />

      {/* <Screen name = 'languageselection' component={LanguageSelectionPage}   options={{ headerShown: false }}/>
     <Screen name = 'termsandconditions' component={TermsAndConditions} options={{ headerShown: false }}/> */}

      <Screen
        name="returnSearchResult"
        component={returnSearchResult}
        options={{
          title: "Select Your Return",
          headerStyle: {
            backgroundColor: "#EBEBEB",
            alignItems: "center",
            height: 60,
          },
          headerTintColor: "#F28021",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "#000000",
            fontSize: 18,
          },
        }}
      />
      <Screen
        name="BusSeatReturn"
        component={BusSeatReturn}
        options={{
          title: "Select Return Seat",
          headerStyle: {
            backgroundColor: "#EBEBEB",
            alignItems: "center",
            height: 60,
          },
          headerTintColor: "#F28021",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "#000000",
            fontSize: 18,
          },
        }}
      />
      <Screen
        name="paymentInformation"
        component={PaymentInformation}
        options={{
          title: "Payment Options",
          headerStyle: {
            backgroundColor: "#EBEBEB",
            alignSelf: "center",

            height: 60,
          },
          headerTintColor: "#F28021",
          headerTitleStyle: {
            // fontWeight: 'bold',
            marginLeft: screenWidth / 4,
            color: "#000000",
            fontSize: 18,
          },
          headerLeft: () => null,
        }}
      />
      <Screen
        name="selectedReturnSearch"
        component={selectedReturnSearch}
        options={{
          title: "Return Ticket",
          headerStyle: {
            backgroundColor: "#3c6791",
            alignItems: "center",
            height: 60,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "black",
            fontSize: 18,
          },
        }}
      />

      <Screen
        name="busseat"
        component={BusSeat}
        options={{
          title: "Select Departure Seat",

          headerStyle: {
            backgroundColor: "#EBEBEB",
            alignItems: "center",
            height: 60,
          },
          headerTintColor: "#F28021",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "#000000",
            fontSize: 18,
          },
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="ticketScreen"
        component={TicketScreen}
        options={{
          title: "Confirmation",

          headerStyle: {
            backgroundColor: "#EBEBEB",
            alignItems: "center",
            height: 60,
          },

          headerTintColor: "white",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "#212121",
            fontSize: 24,
            left: 110,
          },
          headerLeft: () => null,
        }}
      />
      <Screen
        name="paymentOption"
        component={PaymentOption}
        options={{
          title: "Checkout Page",
          headerStyle: {
            backgroundColor: "#EBEBEB",
            alignItems: "center",
            height: 60,
          },
          headerTintColor: "#FF6B1B",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "black",
            fontSize: 18,
          },
        }}
      />
      <Screen
        name="Passenger Information"
        component={PassengersInformation}
        options={{
          title: "Passenger Information",
          headerStyle: {
            backgroundColor: "#EBEBEB",
            alignItems: "center",
            height: 60,
          },
          headerTintColor: "#FF6B1B",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "black",
            fontSize: 18,
          },
        }}
      />
      <Screen
        name="search"
        component={SearchResult}
        options={{
          title: "Select Your Departure",
          headerStyle: {
            backgroundColor: "#EBEBEB",
            alignItems: "center",
            height: 60,
          },
          headerTintColor: "#FF6B1B",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "#000000",
            fontSize: 18,
          },
        }}
      />
      <Screen
        name="selectedResult"
        component={SelectedResult}
        options={{
          title: "Selected Result",
          headerStyle: {
            backgroundColor: "#3c6791",
            alignItems: "center",
            height: 60,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "white",
            fontSize: 15,
          },
        }}
      />
      <Screen
        name="passengersInfo"
        component={PassengersInformation}
        options={{
          title: "Passengers Information",
          headerStyle: {
            backgroundColor: "#3c6791",
            alignItems: "center",
            height: 60,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "white",
            fontSize: 15,
          },
        }}
      />
    </Navigator>
  );
};
