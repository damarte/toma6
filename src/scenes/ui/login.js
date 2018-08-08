import Scene from '../scene'
import getBackendManager from '../../managers/backendManager'

export default class LoginScene extends Scene {
  constructor () {
    super({key: 'loginScene'})

    this.backendManager = getBackendManager()

    this.username = ''
    this.password = ''
  }

  /*preload() {
    this.load.plugin('DialogModalPlugin', 'src/plugins/dialogModalPlugin.js');
  }*/

  create (params) {
    super.create(params)

    const context = this;

    /*let plugin = this.plugins.get('DialogModalPlugin');
  console.log(plugin);
  plugin.init();
  plugin.setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', true);*/

    this.usernameInput = this.createInput({
      x: this.cameras.main.width/2,
      y: this.cameras.main.height/3,
      width: this.cameras.main.width/2,
      height: 40,
      placeHolder: 'Username',
      onkeyup: function(event){
        context.username = context.usernameInput.value();
      },
    })

    this.passwordInput = this.createInput({
      x: this.cameras.main.width/2,
      y: this.cameras.main.height/2,
      width: this.cameras.main.width/2,
      height: 40,
      placeHolder: 'Password',
      onkeydown: function(event){},
      onkeyup: function(event){
        if(context.passwordInput.value().length > context.password.length) {
          let newChar = context.passwordInput.value().slice(-1);
          context.password = context.password + newChar;
        } else {
          context.password = context.password.slice(0, context.passwordInput.value().length);
        }

        context.passwordInput.value('*'.repeat(context.password.length))
      },
    })

    this.login = this.createButton({
      x: this.cameras.main.width/2,
      y: 2*this.cameras.main.height/3,
      font: 'keneyPixel',
      text: 'log in',
      onClick: (event) => {
        this.login.clearTint()

        this.backendManager.login(context.username, context.password).then(function(user) {
          console.log(user);
          this.changeToScene('mainMenuScene')
        }, function(error) {
          console.error(error);
          window.alert(error.message);
        });
      },
      onHover: (event) => {
        this.login.setTint(0xff99ff)
      },
      onOut: (event) => {
        this.login.clearTint()
      },
      scale: 1.0
    })

    this.signup = this.createButton({
      x: this.cameras.main.width/2,
      y: this.cameras.main.height-30,
      font: 'keneyPixel',
      text: 'create an account',
      onClick: (event) => {
        this.signup.clearTint()
        this.open('signupScene')
      },
      onHover: (event) => {
        this.signup.setTint(0xff99ff)
      },
      onOut: (event) => {
        this.signup.clearTint()
      },
      scale: 1.0
    })
  }

}