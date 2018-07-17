import React from 'react';
import PropTypes from 'prop-types';
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
const DIM = Dimensions.get('window');

import { COLORS } from '../../resources/constants';

export default class TabBar extends React.Component {
  static propTypes = {
    selectedColor: PropTypes.string,
    unselectedColor: PropTypes.string,
    textSelectedColor: PropTypes.string,
    textUnselectedColor: PropTypes.string,
    tabBarHeight: PropTypes.number,
    tabHeight: PropTypes.number,
    style: PropTypes.object, //font size, font weight, width
    titles: PropTypes.array,
    selected: PropTypes.string, //must match with title, checks equality based on title
    onPress: PropTypes.func,
    borderColor: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    let menu = [];
    // if (this.props.components.length != this.props.titles.length) {
    //   console.warn('Error in components or title prop.');
    // } else {
    titles = this.props.titles;
    width = this.props.style.width / this.props.titles.length;
    for (var x = 0; x < this.props.titles.length; x++) {
      let y = x;
      menu.push(
        <TouchableOpacity
          key={titles[x]}
          onPress={() => {
            this.props.onPress(titles[y]);
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: this.props.borderColor,
              borderRadius: 2,
              backgroundColor:
                this.props.selected == titles[x]
                  ? this.props.selectedColor
                  : 'transparent',
              height: this.props.tabBarHeight,
              width: width,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                fontSize: this.props.style.fontSize,
                color:
                  this.props.selected == titles[x]
                    ? this.props.textSelectedColor
                    : this.props.textUnselectedColor,
                fontWeight: this.props.style.fontWeight
              }}
            >
              {this.props.titles[x]}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          height: this.props.tabBarHeight
        }}
      >
        {menu}
      </View>
    );
  }
}
