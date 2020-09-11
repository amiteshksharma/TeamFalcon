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

  /**
   * Creates the profile for the user
   * @param {String} username 
   * @param {String} email 
   */
  async createProfile(username, email) {
    const date = new Date();

    const data = {
      Email: email,
      Username: username,
      Timestamp: date
    }
    
    await this.firestore.collection('User').doc(email).set(data);    
  }

  /**
   * Gets the user's username when logging in
   * @param {string} username 
   */
  async loadProfile(email) {
    const profile = await this.firestore.collection('User').doc(email).get();    

    return profile.data();
  }

  /**
   * Gets the profile details for the profile page
   * @param {String} email 
   */
  async getProfile(username) {
    const profile = await this.firestore.collection('User').where("Username", "==", username).get();    

    return profile.docs.map(doc => doc.data());
  }

  /**
   * Create the post and store in the proper collections
   * @param {String} title 
   * @param {String} link 
   * @param {String} username 
   */
  async createPost(title, link, username) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;

    const data = {
      Username: username,
      Title: title,
      Link: link
    }

    await this.firestore.collection('Post').add(data);
    await this.firestore.collection('Likes').add({
      Total: 0, 
      Title: title
    })
  }

  /**
   * Increments the count for likes by 1
   * @param {String} title 
   * @param {String} count 
   * @param {String} email 
   */
  async upvote(title, count, email) {
    const getLikeId = await this.getID("Likes", title, "Title");
    const likeId = getLikeId[0];

    let value = count
    value = value + 1;

    console.log(value);
    
    const upvote = await this.firestore.collection("Likes").doc(likeId).update({Total: value});
    const addLike = await this.firestore.collection("User").doc(email).collection("Post").doc(title).set({isLiked: true})
  }

  /**
   * Decrements the count for likes by 1
   * @param {String} title 
   * @param {String} count 
   * @param {String} email 
   */
  async downvote(title, count, email) {
    const getLikeId = await this.getID("Likes", title, "Title");
    const likeId = getLikeId[0];

    let value = count
    value = value - 1;
    if(value === -1) value = 0;
    
    const upvote = await this.firestore.collection("Likes").doc(likeId).update({Total: value});
    const addLike = await this.firestore.collection("User").doc(email).collection("Post").doc(title).delete();
  }

  /**
   * Deletes all instances of the post in the collections
   * @param {String} title 
   */
  async removePost(title) {
    //Get the UID tokens from each collection
    const getPostId = await this.getID("Post", title, "Title");
    const getLikeId = await this.getID("Likes", title, "Title");
    const getCommentId = await this.getID("Comments", title, "Post");

    //Get the ids from the calls above
    const id = getPostId[0];
    const likeId = getLikeId[0];

    //Remove the instance of the Post
    const updatePost = await this.firestore.collection("Post").doc(id).delete();
    const updateLike = await this.firestore.collection("Likes").doc(likeId).delete();
    if(getCommentId !== null || getCommentId !== undefined) {
      for (const comment of getCommentId) {
        const updateComment = await this.firestore.collection("Comments").doc(comment).delete();
      }
    }

  }

  /**
   * Updates all instances of the post 
   * @param {String} oldTitle 
   * @param {String} title 
   * @param {String} link 
   * @param {String} username 
   */
  async updatePost(oldTitle, title, link, username) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;
    const data = {
      Username: username,
      Title: title,
      Link: link
    }

    const getLikes = await this.loadLikes(oldTitle);

    //Get the UID tokens from each collection
    const getPostId = await this.getID("Post", oldTitle, "Title");
    const getLikeId = await this.getID("Likes", oldTitle, "Title");
    const getCommentId = await this.getID("Comments", oldTitle, "Post");

    //Get the ids from the calls above
    const id = getPostId[0];
    const likeId = getLikeId[0];
    const commentId = getCommentId[0];

    //Update the corresponding fields in each collection
    const updatePost = await this.firestore.collection("Post").doc(id).set(data);
    const updateLike = await this.firestore.collection("Likes").doc(likeId).update({
      Title: title
    });
    const updateComment = await this.firestore.collection("Comments").doc(commentId).update({
      Post: title
    });

    //add like total to update in the frontend
    data.Total = getLikes[0].Total;

    return data;
  }

  /**
   * Helper Method to get the ID for items
   * @param {String} collection 
   * @param {String} parameter 
   * @param {String} string 
   */
  async getID(collection, parameter, string) {
    const getUid = await this.firestore.collection(collection).where(string, "==", parameter).get();

    return getUid.docs.map(doc => doc.id);
  }
  
  /**
   * Method will be used for creating
   * New comment
   * 
   * @param {string} title 
   * @param {string} comment 
   * @param {string} email 
   */
  async commentPost(title, comment, name) {
    // console.log(this.auth.currentUser)
    // if(!this.auth.currentUser) return null;
    const data = {
      Post: title,
      Comment: comment,
      Name: name
    }

    const addComment = await this.firestore.collection("Comments").add(data)
  }

  /**
   * Updates the comment
   * @param {String} oldComment 
   * @param {String} comment 
   */
  async updateComment(oldComment, comment) {
    const getCommentId = await this.getID("Comments", oldComment, "Comment");
    const commentId = getCommentId[0];

    const updateComment = await this.firestore.collection("Comments").doc(commentId).update({
      Comment: comment
    })

  }

  /**
   * Deletes the comment from under the post
   * @param {String} comment 
   * @param {String} username 
   */
  async deleteComment(comment, username) {
    const findComment = await this.firestore.collection("Comments").where("Comment", "==", comment).where("Name", "==", username).get()
    const getId = findComment.docs.map(doc => doc.id);
    
    const removeComment = await this.firestore.collection("Comments").doc(getId[0]).delete();
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
    const getComments = await this.firestore.collection("Comments").where("Post", "==", title).get();

    const val = getComments.docs.map(doc => doc.data());
    return val;
  }

  async loadLikes(title) {
    const getComments = await this.firestore.collection("Likes").where("Title", "==", title).get();

    return getComments.docs.map(doc => doc.data());
  }

  async getTotalComments(title) {
    const getTotalComments = await this.firestore.collection("Comments").where("Post", "==", title).get();

    const val = getTotalComments.docs.map(doc => doc.data());
    return val.length;
  }

  async getUserPostsLikes(email) {
    if(email === null) return null;
    const getUserLikes = await this.firestore.collection("User").doc(email).collection("Post").get();
    return getUserLikes.docs.map(doc => doc.id);
  }

  async getUserComments(username) {
    if(username === null) return null;

    const getUserComments = await this.firestore.collection("Comments").where("Name", "==", username).get();
    const getData = getUserComments.docs.map(doc => doc.id);
    
    return getData.length;
  }

  async getUserPosts(username) {
    if(username === null) return null;
      const getUserPosts = await this.firestore.collection("Post").where("Username", "==", username).get();

      return getUserPosts.docs.map(doc => doc.data());
  }
}
 
export default Firebase;