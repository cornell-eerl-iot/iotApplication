import { StyleSheet } from 'react-native';
import { COLORS, DIM, IMAGES } from '../../resources/constants';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DIM.width
  },

  buttonStyle: {
    width: DIM.width * 0.8,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.4
  },
  buttonText: {
    fontSize: 33,
    fontWeight: '100',
    color: COLORS.darkBlue
  }
});
