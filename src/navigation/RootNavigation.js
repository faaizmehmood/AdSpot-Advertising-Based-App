import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {
  Splash,
  Onboard,
  SignIn,
  SignUp,
  PasswordRecovery,
  Verification,
  NewPassword,
  ShowAllUsers,
} from '../screens';
import {AuthContext} from '../context/AuthContext';
import MainNavigator from './MainNavigator';
import {defaultScreenOptions, routeNames} from './config';

const Stack = createStackNavigator();

const RootNav = () => {
  const {splashLoading, showOnboarding, loggedIn} = useContext(AuthContext);

  const renderScreens = () => {
    if (splashLoading) {
      return <Stack.Screen name={routeNames.Splash} component={Splash} />;
    } else if (showOnboarding) {
      return <Stack.Screen name={routeNames.OnBoard} component={Onboard} />;
    } else if (loggedIn) {
      return (
        <Stack.Screen
          name={routeNames.MainNavigatorTab}
          component={MainNavigator}
        />
      );
    } else {
      return (
        //These are called Fragment Operators
        <>
          <Stack.Screen name={routeNames.SignIn} component={SignIn} />
          <Stack.Screen name={routeNames.SignUp} component={SignUp} />
          <Stack.Screen
            name={routeNames.ShowAllUsers}
            component={ShowAllUsers}
          />
          <Stack.Screen
            name={routeNames.PasswordRecovery}
            component={PasswordRecovery}
          />
          <Stack.Screen
            name={routeNames.Verification}
            component={Verification}
          />
          <Stack.Screen name={routeNames.NewPassword} component={NewPassword} />
        </>
      );
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        {renderScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNav;
