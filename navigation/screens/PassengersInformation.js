import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,

  Dimensions,
  ActivityIndicator,

  TextInput,
  Alert,

  Pressable,

} from "react-native";

import { SelectList } from "react-native-dropdown-select-list";
import { useRoute } from "@react-navigation/native";
import DropShadow from "react-native-drop-shadow";


const screenWidth = Dimensions.get("window").width;

export default function PassengersInformation({ navigation }) {

  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [age, setAge] = useState([]);
  const [gender, setGender] = useState([]);
  const [onboarding, setOnBoarding] = useState([]);
  const [offboarding, setOffBoarding] = useState([]);
  const [onboardingReturn, setOnBoardingReturn] = useState([]);
  const [offboardingReturn, setOffBoardingReturn] = useState([]);
  const [textInputPhone, settextinputPhone] = useState(true);

  const route = useRoute();
  const seat = route.params.seat;
  const returnSeat = route.params.returnSeat;
  const allData = route.params.allData;
  const allDataTwo = route.params.allDataTwo;
  const isEnabledTwoWay = route.params.isEnabledTwoWay;
  const returnTicket = route.params.returnTicket;
  const [loading, setLoading] = useState(false);
  const allDataSecondTrip = route.params.allDataSecondTrip;
  const firstNameList = Object.values(firstName);
  const lastNameList = Object.values(lastName);

  const fullNameList = firstNameList.map((fName, index) => {
    return `${fName} ${lastNameList[index]}`;
  });

  const phoneNumberList = Object.values(phoneNumber);
  const ageList = Object.values(age);
 
  const passengersgenderList = Object.values(gender);
  const passengerOnboardingList = onboarding;
  const passengerOffBoardingPlace = offboarding;
  const passengerOnboardingListReturn = onboardingReturn;
  const passengerOffBoardingPlaceReturn = offboardingReturn;

  const ageChecker = () => {
    const ageChecked = ageList.every((age) => {
      if (age < 115 && age > 0) {
        return true;
      } else {
        return false;
      }
    });
    return ageChecked;
  };
  const adultChecker = () => {
    const adultFound = ageList.some((age) => {
      if (age >= 18) {
        return true;
      } else {
        return false;
      }
    });

    return adultFound;
  };

  const phoneNumberChecker = () => {
    const allCorrect = phoneNumberList.every((phonenum) => {
      if (phonenum.length == 10 || (phonenum.length == 13 && !undefined)) {
        return true;
      } else {
        return false;
      }
    });

    return allCorrect;
  };

  const firstNameChecker = () => {
    const isFirstNameValid = firstNameList.every((firstNamee) => {
      if (
        firstNamee.length >= 3 &&
        firstNamee.length <= 15 &&
        /\d/.test(firstNamee) == false
      ) {
        return true;
      } else if (/\d/.test(firstNamee) == false) {
        // return true
        console.log("---------checked");
      } else {
        return false;
      }
    });
    return isFirstNameValid;
  };
  const lastNameChecker = () => {
    const isLastNameValid = lastNameList.every((lastNamee) => {
      if (
        lastNamee.length >= 3 &&
        lastNamee.length <= 15 &&
        /\d/.test(lastNamee) == false
      ) {
        return true;
      } else {
        return false;
      }
    });
    return isLastNameValid;
  };

  const checkForm = () => {
    if (
      fullNameList.length == seat.length &&
      phoneNumberList.length == seat.length &&
      ageList.length == seat.length &&
      passengersgenderList.length == seat.length &&
      passengerOnboardingList.item != undefined &&
      passengerOffBoardingPlace.item != undefined &&
      firstNameList.length == seat.length &&
      lastNameList.length == seat.length
    ) {
      return true;
    } else {
      return false;
    }
  };
  const checkFormTwo = () => {
    if (
      fullNameList.length == seat.length &&
      phoneNumberList.length == seat.length &&
      ageList.length == seat.length &&
      passengersgenderList.length == seat.length &&
      passengerOnboardingList.item != undefined &&
      passengerOffBoardingPlace.item != undefined &&
      firstNameList.length == seat.length &&
      lastNameList.length == seat.length &&
      passengerOnboardingListReturn.item != undefined &&
      passengerOffBoardingPlaceReturn.item != undefined
    ) {
      return true;
    } else {
      return false;
    }
  };

  const nextBtn = () => {
    console.log("One trip");

    setLoading(true);

    if (!checkForm()) {
      Alert.alert("LIYU BUS", "Please Fill The Required Information", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }

    if (!phoneNumberChecker()) {
      Alert.alert("LIYU BUS", " Please enter a valid phone number", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }
    if (!ageChecker()) {
      Alert.alert("LIYU BUS", "Please enter a valid  Age", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }
    if (!adultChecker()) {
      Alert.alert("LIYU BUS", "No Adult ", [{ text: "OK", onPress: () => {} }]);
      setLoading(false);
      return;
    }
    if (!firstNameChecker()) {
      Alert.alert("LIYU BUS", "Invalid Please enter a valid first name ", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }
    if (!lastNameChecker()) {
      Alert.alert("LIYU BUS", "Please enter a valid last name", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }

    navigation.navigate("paymentOption", {
      allData,
      phoneNumberList,
      ageList,
      passengerOffBoardingPlace,

      passengerOnboardingList,
      passengersgenderList,
      seat,
      returnTicket,
      isEnabledTwoWay,
      fullNameList,
    });

    // }
    setLoading(false);
  };

  const returnNextBtn = () => {
    console.log("round trip");

    setLoading(true);
    if (!checkFormTwo()) {
      Alert.alert("LIYU BUS", "Please Fill The Required Information ", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }

    if (!phoneNumberChecker()) {
      Alert.alert("LIYU BUS", "Invalid Phone Number ", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }
    if (!ageChecker()) {
      Alert.alert("LIYU BUS", "Invalid Age", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }
    if (!adultChecker()) {
      Alert.alert("LIYU BUS", "No Adult ", [{ text: "OK", onPress: () => {} }]);
      setLoading(false);
      return;
    }
    if (!firstNameChecker()) {
      Alert.alert("LIYU BUS", "Please enter a valid first name", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }
    if (!lastNameChecker()) {
      Alert.alert("LIYU BUS", "Please enter a valid last name", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }

    navigation.navigate("paymentOption", {
      allDataTwo,
      returnSeat,
      returnTicket,
      isEnabledTwoWay,
      phoneNumberList,
      ageList,
      passengerOffBoardingPlace,
      passengerOffBoardingPlaceReturn,
      allDataSecondTrip,
      allData,
      passengerOnboardingList,
      passengerOnboardingListReturn,
      passengersgenderList,
      seat,
      fullNameList,
    });
    setLoading(false);
  };
  const genderList = [
    { key: "0", value: "Male" },
    { key: "1", value: "Female" },
  ];
  const drop = isEnabledTwoWay
    ? allData.dropOffPointsFirst
    : allData.dropOffPoints;
  const boarding = isEnabledTwoWay
    ? allData.boardingPointsFirst
    : allData.boardingPoints;

  const dropReturn = allDataSecondTrip && allDataSecondTrip.dropOffPointsSecond;
  const boardingReturn =
    allDataSecondTrip && allDataSecondTrip.boardingPointsSecond;

  const onBoardingListReturn =
    boardingReturn != null
      ? boardingReturn.map((item) => {
          return { key: item.scheduleLocationUUId, value: item.terminalName };
        })
      : [{ key: "1", value: "Menahria1" }];

  const offBoardingListReturn =
    dropReturn != null
      ? dropReturn.map((item) => {
          return { key: item.scheduleLocationUUId, value: item.terminalName };
        })
      : [{ key: "1", value: "Menahria2" }];

  const onBoardingList =
    boarding != null
      ? boarding.map((item) => {
          return { key: item.scheduleLocationUUId, value: item.terminalName };
        })
      : [{ key: "1", value: "Menahria1" }];

  const offBoardingList =
    drop != null
      ? drop.map((item) => {
          return { key: item.scheduleLocationUUId, value: item.terminalName };
        })
      : [{ key: "1", value: "Menahria2" }];

  const personalInfo = () => {
    return seat.map((data, index) => {
      if (data.length == 0) {
        return (
          <View>
            <Text style={{ fontSize: 100, fontWeight: "bold" }}>
              NO SEAT SELECTED
            </Text>
          </View>
        );
      } else {
        return (
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                width: screenWidth / 1.1,
                borderWidth: 0,
                borderTopWidth: 0,
              }}
            >
              <DropShadow
                style={{
                  shadowColor: "#171717",
                  shadowOffset: { width: 10, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 2,
                }}
              >
                <View
                  style={{
                    width: screenWidth / 1.1,
                    backgroundColor: "#EBEBEB",
                    flexDirection: "row",
                    height: 30,
                    elevation: 10,
                  }}
                  key={index}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: "bold",
                      color: "#FF6B1B",
                      textAlign: "left",
                      fontSize: 14,
                      textAlignVertical: "center",
                      marginLeft: 20,
                    }}
                  >
                    {/* Passenger {index + 1} */}
                    {index == 0 ? "Main Passenger" : `Passenger ${index + 1}`}
                  </Text>

                  <Text
                    style={{
                      flex: 1,
                      fontSize: 14,
                      textAlign: "right",
                      color: "#FF6B1B",
                      textAlignVertical: "center",
                      marginRight: 20,
                    }}
                  >
                    Seat No.{" "}
                    {isEnabledTwoWay
                      ? `${seat[index]}, ${returnSeat[index]}`
                      : seat[index]}{" "}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={styles.firstName}>
                    <TextInput
                      placeholder="First name"
                      style={{
                        fontSize: 15,
                        marginLeft: 15,
                        width: "50%",
                        borderEndWidth: 10,
                      }}
                      // onChangeText={(e) => setFullName({ ...fullName, [index]: e })}
                      onChangeText={(e) =>
                        setFirstName({ ...firstName, [index]: e })
                      }
                    ></TextInput>
                  </View>
                  <View style={styles.lastName}>
                    <TextInput
                      placeholder="Last name"
                      style={{ fontSize: 15, marginLeft: 15 }}
                      onChangeText={(e) =>
                        setLastName({ ...lastName, [index]: e })
                      }
                    ></TextInput>
                  </View>
                </View>
                <View style={styles.phoneNumber}>
                  <Pressable
                    onPress={() => {
                      settextinputPhone(true);
                    }}
                  >
                    <TextInput
                      placeholder="Phone Number"
                      editable={textInputPhone}
                      style={{ fontSize: 15, marginLeft: 15 }}
                      keyboardType="numeric"
                      onChangeText={(e) => {
                        setPhoneNumber({ ...phoneNumber, [index]: e });
                        e.length > 12 && settextinputPhone(false);
                      }}
                    ></TextInput>
                  </Pressable>
                </View>
                <View style={styles.age}>
                  <TextInput
                    placeholder="Age"
                    style={{ fontSize: 15, marginLeft: 15 }}
                    keyboardType="numeric"
                    onChangeText={(e) => setAge({ ...age, [index]: e })}
                  ></TextInput>
                </View>

                <SelectList
                  setSelected={(val) => setGender({ ...gender, [index]: val })}
                  data={genderList}
                  save="key"
                  placeholder="Gender"
                  search={false}
                  style={styles.genderStyle}
                  boxStyles={{
                    borderRadius: 0,
                    borderBottomWidth: 0,
                    borderEndWidth: 0,
                    borderStartWidth: 0,
                    backgroundColor: "#EBEBEB",
                    elevation: 10,
                  }}
                  dropdownStyles={{
                    backgroundColor: "#EBEBEB",
                  }}
                  dropdownTextStyles={{ color: "grey" }}
                  // dropdownStyles ={{borderRadius:1}}
                />
                {index == 0 && (
                  <View>
                    <SelectList
                      setSelected={(key) => {
                        const item = onBoardingList.find(
                          (val) => val.key === key
                        );
                        setOnBoarding({ ...onboarding, item });
                        console.log(item);
                      }}
                      data={onBoardingList}
                      save="key"
                      placeholder="Boarding Place"
                      borderRadius="40%"
                      search={false}
                      boxStyles={{
                        borderRadius: 0,
                        borderBottomWidth: 0,
                        borderEndWidth: 0,
                        borderStartWidth: 0,
                        backgroundColor: "#EBEBEB",
                        elevation: 10,
                      }}
                      dropdownStyles={{
                        backgroundColor: "#EBEBEB",
                      }}
                      dropdownTextStyles={{ color: "grey" }}
                    />
                    <SelectList
                      setSelected={(key) => {
                        const item = offBoardingList.find(
                          (val) => val.key === key
                        );
                        setOffBoarding({ ...offboarding, item });
                        console.log(item);
                      }}
                      data={offBoardingList}
                      save="key"
                      placeholder="Drop-off Place"
                      search={false}
                      style={styles.offBoardingStyle}
                      boxStyles={{
                        borderRadius: 0,
                        borderBottomWidth: 0.5,
                        borderEndWidth: 0,
                        borderStartWidth: 0,
                        backgroundColor: "#EBEBEB",
                        elevation: 10,
                      }}
                      dropdownStyles={{
                        backgroundColor: "#EBEBEB",
                      }}
                      dropdownTextStyles={{ color: "grey" }}
                    />
                  </View>
                )}

                {isEnabledTwoWay && index == 0 && (
                  <View>
                    <SelectList
                      setSelected={(key) => {
                        const item = onBoardingListReturn.find(
                          (val) => val.key === key
                        );
                        setOnBoardingReturn({ ...onboardingReturn, item });
                        console.log(allDataSecondTrip.boardingPointsSecond);
                      }}
                      data={onBoardingListReturn}
                      save="key"
                      placeholder="Boarding Place(Return)"
                      borderRadius="40%"
                      search={false}
                      boxStyles={{
                        borderRadius: 0,
                        borderBottomWidth: 0,
                        borderEndWidth: 0,
                        borderStartWidth: 0,
                        backgroundColor: "#EBEBEB",
                        elevation: 10,
                      }}
                      dropdownStyles={{
                        backgroundColor: "#EBEBEB",
                      }}
                      dropdownTextStyles={{ color: "grey" }}
                    />
                    <SelectList
                      setSelected={(key) => {
                        const item = offBoardingListReturn.find(
                          (val) => val.key === key
                        );
                        setOffBoardingReturn({ ...offboardingReturn, item });
                        console.log(allDataSecondTrip.boardingPointsSecond);
                      }}
                      data={offBoardingListReturn}
                      save="key"
                      placeholder="Drop-off Place(Return)"
                      style={styles.offBoardingStyle}
                      search={false}
                      boxStyles={{
                        borderRadius: 0,
                        borderBottomWidth: 0.5,
                        borderEndWidth: 0,
                        borderStartWidth: 0,
                        backgroundColor: "#EBEBEB",
                        borderBottomEndRadius: 10,
                        borderBottomStartRadius: 10,
                        elevation: 10,
                      }}
                      dropdownStyles={{
                        backgroundColor: "#EBEBEB",
                      }}
                      dropdownTextStyles={{ color: "grey" }}
                    />
                  </View>
                )}
              </DropShadow>
            </View>
          </View>
        );
      }
    });
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#EBEBEB" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={{ marginBottom: 100 }}>{personalInfo()}</View>
      {loading && (
        <View>
          <ActivityIndicator size={"large"} color="#3c6791" />
        </View>
      )}
      <Pressable
        onPress={isEnabledTwoWay && returnTicket ? returnNextBtn : nextBtn}
        style={{
          backgroundColor: "#f27f22",
          width: screenWidth / 1.1,
          height: 55,
          borderRadius: 15,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 10,
          position: "absolute",
          bottom: 0,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          Next
        </Text>
      </Pressable>

      {/* <Pressable
        onPress={test}
        style={{
          backgroundColor: "#f27f22",
          width: screenWidth / 1.3,
          height: 50,
          borderRadius: 15,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Next
        </Text>
      </Pressable> */}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  offBoardingStyle: {
    borderWidth: 0,
  },
  firstName: {
    padding: 5,
    paddingVertical: 10,
    backgroundColor: "#EBEBEB",
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    elevation: 10,
    width: "50%",
  },
  lastName: {
    padding: 5,
    paddingVertical: 10,
    backgroundColor: "#EBEBEB",
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    elevation: 10,
    width: "50%",
  },
  phoneNumber: {
    padding: 5,
    paddingVertical: 10,
    backgroundColor: "#EBEBEB",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    elevation: 10,
  },
  age: {
    padding: 5,
    paddingVertical: 10,
    borderWidth: 0,
    backgroundColor: "#EBEBEB",
    fontSize: 15,
    elevation: 10,
  },
  genderStyle: {
    borderEndColor: "tomato",
  },
});
