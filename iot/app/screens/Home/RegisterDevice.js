import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, DIM, IMAGES } from '../../resources/constants';
import { LinearGradient } from 'expo';
import { Sae, Kaede, Kohana, Makiko } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Transition } from 'react-navigation-fluid-transitions';
import { Auth, API, graphqlOperation } from 'aws-amplify';
const GetData = `query getData($userId:String!) {
  getIotData(userId: $userId) {
    powerSeries{time, power}
    devices{title, powerUsage}

  }
}`;

export default class RegisterDevice extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      deviceId: '',
      userCredentials: null
    };
  }

  async registerDevice() {
    //1. check if device is claimed or exists

    const oneEvent = await API.graphql(
      graphqlOperation(GetData, { userId: this.state.deviceId })
    );
    console.log('oneEvent', oneEvent);

    //if null, the device does not already exist or is not claimed
    if (oneEvent.data.getIotData == null || !oneEvent.data.getIotData.claimed) {
      Auth.currentAuthenticatedUser()
        .then(user => {
          console.log('user', user);
          Auth.updateUserAttributes(user, {
            custom: {
              deviceId: this.state.deviceId
            }
          })
            .then(success => {
              console.log('success', success);
            })
            .catch(err => {
              console.log('err in updateUserAttribute', err);
            });
        })
        .catch(err => {
          console.log('error in Current user info', err);
        });
    } else {
      console.log('device already registered.');
    }

    // const oneEvent = await API.graphql(
    //   graphqlOperation(GetData, { userId: '12345' })
    // );
    // console.log(oneEvent);
  }

  render() {
    return (
      <LinearGradient
        style={styles.container}
        start={[0, 1.0]}
        end={[0, 0.0]}
        colors={COLORS.yellowBlueGradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Register your device!</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>Enter your device ID.</Text>
          <Sae
            label={'Device ID'}
            iconClass={FontAwesomeIcon}
            iconName={'id-card'}
            iconColor={'white'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={{ width: DIM.width * 0.8 }}
            onChangeText={text => this.setState({ deviceId: text })}
            placeholderTextColor={COLORS.yellow}
            labelStyle={{ color: COLORS.darkBlue, fontWeight: '100' }}
          />
          <Transition shared={'register'}>
            <TouchableOpacity
              onPress={() => {
                this.registerDevice();
              }}
              style={[styles.buttonStyle, { backgroundColor: COLORS.yellow }]}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </Transition>
        </View>

        <TouchableOpacity style={styles.footer}>
          <Text style={styles.footerText}>{"Can't find it?"}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  headerText: {
    textAlign: 'center',
    fontSize: 55,
    color: COLORS.white,
    fontWeight: '100',
    letterSpacing: 3
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
    marginTop: 20,
    width: DIM.width
  },
  body: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0.5
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 30,
    color: COLORS.darkBlue,
    fontWeight: '100',
    letterSpacing: 2
  },
  footerText: {
    fontSize: 25,
    fontWeight: '200'
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: DIM.width,
    justifyContent: 'center'
  },
  buttonStyle: {
    width: DIM.width * 0.8,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',

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
