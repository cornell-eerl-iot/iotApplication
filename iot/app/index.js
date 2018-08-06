import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native';

import LoginHome from './screens/Login/LoginHome';
import Login from './screens/Login/Login';
import Register from './screens/Login/Register';
import RegisterDevice from './screens/Home/RegisterDevice';

import Home from './screens/Home/Home';
import Energy from './screens/Home/Energy';
import Day from './screens/Home/Day';
import {
  Transition,
  createFluidNavigator,
  FluidNavigator
} from 'react-navigation-fluid-transitions';

import Amplify, { Auth } from 'aws-amplify';

import config from './aws-exports';

Amplify.configure(config);

export default class App extends React.Component {
  constructor() {
    super();

    this.Navigator = createFluidNavigator({
      loginHome: { screen: LoginHome },
      login: { screen: Login },
      register: { screen: Register },
      home: { screen: Home, navigationOptions: { gesturesEnabled: false } },
      energy: { screen: Energy },
      day: { screen: Day, navigationOptions: { gesturesEnabled: false } },
      register_device: {
        screen: RegisterDevice,
        navigationOptions: { gesturesEnabled: false }
      }
    });
    this.state = {
      verified: false
    };
  }

  //child will use this
  updateVerificationCallback = verification => {
    this.setState({ verified: verification });
  };

  render() {
    return <this.Navigator navigation={this.props.navigation} />;
  }
}
