import React, {
  ComponentPropsWithoutRef,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Button, List, useTheme } from "react-native-paper";
import Typography from "../../../components/typography";
import { typographyStyles } from "../../../shared/utils/common.styles";

const ByPrice = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const onPriceChange = (value: string, action: "min" | "max") => {
    const newValue = value.replace(/[^0-9]/g, "");
    if (action === "min") {
      return setMinPrice(newValue === "" ? 0 : +newValue);
    }
    setMaxPrice(newValue === "" ? 0 : +newValue);
  };
  return (
    <List.Accordion
      title="Price"
      style={{ paddingVertical: 0 }}
      titleNumberOfLines={1}
      theme={{ colors: { primary: theme.colors.palette.secondary.main } }}
    >
      <View style={styles.itemTag}>
        {["All Prices", "120৳ to 150৳"].map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {}}
            style={StyleSheet.flatten([
              styles.item,
              {
                backgroundColor:
                  index === 0
                    ? theme.colors.palette.accent
                    : theme.colors.palette.action.disabledBackground,
              },
            ])}
          >
            <Typography
              variant="body2"
              style={{
                color:
                  index === 0
                    ? theme.colors.palette.primary.dark
                    : theme.colors.palette.text.primary,
                fontWeight: "700",
              }}
            >
              {item}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.range}>
        <PriceInput
          label="Min"
          keyboardType="numeric"
          value={minPrice.toString()}
          onChangeText={(value) => onPriceChange(value, "min")}
        />
        <PriceInput
          label="Max"
          keyboardType="numeric"
          value={maxPrice.toString()}
          onChangeText={(value) => onPriceChange(value, "max")}
          classes={{ root: { marginLeft: theme.spacing * 0.5 } }}
        />
        <Button
          mode="contained"
          color={theme.colors.palette.secondary.main}
          onPress={() => {}}
          style={{
            marginLeft: theme.spacing,
            alignItems: "center",
            justifyContent: "center",
          }}
          labelStyle={typographyStyles.body1}
        >
          Go
        </Button>
      </View>
    </List.Accordion>
  );
};

ByPrice.displayName = "Filter.ByPrice";

export default ByPrice;

const PriceInput = ({
  label,
  classes,
  ...rest
}: {
  label: string;
  classes?: { root?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>> };
} & ComponentPropsWithoutRef<typeof TextInput>) => {
  const ref: MutableRefObject<TextInput | null> = useRef(null);
  const [focus, setFocus] = useState(false);
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View
      style={StyleSheet.flatten([
        styles.inputContainer,
        {
          borderColor: theme.colors.palette.secondary[focus ? "dark" : "light"],
        },
        classes?.root,
      ])}
    >
      <Typography
        variant="body1"
        style={StyleSheet.flatten([styles.inputLabel])}
      >
        {label}
      </Typography>
      <View style={StyleSheet.flatten([styles.inputWrapper])}>
        <Typography
          variant="body1"
          style={StyleSheet.flatten([styles.inputAffix])}
        >
          ৳
        </Typography>
        <TextInput
          {...rest}
          ref={ref}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={StyleSheet.flatten([styles.input, rest.style])}
        />
      </View>
    </View>
  );
};

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    item: {
      padding: theme.spacing,
      borderRadius: theme.spacing * 0.5,
      marginTop: theme.spacing,
      marginLeft: theme.spacing,
    },
    itemTag: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      paddingBottom: theme.spacing,
      paddingRight: theme.spacing,
    },
    range: {
      flexDirection: "row",
      alignItems: "stretch",
      flexWrap: "wrap",
      padding: theme.spacing,
    },
    inputContainer: {
      borderWidth: 1,
      borderRadius: theme.spacing * 0.5,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    inputLabel: {
      paddingLeft: theme.spacing,
      fontWeight: "700",
      color: theme.colors.palette.text.secondary,
      paddingHorizontal: theme.spacing,
      paddingTop: theme.spacing * 0.5,
    },
    inputAffix: {
      paddingLeft: theme.spacing,
      fontWeight: "700",
      color: theme.colors.palette.text.primary,
    },
    input: {
      flex: 1,
      width: 50,
      textAlign: "left",
      color: theme.colors.palette.text.primary,
      paddingVertical: theme.spacing * 0.5,
      paddingLeft: theme.spacing * 0.5,
      paddingRight: theme.spacing,
    },
  });
};
