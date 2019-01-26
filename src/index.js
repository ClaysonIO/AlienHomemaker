import 'phaser';
import {SelectionScene} from "./SelectionScene";
import {StartScene} from "./StartScene";
import {FarmScene} from "./FarmScene";
import {EatScene} from "./EatScene";
import {EndScene} from "./EndScene";

const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 9000,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [ StartScene, SelectionScene, FarmScene, EatScene, EndScene ]
};

const game = new Phaser.Game(config);
