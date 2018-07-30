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
  TouchableOpacity,
  Image
} from 'react-native';
const DIM = Dimensions.get('window');
import Ripple from 'react-native-material-ripple';
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
    borderColor: PropTypes.string,
    images: PropTypes.array, //if given, will only render images,
    backgroundColor: PropTypes.string
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
      let inner = null;
      if (this.props.images) {
        inner = (
          <Image
            style={{ width: 25, height: 25 }}
            resizeMode={'contain'}
            source={this.props.images[x]}
          />
        );
      } else {
        inner = (
          <Text
            style={{
              fontSize: this.props.style.fontSize,
              color:
                this.props.selected == titles[x]
                  ? this.props.textSelectedColor
                  : this.props.textUnselectedColor,
              fontWeight: this.props.selected == titles[x] ? '600' : '100'
            }}
          >
            {this.props.titles[x]}
          </Text>
        );
      }

      menu.push(
        <TouchableOpacity
          rippleColor={COLORS.darkBlue}
          key={titles[x]}
          onPress={() => {
            this.props.onPress(titles[y]);
          }}
        >
          <View
            style={{
              borderColor: this.props.borderColor,
              borderRadius: 1500,
              backgroundColor:
                this.props.selected == titles[x]
                  ? this.props.selectedColor
                  : 'transparent',
              height:
                this.props.selected == titles[x]
                  ? this.props.tabBarHeight * 1.5
                  : this.props.tabBarHeight,
              width: width * 0.6,

              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              shadowOffset: { width: 2, height: 2 },
              shadowColor: 'black',
              shadowOpacity: this.props.selected == titles[x] ? 1.0 : 0.5
            }}
          >
            {inner}
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          height: this.props.tabBarHeight,
          width: DIM.width * 0.9,
          justifyContent: 'space-around',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: this.props.borderColor,
          borderRadius: 1500,
          backgroundColor: this.props.backgroundColor
        }}
      >
        {menu}
      </View>
    );
  }
}
