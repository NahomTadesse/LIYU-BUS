import * as React from "react";
import { useState, useEffect,useRef  } from "react";
import {
  useRoute,

} from "@react-navigation/native";


import {
  View,
  ScrollView,
  Text,

  Dimensions,

  Pressable,
  Alert,
} from "react-native";

import DropShadow from "react-native-drop-shadow";

import QRCode from "react-native-qrcode-svg";
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';

const screenWidth = Dimensions.get("window").width;

export default function TicketScreen({ navigation }) {
  const route = useRoute();

  const ticketInfo = route.params.ticketInfo;
  const isEnabledTwoWay = route.params.isEnabledTwoWay;


    const viewShotRef = useRef();
    const downloadTicket = async () => {
      try {
      ticketInfo.map(()=>{
        
      })
        const uri = await viewShotRef.current.capture();
        CameraRoll.save(uri);
        console.log('Image saved successfully!');
        Alert.alert("LIYU BUS", "Image saved successfully", [
          { text: "OK", onPress: () => {} },
        ]);
       
      } catch (error) {
        console.error('Failed to save image:', error);
      }
    };
  
    
  const oneWayTicket = () => {
    return ticketInfo.map((x, index) => {
      return (
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
          
          <View
            key={index}
            style={
              index == 0
                ? {
                    flexDirection: "column",
                    transform: [{ rotate: "-90deg" }],
                    marginTop: 240,
                    marginBottom: 250,
                    marginRight: -80,
                  }
                : index == 1
                ? {
                    flexDirection: "column",
                    transform: [{ rotate: "-90deg" }],
                    marginTop: 240,
                    marginBottom: 250,

                    margin: -80,
                  }
                : {
                    flexDirection: "column",
                    transform: [{ rotate: "-90deg" }],
                    marginTop: 240,
                    marginBottom: 250,
                    margin: -80,
                  }
            }
          >
            <View style={{ marginTop: -200 }}>
              <DropShadow
                style={{
                  shadowColor: "black",

                  shadowOffset: { width: -1, height: 1 },
                  shadowOpacity: 0.4,
                  shadowRadius: 2,
                }}
              >
                <ScrollView horizontal={true}>
                  <View style={{ backgroundColor: "#EBEBEB" }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text
                        style={{
                          marginTop: 10,
                          marginLeft: 10,
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        {ticketInfo[index].organizationName}
                      </Text>
                      <Text
                        style={{
                          marginTop: 20,
                          marginLeft: 10,
                          flex: 1,
                          textAlign: "right",
                          marginRight: 10,
                          fontSize: 10,
                        }}
                      >
                        {`Invoice Number ${ticketInfo[index].invoiceNumber}`}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        borderWidth: 0.8,
                        borderColor: "black",
                        marginLeft: 10,
                      }}
                    ></View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          marginLeft: 10,
                          marginRight: 10,
                          fontSize: 10,
                        }}
                      >
                        Passenger Name
                      </Text>
                      <Text style={{ marginLeft: 10, fontSize: 18 }}>
                        {ticketInfo[index].fullName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        marginBottom: 20,
                      }}
                    >
                      {/* firstrow */}
                      <View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            BUS NAME
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 10,
                              width: 100,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].organizationName}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            SEAT
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 38,
                              width: 100,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].seat}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            ON{"\n"}BOARDING
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 10,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].onBoardingPlace}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            DEPARTURE{"\n"}DATE
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 5,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].departureDate}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            AMOUNT PAID{"\n"}
                            {`(NUM)`}
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: -5,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].price}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* secondrow */}
                      <View style={{ marginLeft: 20 }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            FROM
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 30,
                              width: 100,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].from}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            TO
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 48,
                              width: 100,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].to}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            OFF{"\n"}BOARDING
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 10,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].offBoardingPlace}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            DEPARTURE{"\n"}Time
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 5,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].departureTime}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            AMOUNT PAID{"\n"}
                            {`(ALPHABET)`}
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: -5,
                              width: 105,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].totalPriceInWord}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          marginLeft: 20,
                          marginTop: 10,
                          marginRight: 30,
                        }}
                      >
                        <QRCode
                          value={ticketInfo[index].ticketNumber}
                          size={120}
                          color="#000000"
                          // backgroundColor="#ffffff"
                        />
                        <Text
                          style={{
                            flex: 1,
                            textAlign: "center",
                            marginTop: 10,
                          }}
                        >
                          {ticketInfo[index].ticketNumber}
                        </Text>
                      </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          flex: 1,
                          textAlign: "center",
                        }}
                      >
                        REMINDER
                      </Text>
                      <Text
                        style={{ flex: 1, fontSize: 10, textAlign: "center" }}
                      >
                        This is one time travel ticket, please arrive at the bus
                        station at least 15 minutes before departure
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </DropShadow>
            </View>
          </View>
       
        </ViewShot>
      );
    });
  };

  /////////////////////////////

  const twoWayTicket = () => {
    return ticketInfo.map((x, index) => {
      return (
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
        <View
          key={index}
          style={
            index == 0
              ? {
                  flexDirection: "column",
                  transform: [{ rotate: "-90deg" }],
                  marginTop: 240,
                  marginBottom: 250,
                  marginRight: -80,
                }
              : index == 1
              ? {
                  flexDirection: "column",
                  transform: [{ rotate: "-90deg" }],
                  marginTop: 240,
                  marginBottom: 250,

                  margin: -80,
                }
              : {
                  flexDirection: "column",
                  transform: [{ rotate: "-90deg" }],
                  marginTop: 240,
                  marginBottom: 250,
                  margin: -80,
                }
          }
        >
          <View>
            <View style={{ marginTop: -200 }}>
              <DropShadow
                style={{
                  shadowColor: "black",

                  shadowOffset: { width: -1, height: 1 },
                  shadowOpacity: 0.4,
                  shadowRadius: 2,
                }}
              >
                <ScrollView horizontal={true} style={{}}>
                  <View style={{ backgroundColor: "#EBEBEB" }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          marginTop: 10,
                          marginLeft: 10,
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        {ticketInfo[index].organizationName}
                      </Text>
                      <Text
                        style={{
                          marginTop: 20,
                          marginLeft: 10,
                          flex: 1,
                          textAlign: "right",
                          marginRight: 10,
                          fontSize: 10,
                        }}
                      >
                        {`Invoice Number ${ticketInfo[index].invoiceNumber}`}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        borderWidth: 0.8,
                        borderColor: "black",
                        marginLeft: 10,
                      }}
                    ></View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          marginLeft: 10,
                          marginRight: 10,
                          fontSize: 10,
                        }}
                      >
                        Passenger Name
                      </Text>
                      <Text style={{ marginLeft: 10, fontSize: 18 }}>
                        {ticketInfo[index].fullName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        marginBottom: 20,
                      }}
                    >
                      {/* firstrow */}
                      <View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            BUS NAME
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 10,
                              width: 100,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].organizationName}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            SEAT
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 38,
                              width: 100,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].seat}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            ON{"\n"}BOARDING
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 10,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].onBoardingPlace}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            DEPARTURE{"\n"}DATE
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 5,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].departureDate}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            AMOUNT PAID{"\n"}
                            {`(NUM)`}
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: -5,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].price}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* secondrow */}
                      <View style={{ marginLeft: 20 }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            FROM
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 30,
                              width: 100,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].from}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            TO
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 48,
                              width: 100,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].to}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            OFF{"\n"}BOARDING
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 10,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].offBoardingPlace}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            DEPARTURE{"\n"}Time
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 5,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].departureTime}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            AMOUNT PAID{"\n"}
                            {`(ALPHABET)`}
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: -5,
                              width: 105,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].totalPriceInWord}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          marginLeft: 20,
                          marginTop: 10,
                          marginRight: 30,
                        }}
                      >
                        <QRCode
                          value={ticketInfo[index].ticketNumber}
                          size={120}
                          color="#000000"
                          // backgroundColor="#ffffff"
                        />
                        <Text
                          style={{
                            flex: 1,
                            textAlign: "center",
                            marginTop: 10,
                          }}
                        >
                          {ticketInfo[index].ticketNumber}
                        </Text>
                      </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          flex: 1,
                          textAlign: "center",
                        }}
                      >
                        REMINDER
                      </Text>
                      <Text
                        style={{ flex: 1, fontSize: 10, textAlign: "center" }}
                      >
                        This is one time travel ticket, please arrive at the bus
                        station at least 15 minutes before departure
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </DropShadow>
            </View>
            {/* <View>
      <Text>{`Scroll >>`}</Text>
      </View> */}
          </View>
          {/* //////////////////////////////////////
      ////////////////////////////////////// */}
        </View>
        </ViewShot>
      );
    });
  };

  return (
    <ScrollView style={{ backgroundColor: "#EBEBEB" }}>
      <ScrollView>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#F28021" }}>
            You have Successfully{" "}
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#F28021",
              marginLeft: 20,
            }}
          >
            Purchased a Ticket{" "}
          </Text>
        </View>
        {/* <Image
      
      source={require('../Img/ticket-solid.png') } style={{width:250,height:250}}
      
      /> */}
        <ScrollView
          horizontal={true}
          style={{
            marginBottom: 10,
            alignSelf: "flex-start",
          }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {isEnabledTwoWay ? twoWayTicket() : oneWayTicket()}

        </ScrollView>
      </ScrollView>

      <View>
        <Pressable
          onPress={downloadTicket}
          style={{
            backgroundColor: "#f27f22",
            width: screenWidth / 1.1,
            height: 55,
            borderRadius: 15,
            marginBottom: 20,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              flex: 1,
              textAlignVertical: "center",
            }}
          >
            Download Ticket
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
