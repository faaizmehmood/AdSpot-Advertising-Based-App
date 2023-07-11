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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {routeNames} from '../navigation/config';
import {images} from '../assets/images';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ShowAllUsers = props => {
  const [documentList, setDocumentList] = useState([]);

  useEffect(() => {
    fetchingPackages();
  }, []);

  const onGoToHomeScreen = () => {
    props.navigation.navigate(routeNames.SignIn);
  };

  const fetchingPackages = async () => {
    try {
      const collectionRef = firestore().collection('user');
      const querySnapshot = await collectionRef.get();

      const documents = [];
      querySnapshot.forEach(documentSnapshot => {
        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          documents.push(data);
        }
      });

      setDocumentList(documents);
    } catch (error) {
      console.log('Error fetching documents:', error);
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
              <FontAwesomeIcon
                name="users"
                size={35}
                style={{
                  color: 'white',
                  marginHorizontal: responsiveWidth(2),
                }}
              />
              <Text style={styles.homeText}>User Details</Text>
            </View>
            <Text style={styles.DiscriptionText}>
              Package Details are as under here
            </Text>
            {documentList.length > 0 ? (
              <View style={styles.detailContainer}>
                {documentList.map((document, index) => (
                  <View key={index} style={{width: '100%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text style={styles.detailText}>User Name:</Text>
                      <Text style={styles.detailTextPre}>{document.name}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text style={styles.detailText}>User Email:</Text>
                      <Text style={styles.detailTextPre}>{document.email}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.detailText}>User phone Number:</Text>
                      <Text style={styles.detailTextPre}>
                        {document.phonenumber}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  color: '#e6567b',
                  marginLeft: responsiveWidth(3),
                }}>
                Loading document...
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.pkgContainer}
            onPress={fetchingPackages}>
            <Text style={styles.pkgText}>Show All Users</Text>
            <FontAwesomeIcon
              name="user-plus"
              size={23}
              color="white"
              style={styles.usericonStartEndButtonStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextContainer}
            onPress={onGoToHomeScreen}>
            <Text style={styles.pkgText}>Logout</Text>
            <MaterialIcon
              name="logout"
              size={30}
              color="white"
              style={styles.usericonStartNextButtonStyle}
            />
          </TouchableOpacity>
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
    marginLeft: responsiveWidth(2),
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
    color: '#e6567b',
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
    backgroundColor: 'rgba(117,84,123,255)',
  },
  nextContainer: {
    width: '45%',
    marginVertical: responsiveWidth(5),
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
    color: 'white',

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
    marginTop: responsiveHeight(8),
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
export default ShowAllUsers;
