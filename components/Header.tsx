import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import Colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";

interface Props {
   title: string
}

const Header = ({ title }: Props) => <View style={styles.headerContainer}><Text style={{...styles.headerText, ...DefaultStyles.titleText }}>{title}</Text></View>;

const styles = StyleSheet.create({
   headerContainer: {
      width: "100%",
      height: Dimensions.get('window').height > 535 ? 90 : 70,
      paddingTop: 36,
      backgroundColor: Colors.primary,
      alignItems: "center",
      justifyContent: "center"
   },
   headerText: {
      color: "black",
      fontSize: Dimensions.get('window').height > 535 ? 35 : 30,
   }
});

export default Header;