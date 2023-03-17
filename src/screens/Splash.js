import React, {useEffect, useContext} from 'react';
import {
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {images} from '../assets/images';
import {AuthContext} from '../context/AuthContext';
import {LocalStorageKeys} from '../constants';

const Splash = ({navigation}) => {
  const {setSplashLoading, setShowOnboarding, setLoggedIn} =
    useContext(AuthContext);

  useEffect(() => {
    initialConfiguration();
  }, []);

  const initialConfiguration = async () => {
    try {
      const value = await AsyncStorage.getItem(LocalStorageKeys.showOnboarding);
      // console.log(value);
      if (value) {
        setShowOnboarding(false);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const value = await AsyncStorage.getItem(LocalStorageKeys.showLoggedIn);
      // console.log(value);
      if (value) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setSplashLoading(false);
    }, 2 * 1000);
  };

  return (
    <SafeAreaView>
      <View style={styles.imageBGStyle}>
        <ImageBackground source={images.splash_Full}>
          <Image
            source={images.logo_BG}
            style={styles.logoBG_style}
            resizeMode="center"
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageBGStyle: {
    height: responsiveWidth(220),
  },
  // imageBG_Black: {
  //   marginTop: responsiveHeight(61),
  //   height: responsiveWidth(91),
  //   borderWidth: 2,
  //   borderColor: 'red',
  // },
  logoBG_style: {
    height: responsiveWidth(77),
    width: responsiveWidth(77),
    marginVertical: responsiveHeight(45),
    alignSelf: 'center',
  },
});

export default Splash;
