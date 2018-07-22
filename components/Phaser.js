import React from 'react'
import * as Phaser from 'phaser'
import 'phaser3-weapon-plugin'

class PhaserContainer extends React.Component {
  constructor () {
    super()
  }

  shouldComponentUpdate (nextProps, nextState) {
    return false
  }

  componentDidMount () {
    var config = {
      type: Phaser.AUTO,
      width: window.screen.availWidth,
      height: window.screen.availHeight,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      },
      parent: 'game-area'
    }

    var game = new Phaser.Game(config)

    function preload () {
      this.load.image('bullet', 'static/images/cat.png')
      this.load.image('ship', 'static/images/image.png')
      this.load.scenePlugin(
        'WeaponPlugin',
        'static/assets/WeaponPlugin.js',
        null,
        'weapons'
      )
    }

    function create () {
      console.log(this.weapons);
      //  Creates 30 bullets, using the 'bullet' graphic
      this.weapon = this.weapons.add(30, 'bullet')

      this.weapon.bulletKillType = WeaponPlugin.consts.KILL_LIFESPAN
      this.weapon.bulletLifespan = 2000

      this.weapon.fireRate = 100

      //  Wrap bullets around the world bounds to the opposite side
      this.weapon.bulletWorldWrap = true

      this.sprite = this.add.sprite(window.screen.availWidth/2, window.screen.availHeight/2,  'ship')

      this.physics.add.existing(this.sprite)

      this.sprite.body.setDrag(70)
      this.sprite.body.maxVelocity.set(200)

      //  Tell the Weapon to track the 'player' Sprite
      //  With no offsets from the position
      this.weapon.trackSprite(this.sprite, 0, 0, true)

      this.cursors = this.input.keyboard.createCursorKeys()
    }

    function update () {
      if (this.cursors.up.isDown) {
        /* this.physics.arcade.accelerationFromRotation(this.sprite.rotation, 300, this.sprite.body.acceleration);
        this.sprite.body.acceleration.x

           /* if (speed === undefined) { speed = 60; }
            point = point || new Phaser.Point();

            return point.setToPolar(rotation, speed); */
        this.sprite.body.acceleration.setToPolar(this.sprite.rotation, 300)
      } else {
        this.sprite.body.acceleration.set(0)
      }

      if (this.cursors.left.isDown) {
        this.sprite.body.angularVelocity = -300
      } else if (this.cursors.right.isDown) {
        this.sprite.body.angularVelocity = 300
      } else {
        this.sprite.body.angularVelocity = 0
      }

      if (this.cursors.space.isDown) {
        this.weapon.fire()
      }

      this.physics.world.wrap(this.sprite, 16)
    }
  }
  render () {
    return <div id='game-area' />
  }
}
export default PhaserContainer
