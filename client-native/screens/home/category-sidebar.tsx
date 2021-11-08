import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { dummyCategories } from '../../dummy-data';
import { RootNavigationProps } from '../../shared/routes';
import { typographyStyles } from '../../shared/utils/common.styles';

const CategorySidebar = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { navigate } = useNavigation<RootNavigationProps>();
  return (
    <View style={styles.root}>
      <List.Subheader style={styles.header}>Categories</List.Subheader>
      <ScrollView showsVerticalScrollIndicator={Platform.OS === 'web'}>
        {dummyCategories.map((category) => (
          <List.Item
            key={category.id}
            onPress={() => {
              navigate('Category', category);
            }}
            title={category.title}
            titleStyle={StyleSheet.flatten([
              typographyStyles.body1,
              styles.itemTitle,
            ])}
          />
        ))}
      </ScrollView>
    </View>
  );
};

CategorySidebar.displayName = 'CategorySidebar';
export default CategorySidebar;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.palette.accent,
    },
    header: {
      backgroundColor: theme.colors.palette.primary.main,
      color: theme.colors.palette.common.white,
      textTransform: 'uppercase',
      fontWeight: '700',
      paddingVertical: theme.spacing,
      paddingHorizontal: theme.spacing * 2,
    },
    itemTitle: {
      fontWeight: '700',
      textTransform: 'capitalize',
      color: theme.colors.palette.text.primary,
    },
  });
