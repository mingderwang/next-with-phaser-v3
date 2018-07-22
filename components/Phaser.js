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
      this.load.setBaseURL('https://labs.phaser.io');
      this.load.image('sky', 'assets/skies/space3.png');
      this.load.image('ball', 'assets/sprites/pangball.png');
      this.load.image('particle', 'assets/particles/yellow.png');
    }

    function create() {
      console.log(this)
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
