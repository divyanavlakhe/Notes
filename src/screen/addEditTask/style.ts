import { StyleSheet } from 'react-native';
import { BACKGROUNDCOLOR, BORDER_COLOR, LIGHT_GRAY, THEAME_COLOR, WHITE } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 15,
    backgroundColor: BACKGROUNDCOLOR
  },
  input: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: WHITE,
    color:LIGHT_GRAY
  },
  area: {
    height: 120,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: THEAME_COLOR,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop:20
  },
  buttonText: {
    color: WHITE,
    fontWeight: '700'
  }
});
