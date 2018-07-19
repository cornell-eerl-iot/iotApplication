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
  TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Transition } from 'react-navigation-fluid-transitions';
import LineGraph from '../../components/LineGraph/LineGraph.js';
import TabBar from '../../components/TabBar/TabBar.js';
import { COLORS, DIM, IMAGES } from '../../resources/constants';

const initialLayout = {
  height: 0,
  width: DIM.width
};

const MAX_FAKE_DATA = 100;
const INTERVAL = 2000;

const fake_power_data = []; //day data
const fake_week_data = [
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'S'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'M'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'T'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'W'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'T'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'F'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'S'
  }
];
const fake_year_data = [
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'J'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'F'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'M'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'A'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'M'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'J'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'J'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'A'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'S'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'O'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'N'
  },
  {
    power: Math.floor(Math.random() * 20) + 2000,
    time: 'D'
  }
];

//defaults to day view

const TAB_TITLES = ['D', 'W', 'M', 'Y'];

export default class Energy extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: TAB_TITLES[1]
    };

    let fake_day_data = [];
    for (var x = 0; x < 24; x++) {
      let t = '';
      if (x % 3 == 0) {
        if (x == 0) {
          t = '12am';
        } else if (x < 12) {
          t = x + 'am';
        } else if (x == 12) {
          t = '12pm';
        } else {
          t = x - 12 + 'pm';
        }
      }
      fake_day_data.push({
        power: Math.floor(Math.random() * 20) + 50,
        time: t
      });
    }

    let fake_month_data = [];
    for (var x = 0; x < 31; x++) {
      let t = '';
      if (x % 7 == 0) {
        t = x + 1;
      }
      fake_month_data.push({
        power: Math.floor(Math.random() * 20) + 10000,
        time: t
      });
    }
    this.dayView = (
      <LineGraph data={fake_day_data} mode={'other'} maxPointsOnScreen={25} />
    );
    this.weekView = (
      <LineGraph data={fake_week_data} mode={'other'} maxPointsOnScreen={8} />
    );

    this.monthView = (
      <LineGraph data={fake_month_data} mode={'other'} maxPointsOnScreen={32} />
    );

    this.yearView = (
      <LineGraph data={fake_year_data} mode={'other'} maxPointsOnScreen={13} />
    );
  }

  //for the following four functions, date should be the initial date
  getDayData(date) {}
  getWeekData(date) {
    //use moment to search for all info from date to 7 week after that date, search for averages per day, should be 7 pulls
    return fake_week_data;
  }

  getMonthData(date) {}
  getYearData(date) {}

  addFakeDataPoint() {
    let fakeDayPowerData = this.state.fakeDayPowerData;
    let currentDate = new Date();

    if (fakeDayPowerData.length == 0) {
      fakeDayPowerData.push({
        power: 0,
        time: currentDate
      });
      return;
    }

    fakeDayPowerData.push({
      power: Math.floor(Math.random() * 400) + 1800,
      time: currentDate
    });
    this.setState({
      fakeDayPowerData: fakeDayPowerData
    });
  }

  _renderTab() {
    switch (this.state.selected) {
      case TAB_TITLES[0]:
        return this.dayView;
      case TAB_TITLES[1]:
        return this.weekView;
      case TAB_TITLES[2]:
        return this.monthView;
      case TAB_TITLES[3]:
        return this.yearView;
    }
  }

  componentDidMount() {
    // this._interval = setInterval(() => {
    //   this.addFakeDataPoint();
    // }, INTERVAL);
  }

  componentWillUnmount() {
    //clearInterval(this._interval);
  }
  render() {
    // if (this.state.fakeDayPowerData.length > MAX_FAKE_DATA)
    //   clearInterval(this._interval);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightBlue,
          alignItems: 'center',
          padding: 2
        }}
      >
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <Transition shared={'buttonText1'}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 50,
                  textAlign: 'center'
                }}
              >
                Trends
              </Text>
            </Transition>
          </View>
        </View>
        <View style={{ height: 50, padding: 15 }}>
          <TabBar
            selectedColor={COLORS.yellow}
            unselectedColor={'transparent'}
            textSelectedColor={COLORS.darkBlue}
            textUnselectedColor={COLORS.darkBlue}
            borderColor={COLORS.darkBlue}
            tabBarHeight={35}
            style={{ fontSize: 15, width: DIM.width * 0.9, fontWeight: 'bold' }}
            titles={TAB_TITLES}
            selected={this.state.selected}
            onPress={title => this.setState({ selected: title })}
          />
        </View>
        <View style={{ marginTop: 20 }} />
        <View style={styles.body}>{this._renderTab()}</View>
        <View>
          <Text>Water usage data and stats</Text>
        </View>
        <View
          style={{
            position: 'absolute',
            left: 10,
            right: 0,
            bottom: 0,
            top: 20,
            width: 75,
            height: 75
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Transition shared={'logo'}>
              <Animatable.Image
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                source={IMAGES.electricity}
                style={{
                  height: 75,
                  width: 75
                }}
                resizeMode={'contain'}
              />
            </Transition>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0.2,
    padding: 20,
    width: DIM.width,
    flexDirection: 'row'
  }
});
/*
Energy Usage (KWH), Peak, How you did in comparison to last week,
percent an appliance was used during that time period etc
*/
