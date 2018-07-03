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
  StatusBar
} from 'react-native';
import { IMAGES } from '../resources/constants';
import TextSquare from '../components/TextSquare/TextSquare';
import Pie from '../components/PieChart/PieChart2';
//TODO:
/*
Pie Chart for energy usage colored based on intensity (darker worse), add icons
Total power in watts shown
Each piece of the pi chart should be a touchable to expand into more information and average use
Real time energy vs time graph
search bar with flatlist of different appliances
export summary (open email modal)
Tip of the day

//---do some customer discovery to see what people actually want

make some sort of nest system

*/

const DIM = Dimensions.get('window');

const TEXTCOLOR = '#66FF66';
const SELECTED_BOTTON_COLOR = '#565656';
const textColorArchives = ['#faff30', '#70ff93'];

const MIN_PIE_HEIGHT = DIM.width;
const MAX_PIE_HEIGHT = DIM.width;
const fake_data = [
  {
    label: 'Fridge',
    value: 4
  },
  {
    label: 'Television',
    value: 25
  },
  {
    label: 'Air Conditioning',
    value: 40
  },
  {
    label: 'Unknown',
    value: 21
  },
  {
    label: 'Dryer',
    value: 10
  }
];

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      dropDownHeight: new Animated.Value(0),
      dropDownPage: null,
      piHeight: DIM.width * 0.8,
      selectedSliceIndex: null
    };

    this.PAGE1 = <Text style={{ color: 'white' }}> Page 1 </Text>;
    this.PAGE2 = <Text style={{ color: 'white' }}> Page 2 </Text>;
    this.PAGE3 = <Text style={{ color: 'white' }}> Page 3 </Text>;
  }

  getCurrentDate() {
    return '6/21';
  }

  openDropDown(page) {
    if (this.state.dropDownPage == page) {
      Animated.timing(this.state.dropDownHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear
      }).start();

      this.setState({ dropDownPage: null });
    } else {
      Animated.sequence([
        Animated.timing(this.state.dropDownHeight, {
          toValue: DIM.height / 4 + 5,
          duration: 300,
          easing: Easing.linear
        }),
        Animated.timing(this.state.dropDownHeight, {
          toValue: DIM.height / 4,
          duration: 100,
          easing: Easing.linear
        })
      ]).start();

      this.setState({ dropDownPage: page });
    }
  }

  render() {
    return (
      <ImageBackground style={{ flex: 1 }} source={IMAGES.homeBackground1}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Hello, Navin</Text>
            <Text style={styles.dateText}>{this.getCurrentDate()}</Text>
          </View>
          <View style={styles.subHeader}>
            <View style={{ marginRight: 1 }}>
              <TextSquare
                width={(DIM.width - 8) / 3}
                height={(DIM.width - 8) / 3}
                largeText={'2700 '}
                smallText={'W'}
                textColor={TEXTCOLOR}
                backgroundColor={'#303030'}
                expand
                onPress={() => {
                  this.openDropDown(this.PAGE1);
                }}
                selectedColor={SELECTED_BOTTON_COLOR}
                selected={this.state.dropDownPage == this.PAGE1}
              />
            </View>
            <View>
              <TextSquare
                width={(DIM.width - 8) / 3}
                height={(DIM.width - 8) / 3}
                largeText={'87'}
                smallText={'KWH'}
                textColor={TEXTCOLOR}
                backgroundColor={'#303030'}
                expand
                selectedColor={SELECTED_BOTTON_COLOR}
                onPress={() => {
                  this.openDropDown(this.PAGE2);
                }}
                selected={this.state.dropDownPage == this.PAGE2}
              />
            </View>
            <View style={{ marginLeft: 1 }}>
              <TextSquare
                width={(DIM.width - 8) / 3}
                height={(DIM.width - 8) / 3}
                image={IMAGES.happyFace}
                textColor={TEXTCOLOR}
                backgroundColor={'#303030'}
                expand
                selectedColor={SELECTED_BOTTON_COLOR}
                onPress={() => {
                  this.openDropDown(this.PAGE3);
                }}
                selected={this.state.dropDownPage == this.PAGE3}
              />
            </View>
          </View>
          <Animated.View
            style={{
              margin: 0,
              width: DIM.width,
              height: this.state.dropDownHeight,
              backgroundColor: '#444444'
            }}
          >
            {this.state.dropDownPage}
          </Animated.View>
          <View style={styles.body}>
            <View style={{ marginTop: 75 }} />
            <Pie
              onPressSlice={nextSliceIndex => {
                if (nextSliceIndex != this.state.selectedSliceIndex) {
                  this.setState({ selectedSliceIndex: nextSliceIndex });
                } else {
                  this.setState({ selectedSliceIndex: null });
                }
              }}
              data={fake_data}
              selected={fake_data[this.state.selectedSliceIndex]}
              width={this.state.piHeight}
              units={'W'}
            />
          </View>
        </View>
      </ImageBackground>
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
    justifyContent: 'center',
    flex: 0.2
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
  subHeader: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: DIM.width / 3,
    flex: 0.2
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});
