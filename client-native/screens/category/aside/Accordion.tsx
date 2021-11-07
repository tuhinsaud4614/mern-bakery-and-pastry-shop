import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';
import Spacer from '../../../components/spacer';

type Ele = ReactNode | ((expanded: boolean) => ReactNode);

interface Props {
  initiallyExpanded?: boolean;
  title: Ele;
  left?: Ele;
  right?: Ele;
  children?: ReactNode;
}

const Accordion = ({
  initiallyExpanded = false,
  title,
  left,
  right,
  children,
}: Props) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [height, setHeight] = useState(0);
  const theme = useTheme();
  const styles = makeStyles(theme);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const expandedHandler = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: expanded ? height : 0,
      useNativeDriver: true,
      duration: 500,
      easing: Easing.bounce,
    }).start();
  }, [animatedHeight, expanded, height]);

  return (
    <View>
      <TouchableRipple onPress={expandedHandler}>
        <View style={styles.header}>
          {left && (typeof left === 'function' ? left(expanded) : left)}
          {left && <Spacer />}
          <View style={styles.title}>
            {typeof title === 'function' ? title(expanded) : title}
          </View>
          {right && <Spacer />}
          {right && (typeof right === 'function' ? right(expanded) : right)}
        </View>
      </TouchableRipple>
      {children && (
        <Animated.View style={[styles.content, { height: animatedHeight }]}>
          <View
            style={styles.content}
            onLayout={(e) => {
              setHeight(e.nativeEvent.layout.height);
            }}
          >
            {children}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default Accordion;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    header: {
      backgroundColor: theme.colors.palette.background.default,
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing,
    },
    title: {
      flex: 1,
    },
    content: {
      overflow: 'hidden',
    },
  });
};
