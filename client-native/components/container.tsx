import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from 'react-native-paper';
import { useBreakpointsWithDimensions } from '../shared/hooks';
import { Breakpoints } from '../shared/utils';

interface Props {
  children?: ReactNode;
  classes?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  contentContainerStyle?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  component?: 'flat-list' | 'scroll-view';
  bounces?: boolean;
}

const Container = ({
  children,
  classes,
  component = 'scroll-view',
  contentContainerStyle,
  bounces = true,
}: Props) => {
  const theme = useTheme();
  const {
    breakpoints: [isLgUp],
    width,
  } = useBreakpointsWithDimensions(['lg'], 'up');
  const styles = makeStyles(theme, isLgUp, width);

  const style: StyleProp<ViewStyle> = StyleSheet.flatten([
    styles.root,
    classes && classes,
  ]);

  if (component === 'scroll-view') {
    return (
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={style}
        contentContainerStyle={StyleSheet.flatten([
          contentContainerStyle,
          { padding: theme.spacing * 2 },
        ])}
        bounces={bounces}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  }

  return (
    <KeyboardAwareFlatList
      bounces={bounces}
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => 'dummy'}
      renderItem={null}
      showsVerticalScrollIndicator={false}
      style={style}
      ListHeaderComponent={
        <View
          style={StyleSheet.flatten([
            contentContainerStyle,
            { padding: theme.spacing * 2 },
          ])}
        >
          {children}
        </View>
      }
    >
      {children}
    </KeyboardAwareFlatList>
  );
};

Container.displayName = 'Container';
export default Container;

const makeStyles = (
  // eslint-disable-next-line no-undef
  theme: ReactNativePaper.Theme,
  isLgUp: boolean,
  dimWidth: number
) => {
  return StyleSheet.create({
    root: {
      backgroundColor: theme.colors.palette.common.white,
      maxWidth: Breakpoints.lg,
      ...(isLgUp && { marginHorizontal: (dimWidth - Breakpoints.lg) / 2 }),
    },
  });
};
