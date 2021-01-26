import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, Modal, Pressable } from 'react-native';
import Colors from "../constants/colors";
import GameView from "../components/GameView";
import Card from "../components/Card";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import { ColorTypes } from "../types";

interface Props {
   setColorType: (type: ColorTypes) => void;
   setIsPlaying: (isPlaying: boolean) => void;
}

const StartGameScreen = ({ setColorType, setIsPlaying }: Props) => {
   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

   const buttonOnPress = (type: ColorTypes) => {
      setColorType(type);
      setIsModalVisible(false);
      setIsPlaying(true);
   }

   console.log(Dimensions.get("window").width);

   return (
      <>
         <Header title="Guess the CSS color" />
         <GameView>
            <Modal
               animationType="slide"
               transparent={true}
               visible={isModalVisible}
            >
               <Card style={styles.modalContent}>
                  <Text style={styles.modalText}>Guess by:</Text>
                  <CustomButton 
                     handleOnPress={() => {
                        buttonOnPress(ColorTypes.name)
                     }}
                     text="Color name"
                  />
                  <CustomButton 
                     handleOnPress={() => {
                        buttonOnPress(ColorTypes.hex)
                     }}
                     text="Hexadecimal"
                  />
                  <CustomButton 
                     handleOnPress={() => {
                        buttonOnPress(ColorTypes.rgb)
                     }}
                     text="RGB"
                  />
               </Card>
            </Modal>
            <Pressable 
               onPress={() => { 
                  setIsModalVisible(true) 
               }}
               style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? Colors.primary
                      : Colors.background
                  },
                  styles.startButton
                ]}               
            >
               {({ pressed }) => (
                  <Text style={{...styles.startButtonText, color: pressed ? "white" : Colors.primary}}>Play</Text>
               )}
            </Pressable>
         </GameView>
      </>
   )
};

const styles = StyleSheet.create({
   text: {
      color: "#fff",
      fontSize: 16,
      marginBottom: 20
   },
   startButton: {
      width: Dimensions.get("window").width > 320 ? 250 : 180,
      height: Dimensions.get("window").width > 320 ? 250 : 180,
      borderRadius: Dimensions.get("window").width > 320 ? 125 : 90,
      borderColor: Colors.primary,
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center"
   },
   startButtonText: {
      fontSize: Dimensions.get("window").width > 320 ? 24 : 18,
      color: Colors.primary,
   },
   modalContent: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: Colors.background
   },
   modalText: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      color: Colors.primary 
   },
});

export default StartGameScreen;