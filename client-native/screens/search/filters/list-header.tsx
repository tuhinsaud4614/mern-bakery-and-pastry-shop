import React, { ReactNode } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "../../../components/typography";

interface Props {
  title: string;
  left?(props: { color: string }): ReactNode;
  children: ReactNode;
}

const ListHeader = ({ title, left, children }: Props) => {
  const theme = useTheme();
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: theme.spacing,
          backgroundColor: theme.colors.palette.grey["100"],
        }}
      >
        {left ? left({ color: theme.colors.palette.secondary.main }) : null}
        <Typography
          variant="h6"
          style={{
            flex: 1,
            ...(!!left && { paddingLeft: theme.spacing }),
            color: theme.colors.palette.secondary.main,
          }}
          textTransform="capitalize"
        >
          {title}
        </Typography>
      </View>
      {children}
    </View>
  );
};

ListHeader.displayName = "ListHeader";
export default ListHeader;
