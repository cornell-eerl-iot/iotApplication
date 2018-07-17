import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { IMAGES } from '../../resources/constants';
import TextSquare from '../../components/TextSquare/TextSquare';
import Pie from '../../components/PieChart/PieChart4';
import { Transition } from 'react-navigation-fluid-transitions';
import { COLORS, DIM, fake_pie_data } from '../../resources/constants';

const paddingBetweenSquares = 10;
const flexOfBody = 0.7;
const TEXTCOLOR = 'white';

const COLOR_THEME_2 = ['#050505', '#004FFF', '#31AFD4', '#902D41', '#FF007F'];
const COLOR_THEME_3 = ['#00CECB', '#001F54', '#FF5E5B', '#00CECB', '#FFED66']; // really like this one
const COLOR_THEME_1 = ['#001F54', '#00CECB', '#FF5E5B', '#001F54', '#FFED66'];

/*
TODO ADD A smiley face menu, appliance menu, percent an appliance used

*/

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.widthOfSquares = (DIM.width - paddingBetweenSquares * 4) / 2;
  }
  getCurrentDate() {
    return '6/21';
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerText}>Hello, Navin</Text>
          <Text style={styles.dateText}>{this.getCurrentDate()}</Text>
          <Transition shared={'logo'}>
            <Animatable.Image
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              source={require('../../resources/electricity512px.png')}
              style={{
                height: this.widthOfSquares,
                width: this.widthOfSquares
              }}
              resizeMode={'contain'}
            />
          </Transition>
        </View>
        <View style={styles.body}>
          <View style={{ marginBottom: 10, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('day')}
            >
              <Animatable.View
                animation="bounceInDown"
                iterationCount={1}
                delay={400}
                duration={2000}
                style={[
                  styles.sharedSquare,
                  {
                    width: this.widthOfSquares,
                    height: this.widthOfSquares,
                    marginRight: 10,
                    backgroundColor: COLORS.darkBlue
                  }
                ]}
                pointerEvents={'none'}
              >
                <Transition shared={'pie'}>
                  <Pie
                    data={fake_pie_data}
                    width={this.widthOfSquares * 0.8}
                    sliceColor={COLORS.yellow}
                    fillColor={COLORS.red}
                  />
                </Transition>
                <Text
                  style={{
                    color: '#ffff',
                    fontSize: 20,
                    textAlign: 'center'
                  }}
                >
                  2000 W
                </Text>
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('energy')}
            >
              <Animatable.View
                animation="bounceInRight"
                iterationCount={1}
                delay={400}
                duration={2000}
                style={[
                  styles.sharedSquare,
                  {
                    width: this.widthOfSquares,
                    height: this.widthOfSquares,
                    backgroundColor: COLORS.lightBlue
                  }
                ]}
              >
                <Image
                  style={{
                    width: this.widthOfSquares / 2,
                    height: this.widthOfSquares / 2
                  }}
                  source={IMAGES.trends}
                />
                <Transition shared={'buttonText1'}>
                  <Text
                    style={{
                      color: '#ffff',
                      fontSize: 20,
                      textAlign: 'center'
                    }}
                  >
                    Trends
                  </Text>
                </Transition>
              </Animatable.View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 10, flexDirection: 'row' }}>
            <TouchableOpacity>
              <Animatable.View
                animation="bounceInLeft"
                iterationCount={1}
                delay={400}
                duration={2000}
                style={[
                  styles.sharedSquare,
                  {
                    width: this.widthOfSquares,
                    height: this.widthOfSquares,
                    marginRight: 10,
                    backgroundColor: COLORS.red
                  }
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Animatable.View
                animation="bounceInUp"
                iterationCount={1}
                delay={400}
                duration={2000}
                style={[
                  styles.sharedSquare,
                  {
                    width: this.widthOfSquares,
                    height: this.widthOfSquares,
                    backgroundColor: COLORS.yellow
                  }
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR_THEME_1[0]
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
    padding: 20
  },
  headerText: {
    textAlign: 'center',
    fontSize: 45,
    color: TEXTCOLOR
  },
  dateText: {
    textAlign: 'center',
    fontSize: 20,
    color: TEXTCOLOR
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  sharedSquare: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
