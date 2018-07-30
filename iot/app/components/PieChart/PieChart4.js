import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Text, ImageBackground } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import {
  DIM,
  COLORS,
  IMAGES,
  applianceImageMap
} from '../../resources/constants';
import { Text as TextSVG } from 'react-native-svg';
import { Circle, G, Image } from 'react-native-svg';
export default class Pie extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array, //should come as an array of objects --> [{label: ___ , value: ___}]
    selectedSlice: PropTypes.object,
    width: PropTypes.number,
    units: PropTypes.string,
    onPressSlice: PropTypes.func,
    sliceColor: PropTypes.string,
    labelVisible: PropTypes.bool,
    fillColor: PropTypes.string,
    labelColor: PropTypes.string,
    centerLabel: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 0
    };
  }

  render() {
    const { labelWidth } = this.state;
    const { selectedSlice } = this.props;
    let label = null;
    let value = null;
    if (selectedSlice) {
      label = selectedSlice.title;
      value = selectedSlice.percentOfDay;
    }

    let keys = [];
    this.props.data.forEach(element => {
      keys.push(element.title);
    });

    let values = [];

    this.props.data.forEach(element => {
      values.push(element.percentOfDay);
    });

    const data = keys.map((key, index) => {
      return {
        key,
        value: values[index],
        svg: {
          strokeWidth: 2,
          fill: label == key ? this.props.sliceColor : COLORS.lightBlue
        },
        arc: {
          outerRadius: label == key ? '91%' : '90%',
          padAngle: label === key ? 0.08 : 0.04
        },
        onPressIn: () => {
          if (this.props.onPressSlice) this.props.onPressSlice(index);
        }
      };
    });

    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
          <G key={index} x={labelCentroid[0]} y={labelCentroid[1]}>
            <Image
              x={-15}
              y={15}
              width={30}
              height={30}
              preserveAspectRatio="xMidYMid slice"
              opacity="1"
              href={applianceImageMap[data.key]}
            />
          </G>
        );
      });
    };

    /*const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        const text = data.key + ' ' + data.value + '%';

        return (
          <TextSVG
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={label == data.key ? 'black' : this.props.labelColor}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={12}
            stroke={label == data.key ? 'black' : this.props.labelColor}
            strokeWidth={0.5}
          >
            {text}
          </TextSVG>
        );
      });
    };*/
    let tempLabels = null;
    if (this.props.labelVisible) tempLabels = <Labels />;

    let centerLabel = null;
    if (this.props.centerLabel) centerLabel = this.props.centerLabel;

    return (
      <View style={{ justifyContent: 'center' }}>
        <PieChart
          animate={true}
          style={{
            height: this.props.width,
            width: this.props.width
          }}
          outerRadius={'90%'}
          innerRadius={'55%'}
          data={data}
          belowChart={true}
        >
          {tempLabels}
        </PieChart>

        <Text
          onLayout={({ nativeEvent: { layout: { width } } }) => {
            this.setState({ labelWidth: width });
          }}
          style={[
            {
              position: 'absolute',
              left: this.props.width / 2 - labelWidth / 2
            },
            this.props.centerLabelStyle
          ]}
        >
          {centerLabel}
        </Text>
      </View>
    );
  }
}
