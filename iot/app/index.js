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
import Home from './screens/Home/Home';
import Energy from './screens/Home/Energy';
import Day from './screens/Home/Day';
import {
  Transition,
  createFluidNavigator,
  FluidNavigator
} from 'react-navigation-fluid-transitions';

export default class App extends React.Component {
  constructor() {
    super();

    this.Login = props => (
      <Transition>
        <View style={{ flex: 1 }}>
          <LoginHome
            onVerified={() => {
              props.navigation.navigate('loggedIn');
              Keyboard.dismiss();
            }}
          />
        </View>
      </Transition>
    );

    let loggedIn = createFluidNavigator({
      home: { screen: Home },
      energy: { screen: Energy },
      day: { screen: Day, navigationOptions: { gesturesEnabled: false } }
    });

    this.Navigator = createFluidNavigator(
      {
        login: { screen: this.Login },
        loggedIn: loggedIn
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
