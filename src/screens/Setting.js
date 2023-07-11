import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {LocalStorageKeys} from '../constants';
import {AuthContext} from '../context/AuthContext';
import {images} from '../assets/images';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

const Setting = () => {
  const {setLoggedIn} = useContext(AuthContext);
  const onPressLogout = async () => {
    try {
      await AsyncStorage.removeItem(LocalStorageKeys.showLoggedIn);
    } catch (error) {
      console.log(error);
    }
    setLoggedIn(false);
  };

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: '#111110',
      }}>
      <ImageBackground
        source={images.splash_Full}
        style={styles.splash_Img_Edit}>
        <View style={styles.parentView}>
          <FontistoIcon
            name="player-settings"
            size={31}
            style={{
              color: 'white',
              marginHorizontal: responsiveWidth(2),
              alignSelf: 'center',
            }}
          />
          <Text style={styles.SettingText}>Setting</Text>
        </View>
        <TouchableOpacity style={styles.LogOutButton} onPress={onPressLogout}>
          <Text style={styles.LogoutText}>Logout</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  splash_Img_Edit: {
    height: responsiveWidth(215),
  },
  mainText: {
    color: 'white',
    alignSelf: 'center',
    marginTop: responsiveHeight(22),
  },
  LogOutButton: {
    marginTop: responsiveHeight(13),
    borderRadius: responsiveWidth(25),
    paddingVertical: responsiveHeight(2),
    marginHorizontal: responsiveWidth(5),
    alignItems: 'center',
    backgroundColor: 'rgba(192,85,181,255)',
  },
  LogoutText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Inter-Bold',
  },
  parentView: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(16),
    justifyContent: 'center',
  },
  SettingText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(4),
    textAlign: 'center',
  },
});

export default Setting;
