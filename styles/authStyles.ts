
import {StyleSheet} from 'react-native';

export const authStyles = StyleSheet.create({
  wrapper: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  authTitle: {
    color: '#212121',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    marginTop: 32,
    marginBottom: 33,
  },
  sectionStyle: {
    height: 50,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 16,
  },
  sectionStyleLast: {
    marginBottom: 43,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#E8E8E8',
    backgroundColor: '#f6f6f6',
    color: '#BDBDBD',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
  },
  inputInFocusStyle: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ff6c00',
    backgroundColor: '#fff',
    color: '#212121',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
  },
});
