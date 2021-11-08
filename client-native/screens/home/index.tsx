import { AntDesign, Entypo } from '@expo/vector-icons';
import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, List, useTheme } from 'react-native-paper';
import Logo from '../../components/logo';
import Spacer from '../../components/spacer';
import TabScreenWrapper from '../../components/tab-screen-wrapper';
import Typography from '../../components/typography';
import { TabsNavigationProps } from '../../shared/routes';
import { typographyStyles } from '../../shared/utils/common.styles';
import BannerAndCategory from './banner-and-category';
import CategorizedProducts from './categorized-products';
import FeaturedProducts from './featured-products';
import Sidebar from './sidebar';

const HomeScreen = (navigationProps: TabsNavigationProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <TabScreenWrapper>
      <Sidebar navigationProps={navigationProps}>
        {(onHide) => (
          <ScrollView showsVerticalScrollIndicator={Platform.OS === 'web'}>
            <View style={styles.header}>
              <View style={styles.headerLogo}>
                <Logo />
              </View>
            </View>
            <View style={styles.userInfo}>
              <Avatar.Image source={require('../../assets/cake.jpeg')} />
              {/* <Avatar.Icon
                style={{ backgroundColor: theme.colors.palette.common.white }}
                color={theme.colors.palette.primary.light}
                icon={(props) => <AntDesign {...props} name="user" />}
              /> */}
              <Spacer />
              <Typography variant="h5" numberOfLines={1}>
                Tuhin
              </Typography>
              <Spacer />
              <Button
                mode="contained"
                onPress={() => {}}
                icon={(props) => <AntDesign {...props} name="logout" />}
                color={theme.colors.palette.secondary.main}
                style={styles.logoutBtn}
              >
                Logout
              </Button>
            </View>
            <List.Item
              onPress={() => {
                onHide();
              }}
              title="About us"
              titleStyle={styles.item}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={(iconProps) => (
                    <Entypo {...iconProps} name="info-with-circle" />
                  )}
                />
              )}
            />
            <List.Item
              onPress={() => {
                onHide();
              }}
              title="Contact us"
              titleStyle={styles.item}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={(iconProps) => <Entypo {...iconProps} name="phone" />}
                />
              )}
            />
            <View style={styles.titleWrapper}>
              <Typography variant="h6" style={styles.title}>
                Category
              </Typography>
            </View>
            {Array.from({ length: 15 }).map((_, index) => (
              <List.Item
                key={index}
                onPress={() => {
                  onHide();
                }}
                title={`Pastry, Cup Pastry & Tart- ${index}`}
                titleStyle={styles.item}
              />
            ))}
          </ScrollView>
        )}
      </Sidebar>
      <BannerAndCategory />
      {/* <BannerAndCategorySkeleton /> */}
      <FeaturedProducts />
      <CategorizedProducts />
    </TabScreenWrapper>
  );
};
HomeScreen.displayName = 'HomeScreen';
export default HomeScreen;

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    userInfo: {
      backgroundColor: theme.colors.palette.accent,
      padding: theme.spacing,
      alignItems: 'center',
    },
    logoutBtn: {
      marginBottom: theme.spacing,
      width: '100%',
    },
    header: {
      backgroundColor: theme.colors.palette.primary.light,
      padding: theme.spacing,
    },
    headerLogo: {
      width: 150,
      height: 40,
    },
    titleWrapper: {
      backgroundColor: theme.colors.palette.background.default,
      padding: theme.spacing,
    },
    title: {
      fontWeight: '700',
      color: theme.colors.palette.primary.main,
    },
    item: {
      ...typographyStyles.body1,
      // fontWeight: '700',
      textTransform: 'capitalize',
      color: theme.colors.palette.secondary.main,
    },
  });
};
