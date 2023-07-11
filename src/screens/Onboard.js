import React, {useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {images} from '../assets/images';
import {AuthContext} from '../context/AuthContext';
import {LocalStorageKeys} from '../constants';

const Onboard = () => {
  const {showOnboarding, setShowOnboarding} = useContext(AuthContext);

  const onGoToNextScreen = async () => {
    setShowOnboarding(false);
    try {
      await AsyncStorage.setItem(
        LocalStorageKeys.showOnboarding,
        'showOnboarding',
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <ImageBackground
          source={images.splash_Full}
          style={styles.onBoardImage}>
          <Text style={styles.welcomeScreenText}>Start Advertising</Text>
          <View style={styles.bottomContainer}>
            <Text style={styles.headerScreenText}>
              Let's join our community to Advertise your Ad!
            </Text>
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={onGoToNextScreen}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: '#141414',
    flex: 0.7,
  },
  onBoardImage: {
    height: responsiveHeight(107),
    width: responsiveWidth(100),
  },
  welcomeScreenText: {
    marginTop: responsiveHeight(48),
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 22,
  },
  headerScreenText: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: responsiveFontSize(2.2),
    paddingHorizontal: responsiveHeight(11),
    marginTop: responsiveHeight(2),
  },
  bottomContainer: {
    flex: 0.3,
  },
  getStartedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: responsiveHeight(9),
    backgroundColor: 'rgba(192,85,181,255)',
    width: responsiveWidth(90),
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(50) / 2,
  },
  getStartedButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Inter-Bold',
  },
});

export default Onboard;
