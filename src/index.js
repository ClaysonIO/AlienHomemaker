import 'phaser';
import {SelectionScene} from "./SelectionScene";
import {StartScene} from "./StartScene";
import {FarmScene} from "./FarmScene";
import {EatScene} from "./EatScene";
import {EndScene} from "./EndScene";
import {ExperimentalScene} from "./ExperimentalScene_DC";

export const width = 1024;
export const height = 768;

const config = {
  type: Phaser.AUTO,
  width,
  height,
  backgroundColor: '#182d3b',
  parent: 'phaser-example',
  physics: {
    default: 'impact',
    impact: {
      debug: true,
    }
  },
  scene: [ StartScene, SelectionScene, FarmScene, EatScene, EndScene ]
  // scene: [ ExperimentalScene ]
};

const game = new Phaser.Game(config);
