import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {routeNames, defaultScreenOptions} from '../navigation/config';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  Home,
  Setting,
  SelectPkg,
  PremiumPkg,
  ClassicPkg,
  NormalPkg,
  SpecialPkg,
  PremiumSummary,
  ClassicSummary,
  NormalSummary,
  SpecialSummary,
  UserMakePackageForm,
  ShowPackages,
} from '../screens';

const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={defaultScreenOptions}>
      <HomeStack.Screen name={routeNames.Home} component={Home} />
      <HomeStack.Screen name={routeNames.SelectPkg} component={SelectPkg} />
      <HomeStack.Screen
        name={routeNames.UserMakePackageFormPress}
        component={UserMakePackageForm}
      />
      <HomeStack.Screen
        name={routeNames.ShowPackages}
        component={ShowPackages}
      />
      <HomeStack.Screen name={routeNames.PremiumPkg} component={PremiumPkg} />
      <HomeStack.Screen name={routeNames.ClassicPkg} component={ClassicPkg} />
      <HomeStack.Screen name={routeNames.NormalPkg} component={NormalPkg} />
      <HomeStack.Screen name={routeNames.SpecialPkg} component={SpecialPkg} />
      <HomeStack.Screen
        name={routeNames.PremiumSummary}
        component={PremiumSummary}
      />
      <HomeStack.Screen
        name={routeNames.ClassicSummary}
        component={ClassicSummary}
      />
      <HomeStack.Screen
        name={routeNames.NormalSummary}
        component={NormalSummary}
      />
      <HomeStack.Screen
        name={routeNames.SpecialSummary}
        component={SpecialSummary}
      />
    </HomeStack.Navigator>
  );
};

const SettingStackNavigator = () => {
  return (
    <SettingStack.Navigator screenOptions={defaultScreenOptions}>
      <SettingStack.Screen name={routeNames.Setting} component={Setting} />
    </SettingStack.Navigator>
  );
};

const BottomTabs = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let AntProfileIcon;

          if (route.name === routeNames.HomeTab) {
            iconName = focused ? 'home' : 'home-outline';
            return <IonicIcon name={iconName} size={size} color={color} />;
          } else if (route.name === routeNames.SettingTab) {
            AntProfileIcon = focused ? 'setting' : 'setting';
            return <AntIcon name={AntProfileIcon} size={size} color={color} />;
          }
        },
        headerShown: false,
        tabBarActiveTintColor: 'rgba(208,85,157,255)',
        tabBarInactiveTintColor: '#9FA5C0',
      })}>
      <BottomTabs.Screen
        options={{title: 'Home'}}
        name={routeNames.HomeTab}
        component={HomeStackNavigator}
      />
      <BottomTabs.Screen
        options={{title: 'Setting'}}
        name={routeNames.SettingTab}
        component={SettingStackNavigator}
      />
    </BottomTabs.Navigator>
  );
};

export default MainNavigator;
