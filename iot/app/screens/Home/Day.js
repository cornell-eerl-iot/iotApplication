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
import Pie from '../../components/PieChart/PieChart4';
import TabBar from '../../components/TabBar/TabBar';
import { COLORS, DIM, fake_pie_data } from '../../resources/constants';
import { Transition } from 'react-navigation-fluid-transitions';

const INTERVAL = 2000;
const UNIT = '\n W';

const DAY_DETAILS = 'Day Details';
const FEED = 'Feed';

const TITLES = [FEED, DAY_DETAILS];
export default class Day extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSlice: null,
      centerLabel: 2000 + UNIT,
      tabSelected: FEED
    };
  }

  generateRandomWatt() {
    this.setState({
      centerLabel: Math.floor(Math.random() * 20) + 2000 + UNIT
    });
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.generateRandomWatt();
    }, INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.pieContainer}>
          <Transition shared={'pie'}>
            <Pie
              data={fake_pie_data}
              width={DIM.width}
              sliceColor={COLORS.yellow}
              fillColor={COLORS.red}
              labelColor={COLORS.white}
              labelVisible
              centerLabel={this.state.centerLabel}
              selectedSlice={this.state.selectedSlice}
              onPressSlice={index => {
                if (this.state.selectedSlice == fake_pie_data[index]) {
                  this.setState({ selectedSlice: null });
                } else {
                  this.setState({ selectedSlice: fake_pie_data[index] });
                }
              }}
            />
          </Transition>
        </View>
        <View>
          <TabBar
            selectedColor={COLORS.yellow}
            unselectedColor={COLORS.darkBlue}
            textSelectedColor={COLORS.darkBlue}
            textUnselectedColor={COLORS.yellow}
            tabBarHeight={35}
            style={{
              fontSize: 15,
              width: DIM.width,
              fontWeight: 'bold'
            }}
            titles={TITLES}
            selected={this.state.tabSelected}
            onPress={title => {
              this.setState({ tabSelected: title });
            }}
          />
        </View>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    paddingTop: 25,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pieContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flex: 0.62
  }
});
