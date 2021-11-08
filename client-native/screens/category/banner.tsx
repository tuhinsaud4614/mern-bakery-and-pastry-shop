import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const CategoryBanner = ({ width, image }: { width: number; image: string }) => {
  const styles = makeStyles(width);
  return (
    <View style={styles.root}>
      <Image source={image as any} style={styles.img} />
    </View>
  );
};

const makeStyles = (width: number) =>
  StyleSheet.create({
    root: {
      width: width,
      height: width / 3.33,
    },
    img: {
      flex: 1,
      resizeMode: 'cover',
    },
  });

export default CategoryBanner;
