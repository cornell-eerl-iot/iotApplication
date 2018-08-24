import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  Animated,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { DIM, COLORS, IMAGES } from '../../resources/constants';
export default class CollapsableMenu extends React.Component {
  static propTypes = {
    image: PropTypes.number,
    titles: PropTypes.array,
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    iconBackgroundColor: PropTypes.string,
    selected: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      menuWidth: new Animated.Value(0),
      isOpen: false
    };
  }

  openMenu = width => {
    Animated.timing(this.state.menuWidth, {
      toValue: width,
      duration: 500
    }).start();
    this.setState({ isOpen: true });
  };
  closeMenu = () => {
    Animated.timing(this.state.menuWidth, {
      toValue: 0,
      duration: 500
    }).start();
    this.setState({ isOpen: false });
  };

  render() {
    let buttons = [];
    for (var x = 0; x < this.props.titles.length; x++) {
      let selectedStyle = null;
      let additionalTextStyle = null;
      let y = x;
      if (this.props.selected == this.props.titles[x]) {
        selectedStyle = {
          backgroundColor: COLORS.yellow,
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center'
        };
        additionalTextStyle = {
          color: 'black'
        };
      }

      buttons.push(
        <TouchableOpacity
          onPress={() => {
            this.props.onPress(y);
          }}
          key={this.props.titles[x]}
          style={styles.button}
        >
          <View style={selectedStyle}>
            <Text
              style={[
                { fontSize: 20, fontWeight: '100', color: 'white' },
                additionalTextStyle
              ]}
            >
              {this.props.titles[x]}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    buttons.push(<View key={''} style={{ width: 40 }} />);

    let selectButtonLabel = null;
    let selectedButtonStyle = { fontSize: 12, fontWeight: '100' };
    if (this.props.selected == '1') {
      selectedButtonLabel = <Text style={selectedButtonStyle}>{'Day'}</Text>;
    } else if (isNaN(this.props.selected)) {
      selectedButtonLabel = null;
    } else {
      selectedButtonLabel = <Text style={selectedButtonStyle}>{'Days'}</Text>;
    }

    <Text style={{ fontSize: 12, fontWeight: '100' }}>{'Days'}</Text>;

    return (
      <View style={[styles.container, { height: this.props.height }]}>
        <Animated.View
          style={[
            styles.scroll,
            {
              backgroundColor: this.props.backgroundColor,
              height: this.props.height,
              width: this.state.menuWidth,
              right: this.props.height * 0.5,
              overflow: 'hidden'
            }
          ]}
        >
          <ScrollView horizontal>{buttons}</ScrollView>
        </Animated.View>
        <View
          style={[
            styles.imageContainer,
            {
              width: this.props.height * 1.3,
              height: this.props.height * 1.3,
              backgroundColor: COLORS.darkBlue,
              position: 'absolute'
            }
          ]}
        />
        <TouchableOpacity
          onPress={() => {
            if (this.state.isOpen) {
              this.closeMenu();
            } else {
              this.openMenu(DIM.width * 0.95 - this.props.height * 1.3 / 2);
            }
          }}
          style={{ justifyContent: 'flex-start', alignItems: 'center' }}
        >
          <View
            style={[
              styles.imageContainer,
              {
                width: this.props.height * 1.3,
                height: this.props.height * 1.3,
                backgroundColor: this.props.iconBackgroundColor
              }
            ]}
          >
            <Text style={{ fontSize: 38, fontWeight: '100' }}>
              {this.props.selected}
            </Text>
            {selectedButtonLabel}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: DIM.width * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  scroll: {
    position: 'absolute',
    justifyContent: 'space-between',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white'
  },
  image: {},
  imageContainer: {
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    marginLeft: 5,
    justifyContent: 'center'
  }
});
