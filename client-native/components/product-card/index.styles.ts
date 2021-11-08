import { StyleSheet } from 'react-native';

// eslint-disable-next-line no-undef
const makeStyles = (theme: ReactNativePaper.Theme, isSmUp: boolean = false) =>
  StyleSheet.create({
    title: {
      color: theme.colors.palette.secondary.light,
      fontWeight: '700',
      marginTop: theme.spacing * 0.5,
    },
    image: {
      height: isSmUp ? 150 : 110,
      resizeMode: 'cover',
      backgroundColor: 'transparent',
    },
    container: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#b9f6ca',
    },
    ratingAndFav: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    ratingBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    featured: {
      position: 'absolute',
      top: theme.spacing,
      left: theme.spacing,
      borderRadius: 0,
      zIndex: 5,
      backgroundColor: theme.colors.palette.secondary.main,
      color: theme.colors.palette.secondary.contrastText,
      paddingHorizontal: theme.spacing,
      paddingVertical: theme.spacing / 2,
    },
    btn: {
      flex: 1,
    },
    price: {
      paddingHorizontal: theme.spacing / 2,
      fontWeight: '700',
      color: theme.colors.palette.text.primary,
    },
  });

export default makeStyles;
