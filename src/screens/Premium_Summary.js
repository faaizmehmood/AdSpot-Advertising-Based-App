import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import HistoryIcon from 'react-native-vector-icons/MaterialIcons';
import {routeNames} from '../navigation/config';
import {images} from '../assets/images';

const PremiumSummary = props => {
  const onGoToHomeScreen = () => {
    Alert.alert('Ad Confirmation', 'Are you sure want to post your Ad.', [
      {
        text: 'No',
        onPress: () => {
          Alert.alert('Your Ad has been rejected.');
        },
      },
      {
        text: 'Yes',
        onPress: () => {
          Alert.alert('Your Ad has been sucessfully posted.');
          props.navigation.navigate(routeNames.Home);
        },
      },
    ]);
  };

  const paymentCheck = () => {
    Alert.alert(
      'Payment Confirmation',
      'Are you sure want to confirm your payment.',
      [
        {
          text: 'No',
          onPress: () => {
            Alert.alert('Your payemnt has been cancelled.');
          },
        },
        {
          text: 'Yes',
          onPress: () => {
            Alert.alert('Your payment has been sucessfully recieved.');
          },
        },
      ],
    );
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
            {/* <View style={styles.searchContainer}>
              <FeatherIcon
                name="search"
                size={21}
                color="#9FA5C0"
                style={styles.searchIcon}
              />
              <TextInput placeholder="Search" style={styles.searchTextInput} />
            </View> */}
            <View style={styles.parentView}>
              <HistoryIcon
                name="history"
                size={35}
                style={{color: 'white', marginHorizontal: responsiveWidth(2)}}
              />
              <Text style={styles.homeText}>Package Details</Text>
            </View>
            <Text style={styles.DiscriptionText}>
              Premium Package Details are as under here
            </Text>
            <View style={styles.detailContainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.detailText}>Package Name:</Text>
                <Text style={styles.detailTextPre}>Premium</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.detailText}>Package Price:</Text>
                <Text style={styles.detailTextPre}>1500000</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.detailText}>Package Time:</Text>
                <Text style={styles.detailTextPre}>6:00pm to 9:00pm</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.detailText}>Package Duration:</Text>
                <Text style={styles.detailTextPre}>Per Hour</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.detailText}>Package location:</Text>
                <Text style={styles.detailTextPre}>Kachari Chowk</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.pkgContainer}
              onPress={paymentCheck}>
              <Text style={styles.pkgText}>Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.finishContainer}
              onPress={onGoToHomeScreen}>
              <Text style={styles.pkgText}>Finish</Text>
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
  detailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.3),
    color: 'white',
  },
  pkgContainer: {
    // width: '100%',
    marginTop: responsiveHeight(12),
    marginHorizontal: responsiveWidth(2.8),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fb246b',
  },
  finishContainer: {
    // width: '100%',
    marginVertical: responsiveWidth(5),
    marginTop: responsiveHeight(7),
    marginHorizontal: responsiveWidth(2.8),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fb246b',
  },
  detailTextPre: {
    marginLeft: responsiveWidth(3),
    color: '#fb246b',
    fontSize: responsiveFontSize(2.5),
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
    marginBottom: responsiveHeight(15),
  },
  homeText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(4),
    textAlign: 'center',
  },
});
export default PremiumSummary;
