import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
 
const config = {
  apiKey: "AIzaSyD93hKn54YxT1sAE5qKA3DZMyvAz0P6tKQ",
  authDomain: "falcon-project-f2431.firebaseapp.com",
  databaseURL: "https://falcon-project-f2431.firebaseio.com",
  projectId: "falcon-project-f2431",
  storageBucket: "falcon-project-f2431.appspot.com",
  messagingSenderId: "555496500915",
  appId: "1:555496500915:web:831bc1d32d318fa8504ac6",
  measurementId: "G-E492JJPFVW"
};
 
class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  
  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

}
 
export default Firebase;