import React, { ReactNode, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { typographyStyles } from '../../../utils/common.styles';

const AnimatedText = ({
  color,
  children,
}: {
  color: string;
  children?: string;
}) => {
  const scale = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  return (
    <Animated.Text
      style={{
        color: color,
        ...typographyStyles.button,
        transform: [{ scale: scale }],
      }}
    >
      {children}
    </Animated.Text>
  );
};

interface Props {
  isSmUp: boolean;
  onPress(): void;
  children: ReactNode;
  color: string;
  text?: string;
}

const TabBarItem = ({ isSmUp, onPress, color, children, text }: Props) => {
  const theme = useTheme();
  return (
    <TouchableRipple
      style={{
        ...(!isSmUp && { flex: 1 }),
        ...(isSmUp && {
          paddingHorizontal: theme.spacing * 2.5,
        }),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
      onPress={onPress}
    >
      <>
        {children}
        {text && <AnimatedText color={color}>{text}</AnimatedText>}
      </>
    </TouchableRipple>
  );
};

TabBarItem.displayName = 'TabBarItem';

export default TabBarItem;
