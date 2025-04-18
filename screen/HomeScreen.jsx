import { StyleSheet, TouchableOpacity,Text, View, Image, Platform, StatusBar, SafeAreaView, TextInput, FlatList } from 'react-native';
import React, { use , useState } from 'react';
import coffeeData from '../data/coffeeData';
import { Dimensions } from 'react-native';
import CoffeeCarousel from '../cards/CoffeeCarousel';
import SecureStorage from '../utilsService/SecureStore';
import { useDispatch } from 'react-redux';
import { login , logout } from '../store/authorizeSlice';  


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



const HomeScreen = () => {
  const dispatch = useDispatch();

  const cikisfunc = async () => {
    await SecureStorage.remove("isLoggedIn");
    dispatch(logout());
    console.log("Çıkış yapıldı");

  }

  const [activeTitle, setActiveTitle] = React.useState(0);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.v1}>
          <Image
            source={require("../assets/kahve_bg.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          <View style={styles.v11}>
            <TouchableOpacity onPress={() => cikisfunc()}>
              <Image
                source={require("../assets/avatar.png")}
                style={{ width: 50, height: 50 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View>
              <Image
                source={require("../assets/mapIcon.png")}
                style={{ width: 30, height: 30 }}
                resizeMode="cover"
              />
              <Text style={{ fontSize: 14, textAlign: "center" }}>İzmir</Text>
            </View>
            <Image
              source={require("../assets/bell.png")}
              style={{ width: 30, height: 30, tintColor: "brown" }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.v12}>
            <TextInput placeholder="Search Coffee" style={styles.textInput} />
            <Image
              source={require("../assets/searchBar.png")}
              style={{
                width: 30,
                height: 30,
                marginLeft: -40,
                alignSelf: "center",
              }}
            />
          </View>
        </View>

        <View style={styles.v2}>
          <View style={{ height: height * 0.05, marginTop: 20 }}>
            <FlatList
              data={coffeeData}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isActive = activeTitle === item.id;
                const backgroundColor = isActive ? "#c36300" : "white";
                const textColor = isActive ? "white" : "black";

                return (
                  <TouchableOpacity
                    onPress={() => setActiveTitle(item.id)}
                    style={[styles.v21, { backgroundColor }]}
                  >
                    <Text style={{ color: textColor, fontWeight: "bold" }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <CoffeeCarousel data={coffeeData} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  v1: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.5,
  },
  v11: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  v12:{
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    
  },    
  textInput:{
    width: width * 0.8,
    height: height * 0.05,
    paddingLeft: 20,
    margin: 2,
    backgroundColor: 'white',
    opacity: 0.7,
    borderWidth: 1,
    borderColor: 'brown',
    borderRadius: 40,
  },    
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  v2: {
    flex: 3,
    justifyContent: 'start',
    alignItems: 'start',
    width: '100%',
    backgroundColor: 'white',
  },
  v21:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 0.5,
    borderColor: 'brown',
    borderRadius: 20,
    height: height * 0.05,
    width: width * 0.3,
    marginHorizontal: 5,
    overflow: 'hidden',
  },

});
