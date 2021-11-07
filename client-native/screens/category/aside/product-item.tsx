import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';
import Spacer from '../../../components/spacer';
import Typography from '../../../components/typography';
import { IProduct } from '../../../shared/utils/interfaces';

const AsideProductItem = ({ product }: { product: IProduct }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <TouchableRipple onPress={() => {}}>
      <View style={styles.root}>
        <Image source={product.images[0].large as any} style={styles.image} />
        <View style={styles.content}>
          <Typography variant="h6" style={styles.title} numberOfLines={2}>
            {product.title}
          </Typography>
          <Spacer />
          <View style={styles.ratingBox}>
            {Array.from({ length: 5 }).map((_, index) => (
              <AntDesign
                key={index}
                name={product.totalRatings >= index + 1 ? 'star' : 'staro'}
                size={16}
                color={
                  product.totalRatings >= index + 1
                    ? theme.colors.palette.secondary.main
                    : theme.colors.palette.text.secondary
                }
              />
            ))}
            <Typography
              variant="body2"
              style={{ color: theme.colors.palette.text.secondary }}
            >
              {' '}
              ({product.totalRatings})
            </Typography>
          </View>
          <Spacer />
          <Typography variant="body1" style={styles.price}>
            {typeof product.price !== 'number'
              ? `${product.price.small}৳ - ${product.price.extraLarge}৳`
              : `${product.price}৳`}{' '}
          </Typography>
        </View>
      </View>
    </TouchableRipple>
  );
};

AsideProductItem.displayName = 'Aside.ProductItem';
export default AsideProductItem;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      padding: theme.spacing,
    },
    image: { width: 90, height: (90 / 16) * 9 },
    content: {
      flex: 1,
      paddingLeft: theme.spacing,
    },
    title: {
      color: theme.colors.palette.primary.main,
    },
    ratingBox: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    price: { color: theme.colors.palette.primary.main, fontWeight: '700' },
  });
};
