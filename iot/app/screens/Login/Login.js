import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { COLORS, DIM, IMAGES } from '../../resources/constants';
import { LinearGradient } from 'expo';
import { styles } from './styles';
import { Transition } from 'react-navigation-fluid-transitions';

import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Kaede, Kohana, Makiko } from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Auth, API, graphqlOperation } from 'aws-amplify';
const IMAGE_HEIGHT = 200;
const IMAGE_HEIGHT_SMALL = 150;

const pass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const EMAIL = {
  id: 'EMAIL',
  image: 'envelope',
  title: "What's your email address?",
  fullTitle: 'Email Address',
  buttonTitle: 'Next'
};

const PASSWORD = {
  id: 'PASSWORD',
  image: 'key',
  title: "What's your password?",
  fullTitle: 'Password',
  buttonTitle: 'Login'
};

const CONFIRMATION = {
  id: 'CONFIRMATION',
  image: 'circle-thin',
  title: 'Enter the confirmation code that was emailed to you.',
  subTitle: '',
  fullTitle: 'Confirmation Code',
  buttonTitle: 'Confirm'
};

const NEW_PASSWORD = {
  id: 'NEW_PASSWORD',
  image: 'key',
  title: 'Please type your new password.',
  subTitle:
    'It must include at least one capital and lowercase letter, a number, and a symbol.',
  fullTitle: 'New Password',
  buttonTitle: 'Set Password'
};

const USER_DOES_NOT_EXIST = 'UserNotFoundException';

export default class Login extends React.Component {
  static propTypes = {
    onVerified: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      mode: EMAIL,
      username: '',
      password: '',
      text: '',
      additionalInfo: '',
      submitActive: false
    };
  }
  onSuccessfulAuth(user) {
    if (user.attributes['custom:deviceId'] != 0) {
      this.props.navigation.navigate('home');
    } else {
      this.props.navigation.navigate('register_device');
    }
  }

  async _handleSubmit() {
    if (this.state.mode.id == 'EMAIL') {
      Auth.signIn(this.state.username)
        .then(user => {
          console.log('SHOULD NEVER HAPPEN');
        })
        .catch(err => {
          if (err.code == USER_DOES_NOT_EXIST) {
            this.setState({
              additionalInfo: 'Email not found!'
            });
          } else {
            this.setState({
              mode: PASSWORD,
              text: '',
              additionalInfo: ''
            });
          }
        });
    } else if (this.state.mode.id == 'PASSWORD') {
      Auth.signIn(this.state.username, this.state.password)
        .then(data => {
          console.log('success: ', data);
          Keyboard.dismiss();
          Auth.currentAuthenticatedUser()
            .then(user => {
              this.onSuccessfulAuth(user);
            })
            .then(err => console.log('error in sign in', err));
        })
        .catch(err => {
          console.log('error', err);
          this.setState({ additionalInfo: 'Invalid password.' });
        });
    } else if (this.state.mode.id == 'CONFIRMATION') {
      this.setState({
        mode: NEW_PASSWORD,
        text: '',
        additionalInfo: NEW_PASSWORD.subTitle
      });
    } else if (this.state.mode.id == 'NEW_PASSWORD') {
      console.log('username', this.state.username);
      console.log('confirmationCode', this.state.confirmationCode);
      console.log('password', this.state.password);
      Auth.forgotPasswordSubmit(
        this.state.username,
        this.state.confirmationCode,
        this.state.password
      )
        .then(data => {
          console.log('data', data);
          this.setState({
            mode: PASSWORD,
            confirmationCode: '',
            additionalInfo: 'Successfuly changed password!',
            password: ''
          });
        })
        .catch(err => console.log('err', err));
    }
  }

  _handleChangedText(text) {
    if (this.state.mode.id == 'EMAIL') {
      this.setState({ username: text, text: text });
      this.checkEmailVerification(text);
    } else if (
      this.state.mode.id == 'PASSWORD' ||
      this.state.mode.id == 'NEW_PASSWORD'
    ) {
      this.setState({ password: text, text: text });
      this.checkPasswordVerification(text);
    } else if (this.state.mode.id == 'CONFIRMATION') {
      this.setState({ confirmationCode: text, text: text });
    }
  }

  checkEmailVerification(text) {
    if (text.length > 0) {
      this.setState({ submitActive: true });
      return;
    }
    this.setState({ submitActive: false });
  }

  checkPasswordVerification(text) {
    if (this.state.mode.id == 'NEW_PASSWORD') {
      let check = pass.test(text);

      if (check) {
        this.setState({ submitActive: true });
        return;
      }
      this.setState({ submitActive: false });
      return;
    }
    if (text.length > 0) {
      this.setState({ submitActive: true });
      return;
    }
    this.setState({ submitActive: false });
    return;
  }

  forgotPassword() {
    Auth.forgotPassword(this.state.username)
      .then(data => {
        console.log(data);
        this.setState({
          mode: CONFIRMATION,
          text: ''
        });
      })
      .catch(err => {
        this.setState({
          additionalInfo:
            'You tried to change your password too many times, come back after some time.'
        });
        console.log(err);
      });
  }

  render() {
    let forgot = null;
    let additionalInfo = null;

    if (this.state.additionalInfo) {
      additionalInfo = (
        <View style={styles.subHeader}>
          <Text
            style={[styles.additionalInfoText, this.state.additionalInfoStyles]}
          >
            {this.state.additionalInfo}
          </Text>
        </View>
      );
    }

    if (this.state.mode.id == 'PASSWORD') {
      forgot = (
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={() => this.forgotPassword()}
        >
          <Text style={styles.forgotPasswordText}>
            {'Forgot your password?'}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <LinearGradient
          style={styles.container}
          start={[0, 0.0]}
          end={[0, 1.0]}
          colors={COLORS.darkBlueGradient}
        >
          <View style={styles.header}>
            <Transition shared={'logo'}>
              <Image
                source={IMAGES.electricity}
                style={{ height: IMAGE_HEIGHT / 2, width: IMAGE_HEIGHT / 2 }}
                resizeMode={'contain'}
              />
            </Transition>
          </View>

          <View style={styles.subHeader}>
            <Text style={styles.subHeaderText}>{this.state.mode.title}</Text>
          </View>
          {additionalInfo}
          <View style={styles.body}>
            <Sae
              label={this.state.mode.fullTitle}
              iconClass={FontAwesomeIcon}
              iconName={this.state.mode.image}
              secureTextEntry={this.state.mode.id == 'PASSWORD'}
              iconColor={'white'}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              style={{ width: DIM.width * 0.8 }}
              onChangeText={text => this._handleChangedText(text)}
              value={this.state.text}
              keyboardType={
                this.state.mode.id == CONFIRMATION ? 'number-pad' : 'default'
              }
            />
            <View style={{ padding: 15 }} />
            <Transition shared="login">
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    backgroundColor: this.state.submitActive
                      ? COLORS.lightBlue
                      : COLORS.gray
                  }
                ]}
                onPress={() => this._handleSubmit()}
                disabled={!this.state.submitActive}
              >
                <Text style={styles.buttonText}>
                  {this.state.mode.buttonTitle}
                </Text>
              </TouchableOpacity>
            </Transition>
            {forgot}
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}
/*
<View style={styles.footer}>
  <Text style={styles.footerText}>
    {'Or log in with one of the following'}
  </Text>
</View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: DIM.width * 0.5,
                paddingTop: 15
              }}
            >
              <TouchableOpacity style={styles.iconWrapper}>
                <Image
                  style={styles.icon}
                  resizeMode={'contain'}
                  source={IMAGES.facebook}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWrapper}>
                <Image
                  style={styles.icon}
                  resizeMode={'contain'}
                  source={IMAGES.gmail}
                />
              </TouchableOpacity>
            </View>*/
