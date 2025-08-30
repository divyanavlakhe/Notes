import { StyleSheet } from 'react-native';
import { BACKGROUNDCOLOR, THEAME_COLOR, BORDER_COLOR, WHITE, LIGHT_GRAY } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: BACKGROUNDCOLOR
  },
  search: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    backgroundColor: WHITE,
    width: '88%',
    color:LIGHT_GRAY
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 15,
    justifyContent: 'space-between'
  },
  filterIconWrapper: {
    paddingLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: THEAME_COLOR,
  },
  noteHeader: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "600",
    color: LIGHT_GRAY
  },
  fab: {
    position: 'absolute',
    right: 15,
    bottom: 10,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: THEAME_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3
  },
  fabText: {
    color: WHITE,
    fontSize: 28,
    lineHeight: 28
  }
});
