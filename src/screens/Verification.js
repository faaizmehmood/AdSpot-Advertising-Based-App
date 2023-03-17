import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const cellCount = 4;

const Verification = () => {
  const [code, setCode] = useState('');

  const nextDisabled = code.length !== 4;

  //it will be usefull in third method

  // const [nextDisabled, setNextDisabled] = useState(true);

  const [sendAgainDisabled, setSendAgainDisabled] = useState(true);
  const ref = useBlurOnFulfill({code, cellCount: cellCount});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const onChangeCode = text => {
    setCode(text);
  };

  //Third Method to use any prop

  //Second Method to use any prop

  // useEffect(() => {
  //   if (code.length === 4) {
  //     setNextDisabled(false);
  //   } else {
  //     setNextDisabled(true);
  //   }
  // }, [code]);

  const renderCode = ({index, symbol, isFocused}) => (
    <Text
      key={index}
      style={[styles.cell, isFocused && styles.focusCell]}
      onLayout={getCellOnLayoutHandler(index)}>
      {symbol || (isFocused ? <Cursor /> : null)}
    </Text>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.frontText}>Check your email</Text>
        <Text style={styles.MaincenterText}>
          We 've send the code to your email
        </Text>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={code}
          onChangeText={onChangeCode}
          cellCount={cellCount}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCode}
        />
        <View style={styles.codeConrainer}>
          <Text style={styles.codeExpireText}>code expires in: </Text>
          <Text style={styles.timeText}>03:12</Text>
        </View>
        <TouchableOpacity
          style={[
            nextDisabled ? styles.onDisabledButton : styles.ButtonContainer,
          ]}
          //Second Method to use any prop
          disabled={nextDisabled}
          // disabled={code.length !== 4} first Method to use any prop
        >
          <Text
            style={[
              nextDisabled ? styles.DisabledcenterText : styles.centerText,
            ]}>
            Next
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            sendAgainDisabled
              ? styles.onDisabledButton
              : styles.ButtonContainer,
          ]}
          disabled={sendAgainDisabled}>
          <Text
            style={[
              sendAgainDisabled ? styles.DisabledcenterText : styles.centerText,
            ]}>
            Send again
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  frontText: {
    marginTop: responsiveHeight(14),
    fontSize: responsiveFontSize(3),
    color: 'white',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  MaincenterText: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  codeFieldRoot: {
    marginTop: responsiveHeight(4.7),
    marginHorizontal: responsiveWidth(9),
  },
  cell: {
    width: responsiveWidth(17),
    height: responsiveWidth(17),
    lineHeight: responsiveHeight(8),
    fontSize: responsiveFontSize(3),
    borderRadius: responsiveWidth(3),
    borderWidth: responsiveWidth(0.5),
    borderColor: '#fc2469',
    color: 'white',
    textAlign: 'center',
  },
  focusCell: {
    borderWidth: responsiveWidth(0.7),
    borderColor: '#1FCC79',
  },
  codeConrainer: {
    alignSelf: 'center',
    margin: responsiveHeight(7),
    marginBottom: responsiveWidth(6),
    flexDirection: 'row',
  },
  codeExpireText: {
    color: 'white',
  },
  timeText: {
    color: '#1FCC79',
  },
  ButtonContainer: {
    margin: responsiveHeight(1),
    alignSelf: 'center',
    borderRadius: responsiveWidth(25),
    paddingVertical: responsiveHeight(1.8),
    width: '91%',
    backgroundColor: '#fc2469',
  },
  onDisabledButton: {
    margin: responsiveHeight(1),
    alignSelf: 'center',
    borderRadius: responsiveWidth(25),
    paddingVertical: responsiveHeight(1.8),
    width: '91%',
    borderWidth: 2,
    borderColor: '#D0DBEA',
  },
  centerText: {
    fontFamily: 'Inter-Bold',
    color: 'white',
    fontSize: responsiveFontSize(2.5),
    alignSelf: 'center',
  },
  DisabledcenterText: {
    fontFamily: 'Inter-Bold',
    color: '#9FA5C0',
    fontSize: responsiveFontSize(2.5),
    alignSelf: 'center',
  },
});

export default Verification;
