import Scene from '../scene'
import getBackendManager from '../../managers/backendManager'

export default class SignupScene extends Scene {
  constructor () {
    super({key: 'signupScene'})

    this.backendManager = getBackendManager()

    this.username = ''
    this.email = ''
    this.password = ''
    this.passwordRepeat = ''
  }

  create (params) {
    super.create(params)

    const context = this;

    this.usernameInput = this.createInput({
      x: this.cameras.main.width/2,
      y: 2*this.cameras.main.height/7,
      width: this.cameras.main.width/2,
      height: 40,
      placeHolder: 'Username',
      onkeyup: function(){
        let newChar = context.usernameInput.value().slice(-1);
        context.username = context.username + newChar;
      },
    })

    this.emailInput = this.createInput({
      x: this.cameras.main.width/2,
      y: 3*this.cameras.main.height/7,
      width: this.cameras.main.width/2,
      height: 40,
      placeHolder: 'Email',
      onkeyup: function(){
        let newChar = context.emailInput.value().slice(-1);
        context.email = context.email + newChar;
      },
    })

    this.passwordInput = this.createInput({
      x: this.cameras.main.width/2,
      y: 4*this.cameras.main.height/7,
      width: this.cameras.main.width/2,
      height: 40,
      placeHolder: 'Password',
      onkeydown: function(){},
      onkeyup: function(){
        let newChar = context.passwordInput.value().slice(-1);
        context.password = context.password + newChar;
        context.passwordInput.value('*'.repeat(context.password.length))
      },
    })

    this.passwordRepeatInput = this.createInput({
      x: this.cameras.main.width/2,
      y: 5*this.cameras.main.height/7,
      width: this.cameras.main.width/2,
      height: 40,
      placeHolder: 'Repeat Password',
      onkeydown: function(){},
      onkeyup: function(){
        let newChar = context.passwordRepeatInput.value().slice(-1);
        context.passwordRepeat = context.passwordRepeat + newChar;
        context.passwordRepeatInput.value('*'.repeat(context.passwordRepeat.length))
      },
    })

    this.signin = this.createButton({
      x: this.cameras.main.width/2,
      y: this.cameras.main.height-30,
      font: 'keneyPixel',
      text: 'sign up',
      onClick: (event) => {
        this.signin.clearTint()

        if (context.password != context.passwordRepeat) {
          console.error('the passwords is not the same');
          window.alert('the passwords is not the same');
        } else {
          this.backendManager.signup(context.username, context.password, context.email).then(function(user) {
            console.log(user);
            this.changeToScene('mainMenuScene')
          }, function(error) {
            console.error(error);
            window.alert(error.message);
          });
        }
      },
      onHover: (event) => {
        this.signin.setTint(0xff99ff)
      },
      onOut: (event) => {
        this.signin.clearTint()
      },
      scale: 1.0
    })

    this.back = this.createButton({
      x: 100,
      y: this.cameras.main.height-30,
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