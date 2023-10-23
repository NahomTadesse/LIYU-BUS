import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
  Alert,
  Platform,
 
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DropShadow from "react-native-drop-shadow";

import { useRoute } from "@react-navigation/native";

import moment from "moment";

export default function SearchResult({ navigation }) {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [availableSchedule, setSchedule] = useState();
  const [newData, setData] = useState();

  const [loading, setLoading] = useState(false);
  const route = useRoute();
  // const availableSchedule = route.params.availableSchedule;
  const isEnabledTwoWay = route.params.isEnabledTwoWay;
  const depDate = route.params.dateDeparture;

  const fromText = route.params.fromText;
  const toText = route.params.toText;
  const busUuid = route.params.busUuid;
  const dateReturn = route.params.dateReturn;

  // useEffect(() => {
  //   navigation
  //     .getParent()
  //     ?.setOptions({ tabBarStyle: { display: "none" }, tabBarVisible: false });
  //   return () =>
  //     navigation
  //       .getParent()
  //       ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  // }, [navigation]);

  useLayoutEffect(() => {
    setSchedule(route.params.availableSchedule);
  }, []);

  // console.log("----------------LiyuBus")

  // console.log(availableSchedule)
  const [datetext, setDateText] = useState(depDate);

  const [dates, setDates] = useState([{ selected: true, date: moment() }]);

  console.log(availableSchedule);
  useLayoutEffect(() => {
    const dateArray = [];

    for (let i = 0; i < 6; i++) {
      const date = moment().add(i, "days");
      dateArray.push({
        selected: date.isSame(moment(datetext), "day"),
        date,
      });
    }

    setDates(dateArray);
  }, [datetext]);
  // console.log("------------------------------------------");
  //    console.log('datearray : ', dates);

  //////////////////

  if (!availableSchedule) {
    return null;
  }

  ///////////////////

  const dateSearch = async (date) => {
    if (date !== datetext) {
      setLoading(true);

      const refechData = JSON.stringify({
        departureLocationUUId: fromText,
        destinationLocationUUId: toText,
        departureDate: date,

        busCompanyUUId: busUuid,
      });

      console.log("the date----------------", refechData);

      // return;

      await fetch(
        "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/schedule/get-schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: refechData,
        }
      )
        .then((response) => response.json())

        /////////////
        .then((res) => {
          // console.log( 'response: ', res)

          // setSchedule(()=>{res})
          // setData(res)
          // setSchedule(newData)
          // console.log('response: available----',availableSchedule)

          if (res.apierror != undefined) {
            Alert.alert("LIYU BUS", res.apierror.message, [
              { text: "OK", onPress: () => {} },
            ]);
          } else {
            if (res.schedules.length == 0 && res.alternate.length == 0) {
              Alert.alert(
                "LIYU BUS",
                "Sorry, the selected bus is fully booked. Please choose another date.",
                [{ text: "OK", onPress: () => {} }]
              );
            } else {
              setSchedule((prevstate) => res);
            }
            {
              res.schedules.length > 0
                ? setDateText(res.schedules[0].departureDate)
                : res.alternate.length > 0
                ? setDateText(res.alternate[0].departureDate)
                : "";
            }

            // console.log("date----------",availableSchedule.schedules[0].departureDate)
          }
        })

        .catch((error) => {
          console.error(error);

          // Alert.alert(
          //   "LIYU BUS",
          //   "Sorry, The selected date is in the past. Please select a future date.",
          //   [{ text: "OK", onPress: () => {} }]
          // );
       
        })
        .finally(() => setLoading(false));
    }
  };

  const dateSearchTwoWay = async (date) => {
    if (date !== datetext) {
      setLoading(true);

      const refechData = JSON.stringify({
        departureLocationUUId: fromText,
        destinationLocationUUId: toText,
        departureDate: date,
        returnDate: dateReturn,
        busCompanyUUId: busUuid,
      });

      await fetch(
        "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/schedule/get-round-trip-schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: refechData,
        }
      )
        .then((response) => response.json())
        /////////////
        .then((res) => {
          if (res.apierror != undefined) {
            Alert.alert("LIYU BUS", res.apierror.message, [
              { text: "OK", onPress: () => {} },
            ]);
            return;
          } else {
            if (
              //availableSchedule.roundTripSchedule.firstTrip == null &&
              res.roundTripSchedule.firstTrip.length == 0 &&
              // availableSchedule.roundTripSchedule.secondTrip == null &&
              (res.roundTripSchedule.secondTrip == 0) &
                (availableSchedule.alternateRoundTripSchedule.firstTrip ==
                  null) &&
              availableSchedule.alternateRoundTripSchedule.secondTrip == null
            ) {
              Alert.alert(
                "LIYU BUS",
                "Sorry, the selected bus is fully booked. Please choose another date.",
                [{ text: "OK", onPress: () => {} }]
              );
            } else {
              setSchedule((prevstate) => res);
            }

            {
              res.roundTripSchedule.firstTrip.length > 0
                ? setDateText(res.roundTripSchedule.firstTrip[0].departureDate)
                : res.alternateRoundTripSchedule.firstTrip.length > 0 &&
                  res.alternateRoundTripSchedule.firstTrip != null
                ? setDateText(
                    res.alternateRoundTripSchedule.firstTrip[0].departureDate
                  )
                : "";
            }
          }
        })

        .catch((error) => {
          console.error("error-----------", error);

          // Alert.alert(
          //   "LIYU BUS",
          //   "Sorry, The selected date is in the past. Please select a future date.",
          //   [{ text: "OK", onPress: () => {} }]
          // );
          // return;
        })
        .finally(() => setLoading(false));
    }
  };

  console.log("new--------------------------", availableSchedule);

  const topDatePicker = () => {
    return (
      <ScrollView horizontal={true}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 10,
            width: "100%",
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          {dates.map(({ selected, date }, index) => {
            return (
              <View>
                <Pressable
                  onPress={() =>
                    isEnabledTwoWay
                      ? dateSearchTwoWay(date.format("YYYY-MM-DD"))
                      : dateSearch(date.format("YYYY-MM-DD"))
                  }
                >
                  <View
                    style={
                      selected
                        ? {
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            backgroundColor: "#FF6B1B",
                            elevation: 10,
                            shadowColor: "black",
                            margin: 10,
                          }
                        : {
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            backgroundColor: "#EBEBEB",
                            elevation: 10,
                            shadowColor: "black",
                            margin: 10,
                          }
                    }
                  >
                    <Text
                      style={
                        selected
                          ? {
                              textAlign: "center",
                              flex: 1,
                              textAlignVertical: "center",
                              color: "#EBEBEB",
                            }
                          : {
                              textAlign: "center",
                              flex: 1,
                              textAlignVertical: "center",
                              color: "#FF6B1B",
                            }
                      }
                    >
                      {date.format("DD")}
                    </Text>
                  </View>
                  <Text style={{ textAlign: "center", color: "#000000" }}>
                    {date.format("dddd").slice(0, 3)}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  const onChangeBtn = (event, selectedDate) => {
    const currenttDate = selectedDate || date;
    setShow(Platform.OS === "android"), setDate(currenttDate);
    setShow(false);

    let tempDate = new Date(currenttDate);
    let month = (tempDate.getMonth().length = 1
      ? "0" + tempDate.getMonth()
      : tempDate.getMonth());
    let dateDay = (tempDate.getDate().length = 1
      ? "0" + tempDate.getDate()
      : tempDate.getDate());

    let cDate = tempDate.getFullYear() + "-" + month + "-" + dateDay;
    setDateText(cDate);
  };
  const showMode = (currenttMode) => {
    setShow(true);
    setMode(currenttMode);
  };
  const selectedSearch = (allData) => {
    var returnTicket;
    navigation.navigate("busseat", {
      allData,
      isEnabledTwoWay,
      returnTicket: false,
    });
  };


  const selectedTwoWaySearch = (allData) => {
    if (
      (availableSchedule.roundTripSchedule.secondTrip == null &&
        availableSchedule.alternateRoundTripSchedule.secondTrip.length == 0) ||
      null
    ) {
      Alert.alert("LIYU BUS", "No Return Ticket Available", [
        { text: "OK", onPress: () => {} },
      ]);
      console.log(availableSchedule);
    } else {
      navigation.navigate("returnSearchResult", {
        allData,
        isEnabledTwoWay,
        availableSchedule,
        returnTicket: true,
        depDate,
        dateReturn,
        fromText,
        toText,
        busUuid,
        dateReturn,
      });
    }
  };

  function cardViewOneWay() {
    var available =
      availableSchedule.schedules.length > 0 &&
      availableSchedule.schedules != null
        ? availableSchedule.schedules
        : availableSchedule.alternate;

    availableSchedule.alternate && (
      <View>
        {" "}
        <Text
          style={{
            color: "#f27f22",
            fontSize: 14,
            marginLeft: 20,
            marginRight: 10,
          }}
        >
          Sorry, No results were found for your bus preference. Please check
          other bus options.
        </Text>
      </View>
    );

    return available.map((d, index) => {
      var depaLocat = d.route.departureLocationName;
      var destinlocat = d.route.destinationLocationName;
      var arrivalT = d.arrivalTime;
      var departTime = d.departureTime;
      var price = d.tariff.amount;
      var reservedSeatList = d.reservedSeats;
      var bookedSeatList = d.bookedSeats;
      var busUuid = d.vehicleType.uuid;
      var travelDate = d.tariff.timeFrom;
      var busName = d.busCompany;
      var scheduleUUId = d.uuid;
      var maxAvailableSeat = d.maxAvailableSeat;
      var boardingPoints = d.boardingPoints;
      var dropOffPoints = d.dropOffPoints;
      var departureDate = d.departureDate;
      var allData = {
        depaLocat,
        maxAvailableSeat,
        destinlocat,
        arrivalT,
        departTime,
        price,
        reservedSeatList,
        bookedSeatList,
        busUuid,
        travelDate,
        busName,
        scheduleUUId,
        dropOffPoints,
        boardingPoints,
        departureDate,
      };
      console.log(depaLocat);
      console.log(destinlocat);
      console.log(arrivalT);
      console.log(departTime);
      console.log(travelDate);
      console.log(busName);
      console.log(scheduleUUId);

      return (
        <View>
          <View></View>
          <DropShadow
            style={{
              shadowColor: "#171717",
              shadowOffset: { width: 10, height: 5 },
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }}
          >
            <View style={styles.cards}>
              <Pressable onPress={() => selectedSearch(allData)}>
                <View
                  style={{
                    width: screenWidth / 1.12,
                    backgroundColor: "#EBEBEB",
                    height: 50,
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: "#f27f22",
                      fontSize: 18,
                      textAlignVertical: "center",
                      textAlign: "left",
                      fontWeight: "bold",
                      marginLeft: 20,
                    }}
                  >
                    {allData.busName}
                  </Text>

                  <Text
                    style={{
                      marginTop: 15,
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
                    style={{
                      marginTop: 15,
                      marginRight: 15,
                      textAlign: "right",
                    }}
                  >
                    {moment(departureDate).format("dddd").slice(0, 3)}
                    {", "}
                    {moment(departureDate).format("MMM Do")}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#212121",
                      marginLeft: 15,
                      textAlign: "left",
                    }}
                  >
                    {allData.depaLocat}
                  </Text>
                  {/* <Icon name = 'arrow-forward-outline' style={{textAlign : 'center' , flex : 1}}/> */}
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    <View
                      style={{
                        height: 0,
                        width: 100,
                        borderWidth: 0.5,
                        borderColor: "#212121",
                        marginTop: 2,

                        borderRadius: 1,
                      }}
                    ></View>
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",

                      color: "#212121",
                      textAlign: "right",
                      marginRight: 15,
                    }}
                  >
                    {allData.destinlocat}
                  </Text>
                </View>
                <View style={styles.timeStyle}>
                  <Text
                    style={{
                      fontSize: 14,
                      flex: 1,
                      textAlign: "left",
                      color: "#212121",
                      marginLeft: 20,
                    }}
                  >
                    {allData.departTime}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      flex: 1,
                      textAlign: "right",
                      color: "#212121",
                      marginRight: 20,
                    }}
                  >
                    {allData.arrivalT}
                  </Text>
                </View>
                <View style={styles.timeCashStyle}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      marginLeft: 20,
                    }}
                  >
                    {/* <Icon name="bus" style={styles.busIcon} /> */}
                    <Text
                      style={{
                        textAlign: "left",
                        marginVertical: 2,
                        color: "#f27f22",
                        fontWeight: "bold",
                      }}
                    >
                      {/* 5 hrs 50 min */}

                      {allData.price != null
                        ? `${allData.price} ETB`
                        : "No price added"}
                    </Text>
                    <Text
                      style={{
                        color: "#f27f22",
                        flex: 1,
                        fontSize: 14,
                        textAlignVertical: "center",
                        textAlign: "right",

                        marginRight: 15,
                        right: 5,
                      }}
                    >
                      {allData.maxAvailableSeat} Seats Left
                    </Text>
                  </View>
                  <View>
                    <Text style={{ textAlign: "center", top: 5, right: 3 }}>
                      - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                      - - - - - - - - - - - -
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text
                      style={{
                        color: "#f27f22",
                        fontSize: 14,
                        flex: 1,
                        textAlign: "center",
                        marginRight: 20,
                        marginTop: 10,
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      Select Seat
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
          </DropShadow>
        </View>
      );
    });
  }
  ////////////////////////////////////////////////////
  function cardViewTwoWay() {
    var availableTwoTrip =
      availableSchedule.roundTripSchedule.firstTrip.length > 0 &&
      availableSchedule.roundTripSchedule.firstTrip != null
        ? availableSchedule.roundTripSchedule.firstTrip
        : availableSchedule.alternateRoundTripSchedule.firstTrip;

    return availableTwoTrip.map((d, index) => {
      var depaLocat = d.route.departureLocationName;
      var destinlocat = d.route.destinationLocationName;
      var arrivalT = d.arrivalTime;
      var departTime = d.departureTime;
      var price = d.tariff.amount;
      var reservedSeatList = d.reservedSeats;
      var bookedSeatList = d.bookedSeats;
      var busUuid = d.vehicleType.uuid;
      var travelDate = d.departureDate;
      var busName = d.busCompany;
      var maxAvailableSeat = d.maxAvailableSeat;
      var firstScheduleUUId = d.uuid;
      var boardingPoints = d.boardingPoints;
      var dropOffPoints = d.dropOffPoints;
      var maxAvailableSeat = d.maxAvailableSeat;
      const departureDate = d.departureDate;
      const dropOffPointsFirst = d.dropOffPoints;
      const boardingPointsFirst = d.boardingPoints;
      var allData = {
        depaLocat,
        destinlocat,
        arrivalT,
        departTime,
        price,
        reservedSeatList,
        bookedSeatList,
        busUuid,
        travelDate,
        busName,
        boardingPoints,
        dropOffPoints,
        maxAvailableSeat,
        maxAvailableSeat,
        firstScheduleUUId,
        boardingPointsFirst,
        dropOffPointsFirst,
        departureDate,
      };

      console.log(firstScheduleUUId);

      return (
        <View>
          <DropShadow
            style={{
              shadowColor: "#171717",
              shadowOffset: { width: 10, height: 5 },
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }}
          >
            <View style={styles.cards}>
              <Pressable onPress={() => selectedTwoWaySearch(allData)}>
                <View
                  style={{
                    width: screenWidth / 1.12,
                    backgroundColor: "#EBEBEB",
                    height: 50,
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: "#f27f22",
                      fontSize: 18,
                      textAlignVertical: "center",
                      textAlign: "left",
                      fontWeight: "bold",
                      left: 20,
                    }}
                  >
                    {busName}
                  </Text>

                  <Text
                    style={{
                      marginTop: 15,
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
                    style={{
                      marginTop: 15,
                      marginRight: 20,
                      textAlign: "right",
                    }}
                  >
                    {moment(departureDate).format("dddd").slice(0, 3)}
                    {", "}
                    {moment(departureDate).format("MMM Do")}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    top: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      textAlign: "left",

                      marginLeft: 10,
                      color: "#212121",
                      fontWeight: "bold",
                      marginLeft: 15,
                    }}
                  >
                    {depaLocat}
                  </Text>
                  {/* <Icon name = 'arrow-forward-outline' style={{textAlign : 'center' , flex : 1}}/> */}
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    <View></View>

                    <View
                      style={{
                        height: 0,
                        width: 100,
                        borderWidth: 0.5,
                        borderColor: "#212121",
                        marginTop: 2,

                        borderRadius: 1,
                      }}
                    ></View>
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",

                      color: "#212121",
                      textAlign: "right",
                      marginRight: 15,
                    }}
                  >
                    {destinlocat}
                  </Text>
                </View>
                <View style={styles.timeStyle}>
                  <Text
                    style={{
                      fontSize: 14,
                      flex: 1,
                      textAlign: "left",
                      color: "#212121",
                      left: 20,
                    }}
                  >
                    {departTime}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      flex: 1,
                      textAlign: "right",
                      color: "#212121",
                      marginRight: 20,
                    }}
                  >
                    {arrivalT}
                  </Text>
                </View>
                <View style={styles.timeCashStyle}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      marginLeft: 20,
                    }}
                  >
                    {/* <Icon name="bus" style={styles.busIcon} /> */}
                    <Text
                      style={{
                        textAlign: "left",
                        marginVertical: 2,
                        color: "#f27f22",
                        fontWeight: "bold",
                      }}
                    >
                      {/* 5 hrs 50 min */}
                      {price != null ? `${price} ETB` : "No price added"}
                    </Text>
                    <Text
                      style={{
                        color: "#f27f22",
                        flex: 1,
                        fontSize: 14,
                        textAlignVertical: "center",
                        textAlign: "right",
                        right: 5,
                        marginRight: 15,
                      }}
                    >
                      {allData.maxAvailableSeat} Seats Left
                    </Text>
                  </View>
                  <View>
                    <Text style={{ textAlign: "center", top: 5, right: 3 }}>
                      - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                      - - - - - - - - - - - -
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    
                    <Text
                      style={{
                        color: "#f27f22",
                        fontSize: 14,
                        flex: 1,
                        textAlign: "center",
                        marginRight: 20,
                        marginTop: 10,
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      Select Return
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
          </DropShadow>
        </View>
      );
    });
  }

  /////////////////////////////////////////////////////

  return (
    <ScrollView
      style={{ backgroundColor: "#EBEBEB" }}
      stickyHeaderIndices={[0]}
    >
      {navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } })}
      <View style={{ backgroundColor: "#EBEBEB" }}>{topDatePicker()}</View>
      {loading && (
        <View>
          <ActivityIndicator size={"large"} color="#3c6791" />
        </View>
      )}
      {!isEnabledTwoWay && availableSchedule.schedules.length == 0 && (
        <View
   
        >
          <Text
            style={{
              color: "#f27f22",
              fontSize: 14,
              marginLeft: 20,
              marginRight: 10,
            }}
          >
            Sorry, No results were found for your bus preference. Please check
            other bus options.
          </Text>
        </View>
      )}

      {isEnabledTwoWay &&
        availableSchedule.roundTripSchedule.firstTrip.length == 0 && (
          <View
      
          >
            <Text
              style={{
                color: "#f27f22",
                fontSize: 14,
                marginLeft: 20,
                marginRight: 10,
              }}
            >
              Sorry, No results were found for your bus preference. Please check
              other bus options.
            </Text>
          </View>
        )}

      {isEnabledTwoWay ? cardViewTwoWay() : cardViewOneWay()}

      {!isEnabledTwoWay && availableSchedule.schedules.length != 0 && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "center",
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#f27f22" }}>
            {`${availableSchedule.schedules.length} Result(s) found`}
          </Text>
        </View>
      )}
      {!isEnabledTwoWay && availableSchedule.schedules.length == 0 && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "center",
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#f27f22" }}>
            {`${availableSchedule.alternate.length} Result(s) found`}
          </Text>
        </View>
      )}

      {isEnabledTwoWay &&
        availableSchedule.roundTripSchedule.firstTrip.length != 0 && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "center",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#f27f22" }}>
              {`${availableSchedule.roundTripSchedule.firstTrip.length} Result(s) found`}
            </Text>
          </View>
        )}

      {isEnabledTwoWay &&
        availableSchedule.roundTripSchedule.firstTrip.length == 0 && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "center",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#f27f22" }}>
              {`${availableSchedule.alternateRoundTripSchedule.firstTrip.length} Result(s) found`}
            </Text>
          </View>
        )}
    
    </ScrollView>
  );
}
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  calanderIcon: {
    fontSize: 20,
    color: "#212121",

    

    marginLeft: 10,
  },
  topCalendar: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  editIcon: {
    fontSize: 30,
    color: "#f27f22",
    marignleft: 33,
  },
  cards: {
    backgroundColor: "#EBEBEB",
    width: screenWidth / 1.12,
    borderWidth: 0,
    shadowOffset: 10,
    shadowColor: "black",
    marginHorizontal: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    flex: 1,
    alignSelf: "center",
    marginVertical: 10,
    borderTopWidth: 5,
    borderColor: "#EBEBEB",
    elevation: 10,
  },
  cashStyle: {
    textAlign: "left",
    fontSize: 14,
    color: "#FF6B1B",
    padding: 15,
    marginLeft: 10,
  },
  cityStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    top: 7,
  },
  timeStyle: {
    flexDirection: "row",
    

    top: 5,
  },
  timeCashStyle: {
    // justifyContent : 'space-around'
  },
  busIcon: {
    fontSize: 20,
    color: "#212121",
  },
});
