export enum ColorTypes {
  name = "name",
  hex = "hex", 
  rgb = "rgb"
};

export interface Answer {
  colors: ColorTypes;
  correct: boolean;
};
