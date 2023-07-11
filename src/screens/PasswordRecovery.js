import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  Text,
  TextInput,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import FontIcon from 'react-native-vector-icons/Fontisto';
import {routeNames} from '../navigation/config';
import {images} from '../assets/images';

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const inputLabel = {
  email: 'email',
};

const PasswordRecovery = props => {
  const [email, setEmail] = React.useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [inputFocus, setInputFocus] = useState('');

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

  const onPressSignIn = () => {
    if (email.trim() === '') {
      setIsEmailValid(false);
      setErrorEmail('Email is empty.');
    } else if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      setErrorEmail('Email is invalid.');
    } else {
      props.navigation.navigae(routeNames.NewPassword);
    }
  };

  const onInputFocus =
    (input = '') =>
    () => {
      setInputFocus(input);
    };

  const onBlurIt = () => {
    setInputFocus('');
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <ImageBackground
        source={images.splash_Full}
        style={styles.splash_Img_Edit}>
        <View style={styles.innerContainer}>
          <Text style={styles.passwordContainer}>Password Recovery</Text>
          <Text style={styles.textWrapper}>
            Enter your email to recover your password
          </Text>
          <View
            style={[
              styles.inputContainer,
              !isEmailValid ? {borderWidth: 2.7, borderColor: 'red'} : {},
              inputFocus === inputLabel.email
                ? {
                    borderWidth: 2.7,
                    borderColor: !isEmailValid ? 'red' : '#1FCC79',
                  }
                : {},
            ]}>
            <FontIcon name="email" size={20} style={styles.iconEdit} />
            <TextInput
              onFocus={onInputFocus(inputLabel.email)}
              onBlur={onBlurIt}
              // caretHidden={false}
              keyboardType="email-address"
              placeholder="Email"
              style={styles.inputEdit}
              value={email}
              onChangeText={onChangeEmail}
            />
          </View>
          {!isEmailValid ? (
            <Text style={styles.errorTextEdit}>{errorEmail}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={onPressSignIn}>
            <Text style={styles.buttonTextEdit}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  splash_Img_Edit: {
    height: responsiveWidth(215),
  },
  innerContainer: {
    flex: 0.75,
    marginTop: responsiveHeight(19),
    alignItems: 'center',
  },
  passwordContainer: {
    color: 'white',
    fontSize: responsiveFontSize(3.2),
    fontFamily: 'Inter-Bold',
  },
  textWrapper: {
    marginTop: responsiveHeight(1.5),
    marginBottom: responsiveHeight(4),
    fontSize: responsiveFontSize(2),
    color: 'white',
  },
  inputContainer: {
    flex: 0.2,
    flexDirection: 'row',
    width: '90%',
    borderWidth: responsiveWidth(1),
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: responsiveWidth(25),
  },
  iconEdit: {
    alignSelf: 'center',
    marginLeft: responsiveWidth(6),
  },
  inputEdit: {
    flex: 1,
    paddingLeft: responsiveWidth(3),
    paddingRight: responsiveWidth(3),
  },
  buttoncontainer: {
    marginTop: responsiveHeight(5.5),
    backgroundColor: 'rgba(192,85,181,255)',
    borderRadius: responsiveWidth(25),
    width: responsiveWidth(90),
    height: responsiveWidth(14),
  },
  buttonTextEdit: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.7),
    paddingVertical: responsiveHeight(1.5),
    fontFamily: 'Inter-Bold',
  },
  errorTextEdit: {
    width: '90%',
    // color: '#fc2469',
    color: 'red',
    marginLeft: responsiveWidth(15),
    marginTop: responsiveHeight(1.2),
  },
});
export default PasswordRecovery;
