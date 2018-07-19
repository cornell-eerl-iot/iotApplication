import { Dimensions } from 'react-native';

/*-----
CONSTANTS
*/
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
  electricity: require('../resources/electricity512px.png'),
  happy: require('../resources/happy.png'),
  sad: require('../resources/sad.png'),
  crying: require('../resources/crying.png'),
  veryHappy: require('../resources/veryHappy.png'),
  neutral: require('../resources/neutral.png'),
  house: require('../resources/consrv/house.png'),
  blender: require('../resources/appliances/blender.png'),
  microwave: require('../resources/appliances/microwave.png'),
  waterHeater: require('../resources/appliances/waterHeater.png'),
  airConditioner: require('../resources/appliances/airConditioner.png'),
  fridge: require('../resources/appliances/fridge.png'),
  kettle: require('../resources/appliances/kettle.png'),
  outlet: require('../resources/appliances/outlet.png'),
  tv: require('../resources/appliances/tv.png'),
  vacuum: require('../resources/appliances/vacuum.png'),
  toaster: require('../resources/appliances/toaster.png'),
  dryer: require('../resources/appliances/dryer.png'),
  unknown: require('../resources/appliances/unknown.png'),
  oven: require('../resources/appliances/oven.png'),
  back: require('../resources/appliances/back.png')
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

export const APPLIANCES_BY_TITLE = {
  Blender: {
    title: 'Blender',
    source: IMAGES.blender
  },
  Fridge: {
    title: 'Fridge',
    source: IMAGES.fridge
  },
  Kettle: {
    title: 'Kettle',
    source: IMAGES.kettle
  },
  Microwave: {
    title: 'Microwave',
    source: IMAGES.microwave
  },
  Outlet: {
    title: 'Outlet',
    source: IMAGES.outlet
  },
  Oven: {
    title: 'Oven',
    source: IMAGES.oven
  },
  Television: {
    title: 'Television',
    source: IMAGES.tv
  },
  Vacuum: {
    title: 'Vacuum',
    source: IMAGES.vacuum
  },
  'Water Heater': {
    title: 'Water Heater',
    source: IMAGES.waterHeater
  },
  AC: {
    title: 'AC',
    source: IMAGES.airConditioner
  },
  Toaster: {
    title: 'Toaster',
    source: IMAGES.toaster
  },
  Dryer: {
    title: 'Dryer',
    source: IMAGES.dryer
  },
  Sink: {
    title: 'Sink',
    source: require('./consrv/sink.png')
  },
  Shower: {
    title: 'Shower',
    source: require('./consrv/shower.png')
  },
  Hose: {
    title: 'Hose',
    source: require('./consrv/hose.png')
  },
  Dishwasher: {
    title: 'Dishwasher',
    source: require('./consrv/dishwasher.png')
  },
  Unknown: {
    title: 'Unknown',
    source: IMAGES.unknown
  }
};

export const APPLIANCES = {
  blender: {
    title: 'Blender',
    source: IMAGES.blender
  },
  fridge: {
    title: 'Fridge',
    source: IMAGES.fridge
  },
  kettle: {
    title: 'Kettle',
    source: IMAGES.kettle
  },
  microwave: {
    title: 'Microwave',
    source: IMAGES.microwave
  },
  outlet: {
    title: 'Outlet',
    source: IMAGES.outlet
  },
  oven: {
    title: 'Oven',
    source: IMAGES.oven
  },
  television: {
    title: 'Television',
    source: IMAGES.tv
  },
  vacuum: {
    title: 'Vacuum',
    source: IMAGES.vacuum
  },
  waterHeater: {
    title: 'Water Heater',
    source: IMAGES.waterHeater
  },
  airConditioner: {
    title: 'AC',
    source: IMAGES.airConditioner
  },
  toaster: {
    title: 'Toaster',
    source: IMAGES.toaster
  },
  dryer: {
    title: 'Dryer',
    source: IMAGES.dryer
  },
  sink: {
    title: 'Sink',
    source: require('./consrv/sink.png')
  },
  shower: {
    title: 'Shower',
    source: require('./consrv/shower.png')
  },
  hose: {
    title: 'Hose',
    source: require('./consrv/hose.png')
  },
  dishwasher: {
    title: 'Dishwasher',
    source: require('./consrv/dishwasher.png')
  },
  unknown: {
    title: 'Unknown',
    source: IMAGES.unknown
  }
};

export const EMOTIONS = {
  happy: {
    source: IMAGES.happy,
    tagLine: 'Good job!'
  },
  veryHappy: {
    source: IMAGES.veryHappy,
    tagLine: "You're doing amazingly!"
  },
  sad: {
    source: IMAGES.sad,
    tagLine: 'You can do better!'
  },
  crying: {
    source: IMAGES.crying,
    tagLine: 'Oh no!'
  },
  neutral: {
    source: IMAGES.neutral,
    tagLine: "You're doing okay!"
  }
};

/*---------------
FAKE DATA
*/
export const fake_pie_data1 = [
  {
    label: 'Shower',
    value: 30
  },
  {
    label: 'Sink',
    value: 5
  },
  {
    label: 'Hose',
    value: 40
  },
  {
    label: 'Unknown',
    value: 15
  },
  {
    label: 'Dishwasher',
    value: 10
  }
];

export const fake_pie_data = [
  {
    label: APPLIANCES.fridge.title,
    value: 15
  },
  {
    label: APPLIANCES.television.title,
    value: 15
  },
  {
    label: APPLIANCES.airConditioner.title,
    value: 15
  },
  {
    label: APPLIANCES.unknown.title,
    value: 15
  },
  {
    label: APPLIANCES.dryer.title,
    value: 11
  },
  {
    label: APPLIANCES.blender.title,
    value: 12
  },
  {
    label: APPLIANCES.kettle.title,
    value: 13
  },
  {
    label: APPLIANCES.microwave.title,
    value: 14
  },
  {
    label: APPLIANCES.outlet.title,
    value: 15
  },
  {
    label: APPLIANCES.oven.title,
    value: 10
  }
];

export const fake_timeline_data = [
  {
    time: '9:10am',
    title: APPLIANCES.blender.title + ' (60W)',
    icon: APPLIANCES.blender.source,
    description: 'On for two minutes.'
  },
  {
    time: '9:00am',
    title: APPLIANCES.microwave.title + ' (1200W)',
    icon: APPLIANCES.microwave.source,
    description: 'On for one minute.'
  },
  {
    time: '8:57am',
    title: APPLIANCES.waterHeater.title + ' (1500W)',
    icon: APPLIANCES.waterHeater.source,
    description: 'On for 30 minutes.'
  },
  {
    time: '8:51am',
    title: APPLIANCES.airConditioner.title + ' (1000W)',
    icon: APPLIANCES.airConditioner.source,
    description: 'On for 50 minutes.'
  },
  {
    time: '8:45am',
    title: APPLIANCES.toaster.title + ' (150W)',
    icon: APPLIANCES.toaster.source,
    description: 'On for two minutes.'
  },
  {
    time: '8:40am',
    title: APPLIANCES.fridge.title + ' (600W)',
    icon: APPLIANCES.fridge.source,
    description: 'On for one minute.'
  },
  {
    time: '8:30am',
    title: APPLIANCES.kettle.title + ' (1200W)',
    icon: APPLIANCES.kettle.source,
    description: 'On for 30 minutes.'
  },
  {
    time: '8:29am',
    title: APPLIANCES.outlet.title + ' (120W)',
    icon: APPLIANCES.outlet.source,
    description: 'On for 50 minutes.'
  }
];

export const fake_timeline_data1 = [
  {
    time: '9:10am',
    title: APPLIANCES.sink.title,
    icon: APPLIANCES.sink.source,
    description: 'On for two minutes.'
  },
  {
    time: '9:00am',
    title: APPLIANCES.shower.title,
    icon: APPLIANCES.shower.source,
    description: 'On for 12 minutes.'
  },
  {
    time: '8:57am',
    title: APPLIANCES.hose.title,
    icon: APPLIANCES.hose.source,
    description: 'On for 30 minutes.'
  },
  {
    time: '8:57am',
    title: APPLIANCES.shower.title,
    icon: APPLIANCES.shower.source,
    description: 'On for 15 minutes.'
  }
];

/* ---------------
FUNCTIONS
*/
