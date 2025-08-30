import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Insets,
  Image,
} from 'react-native';
import { FontFamily, THEAME_COLOR, WHITE } from '../../constants';
const DefaultHitSlop: Insets = { top: 10, bottom: 10, left: 10, right: 10 };

type HeaderType = 'default' | 'home' | 'back';

interface HeaderProps {
  type?: HeaderType;
  leftImage?: any;
  leftImageStyle?: ImageStyle;
  onPressLeft?: () => void;
  title?: string;
  subTitle?: string;
  titleStyle?: TextStyle;
  style?: ViewStyle;
  hitSlop?: Insets;
}

const Header: React.FC<HeaderProps> = ({
  type = 'default',
  leftImage,
  leftImageStyle,
  onPressLeft,
  title,
  subTitle,
  titleStyle,
  style,
  hitSlop = DefaultHitSlop,
}) => {
  const renderHeader = () => {
    switch (type) {
      case 'home':
        return (
          <View style={[styles.homeView, style]}>
            <View
              hitSlop={hitSlop}>
              <Image
                style={[styles.userImageStyle, leftImageStyle]}
                source={leftImage}
              />
            </View>
            <View style={styles.userView}>
              <Text numberOfLines={1} style={[styles.userNameStyle]}>
                {title}
              </Text>
              <Text numberOfLines={1} style={[styles.subTitleStyle]}>
                {subTitle}
              </Text>
            </View>
          </View>
        );

      case 'back':
        return (
          <View style={styles.rowAlign}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressLeft}
              hitSlop={hitSlop}>
              <Image
                style={[styles.backIcon, leftImageStyle]}
                source={leftImage}
              />
            </TouchableOpacity>
            <Text numberOfLines={1} style={[styles.titleText, titleStyle]}>
              {title}
            </Text>
          </View>
        );

      default:
        return (
          <View style={styles.defaultView}>
            <Text numberOfLines={1} style={[styles.titleText, titleStyle]}>
              {title}
            </Text>
          </View>
        );
    }
  };

  return <View style={styles.toolbarCont}>{renderHeader()}</View>;
};

export default memo(Header);

const styles = StyleSheet.create({
  toolbarCont: {
    backgroundColor: THEAME_COLOR,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  homeView: {
    height: 90,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 30,
    alignItems: 'center'
  },
  userImageStyle: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
  },
  userView: {
    marginLeft: 12
  },
  userNameStyle: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    fontWeight: 500,
    color: WHITE,
  },
  subTitleStyle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    fontWeight: 400,
    color: WHITE,
    marginTop: 3,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  rowAlign: {
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 30,
    alignItems: 'center'
  },
  titleText: {
    fontSize: 20,
    fontFamily: FontFamily.medium,
    fontWeight: 500,
    color: WHITE,
    marginLeft: 15
  },
  defaultView: {
    height: 60,
    paddingHorizontal: 10,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
