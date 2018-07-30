import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, DIM, IMAGES } from '../../resources/constants';
import { LinearGradient } from 'expo';

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
          <Image
            source={IMAGES.electricity}
            style={{ height: IMAGE_HEIGHT, width: IMAGE_HEIGHT }}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.buttonStyle, { backgroundColor: COLORS.lightBlue }]}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={{ height: 5 }} />
          <TouchableOpacity
            style={[styles.buttonStyle, { backgroundColor: COLORS.yellow }]}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DIM.width
  },

  buttonStyle: {
    width: DIM.width * 0.8,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.4
  },
  buttonText: {
    fontSize: 33,
    fontWeight: '100',
    color: COLORS.darkBlue
  }
});
