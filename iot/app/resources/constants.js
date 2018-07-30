import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo';
import React from 'react';
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
  house: require('../resources/houseRed.png'),
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
  back: require('../resources/appliances/back.png'),
  exclamationMark: require('../resources/exclamationMark.png'),
  feed: require('../resources/feed.png'),
  retroTelevision: require('../resources/retroTelevision.png'),
  pieChart: require('../resources/pieChart.png'),
  blenderBlack: require('../resources/appliances/blenderBlack.png'),
  microwaveBlack: require('../resources/appliances/microwaveBlack.png'),
  waterHeaterBlack: require('../resources/appliances/waterHeaterBlack.png'),
  airConditionerBlack: require('../resources/appliances/airConditionerBlack.png'),
  fridgeBlack: require('../resources/appliances/fridgeBlack.png'),
  kettleBlack: require('../resources/appliances/kettleBlack.png'),
  outletBlack: require('../resources/appliances/outletBlack.png'),
  tvBlack: require('../resources/appliances/tvBlack.png'),
  vacuumBlack: require('../resources/appliances/vacuumBlack.png'),
  toasterBlack: require('../resources/appliances/toasterBlack.png'),
  dryerBlack: require('../resources/appliances/dryerBlack.png'),
  unknownBlack: require('../resources/appliances/unknownBlack.png'),
  ovenBlack: require('../resources/appliances/ovenBlack.png')
};

export const COLORS = {
  darkBlueGradient1: ['#001F54', '#003187'],
  darkBlueGradient: ['#001F54', '#003ba3'],
  redGradient: ['#FF5E5B', '#ff706d'],
  yellowGradient: ['#FFED66', '#f9f263'],
  darkBlue: '#001F54',
  lightBlue: '#00CECB',
  red: '#FF5E5B',
  yellow: '#FFED66',
  white: '#ffffff',
  baselineRed: '#FF5E5B',
  baselineGreen: '#0cfc55',
  black: '#000',
  green: '#42f474',
  gray: '#d1d1d1'
};

export const DIM = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export const APPLIANCES = {
  blender: {
    title: 'Blender',
    source: IMAGES.blenderBlack
  },

  fridge: {
    title: 'Fridge',
    source: IMAGES.fridgeBlack
  },
  kettle: {
    title: 'Kettle',
    source: IMAGES.kettleBlack
  },
  microwave: {
    title: 'Microwave',
    source: IMAGES.microwaveBlack
  },
  outlet: {
    title: 'Outlet',
    source: IMAGES.outletBlack
  },
  oven: {
    title: 'Oven',
    source: IMAGES.ovenBlack
  },
  television: {
    title: 'Television',
    source: IMAGES.tvBlack
  },
  vacuum: {
    title: 'Vacuum',
    source: IMAGES.vacuumBlack
  },
  waterHeater: {
    title: 'Water Heater',
    source: IMAGES.waterHeaterBlack
  },
  airConditioner: {
    title: 'AC',
    source: IMAGES.airConditionerBlack
  },
  toaster: {
    title: 'Toaster',
    source: IMAGES.toasterBlack
  },
  dryer: {
    title: 'Dryer',
    source: IMAGES.dryerBlack
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
    tagLine: 'Very Efficient!'
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

export const fakeDataArchive = {
  Blender: {
    title: 'Blender',
    efficiency: 2,
    averageEnergyUsage: 15,
    percentOfDay: 15,
    currentEnergyUsage: 0
  },
  Kettle: {
    title: 'Kettle',
    efficiency: 2,
    averageEnergyUsage: 15,
    percentOfDay: 15,
    currentEnergyUsage: 10
  },
  Microwave: {
    title: 'Microwave',
    efficiency: 2,
    averageEnergyUsage: 15,
    percentOfDay: 15,
    currentEnergyUsage: 100
  },
  Outlet: {
    title: 'Outlet',
    efficiency: 2,
    averageEnergyUsage: 15,
    percentOfDay: 15,
    currentEnergyUsage: 30
  },
  Television: {
    title: 'Television',
    efficiency: 2,
    averageEnergyUsage: 15,
    percentOfDay: 15,
    currentEnergyUsage: 45
  },

  Unknown: {
    title: 'Unknown',
    averageEnergyUsage: 15,
    percentOfDay: 15,
    currentEnergyUsage: 50
  },

  Dishwasher: {
    title: 'Dishwasher',
    efficiency: 2,
    averageEnergyUsage: 15,
    percentOfDay: 15,
    currentEnergyUsage: 0
  },
  Shower: {
    title: 'Shower',
    efficiency: 2,
    averageEnergyUsage: 15,
    percentOfDay: 15,
    currentEnergyUsage: 0
  },
  Hose: {
    title: 'Hose',
    efficiency: 2,
    averageEnergyUsage: 15,
    percentOfDay: 15,
    currentEnergyUsage: 0
  },
  Sink: {
    sink: 'Sink',
    efficiency: 2,
    averageEnergyUsage: 15,
    percentOfDay: 15,
    currentEnergyUsage: 0
  }
};

export const fakeData = {
  Blender: fakeDataArchive.Blender,
  Kettle: fakeDataArchive.Kettle,
  Microwave: fakeDataArchive.Microwave,
  Outlet: fakeDataArchive.Outlet,
  Television: fakeDataArchive.Television
};

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

export const applianceImageMap = {
  Blender: IMAGES.blenderBlack,
  Fridge: IMAGES.fridgeBlack,
  Kettle: IMAGES.kettleBlack,
  Microwave: IMAGES.microwaveBlack,
  Outlet: IMAGES.outletBlack,
  Television: IMAGES.tvBlack,
  Oven: IMAGES.ovenBlack,
  Vacuum: IMAGES.vacuumBlack,
  'Water Heater': IMAGES.waterHeaterBlack,
  AC: IMAGES.airConditionerBlack,
  Toaster: IMAGES.toasterBlack,
  Dryer: IMAGES.dryerBlack,
  Sink: require('./consrv/sink.png'),
  Shower: require('./consrv/shower.png'),
  Hose: require('./consrv/hose.png'),
  Dishwasher: require('./consrv/dishwasher.png'),
  Unknown: IMAGES.unknownBlack
};

/* ---------------
FUNCTIONS
*/
//e HAS to be between 1-10 or undefined
//must not be 0, will cause an error
export function getColor(e) {
  if (e == undefined) return COLORS.black;
  if (e >= 5) {
    if (e == 10) return COLORS.baselineGreen;
    return COLORS.baselineGreen + e + '0';
  } else {
    return COLORS.baselineRed + (10 - e) + '0';
  }
}

export function getApplianceInfo(title) {
  let db = fakeData;
  let info = {};
  let appliance = db[title];

  info.title = title;
  info.source = applianceImageMap[title];
  info.efficiency = appliance.efficiency;
  info.averageEnergyUsage = appliance.averageEnergyUsage;
  info.percentOfDay = appliance.percentOfDay;
  info.currentEnergyUsage = appliance.currentEnergyUsage;
  return info;
}
export function getPieData() {}
