import React, { useState, useEffect, useRef } from "react";
import { Dimensions,StyleSheet, View, Text } from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Colors from "../constants/colors";
import CustomButton from "../components/CustomButton";
import GameView from "../components/GameView";
import Card from "../components/Card";
import * as colorData from "../css_colors.json";

import { ColorTypes, Answer } from "../types";

interface Props {
   colorType: ColorTypes,
   setIsPlaying: (isPlaying: boolean) => void;
   setIsGameOver: (isGameOver: boolean) => void;
   setAnswers: (answer: any) => void;
   maxGameRounds: number,
}

interface RadioProp {label: string, value: string};

const calculateRandomIndex = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min;

const GameScreen = ({ 
   colorType,
   setIsPlaying,
   setIsGameOver,
   maxGameRounds,
   setAnswers
}: Props) => {
   const COLORS_LENGTH = 138; // Object.keys(colorData).length;
   
   const [currentSelection, setCurrentSelection] = useState<string>("");
   const [currentRound, setCurrentRound] = useState<number>(0);
   const [currentOptionIndex, setCurrenOptionIndex] = useState<number>(calculateRandomIndex(0, COLORS_LENGTH));
   const [option1Index, setOption1Index] = useState<number>(calculateRandomIndex(0, COLORS_LENGTH));
   const [option2Index, setOption2Index] = useState<number>(calculateRandomIndex(0, COLORS_LENGTH));
   const [currentColor, setCurrentColor] = useState<any>(colorData[currentOptionIndex])
   const [radioProps, setRadioProps] = useState<RadioProp[]>([
      { label: currentColor[colorType], value: currentColor[colorType] },
      { label: colorData[option1Index][colorType], value: colorData[option1Index][colorType] },
      { label: colorData[option2Index][colorType], value: colorData[option2Index][colorType] }
   ]);
   const [radioBgColor, setRadioBgColor] = useState<string>("transparent");

   useEffect(() => {   
      setCurrenOptionIndex(calculateRandomIndex(0, COLORS_LENGTH))
      setOption1Index(calculateRandomIndex(0, COLORS_LENGTH));
      setOption2Index(calculateRandomIndex(0, COLORS_LENGTH));
      setCurrentColor(colorData[currentOptionIndex]);
      setCurrentSelection("");
      setRadioBgColor("transparent");

      setRadioProps(() => {
         let currentState: RadioProp[] = [];
         const rightAnswer = { label: colorData[currentOptionIndex][colorType], value: colorData[currentOptionIndex][colorType] };
         const wrong1 = { label: colorData[option1Index][colorType], value: colorData[option1Index][colorType] };
         const wrong2 = { label: colorData[option2Index][colorType], value: colorData[option2Index][colorType] };
   
         const randomIndex = calculateRandomIndex(0, 2);
   
         currentState[randomIndex] = rightAnswer;
   
         if (randomIndex === 0) {
            currentState[1] = wrong1;
            currentState[2] = wrong2;
         } else if (randomIndex === 1) {
            currentState[0] = wrong1;
            currentState[2] = wrong2;
         } else {
            currentState[0] = wrong1;
            currentState[1] = wrong2;
         }

         return currentState;
      }); 
         
      if (currentRound === maxGameRounds) {
         setCurrentRound(0);
         setIsPlaying(false);
         setIsGameOver(true);
      }
   }, [currentRound])

   const onSubmit = () => {
      console.log(222, currentColor);
      if (currentColor && currentColor[colorType] === currentSelection) {
         setAnswers((prevState: Answer[]) => [...prevState, { ...currentColor, correct: true }] );
         setRadioBgColor(Colors.green);
      } else {
         setAnswers((prevState: Answer[]) => [...prevState, { ...currentColor, correct: false }] );
         setRadioBgColor(Colors.red);
      }

      setTimeout(() => {
         setCurrentRound(currentRound + 1);
      }, 1250)      
   }

   const radioBackground = (value: any) => (value === currentSelection && value === currentColor[colorType] || value === currentSelection && value !== currentColor[colorType]) ? { backgroundColor: radioBgColor } : {};

   return (
      <GameView>
         <Text style={styles.gameTitle}>Guess the CSS color: {currentRound !== maxGameRounds ? currentRound + 1 : currentRound} out of {maxGameRounds}</Text>
         <Card style={styles.card}>
            <View style={{...styles.colorPreview, backgroundColor: currentColor[colorType] }}></View>
            <View style={styles.colorChoices}>
               <RadioForm formHorizontal={false} animation={true}>
               { 
                  radioProps.map((obj, i) => (
                     <RadioButton labelHorizontal={true} key={i} style={{...styles.colorRadios, ...radioBackground(obj.value)}}>
                        <RadioButtonInput
                           obj={obj}
                           index={i}
                           isSelected={currentSelection === obj.value}
                           onPress={(value) => { setCurrentSelection(value) }}
                           buttonInnerColor={'#fff'}
                           buttonOuterColor={currentSelection === obj.value ? '#fff' : '#fff'}
                           buttonSize={16}
                           buttonOuterSize={34}
                           buttonStyle={{}}
                           buttonWrapStyle={{marginLeft: 10}}
                        />
                        <RadioButtonLabel
                           obj={obj}
                           index={i}
                           labelHorizontal={true}
                           labelStyle={{fontSize: 18, color: '#fff'}}
                           labelWrapStyle={{}}
                           onPress={(value) => { setCurrentSelection(value) }}
                        />
                     </RadioButton>
                  ))
               }  
               </RadioForm>
            </View>
            <CustomButton 
               handleOnPress={() => {
                  onSubmit();
               }}
               text="Submit"
               style={styles.colorButton}
               disabled={currentSelection === ""}
            />
         </Card>
      </GameView>
   )
};

const styles = StyleSheet.create({
   gameTitle: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: Dimensions.get('window').height > 535 ? 10 : 5,
   },
   card: {
      width: "85%",
      height: Dimensions.get('window').height > 535 ? "75%" : "95%",
      backgroundColor: Colors.light_background,
      alignItems: "flex-start",
   },
   colorPreview: {
      width: "100%",
      height: Dimensions.get('window').height > 535 ? "55%" : "50%",
      backgroundColor: "white",
   },
   colorChoices: {
      marginTop: Dimensions.get('window').height > 535 ? 20 : 10, 
   },
   colorRadios: {
      marginTop: 10,
      paddingRight: "10%",
      paddingVertical: 10,
      borderRadius: 5
   },
   colorButton: {
      marginTop: Dimensions.get('window').height > 535 ? 30 : 10, 
   }
})

export default GameScreen;