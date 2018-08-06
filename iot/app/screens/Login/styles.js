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
  subHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textSubmit: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DIM.width
  },
  subHeaderText: {
    fontSize: 40,
    color: COLORS.white,
    fontWeight: '100',
    textAlign: 'center'
  },
  additionalInfoText: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    color: COLORS.red
  },
  forgotPasswordText: {
    fontSize: 15,
    fontWeight: '100',
    color: COLORS.yellow
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
  },
  footerText: {
    fontSize: 15,
    fontWeight: '100',
    color: COLORS.white
  },
  iconWrapper: {
    padding: 8,
    backgroundColor: COLORS.white,
    borderRadius: 50
  },
  icon: {
    width: 50,
    height: 50
  }
});
