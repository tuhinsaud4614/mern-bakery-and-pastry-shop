import React from "react";
import { useTheme } from "react-native-paper";
import Typography from "../../../components/typography";

const Description = ({ info }: { info?: string }) => {
  const theme = useTheme();

  return (
    <Typography
      variant="body2"
      style={{ color: theme.colors.palette.text.primary }}
    >
      {info ? info : "This product has no description"}
    </Typography>
  );
};

Description.displayName = "Description";
export default Description;
