import 'phaser';
import {SelectionScene} from "./SelectionScene";
import {StartScene} from "./StartScene";
import {FarmScene} from "./FarmScene";
import {EatScene} from "./EatScene";
import {EndScene} from "./EndScene";

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: '#182d3b',
    parent: 'phaser-example',
    scene: [ StartScene, SelectionScene, FarmScene, EatScene, EndScene ]
};

const game = new Phaser.Game(config);
