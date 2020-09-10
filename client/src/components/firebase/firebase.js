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

  async loadProfile(email) {
    const profile = await this.firestore.collection('User').doc(email).get();    

    return profile.data();
  }

  async createPost(title, link, username) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;

    const data = {
      Username: username,
      Title: title,
      Link: link
    }

    await this.firestore.collection('Post').doc(title).set(data);
    await this.firestore.collection('Comments').doc(title).set({[username]: null})
    await this.firestore.collection('Likes').doc(title).set({Total: 0})
  }

  async upvote(title, count, email) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;

    let value = count
    value = value + 1;
    const data = {
      Total: value
    }
    
    const upvote = await this.firestore.collection("Likes").doc(title).set(data);
    const addLike = await this.firestore.collection("User").doc(email).collection("Post").doc(title).set({isLiked: true})
  }

  async downvote(title, count, email) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;

    let value = count
    value = value - 1;
    const data = {
      Total: value
    }
    
    const upvote = await this.firestore.collection("Likes").doc(title).set(data);
    const addLike = await this.firestore.collection("User").doc(email).collection("Post").doc(title).delete();
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
  async commentPost(title, comment, name) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;
    const data = {
      [name]: comment
    }

    const addComment = await this.firestore.collection("Comments").doc(title).update(data)
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
    const getComments = await this.firestore.collection("Comments").doc(title).get();

    return getComments.data();
  }

  async loadLikes(title) {
    const getComments = await this.firestore.collection("Likes").doc(title).get();

    return getComments.data();
  }

  async getTotalComments(title) {
    const getTotalComments = await this.firestore.collection("Comments").doc(title).get();

    let count = 0;
    const keys = Object.keys(getTotalComments.data());
    const data = getTotalComments.data()
    for(let key of keys) {
      if(data[key] === null || data[key] === undefined) {
        continue;
      } else {
        count++;
      }
    }

    return count;
  }
}
 
export default Firebase;