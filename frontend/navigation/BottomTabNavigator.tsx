import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabFourScreen from '../screens/TabFourScreen';
import Map from '../screens/Map';
import { BottomTabParamList, TabFourParamList, TabOneParamList, TabThreeParamList, TabTwoParamList } from '../types';
import NotFoundScreen from '../screens/NotFoundScreen';
import AsyncStorage from '@react-native-community/async-storage';
import CustomerProfile from '../CustomerScreens/CustomerProfile';
import GuardProfile from '../GuardScreens/GuardProfile';
import ListTicket from '../CustomerScreens/ListTicket';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => renderIconTabOne({color}),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => renderIconTabTwo({color}),
        }}
      />
      <BottomTab.Screen
        name="Trang cá nhân"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person-circle-outline" color={color} />,
        }}
      />
      {/* <BottomTab.Screen
        name="TabFour"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();
const user = {
  userid:1,
  role:2
}
function renderIconTabOne({color}) {
  var user = getUser();

  if(user.role == 1) {
    return (
     <TabBarIcon name="ios-code" color={color} />);
  }
  else if(user.role == 2) {

    return (<TabBarIcon name="ios-code" color={color} />);
  }
  else {

    return (<TabBarIcon name="albums" color={color} />);
  }
}
function renderIconTabTwo({color}) {
  var user = getUser();

  if(user.role == 1) {
    return (
     <TabBarIcon name="ios-code" color={color} />);
  }
  else if(user.role == 2) {

    return (<TabBarIcon name="ios-code" color={color} />);
  }
  else {

    return (<TabBarIcon name="map" color={color} />);
  }
}
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
function TabOneNavigator() {
  var user = getUser();

  if(user.role == 1) {
    return (
      <TabOneStack.Navigator>
        <TabOneStack.Screen
          name="TabOneScreen"
          component={NotFoundScreen}
          options={{headerShown: false}}
        />
      </TabOneStack.Navigator>
    );
  }
  else if( user.role == 2) {
    return (
      <TabOneStack.Navigator>
        <TabOneStack.Screen
          name="TabOneScreen"
          component={NotFoundScreen}
          options={{headerShown: false}}
        />
      </TabOneStack.Navigator>
    );
  } else {
    return (
      <TabOneStack.Navigator>
        <TabOneStack.Screen
          name="TabOneScreen"
          component={ListTicket}
          options={{headerShown: false}}
        />
      </TabOneStack.Navigator>
    );
  }
}

// function TabThreeNavigator() {
//   return (
//     <TabThreeStack.Navigator>
//       <TabThreeStack.Screen
//         name="TabThreeScreen"
//         component={TabThreeScreen}
//         options={{headerShown: false}}
//       />
//     </TabThreeStack.Navigator>
//   );
// }
function TabThreeNavigator() {
  var user = getUser();

  if(user.role == 2) {
    return (
      <TabFourStack.Navigator>
        <TabFourStack.Screen
          name="TabFourScreen"
          component={GuardProfile}
          options={{headerShown: false}}
        />
      </TabFourStack.Navigator>
    );
  } else if(user.role == 1) {
    return (
      <TabFourStack.Navigator>
        <TabFourStack.Screen
          name="TabFourScreen"
          component={GuardProfile}
          options={{headerShown: false}}
        />
      </TabFourStack.Navigator>
    );
  } else {
    return (
      <TabFourStack.Navigator>
        <TabFourStack.Screen
          name="TabFourScreen"
          component={CustomerProfile}
          options={{headerShown: false}}
        />
      </TabFourStack.Navigator>
    );
  }
}
function TabTwoNavigator() {
  var user = getUser();

  if(user.role == 1) {
    return (
      <TabTwoStack.Navigator>
        <TabTwoStack.Screen
          name="TabTwoScreen"
          component={NotFoundScreen}
          options={{headerShown: false}}
        />
      </TabTwoStack.Navigator>
    );
  } else if(user.role == 2) {
    return (
      <TabTwoStack.Navigator>
        <TabTwoStack.Screen
          name="TabTwoScreen"
          component={NotFoundScreen}
          options={{headerShown: false}}
        />
      </TabTwoStack.Navigator>
    );
  } else {
    return (
    <TabTwoStack.Navigator>
    <TabTwoStack.Screen
      name="TabTwoScreen"
      component={Map}
      options={{headerShown: false}}
    />
  </TabTwoStack.Navigator>
    );
  }
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();
const TabThreeStack = createStackNavigator<TabThreeParamList>();
const TabFourStack = createStackNavigator<TabFourParamList>();
