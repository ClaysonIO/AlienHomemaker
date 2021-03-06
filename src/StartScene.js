import {width, height, textColor, biggerFont} from "./index";

export const StartScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function StartScene ()
        {
            Phaser.Scene.call(this, {
                key: 'StartScene',
                active: true,
            });
        },

    preload: function ()
    {
        this.load.image("button", "assets/start.png");
        this.load.image("ship", "assets/spaceship.png");
        this.load.image("logo", "assets/logo.png");
        this.load.audio("background", "assets/audio/background.mp3");
    },

    create: function ()
    {
        const audio = this.sound.add("background", { loop: true, });
        audio.volume = 0.2;
        const spaceship = this.add.sprite(width / 2, height / 3, "ship");
        this.clickButton = this.add.sprite(width / 2, height / 1.8,"button")
            .setInteractive()
            .on("pointerdown", () => {
                audio.play();
                this.scene.start("FarmScene");
                this.scene.get("FarmScene").clearData();
            }, this)
            .on('pointerover', () => this.enterButtonHoverState() )
            .on('pointerout', () => this.enterButtonRestState() );
        this.logo = this.add.sprite(width / 2, height / 5.6, "logo").setScale(2,2);

        this.instructionsText = this.add.text(80, height / 1.5,
            "You have been tasked to build a sustainable\n" +
            "home for our abductees. You may eat the\n" +
            "undesirables ...",
            { font: biggerFont, fill: textColor, });
    },

    enterButtonHoverState() {
        this.clickButton.setAlpha(0.5);
    },

    enterButtonRestState() {
        this.clickButton.setAlpha(1);
    },
});
