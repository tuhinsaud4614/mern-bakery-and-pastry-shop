/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Carousel from '../../components/carousel';
import Container from '../../components/container';
import Grid from '../../components/grid';
import ProductBox from '../../components/product-box';
import ProductCard from '../../components/product-card';
import { dummyProducts } from '../../dummy-data';
import { useBreakpointsWithDimensions } from '../../shared/hooks';
import { DetailNavigationProps } from '../../shared/routes';
import ExtraInformation from './extra-information';
import makeStyles from './index.styles';
import Information from './information';

const images = [
  require('../../assets/cake-300w.jpeg'),
  require('../../assets/others.jpeg'),
];

const DetailScreen = ({
  route: {
    // params: { categoryId, productId = '1', title },
  },
}: DetailNavigationProps) => {
  // const { navigate, goBack,getState }: NavigationProp<RootStackParamList> =
  //   useNavigation();

  const theme = useTheme();
  const styles = makeStyles(theme);
  const {
    breakpoints: [isSmUp],
    width: windowWidth,
  } = useBreakpointsWithDimensions(['sm'], 'up');
  const infoSmUpWidth = windowWidth * 0.4 - theme.spacing * 4;
  const product =
    dummyProducts.find((demoProduct) => demoProduct.id === '1') ||
    dummyProducts[0];
  // return (
  //   <Container keyBoardAvoiding={Platform.OS !== "web"}>
  //     <DetailSkeleton />
  //   </Container>
  // );
  return (
    <Container>
      <View style={styles.main}>
        <View
          style={{
            width: isSmUp ? infoSmUpWidth : '100%',
          }}
        >
          <Carousel
            data={images}
            itemWidth={isSmUp ? infoSmUpWidth : windowWidth - theme.spacing * 4}
            pageItem={(value) => (
              <Image
                source={value}
                style={{
                  height: 40,
                  width: 50,
                  borderRadius: theme.spacing * 0.5,
                }}
                resizeMode="cover"
              />
            )}
            slide={(value) => (
              <Image source={value} style={{ width: '100%', height: '100%' }} />
            )}
            classes={{
              wrapper: { flexBasis: '100%', flexShrink: 0 },
            }}
          />
        </View>
        <Information isSmUp={isSmUp} product={product} />
      </View>
      <ExtraInformation product={product} />
      <ProductBox
        classes={{ root: styles.relatedProducts }}
        title="related products"
      >
        <Grid>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid
              xs={6}
              sm={4}
              md={3}
              item
              style={{ padding: theme.spacing }}
              key={index}
            >
              <ProductCard data={product} />
              {/* <ProductCardSkeleton /> */}
            </Grid>
          ))}
        </Grid>
      </ProductBox>
    </Container>
  );
};

DetailScreen.displayName = 'DetailScreen';
export default DetailScreen;
