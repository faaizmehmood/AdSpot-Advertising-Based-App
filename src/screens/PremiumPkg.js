import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {images} from '../assets/images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UploadIcon from 'react-native-vector-icons/Octicons';
import Selecticon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from './Permission';
import storage from '@react-native-firebase/storage';
import {routeNames} from '../navigation/config';

const PremiumPkg = props => {
  const [image, setImage] = React.useState(null);
  const [loadingIndicator, setLoadingIndicator] = React.useState(false);

  const onGoToPremiumSummaryScreen = () => {
    props.navigation.navigate(routeNames.PremiumSummary);
  };

  const uploadPic_VideoChoice = () => {
    Alert.alert('Select', 'Choose an option', [
      {text: 'Cancel', onPress: () => {}},
      {text: 'Select Picture / Video', onPress: onSelectImg},
    ]);
  };

  const onSelectImg = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS === 'android') {
      //Selecting a Image with Alert

      // Alert.alert('Alert', 'Choose an option', [
      //   {text: 'Cancel', onPress: () => {}},
      //   // {text: 'Select Video', onPress: onVideogallary},
      //   {text: 'Select Picture / Video', onPress: onCameraGallery},
      // ]);

      //Selecting a Image / Video without Alert
      ImagePicker.openPicker({
        width: 1200,
        height: 780,
        // multiple:true
      }).then(image => {
        console.log(image);
        const imageUri =
          Platform.OS === 'android' ? image.path : image.sourceURL;
        setImage(imageUri);
      });
    }
  };

  //For Uploading Video
  // const onVideogallary = () => {
  //   ImagePicker.openPicker({
  //     mediaType: 'video',
  //   }).then(video => {
  //     console.log(video);
  //     const videoUri = Platform.OS === 'android' ? video.path : video.sourceURL;
  //     setVideo(videoUri);
  //   });
  // };

  //Selecting a Image with Alert using function
  // const onCameraGallery = () => {};

  const uploadFirebaseChoice = () => {
    Alert.alert('Upload', 'Choose an option', [
      {text: 'Cancel', onPress: () => {}},
      {text: 'Upload Picture / Video', onPress: uploadToFirebase},
    ]);
  };

  const uploadToFirebase = async () => {
    const uploadUriImage = image;
    let fileNameImage = uploadUriImage.substring(
      uploadUriImage.lastIndexOf('/') + 1,
    );
    setLoadingIndicator(true);
    try {
      await storage().ref(fileNameImage).putFile(uploadUriImage);
      Alert.alert(
        'Image or Video uploaded',
        'Your Image or Video has been uploaded sucessfully.',
      );
      setLoadingIndicator(false);
    } catch (e) {
      console.log(e);
    }
    setImage(null);
  };

  return (
    <SafeAreaView style={styles.f1}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <ImageBackground
          source={images.splash_Full}
          style={styles.splash_Img_Edit}>
          <View style={styles.parentView}>
            <MaterialIcons
              name="category"
              size={35}
              style={{color: 'white', marginHorizontal: responsiveWidth(2)}}
            />
            <Text style={styles.homeText}>Premium Categories</Text>
          </View>

          <Text style={styles.DiscriptionText}>
            Select your Picture / Video and then Upload it
          </Text>
          <View style={styles.pkgContainer}>
            <Text style={styles.pkgText}>Time: 6:00pm to 9:00pm</Text>
          </View>
          <View style={styles.pkgContainer}>
            <Text style={styles.pkgText}>Price: 1500000</Text>
          </View>
          <View style={styles.pkgContainer}>
            <Text style={styles.pkgText}>Duration: Per Hour </Text>
          </View>
          <TouchableOpacity
            style={styles.pkgSelectUploadContainer}
            onPress={uploadPic_VideoChoice}>
            <Text style={styles.pkgText}>Select Picture / Video</Text>
            <Selecticon
              name="select1"
              size={25}
              style={{color: 'white', marginHorizontal: responsiveWidth(3)}}
            />
            {image !== null ? <Image source={{uri: image}} /> : null}
            {/* {video !== null ? <Image source={{uri: video}} /> : null} */}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pkgSelectUploadContainer}
            onPress={uploadFirebaseChoice}>
            <Text style={styles.pkgText}>Upload Picture / Video</Text>
            {loadingIndicator ? (
              <ActivityIndicator
                size={responsiveWidth(7)}
                color="white"
                style={{marginLeft: responsiveWidth(2)}}
              />
            ) : (
              <UploadIcon
                name="upload"
                size={25}
                style={{color: 'white', marginHorizontal: responsiveWidth(3)}}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextContainer}
            onPress={onGoToPremiumSummaryScreen}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
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
  DiscriptionText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginTop: responsiveHeight(3),
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(3.6),
  },
  pkgText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.5),
    color: 'white',
  },
  pkgContainer: {
    // width: '100%',
    marginVertical: responsiveWidth(4),
    marginHorizontal: responsiveWidth(2.8),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(192,85,181,255)',
  },
  pkgSelectUploadContainer: {
    // width: '100%',
    marginVertical: responsiveWidth(4),
    marginHorizontal: responsiveWidth(2.8),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(117,84,123,255)',
  },
  nextContainer: {
    // width: '100%',
    marginVertical: responsiveWidth(5),
    marginHorizontal: responsiveWidth(28),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(117,84,123,255)',
  },
  parentView: {
    flexDirection: 'row',
    marginTop: responsiveHeight(12),
    justifyContent: 'center',
  },
  homeText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(3.5),
    textAlign: 'center',
  },
  nextText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.5),
    color: '#ffff',
  },
});

export default PremiumPkg;
