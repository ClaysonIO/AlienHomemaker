import 'phaser';
import {SelectionScene} from "./SelectionScene";
import {StartScene} from "./StartScene";
import {FarmScene} from "./FarmScene";
import {EndScene} from "./EndScene";
import {Experiment} from "./componentExperiment";

export const width = 1100;
export const height = 800;
export const backgroundColor = '#182d3b';
export const textColor = '#18A63b';
export const biggerFont = '48px Courier';
export const bigFont = '20px Courier';
export const smallFont = '16px Courier';

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
  // scene: [ Experiment ]
};

const game = new Phaser.Game(config);