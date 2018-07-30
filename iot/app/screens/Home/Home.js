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
import Ripple from 'react-native-material-ripple';
import * as Animatable from 'react-native-animatable';
import TextSquare from '../../components/TextSquare/TextSquare';
import Pie from '../../components/PieChart/PieChart4';
import { Transition } from 'react-navigation-fluid-transitions';
import { LinearGradient } from 'expo';
import { ProgressCircle } from 'react-native-svg-charts';
import { ClipPath, Defs, Rect, Stop, Text as TextSVG } from 'react-native-svg';

import {
  COLORS,
  DIM,
  fakeData,
  IMAGES,
  EMOTIONS,
  getApplianceInfo,
  TRENDS_TAGLINES
} from '../../resources/constants';

const FAKE_NUMBER_BASE = 2000;
const UNIT = 'W';
const FULL_UNIT = 'Watts';

const Separator = props => (
  <View
    style={{
      width: props.width,
      height: props.height,
      backgroundColor: COLORS.black,
      alignItems: 'center',
      justifyContent: 'center'
    }}
  />
);

const CURRENT_EMOTION_STATUS = EMOTIONS.veryHappy;
/*
TODO ADD A smiley face menu, appliance menu, percent an appliance used

*/

const fake_pie_data = Object.values(fakeData);

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.widthOfSquares = (DIM.width - 10 * 4) / 2;

    this.state = {
      progress: 0.4,
      labelWidth: 0,
      notification: true
    };
  }
  getCurrentDate() {
    return '7/18';
  }

  render() {
    return (
      <LinearGradient
        style={styles.container}
        start={[0, 0.5]}
        end={[0, 1.0]}
        colors={COLORS.darkBlueGradient}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerText}>Hello Navin</Text>
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: DIM.width
          }}
        >
          <ProgressCircle
            animate
            style={{
              height: 240,
              width: 240,
              shadowOffset: { width: 1, height: 1 },
              shadowColor: COLORS.lightBlue,
              shadowOpacity: 1.0
            }}
            progress={this.state.progress}
            progressColor={COLORS.yellow}
            startAngle={-Math.PI * 0.8}
            endAngle={Math.PI * 0.8}
            backgroundColor={'transparent'}
            strokeWidth={5}
            cornerRadius={1}
          />
          <ProgressCircle
            style={{
              height: 260,
              width: 260,
              position: 'absolute'
            }}
            progress={1}
            progressColor={COLORS.darkBlue}
            startAngle={-Math.PI * 0.8}
            endAngle={Math.PI * 0.8}
            backgroundColor={COLORS.white}
            strokeWidth={10}
            cornerRadius={1}
          />
          <Text
            style={[
              {
                position: 'absolute'
              },
              styles.centerLabelStyle
            ]}
          >
            {FAKE_NUMBER_BASE}
          </Text>

          <Text
            style={[
              {
                position: 'absolute',
                top: DIM.width / 2 - 10,
                color: '#dddddd',
                fontWeight: '100'
              }
            ]}
          >
            {FULL_UNIT}
          </Text>

          <View
            style={{
              position: 'absolute',
              top: DIM.width / 2 + 20,

              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={[
                {
                  color: '#fff',
                  fontWeight: '100'
                }
              ]}
            >
              {'Excellent'}
            </Text>
            <Transition shared={'logo'}>
              <Image
                source={IMAGES.electricity}
                style={{
                  width: 100,
                  height: 100
                }}
                resizeMode={'contain'}
              />
            </Transition>
            <Text
              style={[
                {
                  color: '#fff',
                  fontWeight: '100'
                }
              ]}
            >
              {'High'}
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={{ marginBottom: 10, flexDirection: 'row' }}>
            <Animatable.View
              animation="bounceInLeft"
              iterationCount={1}
              delay={400}
              duration={2000}
              style={[
                styles.sharedSquare,
                {
                  width: this.widthOfSquares,
                  height: this.widthOfSquares / 2,
                  marginRight: 10,
                  backgroundColor: '#ffffff03'
                }
              ]}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.subHeaderText2}>200</Text>
                <Text style={styles.subHeaderTextUnit}> {UNIT}</Text>
              </View>
              <Text style={styles.subHeaderText}>Energy Used</Text>
            </Animatable.View>

            <Animatable.View
              animation="bounceInRight"
              iterationCount={1}
              delay={400}
              duration={2000}
              style={[
                styles.sharedSquare,
                {
                  width: this.widthOfSquares,
                  height: this.widthOfSquares / 2,
                  backgroundColor: '#ffffff03'
                }
              ]}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.subHeaderTextUnit}>$</Text>
                <Text style={styles.subHeaderText2}>12</Text>
              </View>
              <Text style={styles.subHeaderText}>Cost</Text>
            </Animatable.View>
          </View>
          <View style={{ marginBottom: 10, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('day')}
            >
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
                    marginRight: 10
                  }
                ]}
                pointerEvents={'none'}
              >
                <Transition shared={'pie'}>
                  <Pie
                    data={fake_pie_data}
                    width={this.widthOfSquares}
                    sliceColor={COLORS.yellow}
                    fillColor={COLORS.red}
                  />
                </Transition>
              </Animatable.View>
            </TouchableOpacity>

            <Ripple
              rippleColor={COLORS.lightBlue}
              onPress={() => this.props.navigation.navigate('energy')}
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
                    height: this.widthOfSquares
                  }
                ]}
              >
                <Image
                  style={{
                    width: this.widthOfSquares * 0.7,
                    height: this.widthOfSquares * 0.7,
                    shadowOffset: { width: 4, height: 4 },
                    shadowColor: COLORS.black,
                    shadowOpacity: 0.8
                  }}
                  source={IMAGES.trends}
                  resizeMode={'contain'}
                />
              </Animatable.View>
            </Ripple>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0.18,
    marginTop: 20,
    width: DIM.width
  },
  headerText: {
    textAlign: 'center',
    fontSize: 55,
    color: COLORS.white,
    fontWeight: '100',
    letterSpacing: 3
  },
  dateText: {
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.white,
    fontWeight: '100'
  },
  body: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 0.6
  },
  sharedSquare: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff09'
  },
  centerLabelStyle: {
    textAlign: 'center',
    fontSize: 75,
    fontWeight: '100',
    color: COLORS.yellow
  },
  subHeaderText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '100'
  },
  subHeaderText2: {
    fontSize: 30,
    color: COLORS.white,
    fontWeight: '300'
  },
  subHeaderTextUnit: {
    fontSize: 30,
    color: COLORS.white + 80,
    fontWeight: '100'
  }
});

/*
<View
  style={{
    justifyContent: 'center',
    width: DIM.width,
    alignItems: 'center'
  }}
>
  <Transition shared={'logo'}>
    <Animatable.Image
      source={IMAGES.electricity}
      style={{
        height: this.widthOfSquares * 0.6,
        width: this.widthOfSquares * 0.6,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: COLORS.black,
        shadowOpacity: 0.8
      }}
      resizeMode={'contain'}
    />
  </Transition>
</View>
*/
