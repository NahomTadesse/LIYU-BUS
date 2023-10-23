import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Switch,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

import {
  useIsFocused,
} from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons/faCalendarDays";

import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Calendar } from "react-native-ethiopian-calendar";
import DropShadow from "react-native-drop-shadow";
import Svg, { Path } from "react-native-svg";
import moment from "moment";
import { Autocomplete, AutocompleteItem, Icon } from "@ui-kitten/components";

const filter = (item, query) =>
  item.value.toLowerCase().includes(query.toLowerCase());

export default function HomeScreen({ navigation }) {
  const [BusNameListDrop, setBusNameListDrop] = useState([]);
  const [value, setValue] = useState(null);
  const [valuefrom, setValuefrom] = useState(null);
  const [valueBus, setValueBus] = useState(null);
  const [valueTo, setValueTo] = useState(null);
  const [mode, setMode] = React.useState("GC");
  const [locale, setLocale] = React.useState("AMH");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedReturnDate, setSelectedReturnDate] = React.useState("");
  const [modeReturn, setModeReturn] = React.useState("EC");
  const [localeReturn, setLocaleReturn] = React.useState("AMH");
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [showDropDow, setShowDropDown] = useState(false)

  const [popularRoutes, setPopularRoutes] = useState();
  const [showPopuularRoute, setShowPopularRoute] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  const activeDate = moment().add(1, "day").format("YYYY-MM-D");
  useEffect(() => {
    setValuefrom("");
    setValueTo("");
    setSelectedDate("");
    setSelectedReturnDate("");
    setBusName("");
    setBusUuid("");
    setInputFrom("");
    setInputTo("");
    setValue("");
    setBusName("");
    setBusUuid("");
    setValueBus("");
    setShowPopularRoute(false);
    setIsActiveSearch(false);
  }, [isFocused]);

  useEffect(() => {
    getPopularRoute();
  }, []);

  useEffect(() => {
    isActiveSearch && searchBtn();
    console.log(
      "heyyyy",
      fromText,
      "dsvdfv",
      toText,
      "accc",
      dateDeparture,
      "active",
      isActiveSearch
    );
    setIsActiveSearch(false);
  }, [isActiveSearch]);

  const searchResult = "Search Result";

  //////
  const [InputFromName, setInputFromName] = useState("From");
  const [InputToName, setInputToName] = useState("To");
  /////
  const [busName, setBusName] = useState(value);
  const [dataLocation, setDataLocation] = useState([]);

  const [departureDateText, setDepartureDate] = useState();
  const [returnDateText, setReturnDate] = useState();

  const [toText, setInputTo] = useState("");
  const [fromText, setInputFrom] = useState("");
  const [isEnabledOneWay, setEnabledOneWay] = useState(true);
  const [isEnabledTwoWay, setEnabledTwoWay] = useState(false);

  const [show, setShow] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [busUuid, setBusUuid] = useState();

  const [data, setData] = React.useState(dataLocation);
  const getPopularRoute = () => {

    fetch(
      "http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/route/get-active-route"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPopularRoutes(data);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "LIYU BUS",
          "Sorry, The booking session has expired. Please start a new booking. ",
          [{ text: "OK", onPress: () => { } }]
        );
      });
  };

  const pRoute = () => {
    return (
      popularRoutes && popularRoutes.map((pr, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setInputFrom(pr.departure.uuid);
              setInputTo(pr.destination.uuid);
              dateDeparture == activeDate;
              setIsActiveSearch(true);
            }}
            style={{ backgroundColor: "#EBEBEB", borderColor: "#EBEBEB" }}
          >
            <DropShadow
              style={{
                shadowColor: "black",
                shadowOffset: { width: 1, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
              <View
                style={{
                  minWidth: 150,
                  height: 80,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginBottom: 10,
                  marginTop: 5,
                  marginRight: 30,
                  backgroundColor: "#EBEBEB",
                  borderColor: "#EBEBEB",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      source={require("../Img/circle.png")}
                      style={{
                        width: 20,
                        height: 20,
                        marginTop: 15,
                      }}
                    />

                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        marginLeft: 10,
                        marginTop: 15,
                      }}
                    >
                      {pr.departure.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <Image
                      source={require("../Img/map.png")}
                      style={{
                        width: 20,
                        height: 20,
                        marginTop: 10,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        marginLeft: 10,
                        marginTop: 10,
                      }}
                    >
                      {pr.destination.name}
                    </Text>
                  </View>
                </View>
              </View>
            </DropShadow>
          </TouchableOpacity>
        );
      })
    );
  };
  const renderLeavingFrom = (props) => (
    <TouchableWithoutFeedback>
      <Image
        source={require("../Img/circle.png")}
        style={{
          width: 20,
          height: 25,
        }}
      />
    </TouchableWithoutFeedback>
  );
  const renderGoingTo = (props) => (
    <TouchableWithoutFeedback>
      <Image
        source={require("../Img/map.png")}
        style={{
          width: 20,
          height: 20,
        }}
      />
    </TouchableWithoutFeedback>
  );
  const renderBus = (props) => (
    <TouchableWithoutFeedback>
      <Image
        source={require("../Img/bus.png")}
        style={{
          width: 20,
          height: 20,
        }}
      />
    </TouchableWithoutFeedback>
  );
  const onSelect = (index) => {
    if (data[index].key != toText) {
      setValuefrom(data[index].value);
      setInputFrom(data[index].key);
      setShowPopularRoute(true);
    } else {
      setValuefrom("");
    }
  };

  const onChangeText = (query) => {
    setValuefrom(query);
    setData(dataLocation.filter((item) => filter(item, query)));
  };
  const onChangeTextBus = (text) => {
    setValueBus(text);
    fetch(
      "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/organization/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: text,
        }),
      }
    )
      .then((response) => response.json())

      /////////////
      .then((res) => {
        res && console.log(res);
        if (res != []) {
          text &&
            res.map((loc) => {
              return setBusNameListDrop([{ label: loc.name, value: loc.uuid }]);
            });
        } else {
          return setBusNameListDrop([{ label: "No result", value: "1" }]);
        }
      })

      .catch((error) => {
        console.error(error);
        Alert.alert(
          "LIYU BUS",
          "Sorry, The booking session has expired. Please start a new booking. ",
          [{ text: "OK", onPress: () => { } }]
        );
      });
  };

  const clearInput = () => {
    setValuefrom("");
    setData(dataLocation);
    setShowPopularRoute(false);
  };
  const clearInputBus = () => {
    setValueBus("");
    setBusName("");
    setBusUuid("");
    // setData(dataLocation);
    // setData(BusNameListDrop);
    setBusNameListDrop(BusNameListDrop);
  };
  const renderCloseIconBus = (props) => (
    <TouchableWithoutFeedback onPress={clearInputBus}>
      <Icon {...props} name={"close"} />
    </TouchableWithoutFeedback>
  );
  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon
        {...props}
        name={valuefrom == "" ? "arrow-ios-downward-outline" : "close"}
      />
    </TouchableWithoutFeedback>
  );
  const onSelectBus = (index) => {
    console.log("data-------------", data);
    // setValueTo(dataLocation[index].value);

    /////////////////
    setValueBus(BusNameListDrop[index].label);
    setBusName(BusNameListDrop[index].label);
    setBusUuid(BusNameListDrop[index].value);
  };

  const onSelectTo = (index) => {
    console.log("data-------------", data);
    // setValueTo(dataLocation[index].value);
    if (data[index].key != fromText) {
      setValueTo(data[index].value);
      setInputTo(data[index].key);
    } else {
      setValueTo("");
    }
  };

  const onChangeTextTo = (query) => {
    setValueTo(query);
    setData(dataLocation.filter((item) => filter(item, query)));
  };
  const clearInputTo = () => {
    setValueTo("");
    setData(dataLocation);
  };
  const x = () => {
    setShowDropDown(true)
  }
  const renderCloseIconTo = (props) => (
    <TouchableWithoutFeedback onPress={clearInputTo}>
      <Icon
        {...props}
        name={valueTo == "" ? "arrow-ios-downward-outline" : "close"}
      />
    </TouchableWithoutFeedback>
  );


  const renderOption = (item, index) => {
    // console.log(item,index)
    return (
      <AutocompleteItem
        key={item.key}
        title={item.value}

      // accessoryLeft={StarIcon}
      />
    );
  };

  const renderOptionBus = (item, index) => {
    return <AutocompleteItem key={item.value} title={item.label} />;
  };

  const showMode = (currenttMode) => {
    setShow(true);
  };

  const showModeFalse = (event, selectedDate) => {
    setShow(false);
  };
  const showModeFalseReturn = (event, selectedReturnDate) => {
    setShowReturn(false);
  };
  const showModeReturn = (currenttMode) => {
    setShowReturn(true);
  };

  const route = useRoute();
  // const locationData = route.params.locationData

  const changeText = () => {
    // setInputFromName(InputToName)
    setValuefrom(valueTo);
    setInputFrom(toText);
    // setInputToName(InputFromName)
    setValueTo(valuefrom);
    setInputTo(fromText);

    console.log(InputToName);
    console.log(InputFromName);
  };

  ///////////
  const fetchLocation = async () => {
    axios
      .get("http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/location")
      .then((response) => {

        let newArray = response.data.map((item, index) => {
          return { key: item.uuid, value: item.name, disabled: false };
        });

        setDataLocation(newArray);
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(
          "LIYU BUS",
          "Sorry, The booking session has expired. Please start a new booking. ",
          [{ text: "OK", onPress: () => { } }]
        );
      });
  };
  useEffect(() => {
    //Get Values from database
    fetchLocation();
  }, []);

  /////////////////
  const [input, setInputText] = useState("");
  const handleOnChangeText = (text) => {
    setInputText(text);
    console.log(input);
  };

  const checkOneWayForm = () => {
    if (fromText && toText && selectedDate != "" && valuefrom && valueTo) {
      return true;
    } else if (isActiveSearch) {
      return true;
    } else {
      Alert.alert("LIYU BUS", "Please Fill Out The Required Fields", [
        { text: "OK", onPress: () => { } },
      ]);
    }
  };

  const checkTwoWayForm = () => {
    if (fromText && toText && selectedDate && selectedReturnDate != "") {
      return true;
    } else {
      Alert.alert("LIYU BUS", `Please Fill Out The Required Fields`, [
        { text: "OK", onPress: () => { } },
      ]);
    }
  };

  async function searchBtn() {
    if (fromText !== toText) {
      if (isEnabledTwoWay == false && checkOneWayForm() == true) {
        setLoading(true);

        await fetch(
          "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/schedule/get-schedule",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              departureLocationUUId: fromText,
              destinationLocationUUId: toText,
              departureDate: dateDeparture,
              busCompanyUUId: busUuid,
            }),
          }
        )
          .then((response) => response.json())

          /////////////
          .then((res) => {
            console.log(res);
            if (res.apierror != undefined) {
              Alert.alert("LIYU BUS", res.apierror.message, [
                { text: "OK", onPress: () => { } },
              ]);
            } else {
              var availableSchedule = res;
              if (
                availableSchedule.schedules.length == 0 &&
                availableSchedule.alternate.length == 0
              ) {
                Alert.alert(
                  "LIYU BUS",
                  "Sorry, the selected bus is fully booked. Please choose another bus or date.",
                  [{ text: "OK", onPress: () => { } }]
                );
              } else {
                navigation.navigate("search", {
                  availableSchedule,
                  isEnabledTwoWay,
                  dateDeparture,
                  fromText,
                  toText,
                  busUuid,
                });
              }
            }
          })

          .catch((error) => {
            console.error(error);

            Alert.alert(
              "LIYU BUS",
              "Sorry, The booking session has expired. Please start a new booking. ",
              [{ text: "OK", onPress: () => { } }]
            );
            return;
          })
          .finally(() => setLoading(false));
        console.log("fromid:" + fromText);
        console.log("toid:" + toText);
        console.log("date:" + dateDeparture);
      } else if (isEnabledTwoWay == true && checkTwoWayForm()) {
        setLoading(true);
        await fetch(
          "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/schedule/get-round-trip-schedule",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              departureLocationUUId: fromText,
              destinationLocationUUId: toText,
              departureDate: dateDeparture,
              returnDate: dateReturn,
              busCompanyUUId: busUuid,
            }),
          }
        )
          .then((response) => response.json())
          /////////////
          .then((res) => {
            if (res.apierror != undefined) {
              Alert.alert("LIYU BUS", res.apierror.message, [
                { text: "OK", onPress: () => { } },
              ]);
            } else {
              var availableSchedule = res;

              if (
                res.roundTripSchedule.firstTrip.length == 0 &&
                res.roundTripSchedule.secondTrip == 0 &&
                res.alternateRoundTripSchedule.firstTrip.length == 0 &&
                res.alternateRoundTripSchedule.secondTrip.length == 0
              ) {
                Alert.alert(
                  "LIYU BUS",
                  "Sorry, the selected bus is fully booked. Please choose another bus or date.",
                  [{ text: "OK", onPress: () => { } }]
                );
              } else {
                navigation.navigate("search", {
                  availableSchedule,
                  isEnabledTwoWay,
                  dateDeparture,
                  dateReturn,
                  fromText,
                  toText,
                  busUuid,
                });
              }
            }
          })

          .catch((error) => {
            console.error(error);
            Alert.alert(
              "LIYU BUS",
              "Sorry, The booking session has expired. Please start a new booking. ",
              [{ text: "OK", onPress: () => { } }]
            );
          })
          .finally(() => setLoading(false));

        console.log("fromid:" + fromText);
        console.log("toid:" + toText);
      }
    } else if (valuefrom == valueTo) {
      Alert.alert(
        "LIYU BUS",
        "Sorry, The departure and arrival locations cannot be the same. Please select different locations. ",
        [{ text: "OK", onPress: () => { } }]
      );
    } else {
      Alert.alert("LIYU BUS", "Fill in the required information", [
        { text: "OK", onPress: () => { } },
      ]);
    }
  }

  const list = () => {
    locat.map((l) => console.log(l.name));
  };

  const DepMonth = selectedDate && selectedDate ?.gregorian.month.toString();
  const DepDate = selectedDate && selectedDate ?.gregorian.date.toString();
  const dateDeparture = isActiveSearch
    ? activeDate
    : selectedDate &&
    `${selectedDate ?.gregorian.year}-${DepMonth.length < 2 ? "0" : ""}${
    selectedDate ?.gregorian.month
      }-${DepDate.length < 2 ? "0" : ""}${selectedDate.gregorian.date}`;
  const dateDepartureFormat =
    selectedDate &&
    `${DepDate.length < 2 ? "0" : ""}${selectedDate.gregorian.date}-${
    DepMonth.length < 2 ? "0" : ""
    }${selectedDate ?.gregorian.month}-${selectedDate ?.gregorian.year}`;

  const returnMonth =
    selectedReturnDate && selectedReturnDate ?.gregorian.month.toString();
  const returnDate =
    selectedReturnDate && selectedReturnDate ?.gregorian.date.toString();
  const dateReturn =
    selectedReturnDate &&
    `${selectedReturnDate ?.gregorian.year}-${
    returnMonth.length < 2 ? "0" : ""
    }${selectedReturnDate ?.gregorian.month}-${
    returnDate.length < 2 ? "0" : ""
    }${selectedReturnDate.gregorian.date}`;

  const dateReturnFormat =
    selectedReturnDate &&
    `${returnDate.length < 2 ? "0" : ""}${selectedReturnDate.gregorian.date}-${
    returnMonth.length < 2 ? "0" : ""
    }${selectedReturnDate ?.gregorian.month}-${
    selectedReturnDate ?.gregorian.year
    }`;

  const checkDate = (date) => {
    const dDate = `${date.gregorian.year}-${
      date.gregorian.month.toString().length < 2 ? "0" : ""
      }${date.gregorian.month}-${
      date.gregorian.date.toString().length < 2 ? "0" : ""
      }${date.gregorian.date}`;
    // const selectedDate = moment(new Date( `${date.gregorian.year}-0${date.gregorian.month}-${date.gregorian.date}`) )
    const selectedDate = moment(new Date(dDate));

    const today = moment();

    const isInBetween = selectedDate.isBetween(
      moment().subtract(1, "day"),
      moment().add(6, "day")
    );
    console.log("moment date: ", isInBetween);
    console.log();
    if (isInBetween) {
      return true;
    } else {
      return false;
    }

    ///////////
    // `${date?.gregorian.year}-${date.gregorian.month.toString().length < 2 ? "0" : ""}${
    //   date?.gregorian.month
    // }-${date.gregorian.month.toString().length < 2 ? "0" : ""}${date.gregorian.date}`
  };
  const checkDateRetun = (date) => {
    const dDate = `${date.gregorian.year}-${
      date.gregorian.month.toString().length < 2 ? "0" : ""
      }${date.gregorian.month}-${
      date.gregorian.date.toString().length < 2 ? "0" : ""
      }${date.gregorian.date}`;
    // const selectedDate = moment(new Date( `${date.gregorian.year}-0${date.gregorian.month}-${date.gregorian.date}`) )
    const selectedDate = moment(new Date(dDate));

    const today = moment();

    const isInBetween = selectedDate.isBetween(
      moment().subtract(1, "day"),
      moment().add(6, "day")
    );
    console.log("moment date: ", isInBetween);
    console.log();
    if (isInBetween && dDate != dateDeparture && dDate > dateDeparture) {
      return true;
    } else {
      return false;
    }
  };
  const image = require("../Img/bg.png");
  return (
    <ScrollView
      style={{ backgroundColor: "#EBEBEB" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ImageBackground
        source={image}
        style={{ height: 318, marginBottom: 280 }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 20,
              marginVertical: 15,

              maxHeight: 50,
              maxWidth: 200,
            }}
          >
            <Text
              style={{ fontWeight: "normal", color: "#EBEBEB", fontSize: 25 }}
            >
              Let's Travel
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",

              width: "50%",
              alignSelf: "flex-end",
              marginLeft: 40,
            }}
          >
            <Text
              style={{
                marginTop: 10,
                color: "#FFFFFF",
                textAlign: "right",
                fontSize: 14,
                marginLeft: 40,
                marginRight: 10,
              }}
            >
              Username
            </Text>

            <Image
              source={require("../Img/profile10.png")}
              style={{
                width: 50,
                height: 50,

                alignSelf: "flex-end",
              }}
            />
          </View>
        </View>
        <View
          style={
            isEnabledTwoWay
              ? {
                position: "absolute",
                marginTop: 100,
                minHeight: 480,
                marginBottom: 50,
                elevation: 10,
                backgroundColor: "#FFFFFF",
                borderColor: "#EBEBEB",
                width: screenWidth / 1.1,
                borderWidth: 1,
                borderRadius: 30,
                alignSelf: "center",
              }
              : {
                position: "absolute",
                marginTop: 100,
                minHeight: 480,
                marginBottom: 50,
                elevation: 10,
                backgroundColor: "#FFFFFF",
                borderColor: "#EBEBEB",
                width: screenWidth / 1.1,
                borderWidth: 1,
                borderRadius: 30,
                alignSelf: "center",
              }
          }
        >
          <View
            style={{
              flex: 1,
              maxHeight: 50,
              marginTop: 20,
              flexDirection: "row",
            }}
          >
            <View style={styles.toggle}>
              {/* toggle One */}

              <Switch
                trackColor={{ false: "#EBEBEB", true: "#f27f22" }}
                thumbColor={isEnabledOneWay ? "#f27f22" : "#f4f3f4"}
                onValueChange={() => setEnabledTwoWay(!isEnabledTwoWay)}
                value={isEnabledTwoWay}
              />

              <Text style={{ color: "black", top: 1, fontSize: 16 }}>
                Round Trip
              </Text>
            </View>

            <Autocomplete
              placeholder="Select Bus"
              placeholderTextColor={"grey"}
              value={valueBus}
              style={{
                backgroundColor: "white",
                width: 157,
                borderWidth: 1,

                borderColor: "grey",
                marginRight: 20,

                marginTop: 5,

                borderRadius: 10,
              }}
              size="small"
              accessoryRight={valueBus != "" && renderCloseIconBus}
              accessoryLeft={renderBus}
              onChangeText={onChangeTextBus}
              onSelect={onSelectBus}
            >
              {BusNameListDrop.map(renderOptionBus)}
            </Autocomplete>
          </View>
          <View>
            <Text style={{ color: "#FF6B1B", bottom: 5 }}>
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - - - - - - - - - - - - -
            </Text>
          </View>

          <DropShadow
            style={{
              shadowColor: "#171717",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}
          >
            <Autocomplete
              placeholder="Leaving From"
              placeholderTextColor={"grey"}
              value={valuefrom}
              style={{
                backgroundColor: "#FFFFFF",
                width: 305,
                borderWidth: 1,
                borderColor: "#707070",
                marginTop: 20,
                margin: 10,
                left: 8,
                height: 50,
                borderRadius: 10,
                elevation: 10,
              }}
              size="large"
              accessoryRight={renderCloseIcon}
              accessoryLeft={renderLeavingFrom}
              onChangeText={onChangeText}
              onSelect={onSelect}
            >

              {data.map(renderOption)}
            </Autocomplete>
          </DropShadow>
          <Pressable></Pressable>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              maxHeight: 70,
            }}
          >
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
              }}
            >
              <Autocomplete
                placeholder="Going To"
                placeholderTextColor={"grey"}
                value={valueTo}
                onSelect={onSelectTo}
                accessoryRight={renderCloseIconTo}
                accessoryLeft={renderGoingTo}
                style={{
                  backgroundColor: "#FFFFFF",
                  width: 305,
                  borderWidth: 1,
                  borderColor: "#707070",
                  margin: 10,
                  left: 8,
                  height: 50,
                  elevation: 10,
                  borderRadius: 10,
                }}
                size="large"
                placement="top"
                onChangeText={onChangeTextTo}
              >
                {data.map(renderOption)}
              </Autocomplete>
            </DropShadow>

            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 10, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
              <View style={{}}>
                <View
                  style={{
                    textAlign: "right",
                    bottom: 30,
                    backgroundColor: "#FFFFFF",
                    padding: 4,
                    borderRadius: 50,
                    borderWidth: 1,
                    position: "absolute",
                    right: 50,
                    bottom: -23,
                    width: 50,
                    height: 50,
                    borderColor: "#FF6B1B",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={changeText}>
                    <Svg
                      width="35px"
                      height="35px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M14.293 1.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L16 4.414V14a1 1 0 1 1-2 0V4.414l-2.293 2.293a1 1 0 1 1-1.414-1.414l4-4ZM10 10a1 1 0 1 0-2 0v9.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L10 19.586V10Z"
                        fill="#FF6B1B"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
            </DropShadow>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 10,
              marginLeft: 5,
            }}
          >
            <Pressable onPress={() => showMode("date")}>
              <DropShadow
                style={{
                  shadowColor: "#171717",
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: 145,
                    height: 60,
                    marginLeft: 15,
                    borderWidth: 1,
                    borderColor: "#707070",
                    borderRadius: 10,
                    marginBottom: 15,
                    elevation: 10,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    size={20}
                    style={{
                      color: "grey",
                      padding: 10,
                      marginRight: 10,
                      marginLeft: 10,
                    }}
                  />
                  <TextInput
                    placeholder={
                      selectedDate == "" ? "Leaving On" : dateDepartureFormat
                    }
                    underlineColorAndroid="transparent"
                    placeholderTextColor="grey"
                    style={styles.textInput}
                    editable={false}
                    keyboardType="numeric"
                  />
                </View>
              </DropShadow>
            </Pressable>

            {show && (
              <View>
                <TouchableOpacity
                  onPressOut={() => {
                    return setShow(!show);
                  }}
                >
                  <Modal
                    transparent={true}
                    onRequestClose={() => {
                      setShow(false);
                    }}
                    close
                  >
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <View
                        style={{
                          width: screenWidth / 1.1,
                          alignSelf: "center",
                          position: "relative",
                          elevation: 20,
                          shadowColor: "black",
                          borderWidth: 5,
                          borderRadius: 10,
                          borderColor: "white",
                        }}
                      >
                        <DropShadow
                          style={{
                            shadowColor: "#171717",
                            shadowOffset: { width: 10, height: 20 },
                            shadowOpacity: 0.4,
                            shadowRadius: 2,
                          }}
                        >
                          <Calendar
                            hideHeaderButtons={true}
                            mode={mode}
                            onDatePress={(date) => {
                              checkDate(date);
                              setSelectedDate(
                                checkDate(date)
                                  ? date
                                  : Alert.alert(
                                    "LIYU BUS",
                                    "The selected date should be within 5 days",
                                    [
                                      {
                                        text: "OK",
                                        onPress: () => {
                                          setSelectedDate("");
                                        },
                                      },
                                    ]
                                  )
                              );
                              showModeFalse();
                              setDepartureDate(
                                selectedDate &&
                                `${selectedDate.ethiopian.date}/${selectedDate ?.ethiopian.month}/${selectedDate ?.ethiopian.year}`
                              );
                              console.log(date);
                            }}
                            onModeChange={(selectedMode) =>
                              setMode(selectedMode)
                            }
                            onLanguageChange={(lang) => setLocale(lang)}
                            locale={locale}
                            theme={{
                              switchButtonColor: "#f27f22",
                              arrowColor: "#3c6791",
                              selectedDayBackgroundColor: "#3c6791",
                              todayTextColor: "#f27f22",
                            }}
                          />
                        </DropShadow>
                      </View>
                    </View>
                  </Modal>
                </TouchableOpacity>
              </View>
            )}

            {isEnabledTwoWay && (
              <Pressable
                onPress={() => (isEnabledTwoWay ? showModeReturn("date") : "")}
              >
                <DropShadow
                  style={{
                    shadowColor: "#171717",
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      width: 145,
                      height: 60,
                      marginLeft: 15,
                      borderWidth: 1,
                      borderColor: "#707070",
                      borderRadius: 10,
                      elevation: 10,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      size={20}
                      style={{
                        color: "grey",
                        padding: 10,
                        marginRight: 10,
                        marginLeft: 10,
                      }}
                    />
                    <TextInput
                      placeholder={
                        selectedReturnDate == ""
                          ? "Return On"
                          : dateReturnFormat
                      }
                      placeholderTextColor="grey"
                      style={styles.textInput}
                      editable={false}
                    />
                  </View>
                </DropShadow>
              </Pressable>
            )}

            {showReturn && (
              <TouchableOpacity
                activeOpacity={0}
                onPressOut={() => {
                  setShowReturn(false);
                }}
              >
                <Modal
                  transparent={true}
                  onRequestClose={() => {
                    setShowReturn(false);
                  }}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <View
                      style={{
                        width: screenWidth / 1.1,
                        alignSelf: "center",
                        position: "relative",
                        elevation: 20,
                        shadowColor: "black",
                        borderWidth: 5,
                        borderRadius: 10,
                        borderColor: "white",
                      }}
                    >
                      <DropShadow
                        style={{
                          shadowColor: "#171717",
                          shadowOffset: { width: 10, height: 20 },
                          shadowOpacity: 0.4,
                          shadowRadius: 2,
                        }}
                      >
                        <Calendar
                          mode={mode}
                          hideHeaderButtons={true}
                          onDatePress={(date) => {
                            checkDateRetun(date);
                            setSelectedReturnDate(
                              checkDateRetun(date)
                                ? date
                                : Alert.alert(
                                  "LIYU BUS",
                                  "The selected date should be within 5 days ",
                                  [
                                    {
                                      text: "OK",
                                      onPress: () => {
                                        setSelectedReturnDate("");
                                      },
                                    },
                                  ]
                                )
                            );
                            showModeFalseReturn();
                            setReturnDate(
                              selectedReturnDate &&
                              `${selectedReturnDate ?.ethiopian.year}-${selectedReturnDate ?.ethiopian.month}-${selectedReturnDate.ethiopian.date}`
                            );
                          }}
                          onModeChange={(selectedMode) =>
                            setModeReturn(selectedMode)
                          }
                          onLanguageChange={(lang) => setLocaleReturn(lang)}
                          locale={locale}
                          theme={{
                            switchButtonColor: "#f27f22",
                            arrowColor: "#3c6791",
                            selectedDayBackgroundColor: "#3c6791",
                            todayTextColor: "#f27f22",
                          }}
                        />
                      </DropShadow>
                    </View>
                  </View>
                </Modal>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              alignSelf: "center",
              maxHeight: 100,
            }}
          >
            <Pressable
              onPress={searchBtn}
              style={{
                backgroundColor: "#f27f22",
                width: 313,
                height: 55,
                borderRadius: 15,
                bottom: 0,
                alignSelf: "center",
                marginBottom: 40,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                  flex: 1,
                  textAlignVertical: "center",
                }}
              >
                Search
              </Text>
            </Pressable>
          </View>
          {loading && (
            <View>
              <ActivityIndicator size={"large"} color="#3c6791" />
            </View>
          )}
        </View>
      </ImageBackground>
      <Text
        style={{
          color: "black",
          fontSize: 18,
          marginLeft: 20,
          marginBottom: 10,
        }}
      >
        Active Routes
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: 20,
        }}
      >
        {!isEnabledTwoWay && pRoute()}
      </View>
    </ScrollView>
  );
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  text: { flex: 1, alignItems: "", justifyContent: "center" },
  welcome: {},
  toggle: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    left: 8,
    marginTop: 9,
    marginLeft: 5,
    maxWidth: 130,
    marginRight: 25,
  },
  textInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "white",
    color: "#424242",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  textInputFromTo: {
    borderTopWidth: 3,
    borderLeftWidth: 3,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "white",
    fontSize: 10,
    borderRadius: 10,
    borderTopColor: "#3c6791",
    borderLeftColor: "#3c6791",
    shadowOffset: 10,
    width: screenWidth / 2,
  },
  twoWayIcon: {
    fontSize: 40,
    color: "red",
  },

  dropdown: {
    margin: 10,
    height: 50,
    left: 8,
    width: screenWidth / 1.1,
    backgroundColor: "white",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#3c6791",
    borderRadius: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
