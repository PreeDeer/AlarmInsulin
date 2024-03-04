import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
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
  FlatList,
} from "react-native";

import {
  Button,
  TextInput,
  Avatar,
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
  MD2LightTheme,
} from "react-native-paper";

//--------------------------------------------------------------------------------//
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Icon } from "react-native-elements";

const Chatusers = ({ navigation, route }) => {
  
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const isFocused = useIsFocused();
  const auth = getAuth();

  const fetchUserDataByPhoneNumber = async () => {
    const userPhoneNumber = auth.currentUser.phoneNumber;

    if (userPhoneNumber) {
      const db = getDatabase();
      const usersRef = ref(db, "users");

      try {
        const usersSnapshot = await get(usersRef);

        if (usersSnapshot.exists()) {
          const users = usersSnapshot.val();
          const userKey = Object.keys(users).find(
            (key) => users[key].phoneNumber === userPhoneNumber
          );

          if (userKey) {
            const userData = users[userKey];
            setUsername(userData.username || "");
            return userData;
          } else {
            throw new Error("User not found");
          }
        } else {
          throw new Error("No users found");
        }
      } catch (error) {
        throw new Error("Error fetching user data: " + error.message);
      }
    } else {
      throw new Error("User phone number not available");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserDataByPhoneNumber();

        if (userData) {
          setUsername(userData.username || "");
        } else {
          setUsername("");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData();
      } else {
        // User is not logged in, navigate to login screen
        navigation.navigate("Login"); // Change 'Login' to the actual name of your login screen
      }
    });

    return unsubscribe; // Cleanup the subscription when the component unmounts
  }, [isFocused, navigation]);

  const handleSendMessage = () => {
    setMessages([...messages, { text: inputText, sender: "user" }]);
    sendToBot(inputText);
    setInputText("");
  };

  const sendToBot = async (message) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDataFromFetch = await fetchUserDataByPhoneNumber();
        const username = userDataFromFetch
          ? userDataFromFetch.username
          : "ไม่มีชื่อ";
        const response = `${username}: ${message}`;
        handleBotResponse(response);
      } else {
        console.error("No user logged in.");
      }
    } catch (error) {
      console.error("Error sending message to bot:", error);
    }
  };

  useEffect(() => {
    // ทำการเพิ่มข้อความจากบอทเมื่อหน้านี้ถูกโหลดครั้งแรก
    const initialBotMessage = "คุณหมอ: สวัสดีครับ มีอะไรให้ช่วยเหลือครับ?";
    const secondBotMessage = "โปรดพิมพ์คำถามที่คุณสงสัยไว้ เนื่องจากบุคลากรของเราไม่เพียงพอจึงไม่สามารถตอบข้อความของคุณได้ในทันที โปรดรอ10-20นาทีในเพื่อรอการตอบกลับ หมายเหตุ:หากเป็นเหตุฉุกเฉินโปรดโทร 1669.";
    
    setMessages([
      { text: initialBotMessage, sender: "bot" },
      { text: secondBotMessage, sender: "bot" },
    ]);
  }, []);
  
  const handleBotResponse = (response) => {
    setMessages([...messages, { text: response, sender: "bot" }]);
  };
  
  return (
    <SafeAreaView style={styles.backgroundImage}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Icon name="chevron-back" size={24} color="#1b1b1b" type="ionicon" />
        </TouchableOpacity>
        <Text style={styles.headerText}>พูดคุยกับคุณหมอ</Text>
      </View>

      <View style={styles.itemContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={
                item.sender === "user"
                  ? styles.messageContainer
                  : styles.botMessageContainer
              }
            >
              {item.sender === "user" && (
                <Text style={styles.username}>
                  {userData ? userData.username : "ไม่มีชื่อ"}
                </Text>
              )}
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            </View>
          )}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TextInput
            style={styles.InputForm}
            label="พิมพ์ข้อความ"
            value={inputText}
            onChangeText={(text) => setInputText(text)}
          />
          <Button style={{ ...styles.ButtonS }} onPress={handleSendMessage}>
            <Text style={styles.buttonText}>ส่ง</Text>
          </Button>
        </View>
      </View>
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
    resizeMode: "cover", // ให้รูปภาพปรับขนาดเพื่อครอบคลุมพื้นที่ทั้งหมด
    justifyContent: "center", // ให้ UI อยู่กึ่งกลาง
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemContainer: {
    flex: 1,
    margin: 18,
    padding: 30,
    paddingHorizontal: 3,
    backgroundColor: "white",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  TextW: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    margin: 6,
  },
  InputForm: {
    elevation: 3,
    shadowColor: "#757575",
    fontFamily: "Prompt-Regular",
    backgroundColor: "#f2f2f2",
    margin: 6,
    width: 300,
  },
  inputLabel: {
    fontFamily: "Prompt-Regular",
    color: "#88AED0",
    height: 50,
  },
  ButtonS: {
    borderRadius: 15,
    backgroundColor: "#66B8E6",
    padding: 10,
    margin: 6,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.4)", // สีของเงา
    shadowOffset: { width: 0, height: 4 }, // ตำแหน่งเงา (x, y)
    shadowOpacity: 0.5, // ความทึบของเงา
    shadowRadius: 6, // รัศมีของเงา
    elevation: 500, // Android: การยกขึ้นจากพื้น
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  backButton: {
    marginRight: 10,
  },
  TextName: {
    fontWeight: "bold",
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.8)",
    margin: 8,
  },

  username: {
    fontWeight: "bold",
    color: "#1b1b1b",
    marginBottom: 4,
  },

  userMessage: {
    backgroundColor: "#66B8E6",
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
  },
  botMessage: {
    backgroundColor: "#66B8E6",
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
  },

  messageContainer: {
    backgroundColor: "#66B8E6",
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
  },
  botMessageContainer: {
    backgroundColor: "#66B8E6",
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
  },
});

export default Chatusers;
