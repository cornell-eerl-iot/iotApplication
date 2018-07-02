import React from 'react';
import PropTypes from 'prop-types';
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
  Easing,
  ActivityIndicator
} from 'react-native';
import {
  getPerson,
  addPerson,
  createLoginTable
} from '../database/DatabaseManager';
import {
  hash,
  compareHash,
  setRandom
} from '../components/Authentication/auth.js';
import { IMAGES } from '../resources/constants';
import {
  Transition,
  createFluidNavigator
} from 'react-navigation-fluid-transitions';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from 'react-native-indicators';

const IMAGE_HEIGHT = 250;
const IMAGE_HEIGHT_SMALL = 150;

const LOGIN = 'login';
const REGISTER = 'register';

/*
 // TODO:
Username isn't case sensitive (Done)
Move Register to the bottom with (Don't have an account? Register now!)
Background
Add shadow to inputs
Backdrop press
 */
export default class Login extends React.Component {
  static propTypes = {
    onVerified: PropTypes.func
  };

  constructor(props) {
    super(props);
    createLoginTable();
    setRandom();

    this.state = {
      status: 'Login or register now!',
      email: '',
      password: '',
      name: '',
      retypePassword: '',
      emailStatus: 'black',
      passwordStatus: 'black',
      emailStatusText: '',
      passwordStatusText: '',
      nameStatus: 'black',
      nameStatusText: '',
      retypePasswordStatusText: '',
      retypePasswordStatus: 'black',
      retypePasswordImage: { image: '', width: 0, height: 0 },
      database: {},
      page: LOGIN,
      loading: false
    };

    this.LOGIN_VIEW = props => (
      <Transition appear="horizontal">
        <View style={{ justifyContent: 'space-between' }}>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={[styles.input, { borderColor: this.state.emailStatus }]}
              onChangeText={text => this.setState({ email: text })}
              placeholderTextColor={'white'}
              placeholder={'Email address'}
              keyboardAppearance={'dark'}
              keyboardType={'email-address'}
              value={this.state.email}
              autoCapitalize={'none'}
            />
          </View>
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.statusText}>{this.state.emailStatusText}</Text>
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              secureTextEntry={true}
              style={[styles.input, { borderColor: this.state.passwordStatus }]}
              onChangeText={text => this.setState({ password: text })}
              keyboardAppearance={'dark'}
              placeholderTextColor={'white'}
              placeholder={'Password'}
              clearButtonMode={'always'}
              clearTextOnFocus={true}
              value={this.state.password}
              autoCapitalize={'none'}
            />
          </View>
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.statusText}>
              {this.state.passwordStatusText}
            </Text>
          </View>
          <View style={[styles.loginWrapper, { flexDirection: 'row' }]}>
            {this.loadingDeterminer(LOGIN)}
          </View>

          <View style={styles.registerRequestWrapper}>
            <Text style={{ fontSize: 16, color: 'white' }}>
              {"Don't have an account?"}
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('register');
                this.resetState(REGISTER);
              }}
            >
              <Text style={styles.registerButtonText}> Register Now!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Transition>
    );

    this.REGISTER_VIEW = props => (
      <View>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={[styles.input, { borderColor: this.state.nameStatus }]}
            onChangeText={text => this.setState({ name: text })}
            placeholderTextColor={'white'}
            placeholder={'Name'}
            keyboardAppearance={'dark'}
            value={this.state.name}
          />
        </View>
        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.statusText}>{this.state.nameStatusText}</Text>
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={[styles.input, { borderColor: this.state.emailStatus }]}
            onChangeText={text => this.setState({ email: text })}
            placeholderTextColor={'white'}
            placeholder={'Email address'}
            keyboardAppearance={'dark'}
            keyboardType={'email-address'}
            value={this.state.email}
            autoCapitalize={'none'}
          />
        </View>
        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.statusText}>{this.state.emailStatusText}</Text>
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            secureTextEntry={true}
            style={[styles.input, { borderColor: this.state.passwordStatus }]}
            onChangeText={text => {
              this.setState({ password: text, retypePassword: '' });
            }}
            keyboardAppearance={'dark'}
            placeholderTextColor={'white'}
            placeholder={'Password'}
            clearButtonMode={'always'}
            clearTextOnFocus={true}
            value={this.state.password}
            autoCapitalize={'none'}
          />
        </View>
        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.statusText}>{this.state.passwordStatusText}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.textInputWrapper, { flex: 1 }]}>
            <TextInput
              secureTextEntry={true}
              style={[
                styles.input,
                { borderColor: this.state.retypePasswordStatus }
              ]}
              onChangeText={text => {
                this.checkRetypedPassword(text);
              }}
              keyboardAppearance={'dark'}
              placeholderTextColor={'white'}
              placeholder={'Retype password'}
              clearButtonMode={'always'}
              value={this.state.retypePassword}
              autoCapitalize={'none'}
            />
          </View>
          <Image
            source={this.state.retypePasswordImage.image}
            style={{
              width: this.state.retypePasswordImage.width,
              height: this.state.retypePasswordImage.height
            }}
          />
        </View>
        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.statusText}>
            {this.state.retypePasswordStatusText}
          </Text>
        </View>
        <View>
          <View style={[styles.loginWrapper, { flexDirection: 'row' }]}>
            {this.loadingDeterminer(REGISTER)}
          </View>
        </View>

        <View style={styles.registerRequestWrapper}>
          <Text style={{ fontSize: 16, color: 'white' }}>
            {'Have an account already?'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
              this.resetState(LOGIN);
            }}
          >
            <Text style={styles.registerButtonText}> Sign in.</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    this.Navigator = createFluidNavigator(
      {
        login: this.LOGIN_VIEW,
        register: this.REGISTER_VIEW
      },
      { navigationOptions: { gesturesEnabled: false } }
    );

    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }
  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    );
  }

  loadingDeterminer(page) {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          size="small"
          color="#ffd86c"
          animating={this.state.loading}
        />
      );
    } else {
      if (page == LOGIN) {
        return (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              if (this.verifyAssertions()) this.login();
            }}
          >
            <Text style={styles.loginButtonText}> Login </Text>
          </TouchableOpacity>
        );
      } else if (page == REGISTER) {
        return (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              if (this.verifyAssertions()) this.register();
            }}
          >
            <Text style={styles.loginButtonText}> Register </Text>
          </TouchableOpacity>
        );
      }
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT_SMALL
      })
    ]).start();
  };

  keyboardWillHide = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT
      })
    ]).start();
  };

  render() {
    return (
      <ImageBackground source={IMAGES.loginPage1} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={styles.container}
        >
          <Animated.View style={styles.header}>
            <Animated.Image
              source={require('../resources/electricity512px.png')}
              style={{ height: this.imageHeight, width: this.imageHeight }}
              resizeMode={'contain'}
            />
          </Animated.View>
          <View style={{ flex: 0.5 }}>
            <this.Navigator navigation={this.props.navigation} />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
  checkRetypedPassword(text) {
    if (text == '') {
      this.setState({
        retypePassword: text,
        retypePasswordImage: '',
        retypePasswordStatus: 'black'
      });
      return;
    }
    if (this.state.password != text) {
      this.setState({
        retypePassword: text,
        retypePasswordImage: {
          image: require('../resources/cross.png'),
          width: 40,
          height: 40
        },
        retypePasswordStatus: 'red'
      });
    } else {
      this.setState({
        retypePassword: text,
        retypePasswordImage: {
          image: require('../resources/checkmark.png'),
          width: 40,
          height: 40
        },
        retypePasswordStatus: 'black'
      });
    }
  }

  resetState(view) {
    this.setState({
      passwordStatus: 'black',
      emailStatus: 'black',
      retypePasswordStatus: 'black',
      retypePassword: '',
      retypePasswordStatusText: '',
      retypePasswordImage: '',
      passwordStatusText: '',
      emailStatusText: '',
      email: '',
      password: '',
      name: '',
      nameStatus: 'black',
      nameStatusText: '',
      page: view
    });
  }

  verifyAssertions() {
    //Must verify that both fields are filled
    let confirmation = true;

    let email = this.state.email;
    let password = this.state.password;
    let name = this.state.name;

    //things to update: emailStatus, emailStatusText, nameStatus, nameStatusText,
    //passwordStatus, passwordStatusText, retypePasswordStatus, retypePasswordStatusText,
    //retypePasswordImage
    let es = 'black'; //email status
    let est = ''; //email status text
    let ns = 'black'; //name status
    let nst = ''; //name status text
    let ps = 'black'; //password status
    let pst = ''; //password status text
    let rps = 'black'; //retype password status
    let rpst = ''; //retype password status text

    if (email == '' || !this.verifyEmail(email)) {
      es = 'red';
      est = 'Please enter a valid email.';
      confirmation = false;
    }
    if (password == '') {
      ps = 'red';
      pst = 'Please enter a password.';
      confirmation = false;
    }
    // if on Register Screen verify that retyped password is equal to typed password,
    //and a name is typed in
    if (this.state.page == REGISTER) {
      if (name == '') {
        ns = 'red';
        nst = 'Please enter a name';
        confirmation = false;
      }

      if (this.state.password != this.state.retypePassword) {
        rpst = 'Passwords do not match!';
        confirmation = false;
      }
    }
    this.setState({
      emailStatus: es,
      emailStatusText: est,
      nameStatus: ns,
      nameStatusText: nst,
      passwordStatus: ps,
      passwordStatusText: pst,
      retypePasswordStatus: rps,
      retypePasswordStatusText: rpst
    });

    return confirmation;
  }

  verifyEmail(email) {
    //check for an @ symbol
    if (email.indexOf('@') < 0 && email.indexOf('.') < 0) {
      return false;
    }
    // if (!email.endsWith('.com') || ) {
    //   return false;
    // }
    return true;
  }

  //adds email, password, and salt to database
  addPersonToDatabase(email, password, salt, name) {
    addPerson(email, password, salt, name);
  }

  register() {
    this.setState({ loading: true });
    getPerson(this.state.email, rs => {
      if (!rs) {
        let email = this.state.email;

        let password = this.state.password;
        hashedPassword = hash(password); // = {password: ***, salt: ***}
        this.addPersonToDatabase(
          email,
          hashedPassword.password,
          hashedPassword.salt,
          this.state.name
        );
        this.props.onVerified();
        this.setState({ loading: false });
      } else {
        console.log('entered if statement (rs) and rs is: ', rs);
        this.setState({
          emailStatusText: 'Account for this email already exists!',
          emailStatus: 'red',
          loading: false
        });
      }
    });
  }

  login() {
    //check if account EXISTS
    this.setState({ loading: true });
    getPerson(this.state.email, info => {
      console.log('info', info);
      if (info) {
        let email = this.state.email;
        let password = info.password;
        let status = compareHash(this.state.password, password);

        if (!status) {
          this.setState({
            status: 'Invalid username or password.',
            passwordStatusText: 'Invalid username or password.',
            loading: false
          });
        } else {
          this.setState({
            status: 'Successfully logged in!',
            password: '',
            email: '',
            passwordStatusText: '',
            emailStatusText: '',
            loading: false
          });

          this.props.onVerified();
          console.log('Logged in!');
        }
      } else {
        this.setState({
          emailStatus: 'red',
          emailStatusText: 'You do not have an account. Please register.',
          passwordStatusText: '',
          passwordStatus: 'black',
          loading: false
        });
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'space-around'
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    color: 'white',
    padding: 5,
    fontWeight: 'bold'
  },
  textInputWrapper: {
    backgroundColor: '#44454740',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.7
  },
  loginButton: {
    padding: 10,
    backgroundColor: '#ffd86c',
    borderRadius: 10,
    alignItems: 'center'
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000'
  },
  loginWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    textAlign: 'center',
    fontSize: 37,
    color: 'black'
  },
  header: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3
  },
  headerImage: {
    width: IMAGE_HEIGHT,
    height: IMAGE_HEIGHT
  },
  registerRequestWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  registerButtonText: {
    textAlign: 'center',
    color: '#ffd86c',
    fontSize: 16,
    fontWeight: 'bold'
  },
  statusText: {
    color: 'red',
    fontSize: 13,
    fontWeight: 'bold'
  }
});
