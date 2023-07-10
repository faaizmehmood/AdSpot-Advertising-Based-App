import React, {useEffect, useState} from 'react';
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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {routeNames} from '../navigation/config';
import {images} from '../assets/images';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ShowPackages = props => {
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    fetchingPackages();
  }, []);

  const onGoToHomeScreen = () => {
    props.navigation.navigate(routeNames.Home);
    // Alert.alert('Ad Confirmation', 'Are you sure want to post your Ad.', [
    //   {
    //     text: 'No',
    //     onPress: () => {
    //       Alert.alert('Your Ad has been rejected.');
    //     },
    //   },
    //   {
    //     text: 'Yes',
    //     onPress: () => {
    //       Alert.alert('Your Ad has been sucessfully posted.');
    //     },
    //   },
    // ]);
  };

  const fetchingPackages = async () => {
    try {
      const documentRef = firestore()
        .collection('UserPackageInfo')
        .doc(auth().currentUser.uid);
      const documentSnapshot = await documentRef.get();

      if (documentSnapshot.exists) {
        // Document exists, retrieve the data
        const data = documentSnapshot.data();
        setDocumentData(data);
      } else {
        // Document does not exist
        console.log('Document does not exist');
      }
    } catch (error) {
      console.log('Error fetching document:', error);
    }
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
              <HistoryIcon
                name="history"
                size={35}
                style={{color: 'white', marginHorizontal: responsiveWidth(2)}}
              />
              <Text style={styles.homeText}>Package Details</Text>
            </View>
            <Text style={styles.DiscriptionText}>
              Package Details are as under here
            </Text>
            {documentData ? (
              <View style={styles.detailContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.detailText}>Package Name:</Text>
                  <Text style={styles.detailTextPre}>
                    {documentData.packageName}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.detailText}>Package Price:</Text>
                  <Text style={styles.detailTextPre}>
                    {documentData.packagePrice}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.detailText}>Package Start Time:</Text>
                  <Text style={styles.detailTextPre}>
                    {documentData.startTime}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.detailText}>Package End Time:</Text>
                  <Text style={styles.detailTextPre}>
                    {documentData.endTime}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.detailText}>Package Start Date:</Text>
                  <Text style={styles.detailTextPre}>
                    {documentData.startDate}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.detailText}>Package End Date:</Text>
                  <Text style={styles.detailTextPre}>
                    {documentData.endDate}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.detailText}>Package Location:</Text>
                  <Text style={styles.detailTextPre}>
                    {documentData.location}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={[styles.detailTextPre, {textAlign: 'center'}]}>
                Loading document...
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.pkgContainer}
            onPress={fetchingPackages}>
            <Text style={styles.pkgText}>Show My Package</Text>
            <MaterialCommunityIcon
              name="package-down"
              size={26}
              color="white"
              style={styles.usericonStartEndButtonStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextContainer}
            onPress={onGoToHomeScreen}>
            <Text style={styles.pkgText}>Next</Text>
            <MaterialIcon
              name="navigate-next"
              size={30}
              color="white"
              style={styles.usericonStartNextButtonStyle}
            />
          </TouchableOpacity>
          {/* </View> */}
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
  usericonStartEndButtonStyle: {
    marginLeft: responsiveWidth(2),
    alignSelf: 'center',
  },
  usericonStartNextButtonStyle: {
    marginLeft: responsiveWidth(-1),
    alignSelf: 'center',
  },
  detailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(-2.5),
  },
  detailText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.3),
    color: 'white',
  },
  pkgContainer: {
    width: '90%',
    marginTop: responsiveHeight(5),
    marginHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fb246b',
    backgroundColor: 'rgba(117,84,123,255)',
  },
  nextContainer: {
    width: '45%',
    marginVertical: responsiveWidth(30),
    marginHorizontal: responsiveWidth(28),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(192,85,181,255)',
    // backgroundColor: '#fb246b',
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
    marginBottom: responsiveHeight(8),
  },
  homeText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(4),
    textAlign: 'center',
  },
});
export default ShowPackages;
