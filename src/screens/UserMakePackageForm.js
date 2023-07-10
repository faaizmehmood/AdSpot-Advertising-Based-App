import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {images} from '../assets/images';
import {routeNames} from '../navigation/config';
import {Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UploadIcon from 'react-native-vector-icons/Octicons';
import Selecticon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from './Permission';
import storage from '@react-native-firebase/storage';

const inputLabel = {
  packageStartDate: 'packageStartDate',
  packageEndDate: 'packageEndDate',
  packageName: 'packageNamee',
  packagePrice: 'packagePrice',
  location: 'location',
};

const UserMakePackageForm = props => {
  const [inputFocus, setInputFocus] = React.useState('');

  const [packageName, setPackageName] = React.useState('');
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [errorName, setErrorName] = React.useState('');

  const [location, setLocation] = React.useState('');

  const [isLocationValid, setIsLocationValid] = React.useState(true);
  const [errorLocation, setErrorLocation] = React.useState('');

  const [packagePrice, setPackagePrice] = React.useState('');

  const [isPhonenumberValid, setIsPhonenumberValid] = React.useState(true);
  const [errorPhonenumber, setErrorPhonenumber] = React.useState('');

  const [loadingIndicator, setLoadingIndicator] = React.useState(false);
  const [loadingIndicatorImgVid, setLoadingIndicatorImgVid] =
    React.useState(false);

  const [showEndTimePicker, setShowEndTimePicker] = React.useState(false);
  const [selectedEndTime, setSelectedEndTime] = React.useState('');
  const [endTimemode, setEndTimemode] = React.useState('time');

  const [showStartTimePicker, setShowStartTimePicker] = React.useState(false);
  const [selectedStartTime, setSelectedStartTime] = React.useState('');
  const [startTimemode, setStartTimemode] = React.useState('time');

  const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
  const [selectedStartDate, setSelectedStartDate] = React.useState('');
  const [startDatemode, setStartDatemode] = React.useState('date');

  const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);
  const [selectedEndDate, setSelectedEndDate] = React.useState('');
  const [endDatemode, setEndDatemode] = React.useState('date');

  const [date, setDate] = React.useState(new Date());

  const [image, setImage] = React.useState(null);

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
    setLoadingIndicatorImgVid(true);
    try {
      await storage().ref(fileNameImage).putFile(uploadUriImage);
      Alert.alert(
        'Image or Video uploaded',
        'Your Image or Video has been uploaded sucessfully.',
      );
      setLoadingIndicatorImgVid(false);
    } catch (e) {
      console.log(e);
    }
    setImage(null);
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

  const showStartMode = mode => {
    if (mode === 'time') {
      setShowStartTimePicker(true);
    } else if (mode === 'date') {
      setShowStartDatePicker(true);
    }
  };

  const showEndMode = mode => {
    if (mode === 'time') {
      setShowEndTimePicker(true);
    } else if (mode === 'date') {
      setShowEndDatePicker(true);
    }
  };

  const onChangeStartTime = (event, selectedTime) => {
    setShowStartTimePicker(false); // Hide the start time picker
    if (selectedTime) {
      const currentTime = selectedTime || date;
      setDate(currentTime);
      let tempTime = new Date(currentTime);
      let hours = tempTime.getHours();
      let minutes = tempTime.getMinutes();
      let amOrPm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      let formattedHours = hours < 10 ? '0' + hours : hours;
      let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      let formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
      setSelectedStartTime(formattedTime);
      console.log(formattedTime);
    }
  };

  const onChangeStartDate = (event, selectedDate) => {
    setShowStartDatePicker(false); // Hide the start time picker
    if (selectedDate) {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      let tempDate = new Date(currentDate);
      let fDate =
        tempDate.getDate() +
        '/' +
        (tempDate.getMonth() + 1) +
        '/' +
        tempDate.getFullYear();
      setSelectedStartDate(fDate);
      console.log(fDate);
    }
  };
  const onChangeEndDate = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      let tempDate = new Date(currentDate);
      let fDate =
        tempDate.getDate() +
        '/' +
        (tempDate.getMonth() + 1) +
        '/' +
        tempDate.getFullYear();
      setSelectedEndDate(fDate);
      console.log(fDate);
    }
  };

  const onChangeEndTime = (event, selectedTime) => {
    setShowEndTimePicker(false); // Hide the end time picker
    if (selectedTime) {
      const currentTime = selectedTime || date;
      setDate(currentTime);
      let tempTime = new Date(currentTime);
      let hours = tempTime.getHours();
      let minutes = tempTime.getMinutes();
      let amOrPm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      let formattedHours = hours < 10 ? '0' + hours : hours;
      let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      let formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
      setSelectedEndTime(formattedTime);
      console.log(formattedTime);
    }
  };

  const onChangePackageName = text => {
    if (text.trim() === '') {
      setIsNameValid(false);
      setErrorName('Package Name is empty.');
    } else {
      setIsNameValid(true);
      setErrorName('');
    }

    setPackageName(text);
  };

  const onChangeLocation = text => {
    if (text.trim() === '') {
      setIsLocationValid(false);
      setErrorLocation('Package Location is empty.');
    } else {
      setIsLocationValid(true);
      setErrorLocation('');
    }

    setLocation(text);
  };

  const onChangePackagePrice = text => {
    if (text.trim() === '') {
      setIsPhonenumberValid(false);
      setErrorPhonenumber('Package Price is empty.');
    } else if (text.length < 5) {
      setIsPhonenumberValid(false);
      setErrorPhonenumber('Package Price must be 5 characters long.');
    } else if (text.length > 7) {
      setIsPhonenumberValid(false);
      setErrorPhonenumber('Package Price must be in a given range.');
    } else {
      setIsPhonenumberValid(true);
      setErrorPhonenumber('');
    }
    setPackagePrice(text);
  };

  const onInputFocus =
    (input = '') =>
    () => {
      setInputFocus(input);
    };
  const onBlurInput = () => {
    setInputFocus('');
  };

  const onUserMakePackageFormPress = async () => {
    Keyboard.dismiss();
    if (packageName.trim() === '') {
      setIsNameValid(false);
      setErrorName('Package Name is empty.');
    } else if (location.trim() === '') {
      setIsLocationValid(false);
      setErrorLocation('Package location is empty.');
    } else if (packagePrice.trim() === '') {
      setIsPhonenumberValid(false);
      setErrorPhonenumber('Package Price is empty.');
    } else if (packagePrice.length < 5) {
      setIsPhonenumberValid(false);
      setErrorPhonenumber('Package Price must be 5 characters long.');
    } else if (packagePrice.length > 7) {
      setIsPhonenumberValid(false);
      setErrorPhonenumber('Package Price must be in a given range.');
    } else {
      const user = auth().currentUser;
      if (user) {
        const userCred = user.uid;
        console.log('User UID: ', userCred);
        try {
          firestore().collection('UserPackageInfo').doc(userCred).set({
            packageName,
            startTime: selectedStartTime,
            startDate: selectedStartDate,
            location,
            packagePrice,
            endTime: selectedEndTime,
            endDate: selectedEndDate,
          });
          Alert.alert('Select', 'Are you sure to create a package?', [
            {
              text: 'Cancel',
              onPress: () => {
                alert('Package cannot be created!');
                setLoadingIndicator(false);
              },
            },
            {
              text: 'OK',
              onPress: () => {
                alert('Package has been created Sucessfully!');
                setLoadingIndicator(false);
                props.navigation.navigate(routeNames.Home);
              },
            },
          ]);
          setLoadingIndicator(true);
          console.log(user);
        } catch (err) {
          alert('User Info cannot be enterred!');
          setLoadingIndicator(false);
          console.log(err);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.f1}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: '#111110'}}
        keyboardShouldPersistTaps="handled">
        <ImageBackground
          source={images.splash_Full}
          style={styles.splash_Img_Edit}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.pleaseText}>
            Please enter your Package details here
          </Text>
          <View style={styles.inputContianer}>
            <View
              style={[
                styles.nameView,
                !isNameValid ? {borderWidth: 2.7, borderColor: 'red'} : {},
                inputFocus === inputLabel.packageName
                  ? {
                      borderWidth: 2.7,
                      borderColor: !isNameValid ? 'red' : '#1FCC79',
                    }
                  : {},
              ]}>
              <FeatherIcon
                name="package"
                size={24}
                style={styles.usericonStyle}
              />
              <TextInput
                onFocus={onInputFocus(inputLabel.packageName)}
                onBlur={onBlurInput}
                value={packageName}
                placeholder="Package Name"
                style={styles.textstyle}
                onChangeText={onChangePackageName}
              />
            </View>
            {!isNameValid ? (
              <Text style={styles.errorTextEdit}>{errorName}</Text>
            ) : null}
            <View
              style={[
                styles.nameView,
                !isLocationValid ? {borderWidth: 2.7, borderColor: 'red'} : {},
                inputFocus === inputLabel.location
                  ? {
                      borderWidth: 2.7,
                      borderColor: !isLocationValid ? 'red' : '#1FCC79',
                    }
                  : {},
              ]}>
              <FeatherIcon
                name="package"
                size={24}
                style={styles.usericonStyle}
              />
              <TextInput
                onFocus={onInputFocus(inputLabel.location)}
                onBlur={onBlurInput}
                value={location}
                placeholder="Package Location"
                style={styles.textstyle}
                onChangeText={onChangeLocation}
              />
            </View>
            {!isLocationValid ? (
              <Text style={styles.errorTextEdit}>{errorLocation}</Text>
            ) : null}
            <View
              style={[
                styles.nameView,
                !isPhonenumberValid
                  ? {borderWidth: 2.7, borderColor: 'red'}
                  : {},
                inputFocus === inputLabel.packagePrice
                  ? {
                      borderWidth: 2.7,
                      borderColor: !isPhonenumberValid ? 'red' : '#1FCC79',
                    }
                  : {},
              ]}>
              <FeatherIcon
                name="package"
                size={24}
                style={styles.usericonStyle}
              />
              <TextInput
                onFocus={onInputFocus(inputLabel.packagePrice)}
                onBlur={onBlurInput}
                value={packagePrice}
                keyboardType="decimal-pad"
                placeholder="Package Price"
                style={styles.textstyle}
                onChangeText={onChangePackagePrice}
              />
            </View>
            {!isPhonenumberValid ? (
              <Text style={styles.errorTextEdit}>{errorPhonenumber}</Text>
            ) : null}
            <View style={styles.timeDateView}>
              <View style={styles.bottomStartViewFlex}>
                <TouchableOpacity
                  style={[styles.buttonStartContainer]}
                  onPress={() => showStartMode('time')}>
                  <IonicIcon
                    name="time-outline"
                    size={24}
                    color="white"
                    style={styles.usericonStartEndButtonStyle}
                  />
                  <Text style={[styles.loginStartText]}>Start time</Text>
                </TouchableOpacity>
              </View>
              {showStartTimePicker && (
                <DateTimePicker
                  testID="StartTimePicker"
                  value={date}
                  mode={startTimemode}
                  is24Hour={false}
                  display="default"
                  onChange={onChangeStartTime}
                />
              )}
              <View style={styles.bottomStartViewFlex}>
                <TouchableOpacity
                  style={[styles.buttonStartContainer]}
                  onPress={() => showEndMode('time')}>
                  <IonicIcon
                    name="time-outline"
                    size={24}
                    color="white"
                    style={styles.usericonStartEndButtonStyle}
                  />
                  <Text style={[styles.loginStartText]}>End time</Text>
                </TouchableOpacity>
              </View>

              {showEndTimePicker && (
                <DateTimePicker
                  testID="EndTimePicker"
                  value={date}
                  mode={endTimemode}
                  is24Hour={false}
                  display="default"
                  onChange={onChangeEndTime}
                />
              )}
            </View>
            <View style={styles.timeDateEndView}>
              <View style={styles.bottomEndViewFlex}>
                <TouchableOpacity
                  style={[styles.buttonEndContainer]}
                  onPress={() => showStartMode('date')}>
                  <FeatherIcon
                    name="calendar"
                    size={21}
                    color="white"
                    style={styles.usericonStartEndButtonStyle}
                  />
                  <Text style={[styles.loginEndText]}>Start Date</Text>
                </TouchableOpacity>
              </View>
              {showStartDatePicker && (
                <DateTimePicker
                  testID="StartDatePicker"
                  value={date}
                  mode={startDatemode}
                  is24Hour={false}
                  display="default"
                  onChange={onChangeStartDate}
                />
              )}
              <View style={styles.bottomEndViewFlex}>
                <TouchableOpacity
                  style={[styles.buttonEndContainer]}
                  onPress={() => showEndMode('date')}>
                  <FeatherIcon
                    name="calendar"
                    size={21}
                    color="white"
                    style={styles.usericonStartEndButtonStyle}
                  />
                  <Text style={[styles.loginEndText]}>End Date</Text>
                </TouchableOpacity>
              </View>
              {showEndDatePicker && (
                <DateTimePicker
                  testID="StartDatePicker"
                  value={date}
                  mode={endDatemode}
                  is24Hour={false}
                  display="default"
                  onChange={onChangeEndDate}
                />
              )}
            </View>

            <TouchableOpacity
              style={styles.pkgContainer}
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
              style={styles.pkgUploadContainer}
              onPress={uploadFirebaseChoice}>
              <Text style={styles.pkgText}>Upload Picture / Video</Text>
              {loadingIndicatorImgVid ? (
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
              style={styles.pkgPaymentContainer}
              onPress={paymentCheck}>
              <Text style={styles.pkgText}>Payment</Text>
              <MaterialIcons
                name="payment"
                size={25}
                style={{color: 'white', marginHorizontal: responsiveWidth(1.5)}}
              />
            </TouchableOpacity>

            <View style={styles.bottomViewFlex}>
              <TouchableOpacity
                style={[
                  loadingIndicator
                    ? styles.loginTextContainer
                    : styles.buttonContainer,
                ]}
                onPress={onUserMakePackageFormPress}
                disabled={loadingIndicator}>
                <Text
                  style={[
                    loadingIndicator
                      ? styles.disabledLoginText
                      : styles.loginText,
                  ]}>
                  Create Package
                </Text>
                {loadingIndicator ? (
                  <ActivityIndicator
                    size={responsiveWidth(7)}
                    color="rgba(192,85,181,255)"
                    style={styles.activityIndicatorStyle}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pkgContainer: {
    width: '79%',
    marginVertical: responsiveWidth(4),
    marginHorizontal: responsiveWidth(12),
    paddingVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(195,85,175,255)',
  },
  pkgPaymentContainer: {
    width: '45%',
    marginVertical: responsiveWidth(4),
    marginHorizontal: responsiveWidth(26),
    paddingVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(195,85,175,255)',
  },
  pkgUploadContainer: {
    width: '79%',
    marginHorizontal: responsiveWidth(12),
    paddingVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(196,84,173,255)',
  },
  pkgText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.3),
    color: 'white',
  },
  activityIndicatorStyle: {
    marginLeft: responsiveWidth(3),
  },
  f1: {flex: 1},
  splash_Img_Edit: {
    height: responsiveWidth(215),
  },
  welcomeText: {
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    color: 'white',
    fontSize: responsiveFontSize(3),
    marginTop: responsiveHeight(9),
  },
  pleaseText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    paddingTop: responsiveHeight(1.5),
    fontSize: responsiveFontSize(2),
  },
  timeDateView: {
    flexDirection: 'row',
    marginTop: responsiveHeight(2.5),
    height: '12%',
  },
  timeDateEndView: {
    flexDirection: 'row',
    // height: '12%',
  },
  inputContianer: {
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(2.8),
    flex: 1,
  },
  inputWrapperEmail: {
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
    flexDirection: 'row',
    borderWidth: responsiveWidth(1),
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: responsiveWidth(50) / 2,
  },
  emailView: {
    flex: 1,
  },
  emailIcon: {
    marginHorizontal: responsiveWidth(1.7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapperPass: {
    flexDirection: 'row',
    borderWidth: responsiveWidth(1),
    borderColor: 'white',
    backgroundColor: 'white',
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(25),
  },
  lockIcon: {
    alignSelf: 'center',
    marginLeft: responsiveWidth(4),
    marginRight: responsiveWidth(1),
  },
  passwdView: {
    flex: 1,
  },
  eyeIcon: {
    flex: 0.1,
    marginRight: responsiveWidth(3),
    alignSelf: 'center',
  },
  imageViewContainer: {
    flexDirection: 'row',
  },
  bottomImageViewContainer: {
    flexDirection: 'row',
  },
  checkImage: {
    marginTop: responsiveHeight(2),
    height: responsiveWidth(7.5),
    width: responsiveWidth(7.5),
  },
  bottomText: {
    fontFamily: 'Inter-Medium',
    marginTop: responsiveHeight(2.7),
    marginLeft: responsiveWidth(2),
    textAlign: 'left',
  },
  PasswordbottomText: {
    fontFamily: 'Inter-Medium',
    marginTop: responsiveHeight(2.7),
    marginRight: responsiveWidth(4),
    textAlign: 'left',
    color: 'white',
  },
  bottomViewFlex: {
    // marginTop: responsiveHeight(2),
  },
  bottomStartViewFlex: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomEndViewFlex: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fc2469',
    backgroundColor: 'rgba(117,84,123,255)',
  },
  buttonStartContainer: {
    width: '89%',
    paddingVertical: responsiveHeight(1.3),
    borderRadius: responsiveWidth(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(192,85,181,255)',
  },
  buttonEndContainer: {
    width: '89%',
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.3),
    borderRadius: responsiveWidth(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(117,84,123,255)',
  },
  loginTextContainer: {
    width: '100%',
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.7,
    borderColor: 'rgba(192,85,181,255)',
  },
  loginText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.7),
    color: 'white',
  },
  loginStartText: {
    marginLeft: responsiveWidth(-0.8),
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.5),
    color: 'white',
  },
  loginEndText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.5),
    color: 'white',
  },
  disabledLoginText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.7),
    color: 'rgba(192,85,181,255)',
  },
  errorTextEdit: {
    color: 'red',
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(1.2),
  },
  nameView: {
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: responsiveWidth(1),
    borderColor: 'white',
  },
  textstyle: {
    flex: 0.95,
  },
  usericonStyle: {
    marginLeft: responsiveWidth(4),
    alignSelf: 'center',
  },
  usericonButtonStyle: {
    marginLeft: responsiveWidth(4),
    marginRight: responsiveWidth(2),
    alignSelf: 'center',
  },
  usericonStartEndButtonStyle: {
    // marginLeft: responsiveWidth(4),
    marginRight: responsiveWidth(2),
    alignSelf: 'center',
  },
  phoneiconStyle: {
    marginRight: responsiveWidth(1),
    marginLeft: responsiveWidth(3),
    alignSelf: 'center',
  },
});

export default UserMakePackageForm;
