import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
 
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
    this.firestore = app.firestore();
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

  async createProfile(username, email) {
    const data = {
      Email: email,
      Username: username
    }
    
    await this.firestore.collection('User').doc(email).set(data);    
  }

  async createPost(title, link, email) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;

    const data = {
      Email: email,
      Title: title,
      Link: link
    }

    await this.firestore.collection('Post').doc(title).set(data);
    await this.firestore.collection('Comments').doc(title).set({[email]: null})
    await this.firestore.collection('Likes').doc(title).set({Total: 0})
  }

  async upvote(title, count) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;

    let value = count
    value = value + 1;
    const data = {
      Total: value
    }
    
    const upvote = await this.firestore.collection("Likes").doc(title).set(data);
  }

  async downvote(title, count) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;

    let value = count
    value = value - 1;
    const data = {
      Total: value
    }
    
    const upvote = await this.firestore.collection("Likes").doc(title).set(data);
  }

  async removePost(title) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;
    
    const removePost = await this.firestore.collection('Post').doc(title).delete();
  }

  async updatePost(oldTitle, title, link, email) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;
    const data = {
      Link: link,
      Title: title, 
      Email: email 
    }

    const removeOldPost = await this.removePost(oldTitle);
    const updatePost = await this.createPost(title, link, email);
  }
  
  /**
   * Method will be used for both creating new post 
   * and updating comment. User will only be allowed
   * to comment Once on a post.
   * @param {string} title 
   * @param {string} comment 
   * @param {string} email 
   */
  async commentPost(title, comment, email) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;
    const data = {
      [email]: comment
    }

    const addComment = await this.firestore.collection("Comments").doc(title).set(data)
  }

  async deleteComment(title, email) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;

    const addComment = await this.firestore.collection("Comments").doc(title).
      collection(email).delete()
  }

  async loadPosts() {
    const getPosts = await this.firestore.collection("Post").get();
    let postArray = [];
    getPosts.forEach(async (post) => {
      postArray.push(post.data())
    })

    return postArray;
  }

  async loadComments(title) {
    const getComments = await this.firestore.collection("Comments").get();
    let commentArray = [];
    getComments.forEach(async (comment) => {
      commentArray.push(comment.data())
    })

    return commentArray;
  }

  async loadLikes(title) {
    const getComments = await this.firestore.collection("Likes").doc(title).get();

    return getComments.data();
  }
}
 
export default Firebase;