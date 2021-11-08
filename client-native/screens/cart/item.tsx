/* eslint-disable react-native/no-inline-styles */
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Button, Divider, useTheme } from 'react-native-paper';
import Counter from '../../components/counter';
import Typography from '../../components/typography';
import { useBreakpointsWithDimensions } from '../../shared/hooks';
import { RootNavigationProps } from '../../shared/routes';
import { boxShadow } from '../../shared/utils';
import { typographyStyles } from '../../shared/utils/common.styles';
import { IProduct } from '../../shared/utils/interfaces';

const CartItem = ({
  product,
  classes,
}: {
  product: IProduct;
  classes?: { root?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>> };
}) => {
  const { navigate }: RootNavigationProps = useNavigation();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [count, setCount] = useState<number>(1);

  const {
    breakpoints: [isSmUp],
  } = useBreakpointsWithDimensions(['sm'], 'up');

  const onCounterPress = (action: 'add' | 'minus') => {
    if (action === 'add') {
      return setCount((prev) => prev + 1);
    }

    if (count > 1) {
      return setCount((prev) => prev - 1);
    }
  };
  const onCounterChange = (value: string) => {
    const newValue = value.replace(/[^0-9]/g, '');
    setCount(newValue === '' ? 0 : +newValue);
  };
  const onBlurHandler = () => {
    if (count === 0) {
      setCount(1);
    }
  };
  return (
    <View style={StyleSheet.flatten([styles.root, classes?.root])}>
      <View style={[styles.top]}>
        <Image
          source={product.images[0].large as any}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={[styles.topDetail]}>
          <Pressable
            onPress={() => {
              navigate('Detail', {
                productId: product.id,
                title: product.title,
                categoryId: product.category.id,
              });
            }}
          >
            {({ pressed }) => (
              <Typography
                variant={isSmUp ? 'h6' : 'body1'}
                style={{
                  color:
                    theme.colors.palette.text[
                      pressed ? 'secondary' : 'primary'
                    ],
                  fontWeight: '500',
                }}
                numberOfLines={2}
              >
                {product.title}
              </Typography>
            )}
          </Pressable>
          <View style={[styles.topDetailBottom]}>
            <Typography variant={isSmUp ? 'body1' : 'body2'}>
              {typeof product.price === 'number'
                ? product.price
                : product.price.small}
              ৳ x
            </Typography>
            <View style={styles.spacer}>
              <Counter
                count={count}
                onPress={onCounterPress}
                onCountChange={onCounterChange}
                onBlur={onBlurHandler}
                classes={{
                  btn: { width: 30, height: 30 },
                  input: { width: 32, paddingHorizontal: theme.spacing * 0.5 },
                }}
              />
            </View>
            <Typography
              variant="h6"
              style={{
                color: theme.colors.palette.primary.dark,
              }}
              numberOfLines={2}
            >
              {(typeof product.price === 'number'
                ? product.price
                : product.price.small) * (count === 0 ? 1 : count)}
              ৳
            </Typography>
          </View>
        </View>
      </View>
      <Divider />
      <View style={[styles.actions]}>
        <Button
          style={{
            flex: 1,
          }}
          labelStyle={isSmUp ? typographyStyles.body1 : typographyStyles.button}
          icon={({ color }) => (
            <Entypo
              name="trash"
              color={color}
              size={18}
              style={{ marginRight: theme.spacing }}
            />
          )}
          mode="contained"
          color={theme.colors.palette.secondary.main}
          onPress={() => console.log('Pressed')}
        >
          Remove
        </Button>
        <View style={{ width: theme.spacing }} />
        <Button
          style={{
            flex: 1,
          }}
          labelStyle={isSmUp ? typographyStyles.body1 : typographyStyles.button}
          icon={({ color }) => (
            <Entypo
              name="heart"
              color={color}
              size={18}
              style={{ marginRight: theme.spacing * 0.5 }}
            />
          )}
          mode="contained"
          color={theme.colors.palette.secondary.main}
          onPress={() => console.log('Pressed')}
        >
          Favorite
        </Button>
      </View>
    </View>
  );
};

CartItem.displayName = 'Cart.Item';
export default CartItem;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      backgroundColor: theme.colors.palette.accent,
      borderRadius: theme.spacing * 0.5,
      ...boxShadow(4, 3),
    },

    top: {
      flexDirection: 'row',
      padding: theme.spacing * 1.25,
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: theme.spacing,
      overflow: 'hidden',
    },
    topDetail: {
      paddingLeft: theme.spacing * 2,
      flex: 1,
    },
    topDetailBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    spacer: {
      padding: theme.spacing,
    },
    actions: {
      padding: theme.spacing * 1.25,
      flexDirection: 'row',
    },
  });
};
