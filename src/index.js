import 'phaser'

import BootScene from './scenes/ui/boot'

import SplashScene from './scenes/ui/splash'
import MadeWithScene from './scenes/ui/madeWith'

import LoginScene from './scenes/ui/login'
import SignupScene from './scenes/ui/signup'

import MainMenuScene from './scenes/ui/mainMenu'
import OptionsScene from './scenes/ui/options'
import CreditsScene from './scenes/ui/credits'

import HUDGameScene from './scenes/game/HUDGame'
import BaseGameScene from './scenes/game/baseGame'

import PauseScene from './scenes/ui/pause'

import getSceneManager from './managers/sceneManager'
import getBackendManager from './managers/backendManager'

window.game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'content',
  width: window.innerWidth,
  height: window.innerHeight,
  canvas: document.getElementById('game'),
  backgroundColor: 0x000,
  scene: [
    BootScene,
    SplashScene,
    MadeWithScene,
    LoginScene,
    SignupScene,
    MainMenuScene,
    OptionsScene,
    CreditsScene,
    HUDGameScene,
    BaseGameScene,
    PauseScene
  ]
})

// init managers
getSceneManager(window.game.scene)
getBackendManager()

document.getElementById('game').focus()

window.focus()