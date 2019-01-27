import 'phaser';
import {SelectionScene} from "./SelectionScene";
import {StartScene} from "./StartScene";
import {FarmScene} from "./FarmScene";
import {EndScene} from "./EndScene";

export const width = 1100;
export const height = 800;
export const backgroundColor = '#182d3b';
export const textColor = '#18A63b';
export const dangerColor = '#ce1e03';
export const biggerFont = '48px Arial';
export const bigFont = '20px Arial';
export const smallFont = '16px Arial';

const config = {
  type: Phaser.AUTO,
  width,
  height,
  backgroundColor,
  parent: 'phaser-example',
  physics: {
    default: 'impact',
    impact: {
      debug: false,
    }
  },
  audio: {
    disableWebAudio: true,
  },
  scene: [ StartScene, SelectionScene, FarmScene, EndScene ]
  // scene: [ Experiment ]
};

const game = new Phaser.Game(config);