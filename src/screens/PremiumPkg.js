import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Images,
  ImageBackground,
  Platform,
  Alert,
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

const PremiumPkg = () => {
  const onSelectImg = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS === 'android') {
      Alert.alert('Alert', 'Choose an option', [
        {text: 'Cancel', onPress: () => {}},
        {text: 'Select Video', onPress: onVideogallary},
        {text: 'Select Picture', onPress: onCameraGallery},
      ]);
    }
  };

  const onVideogallary = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log(video);
    });
  };

  const onCameraGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    }).then(image => {
      console.log(image);
    });
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
              style={{color: 'red', marginHorizental: responsiveWidth(2)}}
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
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextContainer}
            // onPress={onGoToSelectPkgScreen}
          >
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
