import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import {
  COLORS,
  applianceImageMap,
  DIM,
  IMAGES
} from '../../resources/constants';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';
const FINAL_HEIGHT = DIM.height * 0.4;
const INITIAL_HEIGHT = 100;
export default class ModernCard extends React.Component {
  static propTypes = {
    applianceInfo: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      height: new Animated.Value(INITIAL_HEIGHT),
      heightComponent: new Animated.Value(0),
      rotateY: new Animated.Value(0)
    };
  }

  expand = () => {
    Animated.timing(this.state.height, {
      toValue: FINAL_HEIGHT,
      duration: 300
    }).start();

    Animated.timing(this.state.heightComponent, {
      toValue: FINAL_HEIGHT - INITIAL_HEIGHT,
      duration: 300
    }).start();

    Animated.timing(this.state.rotateY, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear
    }).start();

    this.setState({ isExpanded: true });
  };

  close = () => {
    Animated.timing(this.state.height, {
      toValue: INITIAL_HEIGHT,
      duration: 300
    }).start();

    Animated.timing(this.state.heightComponent, {
      toValue: 0,
      duration: 300
    }).start();

    Animated.timing(this.state.rotateY, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear
    }).start();

    this.setState({ isExpanded: false });
  };

  render() {
    const rotateX = this.state.rotateY.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '180deg']
    });

    let {
      title,
      averageEnergyUsage,
      percentOfDay,
      efficiency,
      currentEnergyUsage
    } = this.props.applianceInfo;
    let image = applianceImageMap[title];

    return (
      <Animated.View
        style={[styles.wrapper, { height: this.state.height * 1.2 }]}
      >
        <Animated.View
          style={[
            styles.container,
            {
              height: this.state.height
            }
          ]}
        >
          <LinearGradient
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8
            }}
            start={[0, 0.0]}
            end={[0, 1.0]}
            colors={COLORS.darkBlueGradient}
          >
            <Text style={styles.headerText}>{title}</Text>

            <View
              style={[
                styles.currentEnergyUsage,
                {
                  backgroundColor:
                    currentEnergyUsage == 0 ? COLORS.gray : COLORS.green
                }
              ]}
            >
              <Text style={styles.subHeaderText}>
                {currentEnergyUsage == 0 ? 'OFF' : currentEnergyUsage + 'W'}
              </Text>
            </View>
            <Animated.View
              style={[
                styles.hiddenComponent,
                {
                  height: this.state.heightComponent
                }
              ]}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={{ height: 5 }} />
                <View style={styles.subHeaderText1Wrapper}>
                  <Text style={styles.subHeaderText1}>Average Power</Text>
                  <Text style={styles.subHeaderText1}>
                    {averageEnergyUsage + ' W'}
                  </Text>
                </View>
                <View style={{ height: 5 }} />
                <View style={styles.subHeaderText2Wrapper}>
                  <Text style={styles.subHeaderText2}>Average Run Time</Text>
                  <Text style={styles.subHeaderText2}>28 Minutes</Text>
                </View>
              </View>

              <View style={styles.subHeaderText4Wrapper}>
                <View style={{ height: 5 }} />
                <Text style={styles.subHeaderText4}>
                  Consider getting an energy efficient device! You would save
                  $56 over one year with your current usage.
                </Text>
              </View>
            </Animated.View>
          </LinearGradient>
        </Animated.View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={image} resizeMode={'contain'} />
        </View>
        <TouchableOpacity
          style={styles.dropDownButton}
          onPress={() => {
            this.state.isExpanded ? this.close() : this.expand();
            this.props.onPress();
          }}
        >
          <Animated.View style={{ transform: [{ rotate: rotateX }] }}>
            <Image
              style={styles.expandImage}
              source={IMAGES.expand2}
              resizeMode={'contain'}
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: DIM.width * 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  container: {
    width: DIM.width * 0.95 - 75,
    height: 100,
    borderRadius: 8,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.4,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 0,
    borderColor: '#fff'
  },
  imageWrapper: {
    position: 'absolute',
    width: 75,
    height: 75,
    left: 0,
    top: 12.5,
    backgroundColor: COLORS.yellow,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 3, height: 3 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.5
  },
  image: {
    width: 50,
    height: 50
  },

  dropDownButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: DIM.width * 0.04,
    top: 25,
    backgroundColor: COLORS.yellow,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 3, height: 3 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.5
  },
  headerText: {
    fontSize: 45,
    fontWeight: '200',
    color: COLORS.white
  },
  subHeaderText: {
    fontSize: 25,
    fontWeight: '100',
    color: COLORS.black
  },
  subHeaderText1: {
    fontSize: 20,
    fontWeight: '100',
    color: COLORS.white,
    textAlign: 'center'
  },
  subHeaderText2: {
    fontSize: 20,
    fontWeight: '100',
    color: COLORS.white,
    textAlign: 'center'
  },
  subHeaderText3: {
    fontSize: 20,
    fontWeight: '100',
    color: COLORS.white,
    textAlign: 'center'
  },
  subHeaderText4: {
    fontSize: 18,
    fontWeight: '100',
    color: COLORS.white,
    textAlign: 'center',
    textAlign: 'center'
  },
  currentEnergyUsage: {
    borderRadius: 15,
    padding: 4,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.5
  },
  hiddenComponent: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10
  },

  subHeaderText4Wrapper: {
    backgroundColor: 'transparent',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.5,
    borderColor: COLORS.white
  },
  subHeaderText1Wrapper: {
    backgroundColor: 'transparent',
    marginBottom: 10,
    borderRadius: 10,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: COLORS.white
  },
  subHeaderText2Wrapper: {
    backgroundColor: 'transparent',
    marginBottom: 10,
    borderRadius: 10,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: COLORS.white
  }
});
