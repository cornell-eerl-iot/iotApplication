import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Dimensions } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
const DIM = Dimensions.get('window');

/*
EVERYTHING IS THE SAME SIZE, NO GETTING SMALLER
*/

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

    const data = keys.map((key, index) => {
      return {
        key,
        value: values[index],
        svg: {
          stroke: 'green',
          strokeWidth: 0.8,
          fill: '#303030'
        },
        arc: {
          outerRadius: label == key ? '110%' : '100%',
          padAngle: label === key ? 0.2 : 0.03
        }
      };
    });
    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        const text = data.key + '\n' + data.value + '%';
        return (
          <Text
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={'#66FF66'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={15}
            stroke={'#66FF66'}
            strokeWidth={0.2}
          >
            {text}
          </Text>
        );
      });
    };

    return (
      <View style={{ justifyContent: 'center' }}>
        <PieChart
          style={{
            height: this.props.width,
            width: this.props.width
          }}
          outerRadius={'80%'}
          innerRadius={'20%'}
          data={data}
        >
          <Labels />
        </PieChart>
      </View>
    );
  }
}
