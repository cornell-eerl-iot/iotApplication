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

const NAME = {
  image: 'user',
  title: "What's your name?",
  subTitle: 'Just so we know what to call you by!',
  fullTitle: 'Name',
  buttonTitle: 'Next'
};

const EMAIL = {
  image: 'envelope',
  title: 'What email would you like to use?',
  subTitle: 'We will send a confirmation message to your email shortly.',
  fullTitle: 'Email Address',
  buttonTitle: 'Next'
};

const PASSWORD = {
  image: 'key',
  title: 'What do you want your password to be?',
  subTitle: '',
  fullTitle: 'Password',
  buttonTitle: 'Next'
};

const CONFIRMATION = {
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
      confirmationCode: 0
    };
  }

  _signUp() {
    Auth.signUp({
      username: this.state.email,
      password: this.state.password,
      attributes: {
        name: this.state.name
      }
    })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  _confirmUser() {
    Auth.confirmSignUp(this.state.email, this.state.confirmationCode, {})
      .then(data => {
        console.log(data);
        Keyboard.dismiss();
        this.props.navigation.navigate('home');
      })
      .catch(err => console.log(err));
  }

  _handleSubmit() {
    if (this.state.mode == EMAIL) {
      this.setState({ mode: PASSWORD, text: '' });
    } else if (this.state.mode == NAME) {
      this.setState({ mode: EMAIL, text: '' });
    } else if (this.state.mode == PASSWORD) {
      this._signUp();
      this.setState({ mode: CONFIRMATION, text: '' });
    } else if (this.state.mode == CONFIRMATION) {
      this._confirmUser();
    }
  }

  _handleChangedText(text) {
    if (this.state.mode == EMAIL) {
      this.setState({ email: text, text: text });
    } else if (this.state.mode == NAME) {
      this.setState({ name: text, text: text });
    } else if (this.state.mode == PASSWORD) {
      this.setState({ password: text, text: text });
    } else if (this.state.mode == CONFIRMATION) {
      this.setState({ confirmationCode: text, text: text });
    }
  }

  render() {
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
                style={[styles.buttonStyle, { backgroundColor: COLORS.yellow }]}
                onPress={() => this._handleSubmit()}
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
