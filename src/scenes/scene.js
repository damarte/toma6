import getSceneManager from '../managers/sceneManager'
require('../../node_modules/canvasinput/CanvasInput.js');

export default class Scene extends Phaser.Scene {
  constructor (params) {
    super(params)
  }

  preload () {
    this.sceneManager = getSceneManager(this.scene)
  }

  create (params) {
    // display scene title
    this.titleText = this.make.text({
      x: this.cameras.main.width / 2,
      y: 30,
      text: this.scene.key,
      style: {
          font: '20px monospace',
          fill: '#ffffff'
      }
    })
    this.titleText.setOrigin(0.5, 0.5)

    // handling events
    this.input.on('pointerdown', (pointer, gameObject) => {
      if (gameObject.length > 0) {
        let object = gameObject[0]
        if(object.getData('type') === 'button'){
          let onClick = object.getData('onClick')
          if (onClick) {
            onClick(object)
          }
        }
      }
    })
    this.input.on('pointerover', (pointer, gameObject) => {
      let object = gameObject[0]
      if(object.getData('type') === 'button'){
        let onHover = object.getData('onHover')
          if (onHover) {
            onHover(object)
          }
      }
    })
    this.input.on('pointerout', (pointer, gameObject) => {
      let object = gameObject[0]
      if(object.getData('type') === 'button'){
        let onOut = object.getData('onOut')
          if (onOut) {
            onOut(object)
          }
      }
    })
  }

  open (sceneKey, data) {
    this.sceneManager.openMenu(sceneKey, data)
  }

  close () {
    this.sceneManager.closeMenu(this.scene.key)
  }

  changeToScene (sceneKey, data) {
    this.sceneManager.changeToScene(sceneKey, data)
  }

  createButton (props) {
    let button = this.add.bitmapText(props.x, props.y, props.font, props.text)
    button.setTint(props.color)
  
    button.on('pointerup', props.onClick, this)
    button.on('pointerdown', props.onHover, this)
    button.on('pointerout', props.onOut, this)

    /*button.setData('onClick', props.onClick)
    button.setData('onHover', props.onHover)
    button.setData('onOut', props.onOut)*/
    button.setData('type', 'button')
    button.setOrigin(0.5, 0.5)
    button.setData('location', {x: props.x, y: props.y})

    button.setInteractive(new Phaser.Geom.Rectangle(0, 0, button.width, button.height), Phaser.Geom.Rectangle.Contains)
    button.setScale(props.scale || 1)
    return button
  }

  createInput (props) {
    let textureId = 'input-'+new Date().getTime();
    let bmd = this.textures.createCanvas(textureId, props.width, props.height);
    let sprite = this.add.sprite(props.x, props.y, textureId);

    bmd.canvas.canvasInput = new CanvasInput({
      canvas: bmd.canvas,
      width: props.width,
      /*fontSize: 25,
      fontFamily: 'Arial',
      fontColor: '#212121',
      fontWeight: 'bold',
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #fff',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',*/
      placeHolder: props.placeHolder,
      onkeydown: function(event){
        if(props.onkeydown) {
          props.onkeydown(event);
        }
        bmd.refresh();
      },
      onkeyup: function(event) {
        if(props.onkeyup) {
          props.onkeyup(event);
        }
        bmd.refresh();
      },
      onfocus: function(event) {
        if(props.onfocus) {
          props.onfocus(event);
        }
        bmd.refresh();
      }
      /*onsubmit: function(event){
        bmd.refresh();
      },*/
    });
    sprite.setInteractive(new Phaser.Geom.Rectangle(0, 0, props.width, props.height), Phaser.Geom.Rectangle.Contains);
    sprite.input.useHandCursor = true;

    sprite.on('pointerdown', function(event) {
      bmd.canvas.canvasInput.focus();
      bmd.refresh();
    }, this);
    bmd.refresh();

    return bmd.canvas.canvasInput;
  }

}