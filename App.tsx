import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, View, Platform } from "react-native";
import StartGameScreen from "./screens/StartGameScreen"
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

import { ColorTypes, Answer } from "./types";

const fetchFonts = () => (
  Font.loadAsync({
    "MelanieAngerer": require("./assets/fonts/MelanieRoselyn.ttf"),
    "KgaLittleSpark": require("./assets/fonts/KGALittleSpark.ttf"),
  })
);

export default function App() {
  console.log(Platform.OS, Platform.Version);

  const MAX_GAME_ROUNDS: number = 10;

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.name);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  let currentScreen = isPlaying ?
     <GameScreen colorType={colorType} setIsPlaying={setIsPlaying} setIsGameOver={setIsGameOver} maxGameRounds={MAX_GAME_ROUNDS} setAnswers={setAnswers}/> 
     : isGameOver ? <GameOverScreen setIsPlaying={setIsPlaying} setIsGameOver={setIsGameOver} answers={answers} setAnswers={setAnswers} maxGameRounds={MAX_GAME_ROUNDS} />
     : <StartGameScreen setColorType={setColorType} setIsPlaying={setIsPlaying} />; 

  if (!hasLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setHasLoaded(true)}
        onError={(err) => console.error(err)}
      />
    );
  }
  return (
    <View style={styles.container}>
      { currentScreen }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
