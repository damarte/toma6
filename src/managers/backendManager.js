import { Parse} from 'parse'

class BackendManager {

  constructor () {
    this.PARSE_APP_ID = 'xxx';
    this.PARSE_JS_KEY = 'xxx';
    this.serverURL = 'xxx'
    Parse.initialize(this.PARSE_APP_ID, this.PARSE_JS_KEY);
    Parse.serverURL = this.serverURL;
  }

  signup (username, password, email) {
    let user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    return user.signUp(null);
  }

  login (username, password) {
    return Parse.User.logIn(username, password);
  }

  logout () {
    return Parse.User.logOut();
  }

  isLoggedIn () {
    return Parse.User.current() !== null;
  }

  currentUser() {
    return Parse.User.current();
  }
}

// unique instance
let backendManager

let getBackendManager = () => {
  if(!backendManager) {
    backendManager = new BackendManager()
  }
  return backendManager
}
export default getBackendManager