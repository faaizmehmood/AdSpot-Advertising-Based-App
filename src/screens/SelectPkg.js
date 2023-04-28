import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {images} from '../assets/images';
import {routeNames} from '../navigation/config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PackageIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SelectPkg = props => {
  const onPressPremiumPkg = () => {
    props.navigation.navigate(routeNames.PremiumPkg);
  };
  const onPressClassicPkg = () => {
    props.navigation.navigate(routeNames.ClassicPkg);
  };
  const onPressNormalPkg = () => {
    props.navigation.navigate(routeNames.NormalPkg);
  };
  const onPressSpecialPkg = () => {
    props.navigation.navigate(routeNames.SpecialPkg);
  };

  return (
    <SafeAreaView style={styles.f1}>
      <ImageBackground
        source={images.splash_Full}
        style={styles.splash_Img_Edit}>
        <View style={styles.parentView}>
          <MaterialIcons
            name="category"
            size={35}
            style={{color: '#fb246b', marginHorizontal: responsiveWidth(2)}}
          />
          <Text style={styles.homeText}>Package Categories</Text>
        </View>
        <Text style={styles.DiscriptionText}>
          Select your Package to post your Ad
        </Text>
        <TouchableOpacity
          style={styles.pkgContainer}
          onPress={onPressPremiumPkg}>
          <Text style={styles.pkgText}>Premium Package</Text>
          <PackageIcon
            name="package-variant-closed"
            size={29}
            style={{color: 'white', marginHorizontal: responsiveWidth(3)}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pkgContainer}
          onPress={onPressClassicPkg}>
          <Text style={styles.pkgText}>Classic Package</Text>
          <PackageIcon
            name="package-variant-closed"
            size={29}
            style={{color: 'white', marginHorizontal: responsiveWidth(3)}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pkgContainer}
          onPress={onPressNormalPkg}>
          <Text style={styles.pkgText}>Normal Package</Text>
          <PackageIcon
            name="package-variant-closed"
            size={29}
            style={{color: 'white', marginHorizontal: responsiveWidth(3)}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pkgContainer}
          onPress={onPressSpecialPkg}>
          <Text style={styles.pkgText}>Special Package</Text>
          <PackageIcon
            name="package-variant-closed"
            size={29}
            style={{color: 'white', marginHorizontal: responsiveWidth(3)}}
          />
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  splash_Img_Edit: {
    height: responsiveWidth(215),
  },
  pkgText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.5),
    color: 'white',
  },
  DiscriptionText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginTop: responsiveHeight(3),
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(3.6),
  },
  pkgContainer: {
    // width: '100%',
    marginVertical: responsiveWidth(7),
    marginHorizontal: responsiveWidth(2.8),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fb246b',
    borderWidth: 2,
    borderColor: 'red',
  },
  parentView: {
    flexDirection: 'row',
    marginTop: responsiveHeight(15),
    justifyContent: 'center',
  },
  homeText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(3.5),
    textAlign: 'center',
  },
});

export default SelectPkg;
