import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import Colors from '../theme/Colors';
// import Fonts from '../theme/Fonts';
import introImage from '../../assets/images/slide1.png';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const isLogged = AsyncStorage.getItem('logged');
    const navHome = async () => {
      if ((await isLogged) === 'true') {
        setTimeout(() => {
          navigation.replace('HomeScreen');
        }, 1500);
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 1500);
      }
    };
    navHome();
  }, []);

  return (
    <View style={styles.container}>
      <AppStatusBar />
      <Text style={styles.textStyle}>Bánh mì UITFood</Text>
      <Image
        source={introImage}
        style={{
          width: 280,
          height: 200,
          alignSelf: 'center',
          marginTop: 40,
          marginBottom: 40,
        }}
      />
      <Text style={styles.textStyle_small}>Bánh mì đầy đủ hương vị tây ta</Text>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
  },
  textStyle: {
    fontSize: 60,
    color: Colors.while,
    // fontFamily: Fonts.primaryFont,
  },
  textStyle_small: {
    fontSize: 20,
    // fontWeight: '200',
    color: Colors.while,
    // fontFamily: Fonts.primaryFont,
    marginBottom: 20,
  },
});

export default SplashScreen;
