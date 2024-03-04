import * as React from "react";
import { useState, useEffect } from "react";
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
  Card,
} from "react-native-paper";

//--------------------------------------------------------------------------------//
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";
import { Icon } from "react-native-elements";

const Readhistory = ({ navigation, router }) => {
  const [graphHistory, setGraphHistory] = useState([]);
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const fetchGraphHistory = async () => {
      const db = getDatabase();
      const userGraphHistoryRef = ref(db, "users"); // เปลี่ยน path ไปยัง 'users'

      try {
        const snapshot = await get(userGraphHistoryRef);
        const data = snapshot.val();
        if (data) {
          const historyArray = [];
          Object.keys(data).forEach(userId => {
            const userData = data[userId];
            if (userData.graphHistory) {
              const userHistory = Object.values(userData.graphHistory).reverse();
              historyArray.push(...userHistory.map(item => ({ ...item, userId })));
            }
          });
          setGraphHistory(historyArray);
        }
      } catch (error) {
        console.error("Error fetching graph history:", error.message);
      }
    };

    const fetchUsernames = async () => {
      const db = getDatabase();
      const usernamesRef = ref(db, 'users');

      try {
        const snapshot = await get(usernamesRef);
        const data = snapshot.val();
        if (data) {
          // แปลง object เป็น array
          const usernamesArray = Object.values(data);
          setUsernames(usernamesArray);
        }
      } catch (error) {
        console.error("Error fetching usernames:", error.message);
      }
    };

    fetchGraphHistory();
    fetchUsernames();
  }, []);

  const getUsernameForUserId = (userId) => {
    return usernames[userId] || "Unknown User";
  };
  return (
    //--------------------------------------------------------------------------------//
    <SafeAreaView style={styles.backgroundImage}>
      <TouchableOpacity
        style={styles.BackButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.85}
      >
        <Icon name="chevron-back" size={24} color="#1b1b1b" type="ionicon" />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Text style={styles.TextW}>รายชื่อ</Text>
        <FlatList
          data={graphHistory}
          keyExtractor={(item) =>
            item.timestamp ? item.timestamp.toString() : ""
          }
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text>เวลา: {item.timestamp}</Text>
              <Text>ส่วน: {item.selectedItemId}</Text>
              <Text>ตำแหน่งที่: {item.selectedButtonName}</Text>
              <Text>ผู้ใช้: {getUsernameForUserId(item.userId)}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
  //--------------------------------------------------------------------------------//
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
  itemContainer: {
    flex: 1,
    margin: 8,
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
});

export default Readhistory;
