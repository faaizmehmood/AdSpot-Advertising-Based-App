import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {images} from '../assets/images';

const inputLabel = {
  password: 'password',
};

const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;
const passwordNumberRgx = /(?=.*[0-9])/;

// const name = '';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [errorPassword, setErrorPassword] = useState('');
  const [inputFocus, setInputFocus] = useState('');
  const [passwordShown, setPasswordShown] = useState(true);
  const [checkCharacter, setCheckCharacter] = useState(true);
  const [checknumber, setCheckNumber] = useState(true);

  const onChangePassword = text => {
    if (passwordRegex.test(text)) {
      setCheckNumber(false);
      setCheckCharacter(false);
      setPasswordIsValid(true);
      setErrorPassword('');
    } else if (text.trim() === '') {
      setCheckNumber(true);
      setCheckCharacter(true);
      setPasswordIsValid(false);
      setErrorPassword('Password is empty.');
    } else if (text.length >= 8) {
      setCheckNumber(true);
      setCheckCharacter(false);
      setPasswordIsValid(false);
      setErrorPassword('Password must contain a number.');
    } else if (passwordNumberRgx.test(text)) {
      //Checkinng the single Digit exitence
      setCheckNumber(false);
      setCheckCharacter(true);
      setPasswordIsValid(false);
      setErrorPassword('Password must be 8 characters long.');
    } else if (!passwordNumberRgx.test(text)) {
      //Checking the single Digit exitence
      if (text.length >= 8) {
        setPasswordIsValid(false);
      }
      setCheckNumber(true);
      setCheckCharacter(true);
      setErrorPassword('Password must be 8 characters long.');
      setCheckCharacter(true);
    }

    setPassword(text);
  };
  const onChangeIcon = () => {
    setPasswordShown(!passwordShown);
  };
  const onPressDone = () => {
    if (password.trim() === '') {
      setPasswordIsValid(false);
      setErrorPassword('Password is empty.');
    } else if (!passwordRegex.test(password)) {
      setPasswordIsValid(false);
      setErrorPassword('Password is invalid.');
    }
  };
  const onInputFocus =
    (input = '') =>
    () => {
      setInputFocus(input);
    };

  const onBlurInput = () => {
    setInputFocus('');
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.frontText}>Reset your password</Text>
      {/* {name !== '' && <Text>{name}</Text>}  */}
      <Text style={styles.betweenCenterText}>
        Please enter your new password
      </Text>
      <View
        style={[
          styles.inputContainer,
          !passwordIsValid ? {borderWidth: 2.7, borderColor: 'red'} : {},
          inputFocus === inputLabel.password
            ? {
                borderWidth: 2.7,
                borderColor: !passwordIsValid ? 'red' : '#1FCC79',
              }
            : {},
        ]}>
        <EvilIcon name="lock" size={29} color="black" style={styles.lockIcon} />
        <TextInput
          placeholder="Password"
          onFocus={onInputFocus(inputLabel.password)}
          onBlur={onBlurInput}
          style={styles.betweenTextInput}
          value={password}
          secureTextEntry={passwordShown}
          onChangeText={onChangePassword}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={onChangeIcon}>
          <FeatherIcon name={passwordShown ? 'eye' : 'eye-off'} size={19} />
        </TouchableOpacity>
      </View>
      {!passwordIsValid ? (
        <Text style={styles.errorText}>{errorPassword}</Text>
      ) : null}
      <Text style={styles.YourPasswordText}>Your Password must contain:</Text>
      <View style={styles.imageContainer}>
        <Image
          source={checkCharacter ? images.UnCheck : images.Check}
          style={styles.imageStyle}
        />
        <Text
          style={[
            styles.imageText,
            checkCharacter ? {color: 'white'} : {color: 'lightgreen'},
          ]}>
          Atleast 8 characters
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={checknumber ? images.UnCheck : images.Check}
          style={styles.imageStyle}
        />
        <Text
          style={[
            styles.imageText,
            checknumber ? {color: 'white'} : {color: 'lightgreen'},
          ]}>
          Contains a number
        </Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPressDone}>
        <Text style={styles.centerText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#111110',
  },
  frontText: {
    marginTop: responsiveHeight(22),
    fontSize: responsiveFontSize(3),
    color: 'white',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  betweenCenterText: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  inputContainer: {
    borderWidth: responsiveWidth(1),
    backgroundColor: 'white',
    borderRadius: responsiveWidth(25),
    marginHorizontal: responsiveWidth(4.2),
    marginTop: responsiveHeight(3.5),
    borderColor: 'white',
    flexDirection: 'row',
  },
  lockIcon: {
    alignSelf: 'center',
    marginLeft: responsiveWidth(3),
  },
  betweenTextInput: {
    flex: 1,
  },
  eyeIcon: {
    marginRight: responsiveWidth(5),
    alignSelf: 'center',
  },
  buttonContainer: {
    width: '90%',
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(25),
    marginHorizontal: responsiveWidth(4.2),
    marginTop: responsiveHeight(3.5),
    backgroundColor: '#fc2469',
  },
  centerText: {
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.3),
    marginVertical: responsiveHeight(1.5),
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  YourPasswordText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Inter-Medium',
    marginTop: responsiveHeight(2.9),
    marginLeft: responsiveHeight(3),
  },
  imageText: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Inter-Medium',
    marginTop: responsiveHeight(2.9),
    marginLeft: responsiveHeight(1.5),
  },
  errorText: {
    width: '90%',
    color: '#fc2469',
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(1.2),
  },
  imageContainer: {
    flexDirection: 'row',
  },
  imageStyle: {
    marginTop: responsiveHeight(2.4),
    marginLeft: responsiveHeight(2.9),
    width: responsiveWidth(7.5),
    height: responsiveWidth(7.5),
  },
});

export default NewPassword;
