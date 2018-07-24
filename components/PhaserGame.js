import BootScene from '../components/BootScene';
import React from 'react'
import Phaser from 'phaser'
class PhaserContainer extends React.Component {
componentDidMount () {
    var config = {
      type: Phaser.AUTO,
      pixelArt: true,
      roundPixels: true,
      parent: 'game-area',
      width: 800,
      height: 600,
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 400 },
              debug: false
          }
      },
      scene: [
          BootScene
      ]
    };  
    var game = new Phaser.Game(config); 
  }
  render () {
    return <div id='game-area' />
  }
}
export default PhaserContainer