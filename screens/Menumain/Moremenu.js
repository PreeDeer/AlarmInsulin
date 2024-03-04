import React from "react";
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
  Dimensions,
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
} from "react-native-paper";

import { getDatabase, ref, child, get } from "firebase/database";
import { Icon } from "react-native-elements";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { categoriesData } from "../../components/categoriesindex";
import { categoriesData2 } from "../../components/categoriesindex";
import { categoriesData3 } from "../../components/categoriesindex";

const Moremenu = ({ navigation }) => {
  const halfLength = Math.ceil(categoriesData3.length / 2);

  const firstHalfData = categoriesData3.slice(0, halfLength);
  const secondHalfData = categoriesData3.slice(halfLength);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.categoryContainerS3} key={index}>
      <Image source={item.image} style={styles.categoryImageS} />
      <Text style={styles.categoryTitle}>
        {item.title.split(" ").map((word, index) => (
          <Text key={index}>
            {word}
            {"\n"}
          </Text>
        ))}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.backgroundImage}>
      <Text style={styles.headingText}>เมนูหลัก</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContainer}
        showsHorizontalScrollIndicator={false}
      >
        {categoriesData.map((cat, index) => (
          <TouchableOpacity key={index} style={styles.categoryContainer}>
            <Image source={cat.image} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>
              {cat.title.split(" ").map((word, index) => (
                <Text key={index}>
                  {word}
                  {"\n"}
                </Text>
              ))}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.headingText}>บริการเสริม</Text>
      <View style={styles.containerS}>
        <FlatList
          horizontal
          data={categoriesData2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index} style={styles.categoryContainerS}>
              <Image source={item.image} style={styles.categoryImageS} />
              <Text style={styles.categoryTitle}>
                {item.title.split(" ").map((word, index) => (
                  <Text key={index}>
                    {word}
                    {"\n"}
                  </Text>
                ))}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.flatListContainerS}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Text style={styles.headingText}>สาระความรู้</Text>
      <View style={styles.containerS}>
        <FlatList
          horizontal
          data={firstHalfData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainerS}
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          horizontal
          data={secondHalfData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainerS}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingText: {
    fontSize: wp(5),
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    left: 12,
    color: "rgba(0, 0, 0, 0.8)",
  },
  scrollViewContainer: {
    paddingHorizontal: 15,
    flexDirection: "row",
    marginVertical: 10,
  },
  categoryContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  categoryImage: {
    width: wp(20),
    height: wp(19),
    borderRadius: 10,
  },
  categoryTitle: {
    textAlign: "center",
    fontSize: wp(3),
    fontWeight: "bold",
    marginTop: 5,
    color: "rgba(0, 0, 0, 0.8)",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  //กรอบสีขาว
  containerS: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 4,
    overflow: "hidden",
    
  },
  listContainerS: {
    flex: 1,
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  flatListContainerS: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    paddingHorizontal: 5,
  },
  categoryContainerS: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    //flex: 1,
    flexDirection: "column",
  },
  categoryContainerS3: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "column",
  },
  categoryImageS: {
    width: wp(12),
    height: wp(11),
    borderRadius: 10,
    margin: 8,
    padding: 15,
  },
});

export default Moremenu;
