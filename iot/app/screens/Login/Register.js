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
import { Auth } from 'aws-amplify';

const IMAGE_HEIGHT = 200;
const IMAGE_HEIGHT_SMALL = 150;
const pass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const USER_DOES_NOT_EXIST = 'UserNotFoundException';
const NAME = {
  id: 'NAME',
  image: 'user',
  title: "What's your name?",
  subTitle: 'Just so we know what to call you by!',
  fullTitle: 'Name',
  buttonTitle: 'Next'
};

const EMAIL = {
  id: 'EMAIL',
  image: 'envelope',
  title: 'What email would you like to use?',
  subTitle: 'We will send a confirmation message to your email shortly.',
  fullTitle: 'Email Address',
  buttonTitle: 'Next'
};

const PASSWORD = {
  id: 'PASSWORD',
  image: 'key',
  title: 'What do you want your password to be?',
  subTitle: '',
  fullTitle: 'Password',
  buttonTitle: 'Next'
};

const CONFIRMATION = {
  id: 'CONFIRMATION',
  image: 'circle-thin',
  title: 'Enter the confirmation code that was emailed to you.',
  subTitle: '',
  fullTitle: 'Confirmation Code',
  buttonTitle: 'Confirm'
};

export default class Login extends React.Component {
  static propTypes = {
    onVerified: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      mode: NAME,
      email: '',
      password: '',
      name: '',
      text: '',
      confirmationCode: 0,
      submitActive: false,
      additionalInfo: '',
      additionalInfoStyles: null
    };
  }

  _signUp() {
    Auth.signUp({
      username: this.state.email,
      password: this.state.password,
      attributes: {
        name: this.state.name,
        'custom:deviceId': '0'
      }
    })
      .then(data => {
        console.log('successful sign up: ', data);
      })
      .catch(err => console.log(err));
  }

  _confirmUser() {
    Auth.confirmSignUp(this.state.email, this.state.confirmationCode, {})
      .then(data => {
        console.log('confirm sign up data', data);
        Keyboard.dismiss();
        Auth.signIn(this.state.email, this.state.password).then(user => {
          this.props.navigation.navigate('register_device');
        });
      })
      .catch(err => console.log(err));
  }

  _handleSubmit() {
    if (this.state.mode == EMAIL) {
      //this.setState({ mode: PASSWORD, text: '' , submitActive:});
      Auth.signIn(this.state.email)
        .then(user => {
          console.log('SHOULD NEVER HAPPEN');
        })
        .catch(err => {
          if (err.code == USER_DOES_NOT_EXIST) {
            console.log('err, user not exists?', err);
            this.setState({
              mode: PASSWORD,
              submitActive: false,
              text: '',
              additionalInfo: ''
            });
          } else {
            console.log('err', err);
            this.setState({
              additionalInfo: 'You already have an account. Please log in.',
              submitActive: false
            });
          }
        });
    } else if (this.state.mode == NAME) {
      this.setState({
        mode: EMAIL,
        text: '',
        submitActive: false,
        additionalInfo: ''
      });
    } else if (this.state.mode == PASSWORD) {
      this._signUp();
      this.setState({
        mode: CONFIRMATION,
        text: '',
        submitActive: false,
        additionalInfo: ''
      });
    } else if (this.state.mode == CONFIRMATION) {
      this._confirmUser();
    }
  }

  _handleChangedText(text) {
    if (this.state.mode == EMAIL) {
      this.setState({ email: text, text: text });
      this.checkEmailVerification(text);
    } else if (this.state.mode == NAME) {
      this.setState({ name: text, text: text });
      this.checkEmailVerification(text);
    } else if (this.state.mode == PASSWORD) {
      this.setState({ password: text, text: text });
      this.checkPasswordVerification(text);
    } else if (this.state.mode == CONFIRMATION) {
      this.setState({ confirmationCode: text, text: text });
      this.checkConfirmationVerification(text);
    }
  }

  checkEmailVerification(text) {
    this.setState({ submitActive: text.length > 0 });
  }

  checkPasswordVerification(text) {
    this.setState({ submitActive: pass.test(text) });
  }

  checkConfirmationVerification(text) {
    this.setState({ submitActive: text.length == 6 });
  }

  render() {
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
          <View style={styles.textSubmit}>
            <Sae
              label={this.state.mode.fullTitle}
              iconClass={FontAwesomeIcon}
              iconName={this.state.mode.image}
              secureTextEntry={this.state.mode == PASSWORD}
              iconColor={'white'}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              style={{ width: DIM.width * 0.8 }}
              onChangeText={text => this._handleChangedText(text)}
              value={this.state.text}
              keyboardType={
                this.state.mode == CONFIRMATION ? 'number-pad' : 'default'
              }
            />
          </View>

          <View style={styles.body}>
            <View style={{ padding: 15 }} />
            <Transition shared="register">
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    backgroundColor: this.state.submitActive
                      ? COLORS.yellow
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
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

/*
Archive footer

<View style={styles.footer}>
  <Text style={styles.footerText}>
    {'Or log in with one of the following'}
  </Text>

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
  </View>
</View>

*/
