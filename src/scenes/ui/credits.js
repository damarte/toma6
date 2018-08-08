import Scene from '../scene'

export default class CreditsScene extends Scene {
  constructor () {
    super({key: 'creditsScene'})
  }

  create (params) {
    super.create(params)

    this.back = this.createButton({
      x: 100,
      y: 200,
      font: 'keneyPixel',
      text: 'back',
      onClick: (event) => {
        this.back.clearTint()
        this.close()
      },
      onHover: (event) => {
        this.back.setTint(0xff99ff)
      },
      onOut: (event) => {
        this.back.clearTint()
      },
      scale: 1.0
    })
  }

}