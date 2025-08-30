import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LIGHT_GRAY, Strings } from '../../constants';

type Props = {
  title?: string;
  subtitle?: string;
};

const EmptyState: React.FC<Props> = ({
  title = Strings.noItems,
  subtitle = Strings.addSomethingToGetStarted,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default memo(EmptyState);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
    color:LIGHT_GRAY
  },
  subtitle: {
    fontSize: 14,
    color: LIGHT_GRAY,
    textAlign: 'center',
  },
});
