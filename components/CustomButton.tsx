import React from 'react';
import { StyleSheet, Text, View, Modal, Alert, Pressable } from 'react-native';
import Colors from "../constants/colors";

interface Props {
   handleOnPress: () => void;
   text: string;
   style?: any,
   disabled?: boolean
}

const CustomButton = ({ handleOnPress, text, style, disabled }: Props) => {
   const btnStyle = disabled ? {...styles.customButton, ...style, backgroundColor: "#ccc"} : {...styles.customButton, ...style };
   return (
      <Pressable 
         disabled={disabled}
         onPress={() => {
            handleOnPress();
         }}
         style={ btnStyle }
      >
         <Text style={styles.customButtonText}>{text}</Text>
      </Pressable>
   )
};

const styles = StyleSheet.create({
   customButton: {
      width: "100%",
      height: 40,
      backgroundColor: Colors.primary,
      borderRadius: 8,
      padding: 6,
      marginBottom: 20,
      alignItems: "center",
      justifyContent: "center"
   },
   customButtonText: {
      color: "white",
      fontSize: 15
   }
});

export default CustomButton;

