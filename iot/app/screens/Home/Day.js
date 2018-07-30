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
  Image,
  FlatList
} from 'react-native';
import Pie from '../../components/PieChart/PieChart4';
import TabBar from '../../components/TabBar/TabBar';
import ModernCard from '../../components/TextSquare/ModernCard';
import {
  COLORS,
  DIM,
  fakeData,
  APPLIANCES,
  fake_timeline_data,
  IMAGES,
  getApplianceInfo,
  EMOTIONS,
  getColor
} from '../../resources/constants';
import { Transition } from 'react-navigation-fluid-transitions';
import { LinearGradient } from 'expo';
import Timeline from 'react-native-timeline-listview';
import Card from '../../components/TextSquare/Card';
import * as Animatable from 'react-native-animatable';
import CollapsableMenu from '../../components/TabBar/CollapsableMenu';
const UNIT = '\n W';

const DAY_DETAILS = 'Appliances';
const FEED = 'Feed';
const PIE = 'Breakdown';

const DAY = '1';
const DAY_7 = '7';
const DAY_30 = '30';
const DAY_60 = '60';
const DAY_90 = '90';
const DAY_YEAR = 'Y';
const DAY_LIFETIME = '∞';
const FAKE_NUMBER_BASE = 2000; //pull from database to generate this number
const TITLES = [PIE, DAY_DETAILS, FEED];
const PIE_TITLES = [DAY, DAY_7, DAY_30, DAY_60, DAY_90, DAY_YEAR, DAY_LIFETIME];
const TAB_IMAGES = [IMAGES.pieChart, IMAGES.retroTelevision, IMAGES.feed];
const INTERVAL = 2000;
const fake_pie_data = Object.values(fakeData);

export default class Day extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSlice: null,
      centerLabel: '',
      tabSelected: TITLES[0],
      selectedTimePeriod: PIE_TITLES[0]
    };
  }

  generateRandomWatt() {
    this.setState({
      centerLabel: Math.floor(Math.random() * 20) + FAKE_NUMBER_BASE + 'UNIT'
    });
  }

  componentDidMount() {
    // this._interval = setInterval(() => {
    //   this.generateRandomWatt();
    // }, INTERVAL);
  }

  componentWillUnmount() {
    // clearInterval(this._interval);
  }

  renderTab() {
    switch (this.state.tabSelected) {
      case FEED:
        return (
          <Animatable.View
            delay={0}
            duration={500}
            style={{
              backgroundColor: '#ffffff20',
              borderRadius: 20
            }}
          >
            <Timeline
              circleSize={30}
              circleColor={COLORS.white}
              lineColor={COLORS.yellow}
              timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
              timeStyle={{
                textAlign: 'center',
                color: COLORS.yellow,
                padding: 5,
                borderRadius: 13
              }}
              titleStyle={{
                color: COLORS.yellow,
                fontWeight: '600'
              }}
              descriptionStyle={{ color: 'gray' }}
              options={{
                style: { width: DIM.width * 0.85 }
              }}
              data={fake_timeline_data}
              innerCircle={'icon'}
              style={{
                padding: 10,
                borderRadius: 20,
                backgroundColor: COLORS.darkBlue + '10'
              }}
            />
          </Animatable.View>
        );
        break;
      case PIE:
        return (
          <View style={styles.pieContainer}>
            <CollapsableMenu
              onPress={index => {
                this.setState({ selectedTimePeriod: PIE_TITLES[index] });
              }}
              selected={this.state.selectedTimePeriod}
              image={IMAGES.electricity}
              titles={PIE_TITLES}
              height={50}
              backgroundColor={'transparent'}
              iconBackgroundColor={COLORS.yellow}
            />

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
                  fontSize: 40,
                  fontWeight: '200',
                  color: COLORS.yellow
                }}
                selectedSlice={this.state.selectedSlice}
                onPressSlice={index => {
                  if (this.state.selectedSlice == fake_pie_data[index]) {
                    this.setState({ selectedSlice: null });
                  } else {
                    this.setState({
                      selectedSlice: fake_pie_data[index],
                      centerLabel:
                        fake_pie_data[index].title +
                        '\n' +
                        fake_pie_data[index].percentOfDay +
                        '%'
                    });
                  }
                }}
              />
            </Transition>
          </View>
        );
        break;
      case DAY_DETAILS:
        let data = [];

        for (var x = 0; x < fake_pie_data.length; x++) {
          let appliance = getApplianceInfo(fake_pie_data[x].title);

          data.push(appliance);
        }
        return (
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.title}
            ref={ref => (this.flatList = ref)}
            renderItem={({ item, index }) => {
              return (
                <View style={{ paddingTop: 20 }}>
                  <ModernCard
                    applianceInfo={item}
                    onPress={() => {
                      this.flatList.scrollToIndex({
                        animated: true,
                        index: index,
                        viewOffset: 0,
                        viewPosition: 0
                      });
                    }}
                  />
                </View>
              );
            }}
          />
        );
        break;
    }
  }

  getSimilarApplianceUsage(title) {
    return 80;
  }

  render() {
    return (
      <LinearGradient
        style={styles.container}
        start={[0, 0.0]}
        end={[0, 1.0]}
        colors={COLORS.darkBlueGradient}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerText}>{this.state.tabSelected}</Text>
        </View>

        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          {this.renderTab()}
        </View>
        <View style={{ padding: 15, flex: 0.05 }}>
          <TabBar
            backgroundColor={COLORS.white}
            images={TAB_IMAGES}
            selectedColor={COLORS.yellow}
            unselectedColor={COLORS.darkBlue}
            textSelectedColor={COLORS.darkBlue}
            textUnselectedColor={COLORS.white}
            borderColor={COLORS.white}
            tabBarHeight={35}
            style={{
              fontSize: 15,
              width: DIM.width * 0.7,
              fontWeight: 'bold'
            }}
            titles={TITLES}
            selected={this.state.tabSelected}
            onPress={title => {
              this.setState({ tabSelected: title, selectedSlice: null });
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
                  left: -15,
                  height: 75,
                  width: 75,
                  shadowOffset: { width: 2, height: 2 },
                  shadowColor: COLORS.black,
                  shadowOpacity: 0.8
                }}
                resizeMode={'contain'}
              />
            </Transition>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    paddingTop: 25,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pieContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.15,
    marginTop: 20,
    marginBottom: 20,
    width: DIM.width
  },
  headerText: {
    textAlign: 'center',
    fontSize: 50,
    color: COLORS.white,
    fontWeight: '100',
    letterSpacing: 3
  }
});
