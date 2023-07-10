import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {routeNames} from '../navigation/config';
import {images} from '../assets/images';

const Home = props => {
  const onGoToSelectPkgScreen = () => {
    props.navigation.navigate(routeNames.SelectPkg);
  };
  const onGoToShowPkgScreen = () => {
    props.navigation.navigate(routeNames.ShowPackages);
  };
  const onGoToCreatePkgScreen = () => {
    props.navigation.navigate(routeNames.UserMakePackageFormPress);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <ImageBackground
          source={images.splash_Full}
          style={styles.splash_Img_Edit}>
          <View>
            <View style={styles.parentView}>
              <FontAwesomeIcon
                name="home"
                size={35}
                style={{color: 'white', marginHorizontal: responsiveWidth(2)}}
              />
              <Text style={styles.homeText}>Home</Text>
            </View>
            <Text style={styles.DiscriptionText}>
              Select your Choice to post your Ad
            </Text>
            <TouchableOpacity
              style={styles.pkgSelectContainer}
              onPress={onGoToSelectPkgScreen}>
              <FeatherIcon
                name="package"
                size={25}
                style={{color: 'white', marginHorizontal: responsiveWidth(2)}}
              />
              <Text style={styles.pkgText}>Select Package</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pkgCreateContainer}
              onPress={onGoToCreatePkgScreen}>
              <FeatherIcon
                name="package"
                size={25}
                style={{color: 'white', marginHorizontal: responsiveWidth(2)}}
              />
              <Text style={styles.pkgText}>Create Package</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pkgContainer}
              onPress={onGoToShowPkgScreen}>
              <FeatherIcon
                name="package"
                size={25}
                style={{color: 'white', marginHorizontal: responsiveWidth(2)}}
              />
              <Text style={styles.pkgText}>Show Package</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  splash_Img_Edit: {
    height: responsiveWidth(215),
  },
  pkgText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.5),
    color: 'white',
  },
  pkgContainer: {
    // width: '100%',
    marginVertical: responsiveWidth(6),
    marginHorizontal: responsiveWidth(2.8),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(208,85,157,255)',
  },
  pkgCreateContainer: {
    // width: '100%',
    marginVertical: responsiveWidth(6),
    marginHorizontal: responsiveWidth(2.8),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(117,84,123,255)',
    alignItems: 'center',
  },
  pkgSelectContainer: {
    // width: '100%',
    marginVertical: responsiveWidth(6),
    marginHorizontal: responsiveWidth(2.8),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(192,85,181,255)',
  },
  // searchContainer: {
  //   marginTop: responsiveHeight(5),
  //   flexDirection: 'row',
  //   borderWidth: 2,
  //   borderColor: 'lightgrey',
  //   marginHorizontal: responsiveWidth(3),
  //   borderRadius: responsiveWidth(25),
  //   backgroundColor: '#E5E5E5',
  // },
  // searchTextInput: {
  //   flex: 0.97,
  //   paddingLeft: responsiveWidth(2),
  // },
  // searchIcon: {
  //   alignSelf: 'center',
  //   marginLeft: responsiveWidth(5),
  // },
  parentView: {
    flexDirection: 'row',
    // paddingTop: responsiveHeight(3),
    marginTop: responsiveHeight(18),
    marginBottom: responsiveHeight(3),
    justifyContent: 'center',
  },
  DiscriptionText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(8),
  },
  homeText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(4),
    textAlign: 'center',
  },
});
export default Home;
