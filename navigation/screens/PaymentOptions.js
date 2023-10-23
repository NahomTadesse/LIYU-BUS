import * as React from "react";
import { useState, useEffect } from "react";


import { faAnglesRight } from "@fortawesome/free-solid-svg-icons/faAnglesRight";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import moment from "moment";

import {
  View,
  ScrollView,
  Text,
  StyleSheet,

  Dimensions,

  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
// import {CheckBox} from 'react-native-elements'
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from "@react-native-community/checkbox";
import { useRoute } from "@react-navigation/native";
import { all } from "axios";

// import { RadioButton } from 'react-native-paper';

const screenWidth = Dimensions.get("window").width;

export default function PaymentOption({ navigation }) {
  var i = 0;
  const [isAwash, setAwash] = useState(false);
  const [isCbe, setCbe] = useState(false);
  const [isCbo, setCbo] = useState(false);
  const [isTeleBirr, setTeleBirr] = useState(false);

  const route = useRoute();

  const allData = route.params.allData;
  const returnSeat = route.params.returnSeat;
  const [loading, setLoading] = useState(false);
  const allDataTwo = route.params.allDataTwo;
  const isEnabledTwoWay = route.params.isEnabledTwoWay;
  const returnTicket = route.params.returnTicket;
  const phoneNumberList = route.params.phoneNumberList;
  const ageList = route.params.ageList;
  const passengerOffBoardingPlace = route.params.passengerOffBoardingPlace;
  const passengerOnboardingList = route.params.passengerOnboardingList;
  const passengerOffBoardingPlaceReturn =
    route.params.passengerOffBoardingPlaceReturn;
  const passengerOnboardingListReturn =
    route.params.passengerOnboardingListReturn;
  const passengersgenderList = route.params.passengersgenderList;
  const seat = route.params.seat;
  const allDataSecondTrip = route.params.allDataSecondTrip;
  const fullNameList = route.params.fullNameList;

  const paymentInfoOneWay = async () => {
    setLoading(true);

    if (isEnabledTwoWay == false) {
      const bookingDetails = seat.map((item, index) => {
        return {
          seatNumber: seat[index],
          passenger: {
            phoneNumber: phoneNumberList[index],
            fullName: fullNameList[index],
            age: ageList[index],
            gender: passengersgenderList[index],
          },
        };
      });

      const bookingData = {
        scheduleUUId: allData.scheduleUUId,
        offBoarding: passengerOnboardingList.item.key,
        onBoarding: passengerOffBoardingPlace.item.key,
        isRoundTrip: false,
        bookingDetails,
      };
      console.log(passengersgenderList);

      await fetch(
        "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/booking/create-reservation",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(bookingData),
        }
      )
        .then((response) => response.json())

        .then((res) => {
          const book = res;
          console.log(book);

          if (book.apierror == undefined) {
            navigation.navigate("paymentInformation", {
              allData,
              phoneNumberList,
              ageList,
              passengerOffBoardingPlace,
              book,
              passengerOnboardingList,
              passengersgenderList,
              seat,
              returnTicket,
              isEnabledTwoWay,
              fullNameList,
            });
            Alert.alert(
              "LIYU BUS",
              "Your bus booking was successful. Kindly make your payment within 1 hour from now, otherwise your bus booking will be cancelled",
              [{ text: "OK", onPress: () => {} }]
            );
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
    }
  };

  const paymentInfoTwoWay = async () => {
    setLoading(true);

    const bookingDetails = seat.map((item, index) => {
      return {
        seatNumber: seat[index],
        roundTripSeatNumber: returnSeat[index],
        passenger: {
          phoneNumber: phoneNumberList[index],
          fullName: fullNameList[index],
          age: ageList[index],
          gender: passengersgenderList[index],
        },
      };
    });

    const returnBookingRequest = {
      scheduleUUId: allData.firstScheduleUUId,
      roundTripScheduleUUId: allDataSecondTrip.secondScheduleUUId,
      roundTripOnBoardingUUId: passengerOnboardingListReturn.item.key,
      roundTripOffBoardingUUId: passengerOffBoardingPlaceReturn.item.key,
      isRoundTrip: true,
      bookingDetails,
    };

    await fetch(
      "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/booking/create-reservation",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(returnBookingRequest),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        const Roundbook = res;
        console.log(Roundbook);
        if (Roundbook.apierror == undefined) {
          isEnabledTwoWay
            ? navigation.navigate("paymentInformation", {
                allDataTwo,
                Roundbook,
                returnTicket,
                isEnabledTwoWay,
                phoneNumberList,
                ageList,
                passengerOffBoardingPlace,
                passengerOffBoardingPlaceReturn,
                passengerOnboardingListReturn,
                allDataSecondTrip,
                allData,
                passengerOnboardingList,
                passengersgenderList,
                seat,
                returnSeat,
                fullNameList,
              })
            : navigation.navigate("paymentInformation", {
                allData,
                phoneNumberList,
                ageList,
                passengerOffBoardingPlace,
                book,
                passengerOnboardingList,
                passengersgenderList,
                seat,
                fullNameList,
              });
          Alert.alert(
            "LIYU BUS",
            "Your bus booking was successful. Kindly make your payment within 1 hour from now, otherwise your bus booking will be cancelled",
            [{ text: "OK", onPress: () => {} }]
          );
        } else {
          Alert.alert(
            "LIYU BUS",
            `Sorry, The booking session has expired. Please start a new booking.`,
            [{ text: "OK", onPress: () => {} }]
          );
        }
      })

      .catch((error) => {
        console.error(error);
        Alert.alert(
          "LIYU BUS",
          "Sorry, The booking session has expired. Please start a new booking.",
          [{ text: "OK", onPress: () => {} }]
        );
      })
      .finally(() => setLoading(false));
  };

  ////////////////////////////////////
  const oneWay = () => {
    if (isEnabledTwoWay == false) {
      return (
        <ScrollView>
          <View style={styles.cards}>
            {/* <Pressable onPress={toPassengerInfo}> */}

            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#F28021",
                  fontSize: 18,
                  fontWeight: "bold",

                  textAlignVertical: "center",
                  left: 10,
                  marginTop: 10,
                }}
              >
                {allData.busName}
              </Text>
              <Text
                style={{
                  marginTop: 11,
                  flex: 1,
                  marginRight: 5,
                  textAlign: "right",
                }}
              >
                <Icon
                  name="calendar"
                  style={{ fontSize: 18, marginRight: 10 }}
                />
              </Text>
              <Text
                style={{ marginTop: 11, marginRight: 10, textAlign: "right" }}
              >
                {moment(allData.departureDate).format("dddd").slice(0, 3)}
                {", "}
                {moment(allData.departureDate).format("MMM Do")}
              </Text>
            </View>
            <View style={styles.cityStyle}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "left",

                  marginLeft: 10,
                  color: "#212121",
                  fontWeight: "bold",
                }}
              >
                {allData.depaLocat}
              </Text>
              <View
                style={{ flexDirection: "row", marginTop: 10, marginLeft: 15 }}
              >
                <View
                  style={{
                    height: 0,
                    width: 120,
                    borderWidth: 0.5,
                    borderColor: "black",
                    marginTop: 2,

                    borderRadius: 1,
                  }}
                ></View>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "right",
                  flex: 1,
                  right: 10,
                  color: "#212121",
                }}
              >
                {allData.destinlocat}
              </Text>
            </View>
            <View style={styles.timeStyle}>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allData.departTime}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  right: 10,
                  textAlign: "left",
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allData.arrivalT}
              </Text>
            </View>
            <View style={styles.timeCashStyle}>
              <Icon name="time" style={styles.timeIcon} />
              <Text
                style={{
                  textAlign: "left",
                  marginVertical: 4,
                  left: 10,
                  color: "#212121",
                  fontSize: 14,
                }}
              >
                5 hrs 50 min
              </Text>
            </View>

            <View style={styles.boardingTitleStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#212121",
                  fontWeight: "bold",
                }}
              >
                Boarding Place
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  right: 10,
                  color: "#212121",
                  fontWeight: "bold",
                }}
              >
                Drop-Off Place
              </Text>
            </View>

            <View style={styles.boardingPlaceStyle}>
              <View style={{ width: "44%", marginRight: "12%" }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "left",
                    flex: 1,
                    marginLeft: 10,

                    color: "#FF6B1B",
                  }}
                >
                  {Object.values(passengerOnboardingList.item.value).map(
                    (item) => item
                  )}
                </Text>
              </View>
              <View
                style={{
                  width: "27%",
                  bottom: 2,
                  marginLeft: 55,

                  right: "17%",
                }}
              >
                <Text
                  style={
                    passengerOffBoardingPlace.length == 1
                      ? {
                          fontSize: 14,
                          textAlign: "right",
                          marginRight: 80,
                          color: "#FF6B1B",
                        }
                      : passengerOffBoardingPlace.length == 3
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          left: 3,
                          marginRight: 10,
                          color: "#FF6B1B",
                        }
                      : {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,

                          marginRight: 8,
                          color: "#FF6B1B",
                        }
                  }
                >
                  {Object.values(passengerOffBoardingPlace.item.value).map(
                    (item) => item
                  )}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text
                  style={{ left: 10, fontWeight: "bold" }}
                >{`Passenger(s)`}</Text>
                <Text style={{ left: 10, color: "#FF6B1B", marginTop: 10 }}>
                  {fullNameList.map((item, index) => {
                    return (
                      <View style={{}}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                          <Text style={{ color: "#FF6B1B", width: 150 }}>
                            {item}
                          </Text>

                          <Text
                            style={{
                              color: "#FF6B1B",
                              marginLeft: 90,
                            }}
                          >{`(${seat[index]})`}</Text>
                        </View>
                      </View>
                    );
                  })}
                </Text>
              </View>
              <View
                style={{ flex: 1, flexDirection: "column", marginLeft: 40 }}
              >
                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",

                      marginLeft: 50,
                    }}
                  >
                    <Text
                      style={{ fontWeight: "bold", top: 0 }}
                    >{`Seat(s)`}</Text>
                  </View>
                  <Text style={{ color: "#FF6B1B" }}>
                    {/* {seat.map((item,index) => { return `(${seat[index]})`+'\n' })} */}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, marginHorizontal: 3 }}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#212121",
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                Tariff
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#FF6B1B",
                  marginVertical: 5,
                  fontWeight: "bold",
                }}
              >
                {allData.price} ETB
              </Text>
              {/* <Text style ={{fontSize:15,textAlign:'left',flex : 1}}> = 500 ETB</Text> */}
            </View>

            <View
              style={{
                width: screenWidth / 1.1,
                backgroundColor: "#f27f22",
                textAlign: "right",
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
                height: 32,
                flex: 1,
                flexDirection: "row",
                borderBottomEndRadius: 1,
                borderBottomStartRadius: 1,
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  textAlignVertical: "center",
                  flex: 1,
                  color: "white",
                  marginRight: 10,
                  fontSize: 14,
                }}
              >
                Total Tariff
              </Text>
              <Text
                style={{
                  textAlign: "right",
                  textAlignVertical: "center",

                  color: "white",
                  marginRight: 10,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {seat.length * allData.price} ETB
              </Text>
            </View>
            {/* </Pressable> */}
          </View>

          <View style={{ alignSelf: "center", marginTop: 80 }}>
            <Pressable
              // onPress={getTicketBtn}
              onPress={paymentInfoOneWay}
              style={{
                backgroundColor: "#f27f22",
                width: screenWidth / 1.1,
                height: 55,
                borderRadius: 15,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: 80,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlignVertical: "center",
                  marginRight: 3,
                }}
              >
                Book
              </Text>
              <Text>
                <FontAwesomeIcon
                  icon={faAnglesRight}
                  size={20}
                  style={{ color: "white" }}
                />
              </Text>
            </Pressable>
            <View />
          </View>
        </ScrollView>
      );
    }
  };
  //////////////////////////////////
  const twoWay = () => {
    if (returnTicket) {
      return (
        <ScrollView>
          <View style={styles.cards}>
            {/* <Pressable onPress={toPassengerInfo}> */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#F28021",
                  fontSize: 18,
                  fontWeight: "bold",

                  textAlignVertical: "center",
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                {allData.busName}
              </Text>
              <Text
                style={{
                  marginTop: 11,
                  flex: 1,
                  marginRight: 5,
                  textAlign: "right",
                }}
              >
                <Icon
                  name="calendar"
                  style={{ fontSize: 18, marginRight: 10 }}
                />
              </Text>
              <Text
                style={{ marginTop: 11, marginRight: 10, textAlign: "right" }}
              >
                {moment(allData.departureDate).format("dddd").slice(0, 3)}
                {", "}
                {moment(allData.departureDate).format("MMM Do")}
              </Text>
            </View>
            <View style={styles.cityStyle}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "left",

                  left: 10,
                  color: "#212121",
                }}
              >
                {allData.depaLocat}
              </Text>
              <View style={{ flex: 1 }}>
                <View
                  style={
                    allData.depaLocat.length > 10
                      ? {
                          flexDirection: "row",
                          marginTop: 10,
                          left: screenWidth / 25,
                          marginHorizontal: 3,
                        }
                      : {
                          flexDirection: "row",
                          marginTop: 10,
                          left: screenWidth / 20,
                          marginHorizontal: 3,
                        }
                  }
                >
                  <View
                    style={{
                      height: 0,
                      width: 110,

                      borderWidth: 0.5,
                      borderColor: "#3c6791",
                      marginTop: 2,

                      borderRadius: 1,
                    }}
                  ></View>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                }}
              >
                {allData.destinlocat}
              </Text>
            </View>
            <View style={styles.timeStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  marginLeft: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allData.departTime}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allData.arrivalT}
              </Text>
            </View>
            <View style={styles.timeCashStyle}>
              <Icon name="time" style={styles.timeIcon} />
              <Text
                style={{
                  textAlign: "left",
                  marginTop: 4,
                  marginLeft: 10,
                  color: "#212121",
                }}
              >
                5 hrs 50 min
              </Text>
            </View>
            <View style={styles.boardingTitleStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  marginLeft: 10,
                  color: "#212121",
                  fontWeight: "bold",
                  marginTop: -5,
                }}
              >
                Boarding Place
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                  fontWeight: "bold",
                  marginTop: -5,
                }}
              >
                Drop-off Place
              </Text>
            </View>

            <View style={styles.boardingPlaceStyle}>
              <View style={{ width: "44%", marginRight: "12%" }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "left",
                    flex: 1,
                    marginLeft: 10,
                    color: "#FF6B1B",
                    marginTop: -5,
                  }}
                >
                  {Object.values(passengerOnboardingList.item.value).map(
                    (item) => item
                  )}
                </Text>
              </View>
              <View
                style={{
                  width: "27%",
                  bottom: 2,
                  marginLeft: 50,

                  right: "18%",
                }}
              >
                <Text
                  style={
                    passengerOffBoardingPlace.length == 1
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,

                          marginRight: 10,

                          left: 3,
                          marginTop: -5,
                          color: "#FF6B1B",
                        }
                      : passengerOffBoardingPlace.length == 3
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          left: 3,
                          marginRight: 10,
                          color: "#FF6B1B",
                          marginTop: -5,
                        }
                      : {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          left: 3,
                          marginRight: 10,
                          color: "#FF6B1B",
                          marginTop: -5,
                        }
                  }
                >
                  {Object.values(passengerOffBoardingPlace.item.value).map(
                    (item) => item
                  )}
                </Text>
              </View>
            </View>
            <View>
              <Text style={{ textAlign: "center", right: 3 }}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                - - - - - - - - -
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1, marginLeft: 120, flexDirection: "row" }}>
                <Text
                  style={{
                    textAlignVertical: "center",

                    color: "#FF6B1B",
                  }}
                >
                  Tariff{" "}
                </Text>
                <Text
                  style={{
                    textAlignVertical: "center",

                    color: "#FF6B1B",
                    fontWeight: "bold",
                  }}
                >
                  {/* {allDataSecondTrip.priceReturn}{" "} */}
                  {allData.price} ETB{" "}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                borderWidth: 1,
                borderRadius: 1,
                borderStyle: "dotted",
                borderColor: "grey",
              }}
            ></View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#F28021",
                  fontSize: 18,
                  fontWeight: "bold",

                  textAlignVertical: "center",
                  left: 10,
                  marginTop: 10,
                }}
              >
                {allDataSecondTrip.busNameReturn}
              </Text>

              <Text
                style={{
                  marginTop: 11,
                  flex: 1,
                  marginRight: 5,
                  textAlign: "right",
                }}
              >
                <Icon
                  name="calendar"
                  style={{ fontSize: 18, marginRight: 10 }}
                />
              </Text>
              <Text
                style={{ marginTop: 11, marginRight: 10, textAlign: "right" }}
              >
                {moment(allDataSecondTrip.travelDateReturn)
                  .format("dddd")
                  .slice(0, 3)}
                {", "}
                {moment(allDataSecondTrip.travelDateReturn).format("MMM Do")}
              </Text>
            </View>
            <View style={styles.cityStyle}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "left",
                  marginHorizontal: 3,
                  marginLeft: 10,
                  color: "#212121",
                  fontWeight: "bold",
                }}
              >
                {allDataSecondTrip.depaLocatReturn}
              </Text>
              <View
                style={
                  allDataSecondTrip.depaLocatReturn.length > 10
                    ? {
                        flexDirection: "row",
                        marginTop: 10,
                        left: screenWidth / 25,
                        marginHorizontal: 3,
                      }
                    : {
                        flexDirection: "row",
                        marginTop: 10,
                        left: screenWidth / 20,
                        marginHorizontal: 3,
                      }
                }
              >
                <View
                  style={{
                    height: 0,
                    width: 110,
                    borderWidth: 0.5,
                    borderColor: "#3c6791",
                    marginTop: 2,

                    borderRadius: 1,
                  }}
                ></View>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                  fontWeight: "bold",
                }}
              >
                {allDataSecondTrip.destinlocatReturn}
              </Text>
            </View>

            <View style={styles.timeStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  marginLeft: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allDataSecondTrip.departTimeReturn}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allDataSecondTrip.arrivalTReturn}
              </Text>
            </View>
            <View style={styles.timeCashStyle}>
              <Icon name="time" style={styles.timeIcon} />
              <Text
                style={{
                  textAlign: "left",
                  marginTop: 4,
                  marginLeft: 10,
                  color: "#212121",
                }}
              >
                5 hrs 50 min
              </Text>
            </View>
            <View style={styles.boardingTitleStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  marginLeft: 10,
                  color: "#212121",
                  fontWeight: "bold",
                  marginTop: -5,
                }}
              >
                Boarding Place
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                  fontWeight: "bold",
                  marginTop: -5,
                }}
              >
                Drop-off Place
              </Text>
            </View>

            <View style={styles.boardingPlaceStyle}>
              <View style={{ width: "44%", marginRight: "12%" }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "left",
                    flex: 1,
                    marginLeft: 10,
                    color: "#FF6B1B",
                    marginTop: -5,
                  }}
                >
                  {Object.values(passengerOnboardingListReturn.item.value).map(
                    (item) => item
                  )}
                </Text>
              </View>
              <View
                style={{
                  width: "29%",
                  bottom: 2,
                  marginLeft: 50,
                  right: "15%",
                }}
              >
                <Text
                  style={
                    passengerOffBoardingPlace.length == 1
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,

                          marginRight: 10,
                          marginTop: -5,

                          color: "#FF6B1B",
                        }
                      : passengerOffBoardingPlace.length == 3
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          marginTop: -5,

                          marginRight: 10,
                          left: 1,
                          color: "#FF6B1B",
                          Right: 10,
                          marginTop: -5,
                        }
                      : {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          left: 2,
                          marginTop: -5,
                          marginRight: 10,
                          color: "#FF6B1B",
                        }
                  }
                >
                  {Object.values(
                    passengerOffBoardingPlaceReturn.item.value
                  ).map((item) => item)}
                </Text>
              </View>
            </View>
            <View>
              <Text style={{ textAlign: "center", right: 3 }}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                - - - - - - - - - -
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1, flexDirection: "row", marginLeft: 120 }}>
                <Text
                  style={{
                    textAlign: "center",
                    textAlignVertical: "center",

                    color: "#FF6B1B",
                  }}
                >
                  Tariff{" "}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    textAlignVertical: "center",

                    color: "#FF6B1B",
                    fontWeight: "bold",
                  }}
                >
                  {allDataSecondTrip.priceReturn} ETB{" "}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                borderWidth: 1,
                borderRadius: 1,
                borderStyle: "dotted",
                borderColor: "grey",
              }}
            ></View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, flexDirection: "column", marginTop: 10 }}>
                <Text
                  style={{ left: 10, fontWeight: "bold" }}
                >{`Passenger(s)`}</Text>
                <Text style={{ left: 10, marginTop: 10, color: "#FF6B1B" }}>
                  {fullNameList.map((item, index) => {
                    return item + "\n";
                  })}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  marginTop: 5,
                  marginLeft: 20,
                }}
              >
                <View style={{ flex: 1, flexDirection: "row", marginLeft: 10 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      top: 3,
                      marginRight: 10,
                      marginLeft: 1,
                    }}
                  >{`Departure`}</Text>

                  <Text
                    style={{ fontWeight: "bold", top: 3, marginLeft: 25 }}
                  >{`Return`}</Text>
                </View>
                <Text
                  style={{ marginLeft: 25, marginBottom: 2, color: "#FF6B1B" }}
                >
                  {seat.map((item, index) => {
                    return (
                      `(${seat[index]})` +
                      "                   " +
                      `(${returnSeat[index]})` +
                      "\n"
                    );
                  })}
                </Text>
              </View>
            </View>

            <View
              style={{
                width: screenWidth / 1.1,
                backgroundColor: "#f27f22",
                textAlign: "right",
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
                height: 32,

                borderBottomEndRadius: 1,
                borderBottomStartRadius: 1,
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text
                  style={{
                    textAlign: "right",
                    textAlignVertical: "center",
                    flex: 1,
                    color: "white",
                    marginRight: 10,
                  }}
                >
                  Total Tariff
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    textAlignVertical: "center",
                    fontSize: 15,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {seat.length *
                    (allDataSecondTrip.priceReturn + allData.price)}{" "}
                  ETB{" "}
                </Text>
              </View>
            </View>
            {/* </Pressable> */}
          </View>
          <View style={{ alignSelf: "center", marginTop: 10 }}>
            <Pressable
              // onPress={getTicketBtn}
              onPress={paymentInfoTwoWay}
              style={{
                backgroundColor: "#f27f22",
                width: screenWidth / 1.1,
                height: 55,
                borderRadius: 15,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",

                flexDirection: "row",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlignVertical: "center",
                  marginRight: 3,
                }}
              >
                Book
              </Text>
              <Text>
                <FontAwesomeIcon
                  icon={faAnglesRight}
                  size={20}
                  style={{ color: "white" }}
                />
              </Text>
            </Pressable>
            <View />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.cards}>
          {/* <Pressable onPress={toPassengerInfo}> */}

          <Text
            style={{
              width: screenWidth / 1.1,
              backgroundColor: "#3c6791",
              textAlign: "left",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              height: 30,
              textAlignVertical: "center",
            }}
          >
            {allDataTwo.busName}
          </Text>
          <View style={styles.topCalendar}>
            <Icon name="calendar" style={styles.calanderIcon} />
            <Text
              style={{
                marginHorizontal: 1,
                marginVertical: 6,
                color: "#3c6791",
                left: 10,
              }}
            >
              {allDataTwo.travelDate}
            </Text>
          </View>
          <View style={styles.cityStyle}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "left",
                marginHorizontal: 3,
                left: 10,
                color: "#3c6791",
              }}
            >
              {allDataTwo.depaLocat}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginHorizontal: 20,
              }}
            >
              <View
                style={{
                  height: 0,
                  width: 110,
                  borderWidth: 0.5,
                  borderColor: "#3c6791",
                  marginTop: 2,

                  borderRadius: 1,
                }}
              ></View>
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
              }}
            >
              {allDataTwo.destinlocat}
            </Text>
          </View>
          <View style={styles.timeStyle}>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 20,
                color: "#3c6791",
              }}
            >
              {allDataTwo.departTime}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "right",
                flex: 1,
                right: 20,
                color: "#3c6791",
              }}
            >
              {allDataTwo.arrivalT}{" "}
            </Text>
          </View>
          <View style={styles.timeCashStyle}>
            <Icon name="time" style={styles.timeIcon} />
            <Text
              style={{
                textAlign: "left",
                marginVertical: 4,
                left: 10,
                color: "#3c6791",
              }}
            >
              5 hrs 50 min
            </Text>
          </View>

          <View style={styles.cityStyle}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "left",
                marginHorizontal: 3,
                left: 10,
                color: "#3c6791",
                fontWeight: "bold",
              }}
            >
              {allDataTwo.destinlocat}{" "}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginHorizontal: 20,
              }}
            >
              <View
                style={{
                  height: 0,
                  width: 110,
                  borderWidth: 0.5,
                  borderColor: "#3c6791",
                  marginTop: 2,

                  borderRadius: 1,
                }}
              ></View>
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
                fontWeight: "bold",
              }}
            >
              {allDataTwo.depaLocat}
            </Text>
          </View>

          <View style={styles.timeStyle}>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 10,
                color: "#3c6791",
              }}
            >
              {allDataTwo.departTime}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
              }}
            >
              {allDataTwo.arrivalT}{" "}
            </Text>
          </View>
          <View style={styles.boardingTitleStyle}>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 10,
                color: "#3c6791",
              }}
            >
              Boarding Place
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
              }}
            >
              Drop-Off Place
            </Text>
          </View>

          <View style={styles.boardingPlaceStyle}>
            <Text
              style={{
                fontSize: 14,
                textAlign: "left",
                flex: 1,
                marginLeft: 10,
                color: "#3c6791",
                marginRight: 25,
              }}
            >
              {/* {Object.values(passengerOnboardingList.item.value).map((item) => item)} */}
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
              }}
            >
              {/* {Object.values(passengerOffBoardingPlace.item.value).map((item) => item)}{" "} */}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "column",
                marginVertical: 10,
                maxWidth: 100,
                marginRight: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#3c6791",
                }}
              >
                Seats
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#3c6791",
                  fontWeight: "bold",
                }}
              >
                {seat.map((item) => item).join(", ")}
              </Text>
            </View>

            <View style={{ flexDirection: "column", marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  marginEnd: 70,
                  flex: 1,
                  right: 10,
                  color: "#3c6791",
                }}
              >
                {" "}
                Passengers
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginRight: 50,
                  flex: 1,
                  color: "#3c6791",
                  fontWeight: "bold",
                }}
              >
                {seat.length}
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 3, flex: 1, marginHorizontal: 3 }}>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 10,
                color: "#3c6791",
              }}
            >
              Price per passenger
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 10,
                color: "#3c6791",
                marginVertical: 10,
                fontWeight: "bold",
              }}
            >
              {allDataTwo.price} ETB
            </Text>
            {/* <Text style ={{fontSize:15,textAlign:'left',flex : 1}}> = 500 ETB</Text> */}
          </View>

          <View
            style={{
              width: screenWidth / 1.1,
              backgroundColor: "#f27f22",
              textAlign: "right",
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
              height: 32,

              borderBottomEndRadius: 1,
              borderBottomStartRadius: 1,
            }}
          >
            <Text
              style={{
                textAlign: "right",
                textAlignVertical: "center",
                flex: 1,
                color: "white",
              }}
            >
              Total Price : {seat.length * allDataTwo.price} ETB{" "}
            </Text>
          </View>
          {/* </Pressable> */}
        </View>
      );
    }
  };

  ///////////////////////////
  //////////////////////////
  return (
    <ScrollView style={{ backgroundColor: "#EBEBEB" }}>
      <View>
        {returnTicket ? twoWay() : oneWay()}

        {loading && (
          <View>
            <ActivityIndicator size={"large"} color="#3c6791" />
          </View>
        )}
      </View>
 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "flex-start",
  },
  label: {
    margin: 5,
  },
  calanderIcon: {
    fontSize: 20,
    color: "#212121",

    // marginHorizontal:10,

    marginLeft: 10,
  },
  topCalendar: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  editIcon: {
    fontSize: 40,
    color: "tomato",
    marginHorizontal: 120,
    marginVertical: 30,
  },
  cards: {
    width: screenWidth / 1.1,
    borderWidth: 0,
    shadowOffset: 10,
    shadowColor: "black",
    marginHorizontal: 10,

    marginTop: 10,
    alignSelf: "center",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderBottomStartRadius: 0,
    backgroundColor: "#EBEBEB",
    shadowColor: "black",
    elevation: 20,
  },
  cashStyle: {
    width: 80,
    height: 40,
    backgroundColor: "#3c6791",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    borderBottomEndRadius: 10,
  },

  cityStyle: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  timeStyle: {
    flexDirection: "row",
    marginBottom: 10,
  },
  timeCashStyle: {
    flexDirection: "row",
    marginBottom: 0,

    // justifyContent : 'space-around'
  },
  timeIcon: {
    fontSize: 20,
    color: "#212121",
    left: 10,
    marginTop: 3,
  },
  boardingTitleStyle: {
    flexDirection: "row",
    marginTop: 20,
  },
  boardingPlaceStyle: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 11,
  },
});
