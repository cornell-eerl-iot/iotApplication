import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { COLORS, DIM } from '../../resources/constants';
/*
EVERYTHING IS THE SAME SIZE
*/

export default class Pie extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array, //should come as an array of objects --> [{label: ___ , value: ___}]
    selected: PropTypes.object,
    width: PropTypes.number,
    units: PropTypes.string,
    onPressSlice: PropTypes.func,
    sliceColor: PropTypes.string,
    labelVisible: PropTypes.bool,
    fillColor: PropTypes.string,
    labelColor: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      labelWidth: 0
    };
  }

  render() {
    let selectedSlice = this.props.selected;
    let label = null;
    let value = null;
    if (selectedSlice) {
      label = selectedSlice.label;
      value = selectedSlice.value;
    }

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
          stroke: this.props.sliceColor,
          strokeWidth: 1,
          fill: this.props.fillColor
        },
        arc: {
          outerRadius: label == key ? '115%' : '100%',
          padAngle: label === key ? 0.2 : 0.05
        },
        onPress: () => {
          if (this.props.onPressSlice) this.props.onPressSlice(index);
        }
      };
    });
    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        const text = data.key + ' ' + data.value + '%';
        return (
          <Text
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={this.props.labelColor}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={12}
            stroke={this.props.labelColor}
            strokeWidth={0.5}
          >
            {text}
          </Text>
        );
      });
    };
    let tempLabels = null;
    if (this.props.labelVisible) tempLabels = <Labels />;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <PieChart
          animate={true}
          style={{
            height: this.props.width,
            width: this.props.width
          }}
          outerRadius={'80%'}
          innerRadius={'50%'}
          data={data}
          belowChart={true}
        >
          {tempLabels}
        </PieChart>
        <Text>{'hello'}</Text>
      </View>
    );
  }
}
