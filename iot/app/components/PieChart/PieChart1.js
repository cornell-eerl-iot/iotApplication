import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated, Dimensions } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

const DIM = Dimensions.get('window');

//PIE CHART WITH EACH SLICE DIFFERENT SIZES

export default class Pie extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array, //should come as an array of objects --> [{label: ___ , value: ___}]
    selected: PropTypes.object,
    width: PropTypes.object,
    units: PropTypes.string,
    mode: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      labelWidth: 0
    };
  }

  render() {
    let selectedSlice = this.props.selected;
    let label = selectedSlice.label;
    let value = selectedSlice.value;

    let keys = [];
    this.props.data.forEach(element => {
      keys.push(element.label);
    });

    let values = [];

    this.props.data.forEach(element => {
      values.push(element.value);
    });

    const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff'];

    const data = keys.map((key, index) => {
      return {
        key,
        value: values[index],
        svg: {
          fill: colors[index]
        },
        arc: {
          outerRadius: 40 + values[index] + '%',
          padAngle: label === key ? 0.1 : 0
        },
        onPressIn: () => {
          console.log('pressed ' + key);
        },
        onResponderMove: () => {}
      };
    });
    let deviceWidth = this.props.width;

    return (
      <View style={{ justifyContent: 'center' }}>
        <View zIndex={2}>
          <PieChart
            animate
            style={{
              height: this.props.width,
              width: this.props.width
            }}
            outerRadius={'80%'}
            innerRadius={'30%'}
            data={data}
          />
        </View>
        <View zIndex={1}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 50
            }}
          >
            Hello
          </Text>
        </View>
      </View>
    );
  }
}
