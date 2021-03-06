export const EndScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function EndScene ()
        {
            Phaser.Scene.call(this, {
                key: 'EndScene',
            });
        },

    preload: function ()
    {
        this.load.image("shooter", "assets/shooter.png");
        this.load.image("dead", "assets/dead.png");
        this.load.audio("shot", "assets/audio/shot.mp3");
    },

    create: function ()
    {
        const audio = this.sound.add("shot");
        this.add.sprite(300,400,"shooter");
        this.add.sprite(700,500,"dead");
        const text = this.add.text(200, 150, 'YOU HAVE FAILED US!', { font: '50px Arial', fill: '#ce1e03' });
        this.time.delayedCall(300, () => audio.play(),[], this);
        this.time.delayedCall(3000, () => this.scene.start("StartScene"),[], this);
    },
});
