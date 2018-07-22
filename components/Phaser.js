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
      width: 800,
      height: 600,
      physics: {
        default: 'arcade'
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
      console.log(this.weapons)
      //  Creates 1 single bullet, using the 'bullet' graphic
      this.weapon = this.weapons.add(1, 'bullet')

      // Enable physics debugging for the bullets
      this.weapon.debugPhysics = true

      //  The bullet will be automatically killed when it leaves the world bounds
      console.log(`setting bulletKillType`)
      this.weapon.bulletKillType = WeaponPlugin.consts.KILL_WORLD_BOUNDS

      //  Because our bullet is drawn facing up, we need to offset its rotation:
      this.weapon.bulletAngleOffset = 90

      //  The speed at which the bullet is fired
      this.weapon.bulletSpeed = 400

      this.sprite = this.add.sprite(320, 500, 'ship')

      this.physics.add.existing(this.sprite)

      this.sprite.body.setDrag(70)
      this.sprite.body.maxVelocity.set(200)

      //  Tell the Weapon to track the 'player' Sprite
      this.weapon.trackSprite(this.sprite)

      this.cursors = this.input.keyboard.createCursorKeys()
    }
 
    function update () {
      this.sprite.body.velocity.x = 0

      if (this.cursors.left.isDown) {
        this.sprite.body.velocity.x = -200
      } else if (this.cursors.right.isDown) {
        this.sprite.body.velocity.x = 200
      }

      if (this.cursors.space.isDown) {
        this.weapon.fire()
      }
    }
  }
  render () {
    return <div id='game-area' />
  }
}
export default PhaserContainer
