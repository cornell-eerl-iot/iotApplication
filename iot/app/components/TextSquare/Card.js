import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, StyleSheet } from 'react-native';
import { COLORS, APPLIANCES, IMAGES } from '../../resources/constants';

const IMAGE_DIM = {
  width: 95,
  height: 95
};

const TITLE_COLOR = COLORS.yellow;
const LABEL1_COLOR = COLORS.yellow;
const LABEL2_COLOR = COLORS.yellow;
const LABEL3_COLOR = COLORS.yellow;

const LABEL_COLOR_LIGHT = COLORS.yellow;

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
    emotionImage: PropTypes.number,
    backgroundColor: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    let applianceInfo = this.props.applianceInfo;
    return (
      <View style={{ backgroundColor: '#ffffff' + 20, borderRadius: 10 }}>
        <View
          style={[
            styles.container,
            {
              height: this.props.height,
              width: this.props.width,
              backgroundColor: COLORS.darkBlue + '10'
            }
          ]}
        >
          <View style={styles.top}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={applianceInfo.source} />
            </View>

            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      this.props.backgroundColor == COLORS.black
                        ? LABEL_COLOR_LIGHT
                        : LABEL1_COLOR
                  }
                ]}
              >
                {' '}
                {applianceInfo.title}{' '}
              </Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.bottomLabels}>
              <Text
                style={[
                  styles.label1,
                  {
                    color:
                      this.props.backgroundColor == COLORS.black
                        ? LABEL_COLOR_LIGHT
                        : LABEL1_COLOR
                  }
                ]}
              >
                {this.props.label1}
              </Text>
              <View style={{ marginBottom: 12 }} />
              <Text
                style={[
                  styles.label2,
                  {
                    color:
                      this.props.backgroundColor == COLORS.black
                        ? LABEL_COLOR_LIGHT
                        : LABEL2_COLOR
                  }
                ]}
              >
                {' '}
                {this.props.label2}{' '}
              </Text>
              <View style={{ marginBottom: 12 }} />
              <Text
                style={[
                  styles.label3,
                  {
                    color:
                      this.props.backgroundColor == COLORS.black
                        ? LABEL_COLOR_LIGHT
                        : LABEL3_COLOR
                  }
                ]}
              >
                {' '}
                {this.props.label3}{' '}
              </Text>
            </View>
            <View style={styles.emotion}>
              <Image
                style={styles.emotionImage}
                source={this.props.emotionImage}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    textAlign: 'left'
  },
  label2: {
    fontSize: 18,
    textAlign: 'left'
  },
  label3: {
    fontSize: 18,
    textAlign: 'left'
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
