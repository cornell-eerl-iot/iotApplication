import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';
import { COLORS, APPLIANCES, IMAGES, DIM } from '../../resources/constants';
import * as Animatable from 'react-native-animatable';

export default class Grid extends React.Component {
  static propTypes = {
    data: PropTypes.array, //a list of appliance data (must be the exact format as those in resources/constants.js)
    onPress: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  calcDimensions() {
    let length = this.props.data.length;
    if (length % 2 == 0) {
      return {
        row1: length / 2,
        row2: length / 2
      };
    }
    return {
      row1: Math.floor(length / 2) + 1,
      row2: Math.floor(length / 2)
    };
  }

  render() {
    let { row1, row2 } = this.calcDimensions();

    let width = DIM.width / 5;
    let row = [];
    let counter = 0;
    let delayTemp = 0;
    for (var x = 0; x < this.props.data.length; x++) {
      let y = counter;
      delayTemp += 40;
      row.push(
        <Animatable.View
          key={this.props.data[counter].title}
          animation="flipInX"
          delay={delayTemp}
          duration={500}
          style={{
            borderRadius: 1500,
            backgroundColor: '#ffffff20'
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.onPress(y)}
            style={[
              {
                borderRadius: 1500,
                justifyContent: 'center',
                alignItems: 'center',
                width: width,
                height: width,
                backgroundColor: COLORS.lightBlue + '10',
                shadowOffset: { width: 5, height: 5 },
                shadowColor: COLORS.black,
                shadowOpacity: 0.2
              }
            ]}
          >
            <Image
              style={{
                width: width * 0.7,
                height: width * 0.7
              }}
              source={this.props.data[counter].source}
            />
          </TouchableOpacity>
        </Animatable.View>
      );
      counter++;
    }

    return (
      <ScrollView>
        <View
          style={{
            padding: 15
          }}
        >
          <View
            style={{
              borderRadius: 50
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexWrap: 'wrap',
                backgroundColor: COLORS.darkBlue + '10',
                borderRadius: 50
              }}
            >
              {row}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 1500,
    height: DIM.width / 5
  }
});
