import Scene from '../scene'
import getBackendManager from '../../managers/backendManager'

export default class MadeWithScene extends Scene {
  constructor () {
    super({key: 'madeWithScene'})

    this.backendManager = getBackendManager()

    this.timesplash = 500
  }

  create (params) {
    super.create(params)
    this.logo = this.add.sprite(this.cameras.main.width/2, this.cameras.main.height/2, 'logo')

    this.time.delayedCall(this.timesplash, () => {
      if (this.backendManager.isLoggedIn()) {
        this.changeToScene('mainMenuScene')
      } else {
        this.changeToScene('loginScene')
      }
    }, [], this)
  }

}