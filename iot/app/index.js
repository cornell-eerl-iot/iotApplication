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
import Login from './screens/Login';
import Home from './screens/Home';
import {
  Transition,
  createFluidNavigator,
  FluidNavigator
} from 'react-navigation-fluid-transitions';

export default class App extends React.Component {
  constructor() {
    super();

    this.Home = props => (
      <Transition appear="vertical">
        <View style={{ flex: 1 }}>
          <Home />
        </View>
      </Transition>
    );
    this.Login = props => (
      <Transition>
        <View style={{ flex: 1 }}>
          <Login
            onVerified={() => {
              props.navigation.navigate('home');
              Keyboard.dismiss();
            }}
          />
        </View>
      </Transition>
    );

    this.Navigator = FluidNavigator(
      {
        home: { screen: this.Home },
        login: { screen: this.Login }
      },
      { navigationOptions: { gesturesEnabled: false } }
    );

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
