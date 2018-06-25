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
  Animated
} from 'react-native';

import {
  hash,
  compareHash,
  setRandom
} from '../components/Authentication/auth.js';

IMAGE_HEIGHT = 250;
IMAGE_HEIGHT_SMALL = 150;

LOGIN = 'login';
REGISTER = 'register';
/*
 // TODO:
Username isn't case sensitive (Done)
Move Register to the bottom with (Don't have an account? Register now!)
Background
Add shadow to inputs
Backdrop press
 */
export default class App extends React.Component {
  constructor() {
    super();

    setRandom();

    this.state = {
      status: 'Login or register now!',
      email: '',
      password: '',
      retypePassword: '',
      emailStatus: 'black',
      passwordStatus: 'black',
      retypePasswordStatus: 'black',
      retypePasswordImage: { image: '', width: 0, height: 0 },
      database: {},
      page: LOGIN
    };

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
    var LOGIN_VIEW = (
      <View>
        <View style={{ flexDirection: 'row' }}>
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
        </View>
        <View style={{ flexDirection: 'row' }}>
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
        </View>
        <View>
          <View style={styles.loginWrapper}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                if (this.verifyAssertions()) this.login();
              }}
            >
              <Text style={styles.loginButtonText}> Login </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.registerRequestWrapper}>
          <Text style={{ fontSize: 16, color: 'white' }}>
            {"Don't have an account?"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ page: REGISTER });
            }}
          >
            <Text style={styles.registerButtonText}> Register Now!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    var REGISTER_VIEW = (
      <View>
        <View style={{ flexDirection: 'row' }}>
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
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.textInputWrapper}>
            <TextInput
              secureTextEntry={true}
              style={[styles.input, { borderColor: this.state.passwordStatus }]}
              onChangeText={text => {
                this.setState({ password: text });
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
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.textInputWrapper}>
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
              clearTextOnFocus={true}
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
        <View>
          <View style={styles.loginWrapper}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                if (this.verifyAssertions()) this.register();
              }}
            >
              <Text style={styles.loginButtonText}> Register </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.registerRequestWrapper}>
          <Text style={{ fontSize: 16, color: 'white' }}>
            {'Have an account already?'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ page: LOGIN });
            }}
          >
            <Text style={styles.registerButtonText}> Sign in.</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    let page = null;
    if (this.state.page == LOGIN) {
      page = LOGIN_VIEW;
    } else {
      page = REGISTER_VIEW;
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ImageBackground
          source={require('../resources/houseFilter.jpg')}
          style={{ flex: 1 }}
        >
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
            {page}
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
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
  verifyAssertions() {
    //Must verify that both fields are filled
    let email = this.state.email;
    let password = this.state.password;

    if (email == '' && password == '') {
      this.setState({
        status: 'You must fill in all fields!',
        emailStatus: 'red',
        passwordStatus: 'red'
      });
      return false;
    } else if (email == '') {
      this.setState({
        status: 'You must have a email!',
        emailStatus: 'red',
        passwordStatus: 'black'
      });
      return false;
    } else if (password == '') {
      this.setState({
        status: 'You must have a password!',
        emailStatus: 'black',
        passwordStatus: 'red'
      });
      return false;
    }
    this.setState({
      emailStatus: 'black',
      passwordStatus: 'black'
    });
    return true;
  }

  register() {
    let email = this.state.email;
    if (this.getPersonFromDatabase(email)) {
      this.setState({ status: 'email already exists!' });
      return;
    } else {
      let password = this.state.password;
      hashedPassword = hash(password); // = {password: ***, salt: ***}
      this.addPersonToDatabase(
        email,
        hashedPassword.password,
        hashedPassword.salt
      );
    }
    this.setState({
      status: 'Successfully registered.',
      password: '',
      email: ''
    });
  }

  /*Returns person from database if it exists in db. If not returns None.
  Must be in the form of an Object
  {
    password:
    salt:
  }
  */
  getPersonFromDatabase(email) {
    return this.state.database[email];
  }

  //adds email, password, and salt to database
  addPersonToDatabase(email, password, salt) {
    this.state.database[email] = {
      password: password,
      salt: salt
    };
  }

  login() {
    let email = this.state.email;
    let info = this.getPersonFromDatabase(email);
    if (!info) {
      this.setState({ status: 'email does not exist. Please Register.' });
      return;
    }

    let password = info.password;
    let status = compareHash(this.state.password, password);

    if (!status) {
      this.setState({ status: 'Invalid username or password.' });
    } else {
      this.setState({
        status: 'Successfully logged in!',
        password: '',
        email: ''
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginBottom: 30,
    flex: 1,
    justifyContent: 'space-between'
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    color: 'white',
    padding: 5,
    fontWeight: 'bold'
  },
  textInputWrapper: {
    backgroundColor: '#44454780',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.7,
    justifyContent: 'space-between',
    marginBottom: 20,
    flex: 1
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
    marginTop: 20,
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
    justifyContent: 'center'
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
  }
});
