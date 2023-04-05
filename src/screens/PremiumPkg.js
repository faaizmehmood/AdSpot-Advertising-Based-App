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
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from './Permission';
import storage from '@react-native-firebase/storage';

const PremiumPkg = () => {
  const [image, setImage] = React.useState(null);
  const [video, setVideo] = React.useState(null);
  const [loadingIndicator, setLoadingIndicator] = React.useState(false);

  const onSelectImg = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS === 'android') {
      Alert.alert('Alert', 'Choose an option', [
        {text: 'Cancel', onPress: () => {}},
        // {text: 'Select Video', onPress: onVideogallary},
        {text: 'Select Picture', onPress: onCameraGallery},
      ]);
    }
  };

  const onVideogallary = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log(video);
      const videoUri = Platform.OS === 'android' ? video.path : video.sourceURL;
      setVideo(videoUri);
    });
  };

  const onCameraGallery = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: false,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'android' ? image.path : image.sourceURL;
      setImage(imageUri);
    });
  };

  const uploadToFirebase = async () => {
    const uploadUriImage = image;
    const uploadUriVideo = video;
    let fileNameImage = uploadUriImage.substring(
      uploadUriImage.lastIndexOf('/') + 1,
    );
    // let fileNameVideo = uploadUriVideo.substring(
    //   uploadUriVideo.lastIndexOf('/') + 1,
    // );
    setLoadingIndicator(true);
    try {
      // await storage().ref(fileNameVideo).putFile(uploadUriVideo);
      await storage().ref(fileNameImage).putFile(uploadUriImage);
      setLoadingIndicator(false);
      Alert.alert(
        'Image uploaded',
        'Your Image has been uploaded sucessfully.',
      );
    } catch (e) {
      // Alert.alert('Video uploaded', 'Your Video has been uploaded sucessfully');
      console.log(e);
    }
    setImage(null);
    // setVideo(null);
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
              style={{color: 'red', marginHorizontal: responsiveWidth(2)}}
            />
            <Text style={styles.homeText}>Premium Categories</Text>
          </View>
          <View style={styles.pkgContainer}>
            <Text style={styles.pkgText}>Time: 6:00pm to 9:00pm</Text>
          </View>
          <View style={styles.pkgContainer}>
            <Text style={styles.pkgText}>Price: 40000</Text>
          </View>
          <View style={styles.pkgContainer}>
            <Text style={styles.pkgText}>Duration: Per Hour </Text>
          </View>
          <TouchableOpacity style={styles.pkgContainer} onPress={onSelectImg}>
            <Text style={styles.pkgText}>Upload Picture</Text>
            {image !== null ? <Image source={{uri: image}} /> : null}
            {/* {video !== null ? <Image source={{uri: video}} /> : null} */}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextContainer}
            onPress={uploadToFirebase}>
            <Text style={styles.nextText}>Next</Text>
            {loadingIndicator ? (
              <ActivityIndicator
                size={responsiveWidth(7)}
                color="#fb246b"
                style={{marginLeft: responsiveWidth(2)}}
              />
            ) : null}
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
    backgroundColor: '#fb246b',
    borderWidth: 2,
    borderColor: 'red',
  },
  nextContainer: {
    // width: '100%',
    marginVertical: responsiveWidth(6),
    marginHorizontal: responsiveWidth(28),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  parentView: {
    flexDirection: 'row',
    marginTop: responsiveHeight(18),
    marginBottom: responsiveHeight(8),

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
    color: '#fb246b',
  },
});

export default PremiumPkg;
