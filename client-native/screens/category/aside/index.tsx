import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import Typography from '../../../components/typography';
import { dummyProducts } from '../../../dummy-data';
import { RootNavigationProps } from '../../../shared/routes';
import Accordion from './Accordion';
import AsideProductItem from './product-item';

const Aside = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { navigate } = useNavigation<RootNavigationProps>();

  return (
    <ScrollView>
      <Accordion
        title={<Typography variant="h5">Categories</Typography>}
        right={(expanded) => (
          <AntDesign
            size={20}
            color={theme.colors.palette.primary.main}
            name={expanded ? 'minus' : 'plus'}
          />
        )}
      >
        {Array.from({ length: 5 }).map((_, item) => (
          <List.Item
            key={item}
            title={`Category - ${item + 1}`}
            onPress={() =>
              navigate('Category', {
                id: (item + 1).toString(),
                title: `Category - ${item + 1}`,
              })
            }
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
      paddingHorizontal: theme.spacing * 2,
      paddingVertical: theme.spacing,
      borderTopColor: theme.colors.palette.divider,
      borderTopWidth: 1,
    },
    title: {
      color: theme.colors.palette.primary.main,
    },
  });
};
