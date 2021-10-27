import { AntDesign, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  useTheme,
} from "react-native-paper";
import Spinner from "../../components/spinner";
import { boxShadow } from "../../shared/utils";

const UserImage = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: status1 } =
          await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted" || status1 !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickController = async (role: "camera" | "gallery") => {
    setVisible(false);
    setLoading(true);
    if (role === "gallery") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } else {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
    setLoading(false);
  };

  return (
    <View style={styles.root}>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Choose photo</Dialog.Title>
          <Dialog.Content>
            <Button
              mode="contained"
              color={theme.colors.palette.secondary.main}
              onPress={() => pickController("gallery")}
            >
              From gallery
            </Button>
            <Button
              onPress={() => pickController("camera")}
              style={{ marginTop: theme.spacing * 2 }}
              mode="contained"
              color={theme.colors.palette.secondary.main}
            >
              From camera
            </Button>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              color={theme.colors.palette.secondary.main}
              onPress={() => setVisible(false)}
            >
              Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <LinearGradient
        style={styles.rootAction}
        colors={[
          theme.colors.palette.secondary.dark,
          theme.colors.palette.secondary.light,
        ]}
        start={[0, 0]}
        end={[1, 1]}
        locations={[0.2, 0.8]}
      >
        <IconButton
          style={styles.rootActionIcon}
          onPress={() => setVisible(true)}
          icon={(props) => (
            <Entypo
              {...props}
              color={theme.colors.palette.common.white}
              name="plus"
            />
          )}
        />
      </LinearGradient>
      {loading && <Spinner style={[styles.rootImage]} />}
      {!image && !loading && (
        <View style={[styles.rootImage]}>
          <AntDesign
            size={100}
            name="user"
            color={theme.colors.palette.primary.light}
          />
        </View>
      )}
      {!loading && image && (
        <Image
          style={styles.rootImage}
          resizeMode="cover"
          source={{ uri: image }}
        />
      )}
    </View>
  );
};

UserImage.displayName = "User.Image";
export default UserImage;

const makeStyles = (theme: ReactNativePaper.Theme) => {
  return StyleSheet.create({
    root: {
      width: 120,
      height: 120,
      backgroundColor: theme.colors.palette.background.default,
      borderRadius: 60,
      position: "relative",
      padding: theme.spacing,
      alignItems: "center",
      justifyContent: "center",
      ...boxShadow(4, 3),
    },
    rootImage: {
      width: 120 - theme.spacing * 0.5,
      height: 120 - theme.spacing * 0.5,
      borderRadius: (120 - theme.spacing * 0.5) / 2,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    rootAction: {
      position: "absolute",
      bottom: theme.spacing * 0.5,
      right: theme.spacing * 0.5,
      borderRadius: theme.spacing * 2,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
    },
    rootActionIcon: {
      margin: 0,
      width: theme.spacing * 4,
      height: theme.spacing * 4,
    },
  });
};
