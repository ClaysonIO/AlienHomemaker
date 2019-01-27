import 'phaser';
import {SelectionScene} from "./SelectionScene";
import {StartScene} from "./StartScene";
import {FarmScene} from "./FarmScene";
import {EndScene} from "./EndScene";

export const width = 1024;
export const height = 768;
export const backgroundColor = '#182d3b';
export const textColor = '#18A63b';
export const biggerFont = '48px Courier';
export const bigFont = '24px Courier';
export const smallFont = '16px Courier';
export let pid = 0;

const config = {
  type: Phaser.AUTO,
  width,
  height,
  backgroundColor,
  parent: 'phaser-example',
  physics: {
    default: 'impact',
    impact: {
      debug: true,
    }
  },
  scene: [ StartScene, SelectionScene, FarmScene, EndScene ]
  // scene: [ ExperimentalScene ]
};

const game = new Phaser.Game(config);