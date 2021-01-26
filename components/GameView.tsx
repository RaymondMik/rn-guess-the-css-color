import React from 'react'
import { StyleSheet, View } from 'react-native';

import Colors from "../constants/colors";

interface Props {
   style?: any;
   children: JSX.Element | JSX.Element[],
}

const GameView = ({ children, style }: Props) => <View style={{...styles.gameView, ...style}}>{children}</View>

const styles = StyleSheet.create({
   gameView: {
      flex: 1,
      backgroundColor: Colors.background,
      alignItems: "center",
      justifyContent: "center"
   }
});

export default GameView;
