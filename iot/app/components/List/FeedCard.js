import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, DIM } from '../../resources/constants';

const CARD_HEIGHT = 50;
const IMAGE_DIMENSION = {
  width: 40,
  height: 40
};
export default class extends React.Component {
  static propTypes = {
    appliance: PropTypes.object,
    label1: PropTypes.string, //should be used for "On for two minutes"
    label2: PropTypes.string, //should be used for "60W"
    timeStamp: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.left}>
          <Image
            source={this.props.appliance.source}
            resizeMode={'contain'}
            style={styles.image}
          />
        </View>
        <View style={styles.middle}>
          <Text style={styles.label1}>{this.props.label1}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.timeStamp}>{this.props.timeStamp}</Text>
          <Text style={styles.label2}>{this.props.label2}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 50,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: DIM.width * 0.9,
    borderWidth: 0,
    borderColor: COLORS.lightBlue,
    borderRadius: 0
  },
  left: { backgroundColor: COLORS.lightBlue },
  image: {
    width: IMAGE_DIMENSION.width,
    height: IMAGE_DIMENSION.height
  },
  middle: { justifyContent: 'center', alignItems: 'center' },
  applianceTitle: {
    color: COLORS.yellow,
    fontSize: 20
  },
  label1: { color: COLORS.yellow },
  right: { justifyContent: 'center', alignItems: 'flex-end' },
  timeStamp: { color: COLORS.yellow },
  label2: { color: COLORS.yellow }
});
