import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import Accordion from '../../../components/accordion';
import Typography from '../../../components/typography';
import { dummyCategories, dummyProducts } from '../../../dummy-data';
import { RootNavigationProps } from '../../../shared/routes';
import AsideProductItem from './product-item';

const Aside = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { navigate } = useNavigation<RootNavigationProps>();

  return (
    <ScrollView>
      <Accordion
        initiallyExpanded={true}
        title={(expanded) => (
          <Typography
            variant="h5"
            style={{
              color: theme.colors.palette.primary[expanded ? 'main' : 'light'],
            }}
          >
            Categories
          </Typography>
        )}
        right={(expanded) => (
          <AntDesign
            size={20}
            color={theme.colors.palette.primary[expanded ? 'main' : 'light']}
            name={expanded ? 'minus' : 'plus'}
          />
        )}
      >
        {dummyCategories.map((category) => (
          <List.Item
            key={category.id}
            title={category.title}
            onPress={() => navigate('Category', category)}
          />
        ))}
      </Accordion>
      <View>
        <View style={styles.titleWrapper}>
          <Typography variant="h5" style={styles.title}>
            Related Products
          </Typography>
        </View>
        <AsideProductItem product={dummyProducts[0]} />
      </View>
    </ScrollView>
  );
};

Aside.displayName = 'Aside';
export default Aside;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    titleWrapper: {
      backgroundColor: theme.colors.palette.background.paper,
      padding: theme.spacing,
      borderTopColor: theme.colors.palette.divider,
      borderTopWidth: 1,
    },
    title: {
      color: theme.colors.palette.primary.main,
    },
  });
};
