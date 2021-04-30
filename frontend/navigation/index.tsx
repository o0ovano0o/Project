import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList,RootLoginedStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import StartScreen from '../screens/Start';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
import OwnerProfile from '../OwnerScreens/OwnerProfile';
import EditProfileOwner from '../OwnerScreens/EditProfileOwner';
import ChangePassword from '../OwnerScreens/ChangePassword';
import CustomerProfile from '../CustomerScreens/CustomerProfile';
import GuardProfile from '../GuardScreens/GuardProfile';
import ListVehicle from '../CustomerScreens/ListVehicle';
import Vehicle from '../CustomerScreens/Vehicle';
import AddNewVehicle from '../CustomerScreens/AddNewVehicle';
import ListTicket from '../CustomerScreens/ListTicket';
import AddTicket from '../GuardScreens/AddTicket';
import CloseTicket from '../GuardScreens/CloseTicket';
import SuccessScreen from '../CustomerScreens/SuccessScreen';
import ListVehicleInOut from '../GuardScreens/ListVehicleInOut';
import ListTicketAddNew from '../GuardScreens/ListTicket_AddNew';
import Map from '../screens/Map';
import ScanQRCode from '../OwnerScreens/ScanQRCode';
import { AsyncStorage } from 'react-native';
import MainScreen from '../GuardScreens/MainScreen';
import AcceptTicket from '../CustomerScreens/AcceptTicket';
import AddTicketByHand from '../GuardScreens/AddTicketByHand';
import ListGuard from '../OwnerScreens/ListGuard';
import AddGuard from '../OwnerScreens/AddGuard';
import AddParking from '../OwnerScreens/AddParking';
import EditGuardProfile from '../OwnerScreens/EditGuardProfile';
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
var Stack = createStackNavigator<RootStackParamList>();
async function getUser() {
  const value = await AsyncStorage.getItem('user');
  if(value)
  return {
    ...JSON.parse(value),
    login: true
  }

  else {
    return {
      login: false,
    }
  }
}
  function RootNavigator() {
  var user =  getUser();
  if(user?.userid) {
    Stack = createStackNavigator<RootLoginedStackParamList>();
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="GuardProfile" component={GuardProfile} />
      <Stack.Screen name="Vehicle" component={Vehicle} />
      <Stack.Screen name="ListVehicle" component={ListVehicle} />
      <Stack.Screen name="ListVehicleInOut" component={ListVehicleInOut} />
      <Stack.Screen name="AddNewVehicle" component={AddNewVehicle} />
      <Stack.Screen name="ListTicket" component={ListTicket} />
      <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="ListTicketAddNew" component={ListTicketAddNew} />
      <Stack.Screen name="AddTicket" component={AddTicket} />
      <Stack.Screen name="CloseTicket" component={CloseTicket} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="AcceptTicket" component={AcceptTicket} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="EditProfileOwner" component={EditProfileOwner} />
      <Stack.Screen name="AddTicketByHand" component={AddTicketByHand} />
      <Stack.Screen name="ScanQRCode" component={ScanQRCode} />
      <Stack.Screen name="ListGuard" component={ListGuard} />
      <Stack.Screen name="EditGuardProfile" component={EditGuardProfile} />
      <Stack.Screen name="AddGuard" component={AddGuard} />
      <Stack.Screen name="AddParking" component={AddParking} />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
