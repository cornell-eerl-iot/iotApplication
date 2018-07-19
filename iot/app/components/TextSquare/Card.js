import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, StyleSheet } from 'react-native';
import { COLORS, APPLIANCES, IMAGES } from '../../resources/constants';

const IMAGE_DIM = {
  width: 95,
  height: 95
};

const TITLE_COLOR = COLORS.darkBlue;
const LABEL1_COLOR = COLORS.darkBlue;
const LABEL2_COLOR = COLORS.darkBlue;
const LABEL3_COLOR = COLORS.darkBlue;
const BACKGROUND_COLOR = COLORS.lightBlue;
const BORDER_COLOR = COLORS.yellow;
const EMOTION_IMAGE_WIDTH = 45;
const EMOTION_IMAGE_HEIGHT = 50;

export default class Card extends React.Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    applianceInfo: PropTypes.object,
    label1: PropTypes.string,
    label2: PropTypes.string,
    label3: PropTypes.string,
    emotionImage: PropTypes.number
  };

  constructor(props) {
    super(props);
  }

  render() {
    let applianceInfo = this.props.applianceInfo;
    return (
      <View
        style={[
          styles.container,
          { height: this.props.height, width: this.props.width }
        ]}
      >
        <View style={styles.top}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={applianceInfo.source} />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}> {applianceInfo.title} </Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomLabels}>
            <Text style={styles.label1}> {this.props.label1} </Text>
            <View style={{ marginBottom: 12 }} />
            <Text style={styles.label2}> {this.props.label2} </Text>
            <View style={{ marginBottom: 12 }} />
            <Text style={styles.label3}> {this.props.label3} </Text>
          </View>
          <View style={styles.emotion}>
            <Image
              style={styles.emotionImage}
              source={this.props.emotionImage}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: BORDER_COLOR,
    padding: 5
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageContainer: { flex: 0.5, marginLeft: 10 },
  image: { width: IMAGE_DIM.width, height: IMAGE_DIM.height },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: TITLE_COLOR
  },
  label1: {
    fontSize: 18,
    textAlign: 'left',
    color: LABEL1_COLOR
  },
  label2: {
    fontSize: 18,
    textAlign: 'left',
    color: LABEL2_COLOR
  },
  label3: {
    fontSize: 18,
    textAlign: 'left',
    color: LABEL3_COLOR
  },
  bottom: {
    flexDirection: 'row'
  },
  emotionImage: {
    width: EMOTION_IMAGE_WIDTH,
    height: EMOTION_IMAGE_HEIGHT
  },
  bottomLabels: {
    justifyContent: 'space-around',
    flex: 1
  },
  emotion: {
    justifyContent: 'center',
    flex: 0.2
  }
});
