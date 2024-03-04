import * as React from "react";
import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  AppRegistry,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";

import {
  Button,
  TextInput,
  Avatar,
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
  MD2LightTheme,
  Card,
  Switch,
  TimePicker,
} from "react-native-paper";

//--------------------------------------------------------------------------------//
import DatePicker from "react-native-datepicker";

import { Database } from "../Alarm/DatabaseAlarm";

import { Icon } from "react-native-elements";

const items = [
  {
    id: 1,
    name: "ช่วงเช้า",
    Title: "{time} ",
    image: require("../../assets/bgalarm1.png"),
    music: "เสียงตามสายท่านึง",
    days: "อา.,จ.,อ.,พ.,พฤ.,ศ.,ส.",
    switchs: false,
  },
  {
    id: 2,
    name: "ช่วงเที่ยง",
    Title: "{time} ",
    image: require("../../assets/bgalarm2.png"),
    music: "เสียงตามสายท่านึง",
    days: "อา.,จ.,อ.,พ.,พฤ.,ศ.,ส.",
    switchs: false,
  },
  {
    id: 3,
    name: "ช่วงเย็น",
    Title: "{time} ",
    image: require("../../assets/bgalarm3.png"),
    music: "เสียงตามสายท่านึง",
    days: "อา.,จ.,อ.,พ.,พฤ.,ศ.,ส.",
    switchs: false,
  },
];

const Alarmmain = ({ navigation, route }) => {
  const { alarmsData } = route.params || {};

  const [switchStates, setSwitchStates] = useState(
    items.map((item) => item.switchs)
  );
  const [selectedDays, setSelectedDays] = useState({});
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    console.log("alarmsData:", alarmsData);

    if (route.params && route.params.updatedAlarm) {
      const updatedAlarm = route.params.updatedAlarm;
      setSelectedDays(updatedAlarm.selectedDays || {});
      setHour(updatedAlarm.hour || 0);
      setMinute(updatedAlarm.minute || 0);
    }

    // ใช้ Database.getAll() เพื่อดึงข้อมูลทั้งหมดพร้อมกับ cardId เป็นเงื่อนไข
    Database.getAll({ cardId: route.params?.cardId }) // ดัดแปลงตรงนี้เพื่อส่ง cardId ไปยังฟังก์ชันดึงข้อมูล
      .then((result) => {
        console.log("Fetched alarms from the database:", result);

        // ทำต่อไปตามความต้องการของคุณ เช่น อัพเดท state หรือทำอะไรก็ตามที่ต้องการ
        setAlarms(result);
      })
      .catch((error) => {
        console.error("Error fetching alarms:", error);
      });

    // ... (ส่วนที่เหลือของ logic ใน useEffect)
  }, [route.params, alarmsData]);

  const renderTitleWithTime = (cardId) => {
    const item = items.find((item) => item.id === cardId);
  
    if (item) {
      const fetchedData = getFetchedDataForCardId(cardId);
  
      if (fetchedData) {
        const formattedTime = `${fetchedData.hour.toString().padStart(2, "0")}:${fetchedData.minute.toString().padStart(2, "0")} น.`;
        const replacedTitle = item.Title.replace("{time}", formattedTime);
  
        // ตรวจสอบว่า days มีใน SQL list หรือไม่
        const hasDaysInSQLList = fetchedData.days && fetchedData.days.length > 0;
  
        console.log(`cardId: ${cardId}, item.id: ${item.id}, replacedTitle: ${replacedTitle}, hasDaysInSQLList: ${hasDaysInSQLList}`);
  
        // เพิ่มเงื่อนไขเพื่อตรวจสอบว่า days มีใน SQL list หรือไม่
        if (hasDaysInSQLList) {
          console.log(`Days in SQL List: ${fetchedData.days}`);
        } else {
          console.log(`No days in SQL List for cardId: ${cardId}`);
        }
  
        return <Text style={styles.CardDescription}>{replacedTitle}</Text>;
      } else {
        console.log(`No data for cardId: ${cardId}`);
        return <Text style={styles.CardDescription}>No data for this cardId</Text>;
      }
    } else {
      console.log(`No item for cardId: ${cardId}`);
      return <Text style={styles.CardDescription}>00.00 น.</Text>;
    }
  };
  

  // เพิ่มฟังก์ชันที่ให้ข้อมูลจาก SQLList หรือที่เก็บข้อมูลไว้ (ในที่นี้ให้ใช้ข้อมูลจาก state เป็นตัวอย่าง)
  const getFetchedDataForCardId = (cardId) => {
    // ในกรณีที่มีข้อมูลจริง ๆ จะต้องนำข้อมูลจาก SQLList หรือที่เก็บข้อมูลไว้
    // ในตัวอย่างนี้ให้ใช้ state ของแอพของคุณเป็นตัวอย่าง
    const fetchedData = alarms.find((alarm) => alarm.cardId === cardId);

    return fetchedData;
  };

  const checkDayInSQLList = (cardId, day) => {
    const fetchedData = getFetchedDataForCardId(cardId);
    
    if (fetchedData) {
      return fetchedData.days.includes(day);
    }
    
    return false;
  };  
  

  /*************************************************************** */
  const onToggleSwitch = (itemId) => {
    const updatedSwitchStates = switchStates.map((state, index) =>
      index === itemId - 1 ? !state : state
    );
    setSwitchStates(updatedSwitchStates);
  };

  const handleButtonPress = () => {
    console.log("Selected Days: ", selectedDays);
  };

  const handleCardPress = (itemId, itemImage) => {
    navigation.navigate("AlarmClock", {
      cardId: itemId,
      cardImage: itemImage,
      selectedDays,
      alarmsData,
    });
    console.log(`Card with ID ${itemId} pressed`);
  };

  return (
    <SafeAreaView style={styles.backgroundImage}>
      <TouchableOpacity
        style={styles.BackButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.85}
      >
        <Icon name="chevron-back" size={24} color="#1b1b1b" type="ionicon" />
      </TouchableOpacity>

      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.View}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleCardPress(item.id, item.image)}
                activeOpacity={0.8}
              >
                <Card style={styles.Card}>
                  <Card.Cover source={item.image} style={styles.CardImage} />
                  <Card.Content>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Text style={{ ...styles.CardTitle, width: 175 }}>
                        {item.name}
                      </Text>
                      <Switch
                        value={switchStates[item.id - 1]}
                        onValueChange={() => onToggleSwitch(item.id)}
                      />
                    </View>
                    {renderTitleWithTime(item.id)}

                    {switchStates[item.id - 1] && (
                      <View>
                        <Text>{item.music}</Text>

                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                          {item.days.split(",").map((day, index) => (
                            <View
                              key={index}
                              style={[
                                styles.dayButton,
                                (selectedDays[item.id] &&
                                  selectedDays[item.id].includes(day.trim())) ||
                                checkDayInSQLList(item.id, day.trim()) // เพิ่มเงื่อนไขเช็คว่าวันนี้มีใน SQLList หรือไม่
                                  ? styles.selectedDayButton
                                  : null,
                              ]}
                            >
                              <Text style={styles.dayButtonText}>
                                {day.trim()}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "rgba(234, 252, 255, 0.4)",
  },
  Textheader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.8)",
    marginBottom: 16,
  },
  BackButton: {
    elevation: 5,
    marginTop: 15,
    marginLeft: 15,
    flexDirection: "row",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 35,
    height: 35,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  Card: {
    marginBottom: 20,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
  },
  CardImage: {
    width: 375,
    height: 95,
    marginBottom: 10,
    borderRadius: 0,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
  },
  CardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  CardDescription: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.5)",
  },
  CardTitleinfor: {
    fontSize: 14,
    marginBottom: 5,
    color: "rgba(0, 0, 0, 0.8)",
  },

  dayButton: {
    backgroundColor: "#66B8E6",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  selectedDayButton: {
    backgroundColor: "#2ecc71", // สีเมื่อถูกเลือก
  },
  dayButtonText: {
    color: "#fff",
  },
});

export default Alarmmain;
