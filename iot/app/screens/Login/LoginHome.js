import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, DIM, IMAGES } from '../../resources/constants';
import { LinearGradient } from 'expo';
import { styles } from './styles';
import { Transition } from 'react-navigation-fluid-transitions';
import { Auth } from 'aws-amplify';
const IMAGE_HEIGHT = 200;
const IMAGE_HEIGHT_SMALL = 150;

export default class Login extends React.Component {
  static propTypes = {
    onVerified: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  onSuccessfulAuth(user) {
    if (user.attributes.deviceId) {
      this.props.navigation.navigate('home');
    } else {
      this.props.navigation.navigate('register_device');
    }
  }

  render() {
    return (
      <LinearGradient
        style={styles.container}
        start={[0, 0.0]}
        end={[0, 1.0]}
        colors={COLORS.darkBlueGradient}
      >
        <View style={{ flex: 0.1 }} />

        <View style={styles.header}>
          <Transition shared={'logo'}>
            <Image
              source={IMAGES.electricity}
              style={{ height: IMAGE_HEIGHT, width: IMAGE_HEIGHT }}
              resizeMode={'contain'}
            />
          </Transition>
        </View>

        <View style={styles.body}>
          <Transition shared={'login'}>
            <TouchableOpacity
              onPress={() => {
                Auth.currentAuthenticatedUser()
                  .then(data => {
                    console.log('success: ', data);
                    this.onSuccessfulAuth(data);
                  })
                  .catch(err => {
                    this.props.navigation.navigate('login');
                  });
              }}
              style={[
                styles.buttonStyle,
                { backgroundColor: COLORS.lightBlue }
              ]}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </Transition>
          <View style={{ height: 5 }} />
          <Transition shared={'register'}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('register');
              }}
              style={[styles.buttonStyle, { backgroundColor: COLORS.yellow }]}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </Transition>
        </View>
      </LinearGradient>
    );
  }
}
