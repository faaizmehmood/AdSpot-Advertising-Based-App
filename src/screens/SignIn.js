import React, {useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import FontIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {routeNames} from '../navigation/config';
import {AuthContext} from '../context/AuthContext';
import {LocalStorageKeys} from '../constants';
import {ImageBackground} from 'react-native';
import {images} from '../assets/images';

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const inputLabel = {
  email: 'email',
  password: 'password',
};

const SignIn = props => {
  const [email, setEmail] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [errorEmail, setErrorEmail] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [errorPassword, setErrorPassword] = React.useState(true);
  const [passwordShown, setPasswordShown] = React.useState(true);
  const [inputFocus, setInputFocus] = React.useState('');
  const [loadingIndicator, setLoadingIndicator] = React.useState(false);

  const {setLoggedIn} = useContext(AuthContext);

  const onGoToSignUpScreen = () => {
    props.navigation.navigate(routeNames.SignUp);
  };

  const onGotoPaswdRecovScreen = () => {
    props.navigation.navigate(routeNames.PasswordRecovery);
  };

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
  const onChangePassword = text => {
    if (text.length >= 8) {
      setIsPasswordValid(true);
      setErrorPassword('');
    } else if (text.trim() === '') {
      setIsPasswordValid(false);
      setErrorPassword('Password is empty.');
    } else {
      setIsPasswordValid(false);
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
  const loginPressit = async () => {
    if (email.trim() === '') {
      setIsEmailValid(false);
      setErrorEmail('Email is empty.');
    } else if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      setErrorEmail('Email is invalid.');
    } else if (password.trim() === '') {
      setIsPasswordValid(false);
      setErrorPassword('Password is empty.');
    } else if (password.length < 8) {
      setIsPasswordValid(false);
      setErrorPassword('Password must be 8 characters long.');
    } else {
      setLoadingIndicator(true);
      try {
        await auth().signInWithEmailAndPassword(email, password);
        setLoadingIndicator(true);
        setLoggedIn(true);
      } catch (err) {
        if (err.code === 'auth/wrong-password') {
          alert('The password is invalid');
        }
        if (err.code === 'auth/too-many-requests') {
          alert(
            'Access to this account has been temporarily disabled due to many failed login attempts',
          );
        }
        if (err.code === 'auth/user-not-found') {
          alert('There is no user record corresponding to this identifier.  ');
        }
        setLoadingIndicator(false);
        console.log(err);
      }
      setUserSession();
    }
  };

  return (
    <SafeAreaView style={styles.f1}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <ImageBackground
          source={images.splash_Full}
          style={styles.splash_Img_Edit}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.pleaseText}>Please enter your account here</Text>
          <View style={styles.inputContianer}>
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
                  placeholder="Email or phone Number "
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
            <TouchableOpacity onPress={onGotoPaswdRecovScreen}>
              <Text style={styles.ForgotText}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.bottomViewFlex}>
              <TouchableOpacity
                style={[
                  loadingIndicator
                    ? styles.loginTextContainer
                    : styles.buttonContainer,
                ]}
                onPress={loginPressit}>
                <Text
                  style={[
                    loadingIndicator
                      ? styles.disabledLoginText
                      : styles.loginText,
                  ]}>
                  Login
                </Text>
                {loadingIndicator ? (
                  <ActivityIndicator
                    size={responsiveWidth(7)}
                    color="#1FCC79"
                    // color="white"
                    style={styles.activityIndicatorStyle}
                  />
                ) : null}
              </TouchableOpacity>
              <Text style={styles.betweenText}>Or Continue with</Text>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.googleTextContainer]}
                onPress={onGoToSignUpScreen}>
                <MaterialIcon
                  style={styles.googleIcon}
                  name="admin-panel-settings"
                  size={26}
                  color="white"
                />
                <Text style={styles.loginText}>Login as Admin</Text>
              </TouchableOpacity>
              <View style={styles.lastTextContainer}>
                <Text style={styles.dontAccountText}>
                  Don't have any account?
                </Text>
                <TouchableOpacity onPress={onGoToSignUpScreen}>
                  <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  welcomeText: {
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    color: 'white',
    fontSize: responsiveFontSize(3),
    marginTop: responsiveHeight(18),
  },
  pleaseText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    paddingTop: responsiveHeight(1.5),
    fontSize: responsiveFontSize(2),
  },
  inputContianer: {
    marginHorizontal: responsiveWidth(6),
    marginTop: responsiveHeight(3.5),
    flex: 1,
  },
  inputWrapperEmail: {
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
    marginTop: responsiveHeight(2),
    borderColor: 'white',

    borderRadius: responsiveWidth(50) / 2,
    backgroundColor: 'white',
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
  ForgotText: {
    fontFamily: 'Inter-Medium',
    color: 'white',
    marginTop: responsiveHeight(1.4),
    marginRight: responsiveWidth(4),
    textAlign: 'right',
  },
  bottomViewFlex: {
    flex: 1,
    alignItems: 'center',
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
    backgroundColor: '#fb246b',
  },
  googleTextContainer: {
    backgroundColor: '#484848',
  },
  loginTextContainer: {
    width: '100%',
    paddingHorizontal: responsiveWidth(1.5),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.7,
    borderColor: '#1FCC79',
  },
  loginText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.5),
    color: 'white',
  },
  disabledLoginText: {
    fontFamily: 'Inter-Bold',
    fontSize: responsiveFontSize(2.7),
    color: '#1FCC79',
    paddingRight: responsiveWidth(1.5),
  },
  betweenText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    marginVertical: responsiveHeight(5),
  },
  googleIcon: {
    marginRight: responsiveWidth(2.6),
  },
  dontAccountText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    marginTop: responsiveHeight(4),
    marginRight: responsiveWidth(2),
  },
  lastTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    paddingTop: responsiveHeight(4),
    fontFamily: 'Inter-Medium',
    color: '#fc2469',
  },
  errorTextEdit: {
    // color: '#fc2469',
    color: 'red',
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(1.2),
  },
});

export default SignIn;
