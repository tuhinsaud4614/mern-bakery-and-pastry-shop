import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, List, useTheme } from 'react-native-paper';

const Aside = () => {
  const theme = useTheme();

  return (
    <ScrollView>
      <List.Accordion
        title="Categories"
        right={(props) => (
          <List.Icon
            {...props}
            icon={(iconProps) => <AntDesign {...iconProps} name="plus" />}
          />
        )}
      >
        <List.Item title="Hello" />
      </List.Accordion>
      <Divider style={{ marginVertical: theme.spacing * 1.5 }} />
      <View />
    </ScrollView>
  );
};

Aside.displayName = 'Aside';
export default Aside;
