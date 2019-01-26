import 'phaser';
import {SelectionScene} from "./SelectionScene";
import {StartScene} from "./StartScene";
import {FarmScene} from "./FarmScene";
import {EatScene} from "./EatScene";
import {EndScene} from "./EndScene";

export const width = 1024;
export const height = 768;

const config = {
    type: Phaser.AUTO,
    width,
    height,
    backgroundColor: '#182d3b',
    parent: 'phaser-example',
    scene: [ StartScene, SelectionScene, FarmScene, EatScene, EndScene ]
};

const game = new Phaser.Game(config);
