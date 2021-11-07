import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Logo from '../../../../components/logo';

const TabBarLogo = ({ onPress }: { onPress(): void }) => {
  return (
    <View style={styles.root}>
      <Pressable onPress={onPress} style={styles.btn}>
        <Logo />
      </Pressable>
    </View>
  );
};
TabBarLogo.displayName = 'TabBarLogo';
export default TabBarLogo;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  btn: {
    width: 150,
    justifyContent: 'center',
    height: 40,
  },
});
