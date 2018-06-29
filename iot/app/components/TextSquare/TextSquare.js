import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native';
import { IMAGES } from '../../resources/constants';
export default class TextSquare extends React.Component {
  static propTypes = {
    largeText: PropTypes.string,
    smallText: PropTypes.string,
    image: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    borderRadius: PropTypes.number,
    expand: PropTypes.bool,
    onPress: PropTypes.func,
    selectedColor: PropTypes.string,
    selected: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    let body = null;
    let sub = null;
    let expand = null;
    if (this.props.image) {
      body = (
        <Image
          style={{ width: this.props.width / 2, height: this.props.height / 2 }}
          resizeMode={'contain'}
          source={this.props.image}
        />
      );
    }
    if (this.props.largeText) {
      body = (
        <Text
          style={{
            color: this.props.textColor,
            fontSize: 40,
            textAlign: 'center'
          }}
        >
          {this.props.largeText}
        </Text>
      );
    }
    if (this.props.smallText) {
      sub = (
        <Text
          style={{
            color: this.props.textColor,
            fontSize: 20,
            textAlign: 'center'
          }}
        >
          {this.props.smallText}
        </Text>
      );
    }

    if (this.props.expand) {
      expand = (
        <Image
          style={{ width: 15, height: 15 }}
          source={IMAGES.expand2}
          resizeMode="contain"
        />
      );
    }

    if (this.props.selected) {
    }

    return (
      <TouchableOpacity
        disabled={!this.props.onPress}
        onPress={this.props.onPress}
      >
        <View
          style={{
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.backgroundColor,
            justifyContent: 'flex-end',
            margin: 0
          }}
        >
          <View style={{ alignItems: 'center' }}>
            {body} {sub}
          </View>
          <View style={{ marginTop: 10 }} />
          <View style={{ alignItems: 'flex-end' }}>{expand}</View>
        </View>
      </TouchableOpacity>
    );
  }
}
