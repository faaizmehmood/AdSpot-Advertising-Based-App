import React, {useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FontIcon from 'react-native-vector-icons/Fontisto';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {images} from '../assets/images';
import {AuthContext} from '../context/AuthContext';
import {LocalStorageKeys} from '../constants';

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;
const passwordNumberRgx = /(?=.*[0-9])/;
const phoneNumberRegex = /^[0-9]{11}$/;

const inputLabel = {
  email: 'email',
  password: 'password',
  name: 'name',
  phoneNumber: 'phoneNumber',
};

const SignUp = () => {
  const [email, setEmail] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [errorEmail, setErrorEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [errorPassword, setErrorPassword] = React.useState('');
  const [passwordShown, setPasswordShown] = React.useState(true);
  const [inputFocus, setInputFocus] = React.useState('');
  const [checkCharacter, setCheckCharacter] = React.useState(true);
  const [checkNumber, setCheckNumber] = React.useState(true);
  const [name, setName] = React.useState('');
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [errorName, setErrorName] = React.useState('');
  const [phonenumber, setPhonenumber] = React.useState('');
  const [isPhonenumberValid, setIsPhonenumberValid] = React.useState(true);
  const [errorPhonenumber, setErrorPhonenumber] = React.useState('');
  const [loadingIndicator, setLoadingIndicator] = React.useState(false);

  const {setLoggedIn} = useContext(AuthContext);

  const onChangeEmail = text => {
    if (emailRegex.test(text)) {
      setIsEmailValid(true);
      setErrorEmail('');
    } else if (text.trim() === '') {
      setIsEmailValid(false);
      setErrorEmail('Email is empty.');
    } else {
      setIsEmailValid(false);
      setErrorEmail('Email is invalid.');
    }
    setEmail(text);
  };

  const onChangeName = text => {
    if (text.trim() === '') {
      setIsNameValid(false);
      setErrorName('Name is empty.');
    } else {
      setIsNameValid(true);
      setErrorName('');
    }

    setName(text);
  };

  const onChangePhoneNumber = text => {
    if (phoneNumberRegex.test(text)) {
      setIsPhonenumberValid(true);
      setErrorPhonenumber('');
    } else if (text.trim() === '') {
      setIsPhonenumberValid(false);
      setErrorPhonenumber('Phone Number is empty.');
    } else if (!phoneNumberRegex.test(text)) {
      setIsPhonenumberValid(false);
      setErrorPhonenumber('Phone Number is invalid.');
    } else if (text.length < 11) {
      setIsPhonenumberValid(false);
      setErrorPhonenumber('Phone Number must be 11 characters long.');
    } else {
      setIsPhonenumberValid(false);
      setErrorPhonenumber('Phone Number is invalid.');
    }

    setPhonenumber(text);
  };

  const onChangePassword = text => {
    if (passwordRegex.test(text)) {
      setCheckNumber(false);
      setCheckCharacter(false);
      setIsPasswordValid(true);
      setErrorPassword('');
    } else if (text.trim() === '') {
      setCheckNumber(true);
      setCheckCharacter(true);
      setIsPasswordValid(false);
      setErrorPassword('Password is empty.');
    } else if (text.length >= 8) {
      setCheckNumber(true);
      setCheckCharacter(false);
      setIsPasswordValid(false);
      setErrorPassword('Password must contain a number.');
    } else if (passwordNumberRgx.test(text)) {
      // For Cheking the Single Number exist or not.
      setCheckNumber(false);
      setCheckCharacter(true);
      setIsPasswordValid(false);
      setErrorPassword('Password must be 8 characters long.');
    } else if (!passwordNumberRgx.test(text)) {
      //Checking the single Digit exitence
      if (text.length >= 8) {
        setCheckNumber(true);
        setCheckCharacter(false);
      }
      setCheckNumber(true);
      setCheckCharacter(true);
      setErrorPassword('Password must be 8 characters long.');
    }

    setPassword(text);
  };

  const onChangeIcon = () => {
    setPasswordShown(!passwordShown);
  };

  const onInputFocus =
    (input = '') =>
    () => {
      setInputFocus(input);
    };
  const onBlurInput = () => {
    setInputFocus('');
  };

  const setUserSession = async () => {
    try {
      await AsyncStorage.setItem(LocalStorageKeys.showLoggedIn, 'showLoggedIn');
    } catch (error) {
      console.log(error);
    }
  };

  const onSignUpPress = async () => {
    Keyboard.dismiss();
    if (name.trim() === '') {
      setIsNameValid(false);
      setErrorName('Name is empty.');
    } else if (phonenumber.trim() === '') {
      setIsPhonenumberValid(false);
      setErrorPhonenumber('Phone Number is empty.');
    } else if (!phoneNumberRegex.test(phonenumber)) {
      setIsPhonenumberValid(false);
      setErrorPhonenumber('Phone Number is invalid.');
    } else if (email.trim() === '') {
      setIsEmailValid(false);
      setErrorEmail('Email is empty.');
    } else if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      setErrorEmail('Email is invalid.');
    } else if (password.trim() === '') {
      setIsPasswordValid(false);
      setErrorPassword('Password is empty.');
    } else if (!passwordRegex.test(password)) {
      setIsPasswordValid(false);
      setErrorPassword('Password is invalid.');
    } else if (password.length < 8) {
      setIsPasswordValid(false);
      setErrorPassword('Password must be 8 characters long.');
    } else {
      setLoadingIndicator(true);
      try {
        const userCred = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        firestore().collection('user').doc(userCred.user.uid).set({
          name,
          email,
          phonenumber,
        });
        setLoggedIn(true);
        console.log(userCred.user);
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          alert('Email address enterred is already in use!');
        }
        if (err.code === 'auth/invalid-email') {
          alert('Email address entered is invalid!');
        }
        setLoadingIndicator(false);
        console.log(err);
      }
      setUserSession();
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
          <Text style={styles.pleaseText}>Please enter your account here</Text>
          <View style={styles.inputContianer}>
            <View
              style={[
                styles.nameView,
                !isNameValid ? {borderWidth: 2.7, borderColor: 'red'} : {},
                inputFocus === inputLabel.name
                  ? {
                      borderWidth: 2.7,
                      borderColor: !isNameValid ? 'red' : '#1FCC79',
                    }
                  : {},
              ]}>
              <EvilIcon name="user" size={29} style={styles.usericonStyle} />
              <TextInput
                onFocus={onInputFocus(inputLabel.name)}
                onBlur={onBlurInput}
                value={name}
                placeholder="Name"
                style={styles.textstyle}
                onChangeText={onChangeName}
              />
            </View>
            {!isNameValid ? (
              <Text style={styles.errorTextEdit}>{errorName}</Text>
            ) : null}
            <View
              style={[
                styles.nameView,
                !isPhonenumberValid
                  ? {borderWidth: 2.7, borderColor: 'red'}
                  : {},
                inputFocus === inputLabel.phoneNumber
                  ? {
                      borderWidth: 2.7,
                      borderColor: !isPhonenumberValid ? 'red' : '#1FCC79',
                    }
                  : {},
              ]}>
              <FeatherIcon
                name="phone"
                size={19}
                style={styles.phoneiconStyle}
              />
              <TextInput
                onFocus={onInputFocus(inputLabel.phoneNumber)}
                onBlur={onBlurInput}
                value={phonenumber}
                keyboardType="decimal-pad"
                placeholder="Phone Number"
                style={styles.textstyle}
                onChangeText={onChangePhoneNumber}
              />
            </View>
            {!isPhonenumberValid ? (
              <Text style={styles.errorTextEdit}>{errorPhonenumber}</Text>
            ) : null}
            <View
              style={[
                styles.inputWrapperEmail,
                !isEmailValid ? {borderWidth: 2.7, borderColor: 'red'} : {},
                inputFocus === inputLabel.email
                  ? {
                      borderWidth: 2.7,
                      borderColor: !isEmailValid ? 'red' : '#1FCC79',
                    }
                  : {},
              ]}>
              <View style={styles.emailIcon}>
                <FontIcon name="email" size={19} />
              </View>
              <View style={styles.emailView}>
                <TextInput
                  caretHidden={false}
                  onFocus={onInputFocus(inputLabel.email)}
                  onBlur={onBlurInput}
                  value={email}
                  onChangeText={onChangeEmail}
                  keyboardType="email-address"
                  placeholder="Email"
                />
              </View>
            </View>
            {!isEmailValid ? (
              <Text style={styles.errorTextEdit}>{errorEmail}</Text>
            ) : null}
            <View
              style={[
                styles.inputWrapperPass,
                !isPasswordValid ? {borderWidth: 2.7, borderColor: 'red'} : {},
                inputFocus === inputLabel.password
                  ? {
                      borderWidth: 2.7,
                      borderColor: !isPasswordValid ? 'red' : '#1FCC79',
                    }
                  : {},
              ]}>
              <View style={styles.lockIcon}>
                <EvilIcon name="lock" size={29} color="black" />
              </View>
              <View style={styles.passwdView}>
                <TextInput
                  onFocus={onInputFocus(inputLabel.password)}
                  onBlur={onBlurInput}
                  value={password}
                  secureTextEntry={passwordShown}
                  onChangeText={onChangePassword}
                  placeholder="Password"
                />
              </View>
              <View style={styles.eyeIcon}>
                <TouchableOpacity onPress={onChangeIcon}>
                  <FeatherIcon
                    name={passwordShown ? 'eye' : 'eye-off'}
                    size={19}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {!isPasswordValid ? (
              <Text style={styles.errorTextEdit}>{errorPassword}</Text>
            ) : null}
            <Text style={styles.PasswordbottomText}>
              Your Password must contain:
            </Text>
            <View style={styles.imageViewContainer}>
              <Image
                style={[styles.checkImage]}
                source={checkCharacter ? images.UnCheck : images.Check}
              />
              <Text
                style={[
                  styles.bottomText,
                  checkCharacter ? {color: 'white'} : {color: 'lightgreen'},
                ]}>
                At least 8 characters
              </Text>
            </View>
            <View style={styles.bottomImageViewContainer}>
              <Image
                style={[styles.checkImage]}
                source={checkNumber ? images.UnCheck : images.Check}
              />
              <Text
                style={[
                  styles.bottomText,
                  checkNumber ? {color: 'white'} : {color: 'lightgreen'},
                ]}>
                Contain a number
              </Text>
            </View>
            <View style={styles.bottomViewFlex}>
              <TouchableOpacity
                style={[
                  loadingIndicator
                    ? styles.loginTextContainer
                    : styles.buttonContainer,
                ]}
                onPress={onSignUpPress}
                disabled={loadingIndicator}>
                <Text
                  style={[
                    loadingIndicator
                      ? styles.disabledLoginText
                      : styles.loginText,
                  ]}>
                  Sign Up
                </Text>
                {loadingIndicator ? (
                  <ActivityIndicator
                    size={responsiveWidth(7)}
                    color="#1FCC79"
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
    marginTop: responsiveHeight(13),
  },
  pleaseText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    paddingTop: responsiveHeight(1.5),
    fontSize: responsiveFontSize(2),
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
    marginLeft: responsiveWidth(1.7),
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
    flex: 1,
    marginTop: responsiveHeight(8),
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.8),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fc2469',
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
    borderColor: '#1FCC79',
  },
  loginText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.7),
    color: 'white',
  },
  disabledLoginText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.7),
    color: '#1FCC79',
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
    marginLeft: responsiveWidth(2),
    alignSelf: 'center',
  },
  phoneiconStyle: {
    marginRight: responsiveWidth(1),
    marginLeft: responsiveWidth(3),
    alignSelf: 'center',
  },
});

export default SignUp;
