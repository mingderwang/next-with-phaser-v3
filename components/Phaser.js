import React from 'react';
import * as Phaser from 'phaser';

class PhaserContainer extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentDidMount() {

    var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 }
        }
      },
      scene: {
        preload: preload,
        create: create
      },
      parent: 'game-area'
    };

    var game = new Phaser.Game(config);
    var button;
    var background;

    function preload() {
      this.load.plugin('SamplePlugin', './SamplePlugin.js');

      this.load.setBaseURL('https://labs.phaser.io');

      this.load.image('sky', 'assets/skies/space3.png');
      this.load.image('ball', 'assets/sprites/pangball.png');
      this.load.image('particle', 'assets/particles/yellow.png');

      this.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
      this.load.image('background', 'assets/misc/starfield.jpg');
    }

    function create() {

      console.log(game.plugins.SamplePlugin)
      this.add.image(400, 300, 'sky');

      var particles = this.add.particles('particle');

      var emitter = particles.createEmitter({
        speed: 10,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
      });

      var logo = this.physics.add.image(400, 100, 'ball');

      logo.setVelocity(100, 200);
      logo.setBounce(1, 1);
      logo.setCollideWorldBounds(true);

      emitter.startFollow(logo);

      game.stage.backgroundColor = '#182d3b';

      background = game.add.tileSprite(0, 0, 800, 600, 'background');

      button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

      button.onInputOver.add(over, this);
      button.onInputOut.add(out, this);
      button.onInputUp.add(up, this);
    }
    function up() {
      console.log('button up', arguments);
    }

    function over() {
      console.log('button over');
    }

    function out() {
      console.log('button out');
    }

    function actionOnClick() {

      background.visible = !background.visible;

    }
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div id="game-area">
      </div>
    );
  }
}

export default PhaserContainer;
