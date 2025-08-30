import { StyleSheet } from 'react-native';
import { BACKGROUNDCOLOR, BORDER_COLOR, LIGHT_GRAY, RED, THEAME_COLOR, WHITE } from '../../constants';

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
    marginBottom: 10,
    backgroundColor: WHITE,
    color:LIGHT_GRAY
  },
  button: {
    backgroundColor: THEAME_COLOR,
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center'
  },
  buttonText: {
    color: WHITE,
    fontWeight: '700'
  },
  noteCard: {
    padding: 15,
    marginTop: 12,
    backgroundColor: WHITE,
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  note: {
    color: LIGHT_GRAY,
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    width: '50%',
  },
  deleteText: {
    color: RED,
    fontSize: 14,
  },
  noteHeader: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "600",
    color:LIGHT_GRAY
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
   icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
