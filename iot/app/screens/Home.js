import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { IMAGES } from '../resources/constants';
import TextSquare from '../components/TextSquare/TextSquare';
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

const TEXTCOLOR = '#70ff93';
const textColorArchives = ['#faff30', '#70ff93'];

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      dropDownHeight: new Animated.Value(0),
      dropDownPage: null
    };

    this.PAGE1 = <Text> Page 1 </Text>;
    this.PAGE2 = <Text> Page 2 </Text>;
    this.PAGE3 = <Text> Page 3 </Text>;
  }

  getCurrentDate() {
    return '6/21';
  }

  openDropDown(page) {
    if (this.state.dropDownPage == page) {
      Animated.timing(this.state.dropDownHeight, {
        toValue: 0,
        duration: 100
      }).start();
      this.setState({ dropDownPage: null });
    } else {
      Animated.sequence([
        // decay, then spring to start and twirl
        Animated.timing(this.state.dropDownHeight, {
          toValue: 0,
          duration: 100
        }),
        Animated.timing(this.state.dropDownHeight, {
          toValue: DIM.height / 3,
          duration: 400
        })
      ]).start();
      this.setState({ dropDownPage: page });
    }
  }

  render() {
    return (
      <ImageBackground style={{ flex: 1 }} source={IMAGES.homeBackground1}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Hello, Navin</Text>
            <Text style={styles.dateText}>{this.getCurrentDate()}</Text>
          </View>
          <View style={styles.subHeader}>
            <View style={{ padding: 1 }}>
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
              />
            </View>
            <View style={{ padding: 1 }}>
              <TextSquare
                width={(DIM.width - 8) / 3}
                height={(DIM.width - 8) / 3}
                largeText={'87'}
                smallText={'KWH'}
                textColor={TEXTCOLOR}
                backgroundColor={'#303030'}
                expand
                onPress={() => {
                  this.openDropDown(this.PAGE2);
                }}
              />
            </View>
            <View style={{ padding: 1 }}>
              <TextSquare
                width={(DIM.width - 8) / 3}
                height={(DIM.width - 8) / 3}
                image={IMAGES.happyFace}
                textColor={TEXTCOLOR}
                backgroundColor={'#303030'}
                expand
                onPress={() => {
                  this.openDropDown(this.PAGE3);
                }}
              />
            </View>
          </View>
          <Animated.View
            style={{
              width: DIM.width,
              height: this.state.dropDownHeight,
              backgroundColor: 'white'
            }}
          >
            {this.state.dropDownPage}
          </Animated.View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 30
  },
  header: {
    alignItems: 'center',
    marginBottom: 20
  },
  headerText: {
    textAlign: 'center',
    fontSize: 50,

    color: TEXTCOLOR
  },
  dateText: {
    textAlign: 'center',
    fontSize: 25,
    color: TEXTCOLOR
  },
  subHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    height: DIM.width / 3
  },
  body: {
    alignItems: 'center'
  }
});
