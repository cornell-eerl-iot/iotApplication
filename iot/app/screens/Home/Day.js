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
import Grid from '../../components/List/Grid';
import {
  COLORS,
  DIM,
  fake_pie_data,
  APPLIANCES,
  fake_timeline_data,
  IMAGES,
  APPLIANCES_BY_TITLE,
  EMOTIONS
} from '../../resources/constants';
import { Transition } from 'react-navigation-fluid-transitions';
import FeedCard from '../../components/List/FeedCard';
import Timeline from 'react-native-timeline-listview';
import Card from '../../components/TextSquare/Card';
import * as Animatable from 'react-native-animatable';
const INTERVAL = 2000;
const UNIT = '\n W';
const DAY_DETAILS = 'Appliances';
const FEED = 'Feed';
const FAKE_NUMBER_BASE = 2000; //pull from database to generate this number
const TITLES = [FEED, DAY_DETAILS];

export default class Day extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSlice: null,
      centerLabel: FAKE_NUMBER_BASE + UNIT,
      tabSelected: FEED
    };
  }

  generateRandomWatt() {
    this.setState({
      centerLabel: Math.floor(Math.random() * 20) + FAKE_NUMBER_BASE + UNIT
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

  renderTab() {
    switch (this.state.tabSelected) {
      case FEED:
        return (
          <Animatable.View animation="flipInX" delay={0} duration={500}>
            <Timeline
              circleSize={30}
              circleColor={COLORS.darkBlue}
              lineColor={COLORS.yellow}
              timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
              timeStyle={{
                textAlign: 'center',
                color: COLORS.yellow,
                padding: 5,
                borderRadius: 13
              }}
              titleStyle={{
                color: COLORS.yellow
              }}
              descriptionStyle={{ color: 'gray' }}
              options={{
                style: { paddingTop: 5, width: DIM.width * 0.9 }
              }}
              data={fake_timeline_data}
              innerCircle={'icon'}
              style={{
                borderTopWidth: 1,
                borderRightWidth: 1,
                borderLeftWidth: 1,
                borderColor: COLORS.yellow,
                padding: 10,
                borderRadius: 10
              }}
            />
          </Animatable.View>
        );
        break;
      case DAY_DETAILS:
        if (this.state.selectedSlice) {
          let appliance = APPLIANCES_BY_TITLE[this.state.selectedSlice.label];
          let _label2 = '';
          let _emotion = EMOTIONS.sad.source;
          let currentApplianceUsage = this.getApplianceUsage(appliance.title);
          if (appliance.title != APPLIANCES.unknown.title) {
            let otherApplianceUsage = this.getSimilarApplianceUsage(
              appliance.title
            );

            if (otherApplianceUsage < currentApplianceUsage) {
              _emotion = EMOTIONS.sad.source;
            } else if (otherApplianceUsage == currentApplianceUsage) {
              _emotion = EMOTIONS.neutral.source;
            } else {
              _emotion = EMOTIONS.veryHappy.source;
            }
            _label2 =
              'A similar ' +
              appliance.title +
              ' takes ' +
              otherApplianceUsage +
              ' W';
          }
          return (
            <Animatable.View
              animation="flipInX"
              iterationCount={1}
              duration={600}
              style={{ alignItems: 'center' }}
            >
              <Card
                width={DIM.width * 0.9}
                applianceInfo={appliance}
                label1={'Average Energy Usage: ' + currentApplianceUsage + ' W'}
                label2={_label2}
                label3={'$$$ Used today: ' + '$12'}
                emotionImage={_emotion}
              />
              <TouchableOpacity
                onPress={() => this.setState({ selectedSlice: null })}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  resizeMode={'contain'}
                  source={IMAGES.back}
                />
              </TouchableOpacity>
            </Animatable.View>
          );
        } else {
          let data = [];
          for (var x = 0; x < fake_pie_data.length; x++) {
            data.push(APPLIANCES_BY_TITLE[fake_pie_data[x].label]);
          }
          return (
            <Grid
              data={data}
              onPress={index =>
                this.setState({
                  selectedSlice: fake_pie_data[index],
                  tabSelected: DAY_DETAILS
                })
              }
            />
          );
        }
    }
  }

  getSimilarApplianceUsage(title) {
    return 80;
  }
  getApplianceUsage(title) {
    return 60;
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
              centerLabelStyle={{
                textAlign: 'center',
                fontSize: 50,
                fontWeight: 'bold',
                color: COLORS.yellow
              }}
              selectedSlice={this.state.selectedSlice}
              onPressSlice={index => {
                if (this.state.selectedSlice == fake_pie_data[index]) {
                  this.setState({ selectedSlice: null });
                } else {
                  this.setState({
                    selectedSlice: fake_pie_data[index],
                    tabSelected: DAY_DETAILS
                  });
                }
              }}
            />
          </Transition>
        </View>
        <View style={{ flex: 0.5 }}>{this.renderTab()}</View>
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
    flex: 0.7
  },
  sharedSquare: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
});
