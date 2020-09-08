import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD93hKn54YxT1sAE5qKA3DZMyvAz0P6tKQ",
  authDomain: "falcon-project-f2431.firebaseapp.com",
  databaseURL: "https://falcon-project-f2431.firebaseio.com",
  projectId: "falcon-project-f2431",
  storageBucket: "falcon-project-f2431.appspot.com",
  messagingSenderId: "555496500915",
  appId: "1:555496500915:web:831bc1d32d318fa8504ac6",
  measurementId: "G-E492JJPFVW"
}

app.initializeApp(firebaseConfig);

class Firebase {
    constructor() {
      this.auth = app.auth();
      this.db = app.firestore();
    }
  
    async register(name, email, password) {
      const newUser = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      return await newUser.user.updateProfile({
        displayName: name,
      });
    }
  
    async login(email, password) {
      return await this.auth.signInWithEmailAndPassword(email, password);
    }
  
    async logout() {
      await this.auth.signOut();
    }
  
    async resetPassword(email) {
      await this.auth.sendPasswordResetEmail(email);
    }

    async createPost(Title, Link, Email) {
      console.log(this.auth.currentUser)
      if(!this.auth.currentUser) return null;

      const data = {
        Email: Email,
        Title: Title,
        Link: Link
      }

      const setPost = await this.db.collection('Post').doc(Title).set(data);
    }
  }
  
  export const firebase = new Firebase();