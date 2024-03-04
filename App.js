import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//--------------------------------------------------------------------------------//
import LoginScreen from "./screens/mainview/Login";
import OTPScreen from "./screens/mainview/OTP";
import RegisterScreen from "./screens/mainview/register";

import HomeScreen from "./screens/Menumain/Home";
import AlarmmainScreen from "./screens/Alarm/Alarmmain"; //รอลิงค์กับalarmclook
import MoreScreen from "./screens/Menumain/Moremenu"; //เหลือตัวประกอบ

import NavigationmenuScreen from "./Navigations/Navigationmenu";

import HyperAaugeIScreen from "./screens/usersscreens/Aauge/HyperglycemiaAauge";
import HypoAaugeIScreen from "./screens/usersscreens/Aauge/HypoglycemiaAauge";
import SugargradeScreen from "./screens/usersscreens/SugarGrade";
import ChatusersScreen from "./screens/usersscreens/Chatusers"; //เหลือแชทกับหมอ
import GraphScreen from "./screens/usersscreens/Graph";

import AlarmClockScreen from "./screens/Alarm/AlarmClock"; //ยัง
import GaugeHistoryScreen from "./screens/usersscreens/MedicalHistory/GaugeHistory"; //เหลือตบแต่ง
import GraphHistoryScreen from "./screens/usersscreens/MedicalHistory/GraphHistory"; //เหลือตบแต่ง

import ProflieScreen from "./screens/usersscreens/Proflie"; //เหลือตบแต่ง

//ทดสอบ
import ReadhistoryScreen from "./screens/usersscreens/Readhistory";

//--------------------------------------------------------------------------------//
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDLL0hW2jYVQd4DfgQOtzzLZm2kgi65wo4",
  authDomain: "insulindatabase.firebaseapp.com",
  databaseURL: "https://insulindatabase-default-rtdb.firebaseio.com",
  projectId: "insulindatabase",
  storageBucket: "insulindatabase.appspot.com",
  messagingSenderId: "567387156474",
  appId: "1:567387156474:web:7458796aac6baecf18be43",
  measurementId: "G-MNM84ZP3WN",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
//--------------------------------------------------------------------------------//

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

        <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

        <Stack.Screen
          name="Navigationmenu"
          component={NavigationmenuScreen}
          options={{
            headerShown: false,
            title: "index", //แถบด้านล่าง
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

        <Stack.Screen
          name="Alarmmain"
          component={AlarmmainScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

        <Stack.Screen
          name="Moremenu"
          component={MoreScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

        <Stack.Screen
          name="HyperAaugeI"
          component={HyperAaugeIScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="HypoAaugeI"
          component={HypoAaugeIScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="Sugargrade"
          component={SugargradeScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="Chatusers"
          component={ChatusersScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="Graph"
          component={GraphScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="Proflie"
          component={ProflieScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="AlarmClock"
          component={AlarmClockScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="GaugeHistory"
          component={GaugeHistoryScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="GraphHistory"
          component={GraphHistoryScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

        <Stack.Screen
          name="Readhistory"
          component={ReadhistoryScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
