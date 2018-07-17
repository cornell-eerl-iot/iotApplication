import { Dimensions } from 'react-native';

export const IMAGES = {
  loginPage1: require('../resources/houseFilter.jpg'),
  loginPage2: require('../resources/house1.jpg'),
  loginPage3: require('../resources/house3.jpg'),
  homeBackground1: require('../resources/homeBackground.jpg'),
  happyFace: require('../resources/happyFace.png'),
  expand: require('../resources/expand.png'),
  expand1: require('../resources/expand1.png'),
  expand2: require('../resources/expand2.png'),
  trends: require('../resources/trends.png'),
  blender: require('./appliances/blender.png'),
  fridge: require('./appliances/fridge.png'),
  kettle: require('./appliances/kettle.png'),
  microwave: require('./appliances/microwave.png'),
  outlet: require('./appliances/outlet.png'),
  oven: require('./appliances/oven.png'),
  toaster: require('./appliances/toaster.png'),
  tv: require('./appliances/tv.png'),
  vacuum: require('./appliances/vacuum.png'),
  waterHeater: require('./appliances/waterHeater.png'),
  airConditioner: require('./appliances/airConditioner.png')
};

export const COLORS = {
  darkBlue: '#001F54',
  lightBlue: '#00CECB',
  red: '#FF5E5B',
  yellow: '#FFED66',
  white: '#fff'
};

export const DIM = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export const fake_pie_data = [
  {
    label: 'Fridge',
    value: 4
  },
  {
    label: 'Television',
    value: 25
  },
  {
    label: 'Air Conditioning',
    value: 40
  },
  {
    label: 'Unknown',
    value: 21
  },
  {
    label: 'Dryer',
    value: 10
  }
];

export const APPLIANCE_IMAGES = [];
