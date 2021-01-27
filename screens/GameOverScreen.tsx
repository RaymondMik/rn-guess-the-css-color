import React from "react";
import { Dimensions, StyleSheet, View, Text, FlatList } from 'react-native'
import GameView from "../components/GameView";
import CustomButton from "../components/CustomButton";
import { Answer } from "../types";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Colors from "../constants/colors";

interface Props {
   setIsPlaying: (isPlaying: boolean) => void;
   setIsGameOver: (isGameOver: boolean) => void;
   setAnswers: (answers: any) => void;
   answers: Answer[];
   maxGameRounds: number;
}

const GameOverScreen = ({ 
   setIsPlaying,
   setIsGameOver, 
   answers,
   setAnswers,
   maxGameRounds
}: Props) => {
   const correctAnswers: number = answers.filter((answer: Answer) => answer.correct).length;
   const emoji: string = correctAnswers > 8 ? "🏆" : correctAnswers < 5 ? "🤷🏼‍♀️" : "";

   return (
         <GameView style={{ paddingTop: 35 }}>
            <Text style={styles.text}>You scored {correctAnswers} out of {maxGameRounds} {emoji}</Text>
            <FlatList 
               style={styles.answersContainer}
               data={answers}
               numColumns={2}
               renderItem={(ItemData: any) => (
                  <View style={styles.answerPreview}>
                     <View style={{...styles.answerPreviewImage, backgroundColor: ItemData.item.hex}}/>
                     <View style={styles.answerPreviewTextContainer}>
                        <Text style={styles.answerPreviewText}>{ItemData.item.name}</Text>
                        {ItemData.item.correct ? (
                           <AntDesign name="checkcircle" size={24} color={Colors.green} />) : (
                           <Entypo name="circle-with-minus" size={24} color={Colors.red}/>)}
                     </View>
                  </View>
               )}>
            </FlatList>
            <CustomButton 
               handleOnPress={() => {
                  setIsPlaying(false);
                  setIsGameOver(false);
                  setAnswers([]);
               }}
               text="Go back"
               style={{ marginTop: 10, width: "50%" }}
            />
         </GameView>

   );
}

const styles = StyleSheet.create({
   text: {
      color: "#fff",
      fontSize: 18,
      marginBottom: 10,
      fontWeight: "bold"
   },
   answersContainer: {
      flex: 1,
      width: "95%",
      backgroundColor: "#212121",
      paddingVertical: 10,
      paddingHorizontal: 10,
   },
   answerPreview: { 
      width: "45%",
      marginLeft: "5%",
      marginBottom: 10, 
      backgroundColor: "#212121" 
   },
   answerPreviewImage: { 
      width: "90%",
      height: Dimensions.get('window').height > 535 ? 110 : 30,
      marginBottom: 5, 
      borderRadius: 10
   },
   answerPreviewTextContainer: {
      flexDirection: "row"
   },
   answerPreviewText: { 
      color: "white",
      fontSize: 18,
      marginRight: 10
   }
});

export default GameOverScreen;
