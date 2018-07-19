import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import moment from 'moment';

import { G, Line } from 'react-native-svg';
import { COLORS, DIM } from '../../resources/constants';

const UNIT = 'W';

const CustomGrid = ({ x, y, data, ticks }) => (
  <G>
    {// Horizontal grid
    ticks.map(tick => (
      <Line
        key={tick}
        x1={'0%'}
        x2={'100%'}
        y1={y(tick)}
        y2={y(tick)}
        stroke={COLORS.yellow + '20'}
      />
    ))}
    {// Vertical grid
    data.map((_, index) => (
      <Line
        key={index}
        y1={'0%'}
        y2={'95%'}
        x1={x(index)}
        x2={x(index)}
        stroke={COLORS.yellow + '20'}
      />
    ))}
  </G>
);

export default class LineGraph extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    height: PropTypes.number,
    mode: PropTypes.string, ////Different types of modes are detailed here
    /*
    'time' --> means something of the 9:32 nature, where moment could parse it
    'other' --> special axis labels
    */
    maxPointsOnScreen: PropTypes.number
  };

  constructor(props) {
    super(props);
  }

  render() {
    //Determine preferred width:
    let excess = this.props.data.length - this.props.maxPointsOnScreen;
    if (excess > 0) {
      console.log('entered if statement');
      width =
        DIM.width +
        (this.props.data.length - this.props.maxPointsOnScreen - 1) *
          DIM.width *
          0.85 /
          this.props.maxPointsOnScreen;
    } else {
      width = DIM.width * 0.85;
    }

    const contentInset = { top: 20, bottom: 20 };

    const numOfXLabels = Math.floor(width / (DIM.width * 0.8 / 7));

    const indices = [Math.floor(this.props.data.length / numOfXLabels)];

    for (var x = 1; x < numOfXLabels; x++) {
      indices.push(indices[0] + indices[0] * x);
    }

    tempIndex = 0;
    return (
      <View
        style={{
          height: 225,
          backgroundColor: COLORS.darkBlue,
          borderRadius: 10
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            height: 200
          }}
        >
          <YAxis
            style={{
              height: 200,
              width: DIM.width * 0.15
            }}
            data={this.props.data}
            yAccessor={({ item }) => item.power}
            contentInset={contentInset}
            svg={{
              fill: COLORS.yellow,
              fontSize: 10
            }}
            numberOfTicks={7}
            formatLabel={value => `${value}` + UNIT}
          />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            ref={ref => (this.scrollView = ref)}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}
          >
            <View style={{ alignItems: 'flex-start' }}>
              <LineChart
                numberOfTicks={7}
                xScale={scale.scaleTime}
                style={{ width: width, height: 200 }}
                data={this.props.data}
                yAccessor={({ item }) => item.power}
                xAccessor={({ index }) => index}
                svg={{ stroke: COLORS.yellow, strokeWidth: '2' }}
                contentInset={{ top: 20, bottom: 20, left: 20, right: 23 }}
                animate
              >
                <CustomGrid belowChart={false} />
              </LineChart>

              <XAxis
                xAccessor={({ index }) => index}
                style={{
                  width: width
                }}
                data={this.props.data}
                formatLabel={(value, label) => {
                  if (this.props.mode == 'other') {
                    return this.props.data[value].time;
                  }
                  return moment(this.props.data[value].time).format('h:mm:ss');
                }}
                contentInset={{ top: 20, bottom: 20, left: 20, right: 23 }}
                svg={{ fontSize: 10, fill: COLORS.yellow }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
