import * as React from "react";
import { useState, useEffect } from "react";

import {
  useRoute,
  NavigationContainer,
  useFocusEffect,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropShadow from "react-native-drop-shadow";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  BackHandler,
  Switch,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";

import { faUserCheck } from "@fortawesome/free-solid-svg-icons/faUserCheck";

const screenWidth = Dimensions.get("window").width;

export default function PaymentInformaion({ navigation }) {
  const [bankSelectedTeleBirr, setBankSelectedTeleBirr] = useState(false);
  const [bankSelectedAwash, setBankSelectedAwash] = useState(false);
  const [bankSelectedWegagen, setBankSelectedWegagen] = useState(false);
  const [bankSelectedCbe, setBankSelectedCbe] = useState(false);
  const [bankSelectedCbeBirr, setBankSelectedCbeBirr] = useState(false);
  const [bankSelectedAmole, setBankSelectedAmole] = useState(false);
  const route = useRoute();
  const book = route.params.book;
  const Roundbook = route.params.Roundbook;
  const allData = route.params.allData;
  const allDataSecondTrip = route.params.allDataSecondTrip;
  const returnSeat = route.params.returnSeat;
  const allDataTwo = route.params.allDataTwo;
  const phoneNumberList = route.params.phoneNumberList;
  const ageList = route.params.ageList;
  const passengerOffBoardingPlace = route.params.passengerOffBoardingPlace;
  const passengerOnboardingList = route.params.passengerOnboardingList;
  const passengersgenderList = route.params.passengersgenderList;
  const seat = route.params.seat;
  const returnTicket = route.params.returnTicket;
  const isEnabledTwoWay = route.params.isEnabledTwoWay;
  const fullNameList = route.params.fullNameList;
  const [loading, setLoading] = useState(false);
  const passengerOffBoardingPlaceReturn =
    route.params.passengerOffBoardingPlaceReturn;
  const passengerOnboardingListReturn =
    route.params.passengerOnboardingListReturn;

  const getTicketBtn = () => {
    setLoading(true);

    fetch(
      "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/payment/pay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingUuids: book.bookingUUIds,
          paymentMethod: "telebirr",
        }),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        const ticketDetails = res;

        if (ticketDetails.apierror == undefined) {
          fetch(
            `http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/ticket/get-tickets/${ticketDetails.ticketUuids}`
          )
            .then((response) => response.json())
            .then((res) => {
              const ticketInfo = res;
              console.log(ticketInfo);

              navigation.navigate("ticketScreen", {
                allData,
                phoneNumberList,
                ageList,
                ticketInfo,
                passengerOffBoardingPlace,
                book,
                Roundbook,
                passengerOnboardingList,
                passengerOffBoardingPlaceReturn,
                passengerOnboardingListReturn,
                passengersgenderList,
                seat,
                returnTicket,
                isEnabledTwoWay,
                fullNameList,
                allDataSecondTrip,
                returnSeat,
                allDataTwo,
              });
            });
        } else {
          Alert.alert(
            "LIYU BUS",
            "Sorry, The booking session has expired. Please start a new booking.",
            [{ text: "OK", onPress: () => {} }]
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          "LIYU BUS",
          "Sorry, The booking session has expired. Please start a new booking.",
          [{ text: "OK", onPress: () => {} }]
        );
      })
      .finally(() => setLoading(false));
  };

  const getTicketBtnRound = () => {
    setLoading(true);

    fetch(
      "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/payment/pay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingUuids: Roundbook.bookingUUIds,
          paymentMethod: "telebirr",
        }),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        const ticketDetails = res;

        if (ticketDetails.apierror == undefined) {
          fetch(
            `http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/ticket/get-tickets/${ticketDetails.ticketUuids}`
          )
            .then((response) => response.json())
            .then((res) => {
              const ticketInfo = res;
              console.log(ticketInfo);

              navigation.navigate("ticketScreen", {
                allData,
                phoneNumberList,
                ageList,
                ticketInfo,
                passengerOffBoardingPlace,
                book,
                Roundbook,
                passengerOnboardingList,
                passengerOffBoardingPlaceReturn,
                passengerOnboardingListReturn,
                passengersgenderList,
                seat,
                returnTicket,
                isEnabledTwoWay,
                fullNameList,
                allDataSecondTrip,
                returnSeat,
                allDataTwo,
              });
            });
        } else {
          Alert.alert(
            "LIYU BUS",
            "Sorry, The booking session has expired. Please start a new booking.",
            [{ text: "OK", onPress: () => {} }]
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          "LIYU BUS",
          "Sorry, The booking session has expired. Please start a new booking.",
          [{ text: "OK", onPress: () => {} }]
        );
      })
      .finally(() => setLoading(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("home");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
  const ticView = () => {
    return (
      <View style={{}}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 10,
            width: screenWidth / 1.3,
            position: "absolute",
            bottom: 80,
            alignSelf: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faUserCheck}
            style={{ color: "black" }}
            size="36"
          />
          <Text style={{ fontSize: 14, marginHorizontal: 10 }}>
            By clicking the button I have agreed to the privacy policy and terms
            and conditions of the service
          </Text>
        </View>
        <Pressable
          // onPress={getTicketBtn}
          onPress={isEnabledTwoWay ? getTicketBtnRound : getTicketBtn}
          style={{
            backgroundColor: "#f27f22",
            width: screenWidth / 1.1,
            height: 55,
            borderRadius: 15,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",

            marginBottom: 5,
            // top: 40,
          }}
        >
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            PROCEED TO PAY
          </Text>
        </Pressable>

        {/* <Pressable
          onPress={() => {
            console.log("dhdhvbjvdvvv", Roundbook);
          }}
          style={{
            backgroundColor: "#f27f22",
            width: screenWidth / 1.1,
            height: 55,
            borderRadius: 15,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",

            marginBottom: 5,
            // top: 40,
          }}
        >
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            PROCEED
          </Text>
        </Pressable> */}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          height: "100%",
          height: Dimensions.get("window").height - 110,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            // flex: 1,
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <Pressable
            onPress={() => setBankSelectedTeleBirr(!bankSelectedTeleBirr)}
          >
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 7, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
              <View
                style={{ width: 97, height: 100, backgroundColor: "#EBEBEB" }}
              >
                <Image
                  style={
                    bankSelectedTeleBirr
                      ? {
                          width: 97,
                          height: 100,
                          borderWidth: 3,
                          borderColor: "#f27f22",
                        }
                      : { width: 97, height: 100, borderWidth: 2 }
                  }
                  source={require("../bankLogo/Telebirr.png")}
                />
              </View>
            </DropShadow>
          </Pressable>
          <Pressable onPress={() => setBankSelectedAwash(!bankSelectedAwash)}>
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 7, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
              <View
                style={
                  bankSelectedAwash
                    ? {
                        width: 97,
                        height: 100,
                        borderWidth: 3,
                        borderColor: "#f27f22",
                        backgroundColor: "#EBEBEB",
                      }
                    : { width: 97, height: 100, backgroundColor: "#EBEBEB" }
                }
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    alignSelf: "center",
                    flex: 1,
                    justifyContent: "center",
                    transform: [{ scale: 0.8 }],
                  }}
                  source={require("../bankLogo/Awash45.jpg")}
                />
              </View>
            </DropShadow>
          </Pressable>

          <Pressable onPress={() => setBankSelectedAmole(!bankSelectedAmole)}>
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 7, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
              <View
                style={{ width: 97, height: 100, backgroundColor: "#EBEBEB" }}
              >
                <Image
                  style={
                    bankSelectedAmole
                      ? {
                          width: 97,
                          height: 100,
                          borderWidth: 3,
                          borderColor: "#f27f22",
                        }
                      : { width: 97, height: 100, borderWidth: 2 }
                  }
                  source={require("../bankLogo/Amole.png")}
                />
              </View>
            </DropShadow>
          </Pressable>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-around",

            maxHeight: 150,
          }}
        >
          <Pressable onPress={() => setBankSelectedCbe(!bankSelectedCbe)}>
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 7, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
              <View
                style={{ width: 97, height: 100, backgroundColor: "#EBEBEB" }}
              >
                <Image
                  style={
                    bankSelectedCbe
                      ? {
                          width: 97,
                          height: 100,
                          borderWidth: 3,
                          borderColor: "#f27f22",
                        }
                      : { width: 97, height: 100, borderWidth: 2 }
                  }
                  source={require("../bankLogo/CBE.jpg")}
                />
              </View>
            </DropShadow>
          </Pressable>
          <Pressable
            onPress={() => setBankSelectedWegagen(!bankSelectedWegagen)}
          >
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 7, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
              <View
                style={{ width: 97, height: 100, backgroundColor: "#EBEBEB" }}
              >
                <Image
                  style={
                    bankSelectedWegagen
                      ? {
                          width: 97,
                          height: 100,
                          borderWidth: 3,
                          borderColor: "#f27f22",
                        }
                      : { width: 97, height: 100, borderWidth: 2 }
                  }
                  source={require("../bankLogo/Wegagen.png")}
                />
              </View>
            </DropShadow>
          </Pressable>
          <Pressable
            onPress={() => setBankSelectedCbeBirr(!bankSelectedCbeBirr)}
          >
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 7, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
              <View
                style={{ width: 97, height: 100, backgroundColor: "#EBEBEB" }}
              >
                <Image
                  style={
                    bankSelectedCbeBirr
                      ? {
                          width: 97,
                          height: 100,
                          borderWidth: 3,
                          borderColor: "#f27f22",
                        }
                      : { width: 97, height: 100, borderWidth: 2 }
                  }
                  source={require("../bankLogo/cbeBIR.png")}
                />
              </View>
            </DropShadow>
          </Pressable>
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={"large"} color="#3c6791" />
          </View>
        )}
        <View
          style={{
            position: "absolute",
            bottom: 0,

            alignSelf: "center",
          }}
        >
          {ticView()}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cards: {
    width: screenWidth / 1.1,
    shadowOffset: 10,
    shadowColor: "black",
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
