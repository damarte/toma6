import Scene from '../scene'
import getBackendManager from '../../managers/backendManager'

export default class MainMenuScene extends Scene {
  constructor () {
    super({key: 'mainMenuScene'})

    this.backendManager = getBackendManager()
  }

  create (params) {
    super.create(params)
    
    this.start = this.createButton({
      x: 100,
      y: 100,
      font: 'keneyPixel',
      text: 'start game',
      onClick: (event) => {
        this.options.clearTint()
        this.changeToScene('baseGameScene')
      },
      onHover: (event) => {
        this.options.setTint(0xff99ff)
      },
      onOut: (event) => {
        this.options.clearTint()
      },
      scale: 1.0
    })

    this.options = this.createButton({
      x: 100,
      y: 150,
      font: 'keneyPixel',
      text: 'options',
      onClick: (event) => {
        this.options.clearTint()
        this.open('optionsScene')
      },
      onHover: (event) => {
        this.options.setTint(0xff99ff)
      },
      onOut: (event) => {
        this.options.clearTint()
      },
      scale: 1.0
    })

    this.credits = this.createButton({
      x: 100,
      y: 200,
      font: 'keneyPixel',
      text: 'credits',
      onClick: (event) => {
        this.credits.clearTint()
        this.open('creditsScene')
      },
      onHover: (event) => {
        this.credits.setTint(0xff99ff)
      },
      onOut: (event) => {
        this.credits.clearTint()
      },
      scale: 1.0
    })

    this.usernameText = this.make.text({
      x: this.cameras.main.width-30,
      y: this.cameras.main.height-30,
      text: 'loggued in as '+this.backendManager.currentUser().get('username'),
      style: {
          font: '15px keneyPixel',
          fill: '#ffffff',
          align: 'right'
      }
    })
    this.usernameText.setOrigin(1, 0.5)

  }

}